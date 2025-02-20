import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IDoctor } from "../../types/Doctors";
import patientSvg from "../../assets/patientCare.png";
import { useLocation } from "react-router-dom";
import { IPatient } from "../../types/Patients";
import { Button as ButtonMUI } from "@mui/material";
import { IHospital } from "../../types/Hospital";
import { Vaccines } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import { ISlot } from "../../types/Slot";
import { HeaderProvider } from "../../context/HeaderContext";
import HeaderV2 from "../../components/HeaderV2";
import FooterV2 from "../../components/FooterV2";
import BookAppointmentModal from "./components/BookAppointmentModal";
import { IProfile } from "../../types/Profile";
import CarouselSection from "./components/CarouselSection";
import ButtonGridSection from "./components/ButtonGridSection";
import QuoteSection from "./components/QuoteSection";
import AppointmentSection from "./components/AppointmentSection";
import { useHospitals } from "./hooks/useHospitals";
import { useAppointments } from "./hooks/useAppointments";
import { useDoctors } from "./hooks/useDoctors";

const Patient = () => {
  const location = useLocation();
  const patient = location.state as IPatient;
  const navigate = useNavigate();

  const [doctorsList, setDoctorsList] = useState<IDoctor[]>([]);
  const appointments = useAppointments(patient.id);
  const doctors = useDoctors();
  const hospitals = useHospitals();
  const [hospital, setHospital] = useState<number>(0);
  const [doctor, setDoctor] = useState<number>(0);
  const [slot, setSlot] = useState<number>(-1);
  const [type, setType] = useState<string>("");
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [reason, setReason] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [slots, setSlots] = useState<ISlot[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const fetchSlots = async () => {
    try {
      const response = await axios.get(
        `${
          process.env.REACT_APP_BACKEND_SERVER_URL
        }/slot/doctor/${doctor}/date/${value?.format("YYYY-MM-DD") ?? ""}`
      );

      setSlots(response.data);
    } catch (error) {
      console.error("Failed to fetch slots:", error);
    }
  };

  const bookAppointment = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/appointment`,
        {
          patientId: patient.id,
          doctorId: doctor,
          hospitalId: hospital,
          startTime: `${value?.format("YYYY-MM-DD")}T${
            slots.find((s) => s.id === slot)?.startTime
          }`,
          endTime: `${value?.format("YYYY-MM-DD")}T${
            slots.find((s) => s.id === slot)?.endTime
          }`,
          type,
          reason,
          symptoms,
        }
      );

      // TODO: This should be handled in the backend
      if (response.status === 200) {
        const slotToBook = slots.find((s) => s.id === slot);
        if (slotToBook) {
          slotToBook.apptStatus = 1;
        }

        const updateResponse = await axios.put(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/slot`,
          slotToBook
        );

        if (updateResponse.status === 200) {
          setOpen(false);
        }
      }
    } catch (error) {
      console.error("Failed to book appointment:", error);
    }
  };

  useEffect(() => {
    if (doctor !== 0) {
      fetchSlots();
    }
  }, [doctor, value]);

  const fetchDoctorsByHospital = async (hospitalId: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/doctor/doctor-hospital?hospitalId=${hospitalId}`
      );

      console.log("Doctors", response.data);

      setDoctorsList(response.data as IDoctor[]);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
  };

  const navigateToProfile = () => {
    navigate("/profile", {
      state: {
        isPatient: true,
        profile: {
          id: patient.id,
          firstName: patient.firstName,
          middleName: patient.middleName,
          lastName: patient.lastName,
          dob: patient.dob.toString(),
          phoneNo: patient.phoneNo,
          address: patient.address,
          age: patient.age,
          email: patient.email,
          password: patient.password,
        } as IProfile,
      },
    });
  };

  const logout = () => {
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <HeaderProvider>
        <HeaderV2 navigateToProfile={navigateToProfile} logout={logout} />
        <CarouselSection />
        <section style={styles.buttonSection}>
          <ButtonMUI
            startIcon={<Vaccines />}
            onClick={() => setOpen(true)}
            variant="contained"
          >
            Book Appointment
          </ButtonMUI>
        </section>
        <BookAppointmentModal
          open={open}
          setOpen={setOpen}
          hospitalList={hospitals}
          doctorsList={doctorsList}
          hospital={hospital}
          setHospital={setHospital}
          doctor={doctor}
          setDoctor={setDoctor}
          slot={slot}
          setSlot={setSlot}
          type={type}
          setType={setType}
          value={value}
          reason={reason}
          setReason={setReason}
          symptoms={symptoms}
          setSymptoms={setSymptoms}
          fetchDoctorsByHospital={fetchDoctorsByHospital}
          fetchSlots={fetchSlots}
          slots={slots}
          bookAppointment={bookAppointment}
          setValue={setValue}
        />
        <AppointmentSection
          patient={patient}
          value={activeTab}
          handleChange={handleChange}
          appointments={appointments}
          doctors={doctors}
          hospitals={hospitals}
        />
        <ButtonGridSection />
        <QuoteSection />
        <FooterV2 />
      </HeaderProvider>
    </div>
  );
};

const styles = {
  page: {
    paddingLeft: "15rem",
    paddingRight: "15rem",
  },
  buttonSection: {
    margin: "2em"
  }
};

export default Patient;
