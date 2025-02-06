import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IDoctor } from "../types/Doctors";
import { useEffect, useState } from "react";
import { IHospital } from "../types/Hospital";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Card as CardMUI,
  CardHeader,
  CardContent,
  Grid2,
  Avatar,
  IconButton,
  TextField,
} from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { ISlot, Status } from "../types/Slot";
import { Delete } from "@mui/icons-material";

const SlotsByDay = (props: {
  slots: ISlot[];
  deleteSlot: (slot: number) => void;
}) => {
  return (
    <section
      style={{
        marginTop: "4rem",
        marginBottom: "4rem",
        padding: "2rem",
        overflowY: "auto", 
        height: "400px"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2em",
        }}
      >
        {props.slots.map((slot: ISlot, index: number) => {
          return (
            <CardMUI>
              <CardContent>
                <div
                  style={{ display: "flex", gap: "1em", marginBottom: "4px" }}
                >
                  <Typography variant="h6">
                    Hospital: {slot.hospitalId}
                  </Typography>
                </div>
                <div style={{ display: "flex", gap: "1em" }}>
                  <Typography variant="h6">
                    Start Time: {slot.startTime}
                  </Typography>
                </div>
                <div style={{ display: "flex", gap: "1em" }}>
                  <Typography variant="h6">End Time: {slot.endTime}</Typography>
                </div>
                <div style={{ display: "flex", gap: "1em" }}>
                  <Typography variant="h6">
                    Status: {Status[slot.apptStatus]}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "4px",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      props.deleteSlot(slot.id);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </div>
              </CardContent>
            </CardMUI>
          );
        })}
      </div>
    </section>
  );
};

const DoctorScheduleV2 = () => {
  const location = useLocation();
  const [doctor, setDoctor] = useState<IDoctor>(location.state as IDoctor);
  const [value, setValue] = useState<Dayjs | null>(dayjs());

  const [hospitals, setHospitals] = useState<IHospital[]>([]);
  const [slots, setSlots] = useState<ISlot[]>([]);
  const [showSlotModal, setShowSlotModal] = useState<boolean>(false);

  const [slotForm, setSlotForm] = useState({
    day: "",
    start: "",
    end: "",
    hospitalId: -1,
  });

  const handleSlotFormChange = (e: any) => {
    const { name, value } = e.target;
    const parsedValue = name === "hospitalId" ? parseInt(value, 10) : value;

    setSlotForm((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  useEffect(() => {
    const fetchHospital = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/hospital`
      );
      setHospitals(response.data);
    };

    fetchHospital();
  }, []);

  const deleteSlot = async (slot: number) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/slot/${slot}`
    );

    if (response.status === 200) {
      const newSlots = slots.filter((s) => s.id !== slot);
      setSlots(newSlots);
    }
  };

  const addSlot = async (
    doctorId: number,
    slotDate: string,
    startTime: string,
    endTime: string,
    hospitalId: number
  ) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/slot`,
      {
        doctorId,
        slotDate,
        startTime,
        endTime,
        hospitalId,
        apptStatus: 0,
      }
    );

    setShowSlotModal(false);

    if (response.status === 200) {
      const newSlot = response.data;
      setSlots([...slots, newSlot]);
    }
  };

  const selectDate = async (value: any) => {
    setValue(value);

    // Get all slots for the selected date
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/slot/doctor/${
        doctor.id
      }/date/${value.format("YYYY-MM-DD")}`
    );

    // Set the slots in the state
    setSlots(response.data);

    console.log(response.data);
  };

  return (
    <>
      <Header firstName={"J"} />
      <section
        style={{ height: "100vh", marginLeft: "20%", marginRight: "20%" }}
      >
        <div className="container">
          <p>
            Welcome, Dr. {doctor.firstName} {doctor.lastName}!
          </p>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar value={value} onChange={selectDate} />
        </LocalizationProvider>
        <Button
          onClick={() => setShowSlotModal(true)}
          variant="contained"
          color="primary"
        >
          Add Slot
        </Button>
        <SlotsByDay slots={slots} deleteSlot={deleteSlot} />
        {showSlotModal && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Add Slot
            </Typography>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Day"
                type="date"
                name="day"
                value={value?.format("YYYY-MM-DD")}
                onChange={handleSlotFormChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Start Time"
                type="time"
                name="start"
                value={slotForm.start}
                onChange={handleSlotFormChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Time"
                type="time"
                name="end"
                value={slotForm.end}
                onChange={handleSlotFormChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                select
                label="Hospital"
                name="hospitalId"
                value={slotForm.hospitalId}
                onChange={handleSlotFormChange}
                SelectProps={{ native: true }}
              >
                <option value={-1}>Select Hospital</option>
                {hospitals.map((hospital: IHospital) => (
                  <option key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </option>
                ))}
              </TextField>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                addSlot(
                  doctor.id,
                  value?.format("YYYY-MM-DD") ?? "",
                  slotForm.start,
                  slotForm.end,
                  slotForm.hospitalId
                )
              }
            >
              Add Slot
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowSlotModal(false)}
            >
              Cancel
            </Button>
          </Box>
        )}
      </section>
      <Footer />
    </>
  );
};

export default DoctorScheduleV2;
