import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Carousel,
  Container,
  Nav,
  Navbar,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import healthCareLogo from "../assets/health-care.svg";
import history from "../assets/history.svg";
import medicine from "../assets/medicine.svg";
import Footer from "../components/Footer";

import wallpaper1 from "../assets/wallpaper-1.jpg";
import wallpaper2 from "../assets/wallpaper-2.jpeg";
import wallpaper3 from "../assets/wallpaper-3.jpg";
import { IAppointment } from "../types/Appointments";
import { IDoctor } from "../types/Doctors";
import patientSvg from "../assets/patientCare.png";
import { useLocation } from "react-router-dom";
import { IPatient } from "../types/Patients";
import { IProfile } from "../types/Profile";

const HeaderSection = (props: {
  firstName: string;
  onSelect: (eventKey: any) => void;
}) => {
  return (
    <section>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Patient Home</Navbar.Brand>
          <img
            src={patientSvg}
            alt="patient"
            style={{ marginLeft: "0px", height: "60px", width: "1" }}
          />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <DropdownButton
                variant="Secondary"
                title={props.firstName[0]}
                onSelect={props.onSelect}
              >
                <Dropdown.Item eventKey={1}>Profile</Dropdown.Item>
                <Dropdown.Item eventKey={1}>Log out</Dropdown.Item>
              </DropdownButton>
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
          <img
            className="d-block w-100"
            src={wallpaper1}
            alt="First slide"
            style={{ height: "500px" }}
          />
          <Carousel.Caption>
            <h3>Health is Wealth</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={wallpaper2}
            alt="Second slide"
            style={{ height: "500px" }}
          />

          <Carousel.Caption>
            <h3>Eating Healthy Cures</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={wallpaper3}
            alt="Third slide"
            style={{ height: "500px" }}
          />
          <Carousel.Caption>
            <h3>We are here to Care</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

const AppointmentSection = () => {
  // State to store appointment data
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);

  useEffect(() => {
    // Function to fetch appointment data from the backend
    const fetchAppointments = async () => {
      try {
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        // Make a GET request to fetch appointment data from the backend
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/doctors`
        );

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
                Dr.{" "}
                {
                  doctors.find((d: IDoctor) => d.id === appointment.doctorId)
                    ?.firstName
                }
              </td>
              <td>
                {new Date(appointment.scheduledAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </td>
              <td>
                {new Date(appointment.scheduledAt).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>
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
            <p> "Let food be thy medicine and medicine be thy food." </p>
            <footer className="blockquote-footer">
              Hippocrates <cite title="Source Title"></cite>
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
  const location = useLocation();
  const patient = location.state as IPatient;
  console.log("location", location.state);

  const navigate = useNavigate();

  useEffect(() => {
    if (!patient) {
      console.warn("Patient data not available, redirecting to home");
      navigate("/home"); // Redirect to a safe page
    }
  }, [patient, navigate]);

  const onSelect = (eventKey: any) => {
    console.log("On Select called");

    if (eventKey === "1") {
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
    }
    if (eventKey === "2"){
      navigate("/")
    }
  };

  return (
    <div style={{ paddingLeft: "15rem", paddingRight: "15rem" }}>
      <HeaderSection firstName={patient.firstName} onSelect={onSelect} />
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
};

export default Patient;
