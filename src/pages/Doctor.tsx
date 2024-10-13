import React, { useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Table,
} from "react-bootstrap";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useLocation } from "react-router-dom";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import profileLogo from "../assets/profile-user.png";
import Footer from "../components/Footer";
import { Appointment } from "../types/Appointments";
import { Patient } from "../types/Patients";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Doctor } from "../types/Doctors";
import doctorSvg from "../assets/doctor.svg";
import hospitalSvg from "../assets/hospital.png";
import doctorBackground from "../assets/healthcare.jpeg";

const localizer = momentLocalizer(moment);

interface IUpcomingAppointment {
  appointments: Appointment[];
  patients: Patient[];
}

const HeaderSection = () => {
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
            MediTech HealthCare{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button variant="outline-primary" style={styles.profileButton}>
                <div style={styles.profileImage}>D</div>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
};


const UpcomingAppointments = (props: IUpcomingAppointment) => {
  const navigate = useNavigate();

  console.log(props);
  
  return (
    <section
      style={{ marginTop: "4rem", marginBottom: "4rem", padding: "2rem" }}
    >
      <h1>Scheduled Appointments</h1>
      {props.appointments.map((appointment: Appointment, index: number) => {

        const patient = props.patients.find(
          (p: Patient) => p.id === appointment.patientId
        );

        return (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{appointment.patientId}</Card.Title>
              <Card.Text>
                <div>
                  <div>
                    Date: {new Date(appointment.startTime).toLocaleDateString()}
                  </div>
                  <div>
                    Symptoms: {appointment.symptoms}
                    Type: {appointment.type}
                    Reason: {appointment.reason}
                  </div>
                </div>
              </Card.Text>
              {/**TODO: pass the patient, appointment and doctor details */}
              <Button
                variant="primary"
                onClick={() => {
                  navigate("/prescription", {
                    state: { appointment, patient }
                  });
                }}
              >
                Start
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </section>
  );
};

const DoctorProfile = (props: any) => {
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
        Welcome Dr. James H!
      </p>
      <div>
        <h3>Actions</h3>
        <Button
          variant="primary"
          className="mb-3"
          onClick={() => props?.setShowCalendar(true)}
        >
          Update Schedule
        </Button>
        <Button variant="secondary" className="mb-3">
          Update Profile
        </Button>
      </div>
    </div>
  );
};

const DoctorComponent = () => {
  const location = useLocation();
  const doctor = location.state as Doctor;

  const [showCalendar, setShowCalendar] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/appointment?doctorId=${doctor.id}`
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

  return (
    <div style={{ paddingLeft: "10rem", paddingRight: "10rem" }}>
      <HeaderSection />
      <DoctorProfile setShowCalendar={setShowCalendar} />
      <UpcomingAppointments appointments={appointments} patients={patients} />
      <Footer />
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
    backgroundColor: "#c8f9fa",
    display: "flex",
    justifyContent: "space-between",
  },
};

export default DoctorComponent;
