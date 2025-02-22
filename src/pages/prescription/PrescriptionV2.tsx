import { LocalHospital } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Grid,
  Grid2,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Button,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IPatient } from "../../types/Patients";
import { IAppointment } from "../../types/Appointments";
import { IDoctor } from "../../types/Doctors";
import { IProfile } from "../../types/Profile";
import PatientDetailsCard from "./components/PatientDetailsCard";
import SymptomsBox from "./components/SymptomsBox";
import PatientHistoryTabs from "./components/PatientHistoryTabs";
import NotesTab from "./components/NotesTab";
import ChatGPTCard from "./components/ChatGPTCard";
import TestHistoryCard from "./components/TestHistoryCard";
import axios from "axios";
import { pdfjs } from "react-pdf";
import pdfFile from "../../assets/mock2.pdf";
import ReportModal from "./components/ReportModal";
import FooterV2 from "../../components/FooterV2";
import { HeaderProvider } from "../../context/HeaderContext";
import HeaderV2 from "../../components/HeaderV2";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;

const PrescriptionV2 = () => {
  const [activeHistoryTab, setActiveHistoryTab] = React.useState(0);
  const [activeNotesTab, setActiveNotesTab] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [isTestModalOpen, setIsTestModalOpen] = React.useState(false);
  const [bloodReport, setBloodReport] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const [numPages, setNumPages] = React.useState<number>();
  const [pageNumber, setPageNumber] = React.useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveHistoryTab(newValue);
  };

  const handleChange2 = (event: React.SyntheticEvent, newValue: number) => {
    setActiveNotesTab(newValue);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenTestModal = async () => {
    setIsTestModalOpen(true);

    // send the PDF file to the backend to get the insights
    const formData = new FormData();
    const blob = await fetch(pdfFile).then((r) => r.blob());
    formData.append("pdf", blob, "mock2.pdf");
    console.log(pdfFile);

    axios
      .post("http://localhost:8000/upload-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setBloodReport(response.data.insights[0].content[0].text.value);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleCloseTestModal = () => {
    setIsTestModalOpen(false);
  };

  const completeAppointment = async () => {
    console.log("Completing appointment", appointment);

    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/appointment/`,
      {
        id: appointment.id,
        doctorId: appointment.doctorId,
        patientId: appointment.patientId,
        hospitalId: appointment.hospitalId,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        type: appointment.type,
        reason: appointment.reason,
        notes: notes,
        symptoms: appointment.symptoms,
        status: "completed",
      } as IAppointment
    );

    if (response.status === 200) {
      console.log("Appointment completed successfully");

      console.log("Redirecting to doctor profile page", doctor);

      // Redirect to the appointments page
      navigate("/doctor", {
        state: doctor,
      });
    }
  };

  const saveNotes = async () => {
    // Save the notes to the database
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/appointment/`,
      {
        id: appointment.id,
        doctorId: appointment.doctorId,
        patientId: appointment.patientId,
        hospitalId: appointment.hospitalId,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        type: appointment.type,
        reason: appointment.reason,
        notes: notes,
        symptoms: appointment.symptoms,
      } as IAppointment
    );

    if (response.status === 200) {
      console.log("Notes saved successfully");
    }
  };

  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state.doctor as IDoctor;
  const patient: IPatient = location.state.patient;
  const appointment: IAppointment = location.state.appointment;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/get-history${patient.id}`
        );
        console.log("Data fetched:", response);

        setDescription(response.data.response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [patient]);

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
  };

  const logout = () => {
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <HeaderProvider>
        <HeaderV2 navigateToProfile={navigateToProfile} logout={logout} />
        <Box
          sx={{
            width: "30%",
            backgroundColor: "#e8f5fe",
            marginTop: 5,
            marginLeft: 1,
            padding: 1,
          }}
        >
          <Grid2>
            <Grid2 size={6}>
              <Typography variant="h6">Hi, Dr. {doctor.firstName}</Typography>
              <Typography>Appointment: 1</Typography>
              <Typography>Location: County general hospital</Typography>
              <Typography>Date: 22-02-2022</Typography>
            </Grid2>
          </Grid2>
        </Box>
        <div style={{ height: "80vh", overflowY: "scroll", padding: "2rem" }}>
          <Grid2 container spacing={2}>
            <Grid2 size={3}>
              <PatientDetailsCard patient={patient} />
              <SymptomsBox symptoms={appointment.symptoms} />
            </Grid2>
            <Grid2 size={6}>
              <PatientHistoryTabs
                value={activeHistoryTab}
                handleChange={handleChange}
                history={description}
              />
              <NotesTab
                value={activeNotesTab}
                handleChange={handleChange2}
                setNotes={setNotes}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                  gap: 2,
                }}
              >
                <Button variant="contained" onClick={() => saveNotes()}>
                  Save
                </Button>

                <Button
                  variant="contained"
                  onClick={() => completeAppointment()}
                >
                  Complete
                </Button>
              </Box>
            </Grid2>
            <Grid2 size={3}>
              <ChatGPTCard />
              <TestHistoryCard openModal={handleOpenTestModal} />
            </Grid2>
          </Grid2>
          <ReportModal
            isTestModalOpen={isTestModalOpen}
            handleCloseTestModal={handleCloseTestModal}
            pdfFile={pdfFile}
            onDocumentLoadSuccess={onDocumentLoadSuccess}
            bloodReport={bloodReport}
          />
        </div>
        <div>
          <FooterV2 />
        </div>
      </HeaderProvider>
    </div>
  );
};

const styles = {
  page: {
    paddingLeft: "15rem",
    paddingRight: "15rem",
  },
  buttonSection: {
    margin: "2em",
  },
};

export default PrescriptionV2;
