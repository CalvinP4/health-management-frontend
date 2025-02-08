import { useState } from "react";
import {
  Button,
  Card,
  Container,
  Nav,
  Navbar,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useLocation } from "react-router-dom";

import {
  Box,
  Button as ButtonMUI,
  Typography,
  Card as CardMUI,
  CardHeader,
  CardContent,
  Grid2,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { IAppointment } from "../types/Appointments";
import { IPatient } from "../types/Patients";
import { useEffect } from "react";
import axios from "axios";
import { IDoctor } from "../types/Doctors";
import hospitalSvg from "../assets/hospital.png";
import { IProfile } from "../types/Profile";
import {
  AccountBox,
  DeviceThermostat,
  LocationCity,
  LocationCityOutlined,
  LocationCitySharp,
  MedicalInformation,
  Notes,
  Place,
  Schedule,
} from "@mui/icons-material";
import { HeaderProvider } from "../context/HeaderContext";
import HeaderV2 from "../components/HeaderV2";
import FooterV2 from "../components/FooterV2";

interface IUpcomingAppointment {
  appointments: IAppointment[];
  patients: IPatient[];
  doctor: IDoctor;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const HeaderSection = (props: {
  doctor: IDoctor;
  onSelect: (eventKey: any) => void;
}) => {
  return (
    <section>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <img
            src={hospitalSvg}
            alt="Doctor"
            style={{ marginLeft: "10px", height: "40px", width: "auto" }}
          />
          <Navbar.Brand
            style={{ marginLeft: "10px", fontWeight: "bold", fontSize: "20px" }}
          >
            {" "}
            MediTech HealthCare
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <DropdownButton
                onSelect={props.onSelect}
                variant="Secondary"
                title={props.doctor.firstName[0]}
                style={{
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  padding: 0,
                }}
              >
                <Dropdown.Item eventKey={1}>Profile</Dropdown.Item>
                <Dropdown.Item eventKey={2}>Log out</Dropdown.Item>
              </DropdownButton>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
};

const UpcomingAppointmentsV2 = (props: IUpcomingAppointment) => {
  const navigate = useNavigate();

  return (
    <section
      style={{ marginTop: "4rem", marginBottom: "4rem", padding: "2rem" }}
    >
      <Typography variant="h4">Scheduled Appointments</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2em",
          paddingLeft: "35%",
          paddingRight: "35%",
        }}
      >
        {props.appointments.map((appointment: IAppointment, index: number) => {
          const patient = props.patients.find(
            (p: IPatient) => p.id === appointment.patientId
          );

          return (
            <Card>
              <Card.Body>
                <Card.Title>
                  {patient?.firstName + " " + patient?.lastName}
                </Card.Title>
                <Card.Text>
                  <div>
                    <div>
                      Date:{" "}
                      {new Date(appointment.startTime).toLocaleDateString()}
                    </div>
                    <div>
                      <div>Symptoms: {appointment.symptoms}</div>
                      <div>Type: {appointment.type}</div>
                      <div>Reason: {appointment.reason}</div>
                    </div>
                  </div>
                </Card.Text>
                {/**TODO: pass the patient, appointment and doctor details */}
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate("/prescription", {
                      state: { appointment, patient, doctor: props.doctor },
                    });
                  }}
                >
                  Start
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

const UpcomingAppointments = (props: IUpcomingAppointment) => {
  const navigate = useNavigate();

  return (
    <section
      style={{ marginTop: "4rem", marginBottom: "4rem", padding: "2rem" }}
    >
      <Typography variant="h4">Scheduled Appointments</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2em",
          paddingLeft: "35%",
          paddingRight: "35%",
        }}
      >
        {props.appointments.map((appointment: IAppointment, index: number) => {
          const patient = props.patients.find(
            (p: IPatient) => p.id === appointment.patientId
          );

          return (
            <CardMUI>
              <CardContent>
                <div
                  style={{ display: "flex", gap: "1em", marginBottom: "4px" }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={require("../assets/trump.jpg")}
                  />
                  <Typography variant="h5">
                    {patient?.firstName + " " + patient?.lastName}
                  </Typography>
                </div>
                <div style={{ display: "flex", gap: "1em" }}>
                  <Place />
                  {appointment.hospitalId}
                </div>
                <div style={{ display: "flex", gap: "1em" }}>
                  <DeviceThermostat />
                  {appointment.type}
                </div>
                <div style={{ display: "flex", gap: "1em" }}>
                  <Notes />
                  {appointment.reason}
                </div>
                <div style={{ display: "flex", gap: "1em" }}>
                  <MedicalInformation />
                  {appointment.symptoms}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "4px",
                  }}
                >
                  <ButtonMUI
                    variant="contained"
                    onClick={() => {
                      navigate("/prescription", {
                        state: { appointment, patient, doctor: props.doctor },
                      });
                    }}
                  >
                    Start
                  </ButtonMUI>
                </div>
              </CardContent>
            </CardMUI>
          );
        })}
      </div>
    </section>
  );
};

const DoctorProfile = (props: { doctor: IDoctor }) => {
  const navigate = useNavigate();
  return (
    <div style={{ ...styles.profileSection }}>
      <p
        style={{
          fontWeight: "bold",
          fontSize: "20px",
          width: "40%",
          height: "40%",
        }}
      >
        Welcome Dr. {props.doctor.firstName} {props.doctor.lastName}
      </p>
      <div>
        <h3>Actions</h3>
        <ButtonMUI
          variant="contained"
          onClick={() => {
            navigate("/doctor-schedule", { state: props.doctor });
          }}
          startIcon={<Schedule />}
        >
          Schedule
        </ButtonMUI>
        <ButtonMUI
          sx={{ marginLeft: 2 }}
          variant="contained"
          onClick={() => {
            console.log("Update Profile");
          }}
          startIcon={<AccountBox />}
        >
          Profile
        </ButtonMUI>
      </div>
    </div>
  );
};

const DoctorComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctor = location.state as IDoctor;

  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [patients, setPatients] = useState<IPatient[]>([]);


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
  }

  const onSelect = (eventKey: any) => {
    console.log("On Select called");

    if (eventKey === "1") {
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
    }
    if (eventKey === "2") {
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        console.log("Fetching appointments for doctor:", doctor.id);

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/appointment/doctor/${doctor.id}`
        );

        setAppointments(response.data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

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

    fetchAppointments();
    fetchPatients();
  }, []);

  const logout = () => { 
    navigate("/");
  }

  return (
    <div style={{ paddingLeft: "10rem", paddingRight: "10rem" }}>
      <HeaderProvider>
        <HeaderV2 navigateToProfile={navigateToProfile} logout={logout}/>
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
  profileButton: {
    borderRadius: "50%",
    width: 40,
    height: 40,
    padding: 0,
    oveflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "50%",
  },
  buttonGrid: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "50px",
  },
  imageButton: {
    borderRadius: "50%",
    padding: "10px",
    overflow: "hidden",
  },
  image: {
    borderRadius: "50",
    width: "100px",
    height: "100px",
  },
  buttonSection: {
    padding: "20px",
  },
  profileSection: {
    padding: "20px",
    backgroundColor: "#d1d1d1",
    display: "flex",
    justifyContent: "space-between",
  },
};

export default DoctorComponent;
