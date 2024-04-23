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
const doctorId = "802edd67-34eb-439f-bcd6-ccbaf133b163";

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
          <Navbar.Brand style={{ marginLeft: "10px", fontWeight: "bold", fontSize: "20px" }}> Hospital Management System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav> */}
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

const AppointmentRequest = (props: any) => {
  return (
    <section
      style={{ marginTop: "4rem", marginBottom: "4rem", padding: "2rem" }}
    >
      <h1>Appointment Requests</h1>
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Appointment date</th>
            <th>Appointment time</th>
            <th>Issue</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through appointments and render appointment data */}
          {props.appointments.map((appointment: Appointment, index: number) => {
            if (appointment.status === "PENDING") {
              let patient = props.patients.find(
                (p: Patient) => p.id === appointment.patientId
              );
              return (
                <tr key={appointment.id}>
                  <td>{index + 1}</td>
                  <td>
                    {new Date(appointment.scheduledAt).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "long", year: "numeric" }
                    )}
                  </td>
                  <td>
                    {new Date(appointment.scheduledAt).toLocaleTimeString(
                      "en-GB",
                      { hour: "2-digit", minute: "2-digit", hour12: true }
                    )}
                  </td>
                  <td>TODO</td>
                  <td>
                    <Button variant="success" className="mr-2">
                      Accept
                    </Button>
                    <Button variant="danger">Reject</Button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </Table>
    </section>
  );
};

const UpcomingAppointments = (props: any) => {
  const navigate = useNavigate();
  return (
    <section
      style={{ marginTop: "4rem", marginBottom: "4rem", padding: "2rem" }}
    >
      <h1>Scheduled Appointments</h1>
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Appointment date</th>
            <th>Appointment time</th>
            <th>Issue</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through appointments and render appointment data */}
          {props.appointments.map((appointment: any, index: number) => {
            if (appointment.status === "SCHEDULED") {
              let patient = props.patients.find(
                (p: Patient) => p.id === appointment.patientId
              );
              return (
                <tr key={appointment.id}>
                  <td>{index + 1}</td>
                  <td>{patient?.firstName}</td>
                  <td>{patient?.lastName}</td>
                  <td>{patient?.gender}</td>
                  <td>
                    {new Date().getFullYear() -
                      new Date(patient?.dateOfBirth ?? "").getFullYear()}
                  </td>
                  <td>
                    {new Date(appointment.scheduledAt).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "long", year: "numeric" }
                    )}
                  </td>
                  <td>
                    {new Date(appointment.scheduledAt).toLocaleTimeString(
                      "en-GB",
                      { hour: "2-digit", minute: "2-digit", hour12: true }
                    )}
                  </td>
                  <td>TODO</td>
                  <td>
                    <Button
                      variant="success"
                      className="mr-2"
                      onClick={() => {
                        navigate("/prescription", {
                          state: { patient, appointment },
                        });
                      }}
                    >
                      Start
                    </Button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </Table>
    </section>
  );
};



const MyCalendar = (props: any) => {
    const doctorSchedule = props.appointments.map((a: Appointment) => {
        let startDate = new Date(a.scheduledAt);
        let endDate = startDate;
        endDate.setMinutes(startDate.getMinutes() + a.duration);
        return { start: startDate, end: endDate}});
        console.log(doctorSchedule);
  return (<div style={{ padding: "20px" }}>
    <h1>Schedule</h1>
    <Calendar
      localizer={localizer}
      defaultDate={new Date("2024-04-23 10:30:00")}
      defaultView="month"
      events={doctorSchedule}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "50vh" }}
    />
  </div>
  );
};

const DoctorProfile = (props: any) => {
  const navigate = useNavigate();
  return (
    <div style={{ ...styles.profileSection,  }}>
      <p style={{ fontWeight: "bold", fontSize: "20px",width: "40%", height: "40%" }}>Welcome Dr. John Doe !</p>
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
  const [showCalendar, setShowCalendar] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
//   const [doctor, setDoctor] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/appointments?doctorId=${doctorId}`
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/patients`
        );
        setPatients(response.data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };
    // const fetchDoctor = async () => {
    //     try {
    //       const response = await axios.get(
    //         `${process.env.REACT_APP_BACKEND_SERVER_URL}/doctors/${doctorId}`
    //       );
    //       setPatients(response.data);
    //     } catch (error) {
    //       console.error("Failed to fetch patients:", error);
    //     }
    //   };

    fetchAppointments();
    fetchPatients();
    // fetchDoctor();
  }, []);

  return (
    <div style={{paddingLeft: "10rem", paddingRight: "10rem"}} >
      <HeaderSection />
      <DoctorProfile setShowCalendar={setShowCalendar} />
      <MyCalendar appointments={appointments} />
      {/* <PastAppointments /> */}
      <UpcomingAppointments appointments={appointments} patients={patients} />
      <AppointmentRequest appointments={appointments} patients={patients} />
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
