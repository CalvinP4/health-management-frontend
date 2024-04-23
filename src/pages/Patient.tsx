import React, { useEffect, useState } from "react";
import axios from "axios";
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

import profileLogo from "../assets/profile-user.png";
import healthCareLogo from "../assets/health-care.svg";
import history from "../assets/history.svg";
import medicine from "../assets/medicine.svg";
import Footer from "../components/Footer";

import wallpaper1 from "../assets/wallpaper-1.jpg";
import wallpaper2 from "../assets/wallpaper-2.jpeg";
import wallpaper3 from "../assets/wallpaper-3.jpg";
import { Appointment } from "../types/Appointments";
import { Doctor } from "../types/Doctors";

// TODO: Needs to be fetched dynamically after logging in
const patientId = "bfe6db61-940e-4b86-9cc5-8870da49f033";

const HeaderSection = () => {
  return (
    <section>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Patient</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <NavDropdown title="Appointments" id="appointment-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Past Appointments
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Book Appointment
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Pharmacy" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Past Purchases
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Store</NavDropdown.Item>
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

const CarouselSection = () => {
  return (
    <section>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={wallpaper1} alt="First slide" style={{height: '500px'}} />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={wallpaper2} alt="Second slide" style={{height: '500px'}} />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={wallpaper3} alt="Third slide" style={{height: '500px'}} />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

const AppointmentSection = () => {
  // State to store appointment data
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    // Function to fetch appointment data from the backend
    const fetchAppointments = async () => {
      try {
        // Make a GET request to fetch appointment data from the backend
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/appointments?patientId=${patientId}`
        );

        // Set the fetched appointment data in the state
        setAppointments(response.data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        // Make a GET request to fetch appointment data from the backend
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/doctors`);

        // Set the fetched appointment data in the state
        setDoctors(response.data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    // Call the fetchAppointments function when the component mounts
    fetchAppointments();
    fetchDoctors();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  console.log(appointments);
  console.log(doctors);
  return (
    <section>
      <h3>Upcoming Appointments</h3>
      <table className="table table-striped table-bordered table-hover table-responsive-sm">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through appointments and render appointment data */}
          {appointments.map((appointment: any) => (
            <tr key={appointment.id}>
              <td>
                Dr. {doctors.find((d: Doctor) => d.id === appointment.doctorId)?.name}
              </td>
              <td>{new Date(appointment.scheduledAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
              <td>{new Date(appointment.scheduledAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
              <td>{appointment.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

const QuoteSection = () => {
  return (
    <section style={{ padding: "20px" }}>
      <Card>
        <Card.Header>Quote</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.{" "}
            </p>
            <footer className="blockquote-footer">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
    </section>
  );
};

const ButtonGridSection = () => {
  return (
    <section style={styles.buttonSection}>
      <h3>Explore our services</h3>
      <div style={styles.buttonGrid}>
        <Button style={styles.imageButton}>
          <img src={healthCareLogo} alt="Image 1" style={styles.image} />
        </Button>
        <Button style={styles.imageButton}>
          <img src={medicine} alt="Image 2" style={styles.image} />
        </Button>
        <Button style={styles.imageButton}>
          <img src={history} alt="Image 3" style={styles.image} />
        </Button>
      </div>
    </section>
  );
};

const Patient = () => {
  return (
    <div style={{paddingLeft: "15rem", paddingRight: "15rem"}}>
      <HeaderSection />
      <CarouselSection />
      <AppointmentSection />
      <ButtonGridSection />
      <QuoteSection />
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
};

export default Patient;
