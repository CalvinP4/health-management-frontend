import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Button, Container, Nav, Navbar, DropdownButton, Dropdown } from "react-bootstrap";
import hospitalSvg from "../assets/hospital.png";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { IPatient } from "../types/Patients";
import { IAppointment } from "../types/Appointments";
import axios from "axios";
import { IDoctor } from "../types/Doctors";

const HeaderSection = (props: {doctor: IDoctor}) => {
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
                variant="Secondary"
                title={props.doctor.firstName[0]}
                style={{ borderRadius: "50%", width: "40px", height: "40px", padding: 0 }}
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

const PatientDetailSection = (props: any) => {
  //   debugger;
  return (
    <section style={{ padding: "1em" }}>
      <Row className="d-flex align-items-stretch">
        <Col sm={6}>
          <PatientCard patient={props.patient} />
        </Col>
        <Col sm={6}>
          <Row>
            <AppointmentCard appointment={props.appointment} />
          </Row>
          <Row>
            <SearchCard />
          </Row>
        </Col>
      </Row>
    </section>
  );
};

const PatientCard = (props: any) => {
  const patient: IPatient = props.patient;
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
              new Date(patient?.dob ?? "").getFullYear()}
          </p>
          <p>ID: {patient.id}</p>
          <hr />
          <h6>Vitals</h6>
          {/* {patient.history?.map((v: { key: string; value: string }) => {
            return (
              <p>
                {v.key} : {v.value}
              </p>
            );
          })} */}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const AppointmentCard = (props: any) => {
  //   debugger;
  //   console.log(appointmentInput);
  const appointment: IAppointment = props.appointment;
  return (
    <Card className="shadow">
      <Card.Header>Appointment</Card.Header>
      <Card.Body>
        <Card.Text>
          <p>
            Date & Time:{" "}
            {new Date(appointment.endTime).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            {new Date(appointment.startTime).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <p>Location: {appointment.hospitalId}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const PrescriptionCard = (props: any) => {
  return (
    <Card className="shadow">
      <Card.Header>Notes</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              value={props.text}
              onChange={(e) => {
                props.setText(e.target.value);
                
              }}
              onKeyPress={(e) => {
                console.log("Key pressed", e.key);
                
                props.setEvent(e.key);
              }}
              rows={20}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

const SuggestionsCard = (props: any) => {
  console.log("SuggestionsCard", props.event);

  const callApi = async () => { 
    try {
      let myPrompt =
        'You are Dr. Mini, a highly respected doctor with expertise in all medical fields, including pediatrics, internal medicine, oncology, and more. You are known for your meticulous attention to detail and ability to offer constructive feedback to other healthcare professionals. You are now reviewing a patient\'s recent visit to another doctor. Below you will find the patient\'s vital statistics, diagnosis, and visit notes. Please carefully review and give the doctor your dignosis, give ICD codes, if any, suggestions, if any, also point out the mistakes from the other doctors notes and return the response into an array of JSON objects in this format [{"type": "diagnosis", "description": ""},...{"type": "suggestion", "description": ""}] ';
      let patientInfo: string =
        "Patient info - Age: " +
        (
          new Date().getFullYear() -
          new Date(props.patient?.dateOfBirth ?? "").getFullYear()
        ).toString();
      patientInfo = " complaints: " + props.appointment.reason.toString();
      let vitalsString: string = " Vitals - ";
      props.patient.vitals.forEach((item: { key: string; value: string }) => {
        vitalsString +=
          " " + item.key.toString() + " :" + item.value.toString();
      });
      myPrompt += patientInfo + vitalsString;
      // if (props.patient.id === 'c55d4b92-a109-4ecd-89ea-140375520bf1') {
      //   myPrompt.
      // }
      console.log("text" + props.text);
      if (props.text) {
        myPrompt += " " + props.text.toString();
      }

      console.log(myPrompt);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/generate`,
        {
          prompt: myPrompt,
        }
      );
      setSuggestions(JSON.parse(response.data.message.content));
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  }
  if (props.event === '.') {
    callApi();
    props.setEvent("");
  }

  
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        let myPrompt =
          'You are Dr. Mini, a highly respected doctor with expertise in all medical fields, including pediatrics, internal medicine, oncology, and more. You are known for your meticulous attention to detail and ability to offer constructive feedback to other healthcare professionals. You are now reviewing a patient\'s recent visit to another doctor. Below you will find the patient\'s vital statistics, diagnosis, and visit notes. Please carefully review and give the doctor your dignosis, give ICD codes, if any, suggestions, if any, into an array of JSON objects in this format [{"type": "diagnosis", "description": ""},...{"type": "suggestion", "description": ""}] ';
        let patientInfo: string =
          "Patient info - Age: " +
          (
            new Date().getFullYear() -
            new Date(props.patient?.dateOfBirth ?? "").getFullYear()
          ).toString();
        patientInfo = " complaints: " + props.appointment.reason.toString();
        let vitalsString: string = " Vitals - ";
        props.patient.vitals.forEach((item: { key: string; value: string }) => {
          vitalsString +=
            " " + item.key.toString() + " :" + item.value.toString();
        });
        myPrompt += patientInfo + vitalsString;
        // if (props.patient.id === 'c55d4b92-a109-4ecd-89ea-140375520bf1') {
        //   myPrompt.
        // }
        console.log("text" + props.text);
        if (props.text) {
          myPrompt += props.text.toString();
        }

        console.log(myPrompt);
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/generate`,
          {
            prompt: myPrompt,
          }
        );
        setSuggestions(JSON.parse(response.data.message.content));
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };
    // if (props.event === '.') {
      fetchSuggestions();
    // }
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
                <Button
                  variant="primary"
                  style={{ marginRight: "10px" }}
                  onClick={() =>
                    props.setText(props.text + "\n" + suggestion.description)
                  }
                >
                  Accept
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleDecline(index)}
                >
                  Decline
                </Button>
              </div>
            </div>
          )
        )}
      </Card.Body>
    </Card>
  );
};

const SearchCard = (props: any) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "Enter") {
        const fetchSearchResults = async () => {
          try {
            setLoading(true);
            const response = await axios.post(
              `${process.env.REACT_APP_BACKEND_SERVER_URL}/generate`,
              {
                prompt: searchInput,
              }
            );
            setSearchResults(response.data.message.content);
          } catch (error) {
            console.error("Failed to fetch appointments:", error);
          } finally {
            setLoading(false);
          }
        };

        fetchSearchResults();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [searchInput]);

  const handleChange = (event: any) => {
    setSearchInput(event.target.value);
  };

  return (
    <Card className="shadow">
      <Card.Body>
        <Form.Control
          type="text"
          value={searchInput}
          onChange={handleChange}
          placeholder="Ask me anything..."
        />
        {loading ? (
          <p>
            <hr />
            Generating response...
          </p>
        ) : (
          <p>
            <hr />
            {searchResults}
          </p>
        )}
      </Card.Body>
    </Card>
  );
};

const NotesSection = (props: any) => {
  return (
    <section style={{ padding: "1em" }}>
      <Row className="d-flex align-items-stretch">
        <Col sm={6}>
          <PrescriptionCard
            text={props.text}
            setText={props.setText}
            event={props.event}
            setEvent={props.setEvent}
          />
        </Col>
        <Col sm={6}>
          <SuggestionsCard
            text={props.text}
            patient={props.patient}
            appointment={props.appointment}
            setText={props.setText}
            event={props.event}
            setEvent={props.setEvent}
          />
        </Col>
      </Row>
    </section>
  );
};

const Prescription = () => {
  const location = useLocation();
  const doctor = location.state.doctor as IDoctor;
  const patient: IPatient = location.state.patient;
  const appointment: IAppointment = location.state.appointment;

  console.log("state", location.state);
  

  const [text, setText] = useState("");
  const [event, setEvent] = useState("");

  return (
    <div>
      <HeaderSection doctor={doctor} />
      <PatientDetailSection patient={patient} appointment={appointment} />
      <NotesSection
        text={text}
        patient={patient}
        appointment={appointment}
        setText={setText}
        event={event}
        setEvent={setEvent}
      />
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
