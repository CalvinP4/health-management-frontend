import { useLocation, useNavigate } from "react-router-dom";
import { IDoctor } from "../../types/Doctors";
import { useEffect, useState } from "react";
import { hospitalMapping, IHospital } from "../../types/Hospital";
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
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  DialogActions,
} from "@mui/material";
import {
  ClockIcon,
  DateCalendar,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { ISlot, Status } from "../../types/Slot";
import { Delete, Edit } from "@mui/icons-material";
import FooterV2 from "../../components/FooterV2";
import { HeaderProvider } from "../../context/HeaderContext";
import HeaderV2 from "../../components/HeaderV2";
import { IProfile } from "../../types/Profile";
import React from "react";

const SlotsByDay = (props: {
  slots: ISlot[];
  deleteSlot: (slotId: number) => void;
}) => {
  return (
    <section
      style={{
        marginTop: "4rem",
        marginBottom: "4rem",
        padding: "2rem",
      }}
    >
      <Box display="flex" flexDirection="column" gap={4}>
        {props.slots.map((slot: ISlot, index: number) => (
          <CardMUI
            variant="outlined"
            key={index}
            sx={{
              boxShadow: 2,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <CardHeader
              sx={{
                bgcolor:
                  slot.apptStatus === Status.Booked
                    ? "success.main"
                    : "grey.300",
                color: slot.apptStatus === Status.Booked ? "white" : "black",
              }}
              titleTypographyProps={{ fontWeight: "bold", fontSize: "1.2rem" }}
              title={hospitalMapping[slot.hospitalId]}
              subheader={dayjs(slot.slotDate).format("DD-MMM-YYYY")}
            />
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <ClockIcon fontSize="small" />
                <Typography variant="body1">
                  {dayjs(slot.startTime, "HH:mm").format("h:mm A")} -{" "}
                  {dayjs(slot.endTime, "HH:mm").format("h:mm A")}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" gap={2}>
                <Tooltip title="Delete Slot">
                  <IconButton
                    onClick={() => props.deleteSlot(slot.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Slot">
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </CardMUI>
        ))}
      </Box>
    </section>
  );
};

interface IScheduleModalProps {
  value: Dayjs | null;
  slotForm: {
    day: string;
    start: string;
    end: string;
    hospitalId: number;
  };
  handleSlotFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hospitals: { id: number; name: string }[];
  addSlot: (
    doctorId: number,
    slotDate: string,
    startTime: string,
    endTime: string,
    hospitalId: number
  ) => void;
  setShowSlotModal: (show: boolean) => void;
  doctor: IDoctor;
}

const ScheduleModal: React.FC<IScheduleModalProps> = (props) => {
  const [errors, setErrors] = React.useState({
    start: false,
    end: false,
    hospitalId: false,
  });

  const validateInputs = (): boolean => {
    const newErrors = {
      start: !props.slotForm.start,
      end: !props.slotForm.end,
      hospitalId: props.slotForm.hospitalId === -1,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleAddSlot = () => {
    if (validateInputs()) {
      props.addSlot(
        props.doctor.id,
        props.value?.format("YYYY-MM-DD") ?? "",
        props.slotForm.start,
        props.slotForm.end,
        props.slotForm.hospitalId
      );
    }
  };

  return (
    <Dialog
      open
      onClose={() => props.setShowSlotModal(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add Slot</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        >
          <TextField
            label="Day"
            type="date"
            name="day"
            value={props.value?.format("YYYY-MM-DD")}
            onChange={props.handleSlotFormChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Start Time"
            type="time"
            name="start"
            value={props.slotForm.start}
            onChange={props.handleSlotFormChange}
            error={errors.start}
            helperText={errors.start ? "Start time is required" : ""}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="End Time"
            type="time"
            name="end"
            value={props.slotForm.end}
            onChange={props.handleSlotFormChange}
            error={errors.end}
            helperText={errors.end ? "End time is required" : ""}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            select
            label="Hospital"
            name="hospitalId"
            value={props.slotForm.hospitalId}
            onChange={props.handleSlotFormChange}
            error={errors.hospitalId}
            helperText={errors.hospitalId ? "Please select a hospital" : ""}
            fullWidth
          >
            <MenuItem value={-1}>Select Hospital</MenuItem>
            {props.hospitals.map((hospital) => (
              <MenuItem key={hospital.id} value={hospital.id}>
                {hospital.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddSlot}
          sx={{ textTransform: "none" }}
        >
          Add Slot
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => props.setShowSlotModal(false)}
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};


const DoctorScheduleV2 = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
    console.log("Deleting slot: ", slot);

    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/slot/${slot}`
    );

    if (response.status === 200) {
      const newSlots = slots.filter((s) => s.id !== slot);
      setSlots(newSlots);
    }
  };

  const navigateToProfile = () => {
    navigate("/profile", {
      state: {
        isPatient: false,
        profile: {
          id: doctor.id,
          firstName: doctor.firstName,
          middleName: doctor.middleName,
          lastName: doctor.lastName,
          dob: doctor.dob.toString(),
          phoneNo: doctor.phoneNo,
          address: doctor.address,
          age: doctor.age,
          email: doctor.email,
          password: doctor.password,
        } as IProfile,
      },
    });
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
      console.log("New slot: ", newSlot);
      
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
    <div style={{ paddingLeft: "10rem", paddingRight: "10rem" }}>
      <HeaderProvider>
        <HeaderV2
          navigateToProfile={navigateToProfile}
          logout={() => {
            navigate("/");
          }}
        />
        <section
          style={{ marginLeft: "20%", marginRight: "20%" }}
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
            <ScheduleModal
              value={value}
              slotForm={slotForm}
              handleSlotFormChange={handleSlotFormChange}
              hospitals={hospitals}
              addSlot={addSlot}
              setShowSlotModal={setShowSlotModal}
              doctor={doctor}
            />
          )}
        </section>
        <FooterV2 />
      </HeaderProvider>
    </div>
  );
};

export default DoctorScheduleV2;
