import { useLocation, useNavigate } from "react-router-dom";
import { IDoctor } from "../../types/Doctors";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card as CardMUI } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { ISlot } from "../../types/Slot";
import FooterV2 from "../../components/FooterV2";
import { HeaderProvider } from "../../context/HeaderContext";
import HeaderV2 from "../../components/HeaderV2";
import { IProfile } from "../../types/Profile";
import ScheduleModal from "./components/ScheduleModal";
import SlotsByDay from "./components/SlotsByDay";
import { IHospital } from "../../types/Hospital";

const DoctorScheduleV2 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState<IDoctor>(
    (location.state as IDoctor) || {
      id: 0,
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      phoneNo: "",
      address: "",
      age: 0,
      email: "",
      password: "",
      specialization: "",
      licensedYear: 0,
      licensedBy: "",
      schedule: [],
      rating: 0,
    }
  );

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
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/hospital`
        );
        setHospitals(response.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospital();
  }, []);

  const deleteSlot = async (slot: number) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/slot/${slot}`
      );

      if (response.status === 200) {
        setSlots((prevSlots) => prevSlots.filter((s) => s.id !== slot));
      }
    } catch (error) {
      console.error("Error deleting slot:", error);
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
    try {
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
  
      if (response.status === 200) {
        setShowSlotModal(false);
        console.log(response.data);
        
        setSlots((prevSlots) => [...prevSlots, response.data]);
      }
    } catch (error) {
      console.error("Error adding slot:", error);
    }
  };
  

  const selectDate = async (value: any) => {
    setValue(value);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/slot/doctor/${
          doctor.id
        }/date/${value.format("YYYY-MM-DD")}`
      );
      setSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots for selected date:", error);
    }
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
        <section style={{ marginLeft: "20%", marginRight: "20%" }}>
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
