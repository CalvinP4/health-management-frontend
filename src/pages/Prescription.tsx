import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import profileLogo from "../assets/profile-user.png";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { Patient } from "../types/Patients";
import { Appointment } from "../types/Appointments";
import axios from "axios";

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

const PatientDetailSection = (props: any) => {
  //   debugger;
  return (
    <section style={{ padding: "1em" }}>
      <Row className="d-flex align-items-stretch">
        <Col sm={6}>
          <PatientCard patient={props.patient} />
        </Col>
        <Col sm={6}>
          <AppointmentCard appointment={props.appointment} />
        </Col>
      </Row>
    </section>
  );
};

const PatientCard = (props: any) => {
  const patient: Patient = props.patient;
  return (
    <Card className="shadow">
      <Card.Header>Patient Details</Card.Header>
      <Card.Body>
        {/* <Card.Title>Patient Details</Card.Title> */}
        <Card.Text>
          <p>
            Name: {patient.firstName} {patient.lastName}
          </p>
          <p>
            Age:{" "}
            {new Date().getFullYear() -
              new Date(patient?.dateOfBirth ?? "").getFullYear()}
          </p>
          <p>ID: {patient.id}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const AppointmentCard = (props: any) => {
  //   debugger;
  //   console.log(appointmentInput);
  const appointment: Appointment = props.appointment;
  return (
    <Card className="shadow">
      <Card.Header>Appointment</Card.Header>
      <Card.Body>
        <Card.Title>Appointment Details</Card.Title>
        <Card.Text>
          <p>
            Date:{" "}
            {new Date(appointment.scheduledAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p>
            Time:{" "}
            {new Date(appointment.scheduledAt).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <p>Location: 123 Main St</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const PrescriptionCard = (props:any) => {
  return (
    <Card className="shadow">
      <Card.Header>Notes</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" value={props.text} onChange={(e) => props.setText(e.target.value)} rows={20} />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

const SuggestionsCard = (props:any) => {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/generate`,
          {
            prompt:
              'You are Dr. Mini, a highly respected doctor with expertise in all medical fields, including pediatrics, internal medicine, oncology, and more. You are known for your meticulous attention to detail and ability to offer constructive feedback to other healthcare professionals. You are now reviewing a patient\'s recent visit to another doctor. Below you will find the patient\'s vital statistics, diagnosis, and visit notes. Please carefully review and give the doctor your dignosis, give ICD codes, if any, suggestions, if any, into an array of JSON objects in this format [{"type": "diagnosis", "description": ""},...{"type": "suggestion", "description": ""}] .\nPatient Information:\nAge: 45\nGender: M\nBody Temp: 99.2°F\nBlood Pressure: 160/100 mmHg\nWeight: 85 kg\nHeight: 5ft10in\nOther doctors Visit Notes:\nThe patient presented with persistent headaches and elevated blood pressure. The doctor prescribed 100 mg of amlodipine daily and recommended immediate stress reduction techniques',
          }
        );
        setSuggestions(JSON.parse(response.data.message.content));
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchSuggestions();
    console.log(suggestions);
  }, []);

  const handleDecline = (index: number) => {
    setSuggestions(suggestions.filter((_, i) => i !== index));
  };
  
  return (
    <Card className="shadow">
      <Card.Header>Suggestions</Card.Header>
      <Card.Body>
        {suggestions.map(
          (
            suggestion: { type: string; description: string },
            index: number
          ) => (
            <div key={index}>
              <Card.Text>
                <h4>{suggestion.type}</h4>
                <p>{suggestion.description}</p>
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Button variant="primary" style={{ marginRight: "10px" }} onClick={() => props.setText(props.text+ "\n" + suggestion.description)}>
                  Accept
                </Button>
                <Button variant="secondary" onClick={() => handleDecline(index)}>Decline</Button>
              </div>
            </div>
          )
        )}
      </Card.Body>
    </Card>
  );
};

const NotesSection = (props:any) => {
  return (
    <section style={{ padding: "1em" }}>
      <Row className="d-flex align-items-stretch">
        <Col sm={6}>
          <PrescriptionCard text={props.text} setText={props.setText} />
        </Col>
        <Col sm={6}>
          <SuggestionsCard text={props.text} setText={props.setText} />
        </Col>
      </Row>
    </section>
  );
};

const Prescription = () => {
  const location = useLocation();
  //   console.log("helloooo");
  const patient: Patient = location.state.patient;
  const appointment: Appointment = location.state.appointment;
  //   debugger;
  console.log("Prescription()", appointment);

  const [text, setText] = useState("");

  return (
    <div>
      <HeaderSection />
      <PatientDetailSection patient={patient} appointment={appointment} />
      <NotesSection text={text} setText={setText} />
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
};

export default Prescription;
