import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IPatient } from "../../types/Patients";
import { useEffect } from "react";
import axios from "axios";
import { IDoctor } from "../../types/Doctors";
import { IProfile } from "../../types/Profile";
import { HeaderProvider } from "../../context/HeaderContext";
import HeaderV2 from "../../components/HeaderV2";
import FooterV2 from "../../components/FooterV2";
import DoctorProfile from "./components/DoctorProfile";
import UpcomingAppointments from "./components/UpcomingAppointments";
import { useAppointments } from "./hooks/useAppointments";

const DoctorComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [patients, setPatients] = useState<IPatient[]>([]);
  const [doctor, setDoctor] = useState<IDoctor | null>(
    (location.state as IDoctor) || null
  );
  const appointments = useAppointments(doctor?.id || 0);

  useEffect(() => {
    if (!doctor) {
      console.error("Doctor state is undefined, redirecting...");
      return;
    }
  }, [doctor, navigate]);

  const navigateToProfile = () => {
    navigate("/profile", {
      state: {
        isPatient: false,
        profile: {
          id: doctor?.id,
          firstName: doctor?.firstName,
          middleName: doctor?.middleName,
          lastName: doctor?.lastName,
          dob: doctor?.dob.toString(),
          phoneNo: doctor?.phoneNo,
          address: doctor?.address,
          age: doctor?.age,
          email: doctor?.email,
          password: doctor?.password, // TODO: Remove this. Security issue.
        } as IProfile,
      },
    });
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/patient`
        );
        setPatients(response.data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };

    fetchPatients();
  }, [doctor]);

  const logout = () => {
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <HeaderProvider>
        <HeaderV2 navigateToProfile={navigateToProfile} logout={logout} />
        <DoctorProfile doctor={doctor} />
        <UpcomingAppointments
          appointments={appointments}
          patients={patients}
          doctor={doctor}
        />
        <FooterV2 />
      </HeaderProvider>
    </div>
  );
};

const styles = {
  page: {
    paddingLeft: "10rem",
    paddingRight: "10rem",
  },
};

export default DoctorComponent;
