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
import Footer from "../../components/Footer";

import wallpaper1 from "../../assets/wallpaper-1.jpg";
import wallpaper2 from "../../assets/wallpaper-2.jpeg";
import wallpaper3 from "../../assets/wallpaper-3.jpg";
import { IAppointment } from "../../types/Appointments";
import { IDoctor } from "../../types/Doctors";
import patientSvg from "../../assets/patientCare.png";
import { useLocation } from "react-router-dom";
import { IPatient } from "../../types/Patients";
import { IProfile } from "../../types/Profile";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button as ButtonMUI,
  IconButton,
  Modal,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { IHospital } from "../../types/Hospital";
import {
  MedicalServices,
  Medication,
  Today,
  Vaccines,
} from "@mui/icons-material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
                <Dropdown.Item eventKey={1}>Sign out</Dropdown.Item>
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

const AppointmentSection = (props: { patient: IPatient }) => {
  // State to store appointment data
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [hospitals, setHospitals] = useState<IHospital[]>([]);

  console.log("Patient", props.patient);

  useEffect(() => {
    // Function to fetch appointment data from the backend
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/appointment?patientId=${props.patient.id}`
        );

        setAppointments(response.data);

        console.log("Appointments", response.data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    const fetchHospitals = async () => {
      try {
        // Make a GET request to fetch appointment data from the backend
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/hospital`
        );

        console.log("Hospitals", response.data);

        // Set the fetched appointment data in the state
        setHospitals(response.data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        // Make a GET request to fetch appointment data from the backend
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/doctor`
        );

        console.log("Doctors", response.data);

        // Set the fetched appointment data in the state
        setDoctors(response.data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    // Call the fetchAppointments function when the component mounts
    fetchAppointments();
    fetchDoctors();
    fetchHospitals();
  }, []);

  return (
    <section>
      <Typography variant="h3">Upcoming Appointments</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Doctor</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Hospital</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Date</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Time</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Type</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Reason</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => {
              const startTime = new Date(appointment.startTime);
              const doctor = doctors.find(
                (doctor) => doctor.id === appointment.doctorId
              ) as IDoctor;
              const hospital = hospitals.find(
                (hospital) => hospital.id === appointment.hospitalId
              ) as IHospital;

              return (
                <TableRow
                  key={appointment.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {doctor?.firstName + " " + doctor?.lastName}
                  </TableCell>
                  <TableCell>{hospital?.name}</TableCell>
                  <TableCell>{startTime.toLocaleDateString()}</TableCell>
                  <TableCell>{startTime.toLocaleTimeString()}</TableCell>
                  <TableCell>{appointment.type}</TableCell>
                  <TableCell>{appointment.reason}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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
        <IconButton sx={{ fontSize: 80 }}>
          <MedicalServices fontSize="inherit" />
        </IconButton>
        <IconButton sx={{ fontSize: 80 }}>
          <Medication fontSize="inherit" />
        </IconButton>
        <IconButton sx={{ fontSize: 80 }}>
          <Today fontSize="inherit" />
        </IconButton>
      </div>
    </section>
  );
};

const Patient = () => {
  const location = useLocation();
  const patient = location.state as IPatient;

  const [hospital, setHospital] = useState<number>(0);
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-17"));
  const [open, setOpen] = React.useState(false);

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
  };

  return (
    <div style={{ paddingLeft: "15rem", paddingRight: "15rem" }}>
      <HeaderSection firstName={patient.firstName} onSelect={onSelect} />
      <CarouselSection />
      <section style={{ margin: "2em" }}>
        <ButtonMUI
          startIcon={<Vaccines />}
          onClick={() => setOpen(true)}
          variant="contained"
        >
          Book Appointment
        </ButtonMUI>
      </section>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box
          component="form"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Book Appointment</Typography>
            <IconButton onClick={() => {
                setOpen(false);
              }}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <TextField
            id="outlined-basic"
            label="Reason"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="symptoms"
            label="Symptoms"
            variant="outlined"
            fullWidth
            multiline
            maxRows={4}
          />
          <FormControl>
            <InputLabel>Hospital</InputLabel>
            <Select
              value={hospital}
              onChange={(e) => setHospital(e.target.value as number)}
              label="Hospital"
            >
              <MenuItem value={1}>General Hospital</MenuItem>
              <MenuItem value={2}>Sacred Heart Hospial</MenuItem>
              <MenuItem value={2}>Mecklenberg county Hospital</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Doctor</InputLabel>
            <Select
              value={hospital}
              onChange={(e) => setHospital(e.target.value as number)}
              label="Doctor"
            >
              <MenuItem value={1}>General Hospital</MenuItem>
              <MenuItem value={2}>Sacred Heart Hospial</MenuItem>
              <MenuItem value={2}>Mecklenberg county Hospital</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Uncontrolled picker"
              defaultValue={dayjs("2022-04-17")}
            />
          </LocalizationProvider>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <ButtonMUI variant="contained">Book</ButtonMUI>
            <ButtonMUI
              variant="outlined"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </ButtonMUI>
          </Box>
        </Box>
      </Modal>
      <AppointmentSection patient={patient} />
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
