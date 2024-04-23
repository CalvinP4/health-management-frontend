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

const localizer = momentLocalizer(moment);
const doctorId = "802edd67-34eb-439f-bcd6-ccbaf133b163";

const HeaderSection = () => {
  return (
    <section>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Doctor</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <NavDropdown title="Appointments" id="appointment-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Past Appointments
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Book Slot
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Pharmacy" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Appointment History
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Past Appointments
                </NavDropdown.Item>
              </NavDropdown>
              <Button variant="outline-primary" style={styles.profileButton}>
                <img
                  src={profileLogo}
                  alt="Profile"
                  style={styles.profileImage}
                />
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
    <section style={styles.profileSection}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={profileLogo} />
        <Card.Body>
          <Card.Title>Dr. John Doe</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Actions</Card.Title>
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
          <Button variant="secondary">Update Profile</Button>
        </Card.Body>
      </Card>
    </section>
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
    <div>
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
