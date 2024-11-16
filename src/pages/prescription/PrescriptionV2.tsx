import { Close, LocalHospital } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  CircularProgress,
  Container,
  Grid,
  Grid2,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
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
import { Document, Page, pdfjs } from "react-pdf";
import pdfFile from "../../assets/mock2.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Header = (props: {
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  anchorElUser: HTMLElement | null;
  handleCloseUserMenu: () => void;
  navigateToProfile: () => void;
}) => {
  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar>
          <LocalHospital sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography variant="h6" sx={{ mr: 140 }}>
            MediTech HealthCare
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={props.handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={require("../../assets/trump.jpg")}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={props.anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(props.anchorElUser)}
              onClose={props.handleCloseUserMenu}
            >
              <MenuItem key="profile" onClick={props.navigateToProfile}>
                <Typography sx={{ textAlign: "center" }}>Profile</Typography>
              </MenuItem>
              <MenuItem key="logout">
                <Typography sx={{ textAlign: "center" }}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const Footer = () => {
  return (
    <footer>
      <Box sx={{ backgroundColor: "#e9e9e9", padding: "1em" }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Typography variant="h5">About Us</Typography>
              <Typography>
                Making Healthcare Better Together - MediTech Crushers
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h5">Quick Links</Typography>
              <ul>
                <li>
                  <Link href="#">Services</Link>
                </li>
                <li>
                  <Link href="#">About Us</Link>
                </li>
                <li>
                  <Link href="#">Connect with us</Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h5">Contact Us</Typography>
              <Typography>123 Main Street, Anytown, USA</Typography>
              <Typography>Email: info@meditech.com</Typography>
              <Typography>Phone: (123) 456-7890</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h5">Follow Us</Typography>
              <ul>
                <li>
                  <Link href="#">
                    Facebook<i className="fab fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    Twitter<i className="fab fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    Instagram<i className="fab fa-instagram"></i>
                  </Link>
                </li>
              </ul>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <Typography variant="body2" color="textSecondary" align="center">
              Copyright &copy; 2024 MediTech solutions
            </Typography>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

const PrescriptionV2 = () => {
  const [activeHistoryTab, setActiveHistoryTab] = React.useState(0);
  const [activeNotesTab, setActiveNotesTab] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [isTestModalOpen, setIsTestModalOpen] = React.useState(false);
  const [bloodReport, setBloodReport] = React.useState("");
  
  const [numPages, setNumPages] = React.useState<number>();
  const [pageNumber, setPageNumber] = React.useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

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

  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state.doctor as IDoctor;
  const patient: IPatient = location.state.patient;
  const appointment: IAppointment = location.state.appointment;

  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   const response = await axios.get(
      //     `http://localhost:8000/get-history${patient.id}`
      //   );
      //   console.log("Data fetched:", response);

      //   setDescription(response.data.response);
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      // }
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <Header
          handleOpenUserMenu={handleOpenUserMenu}
          handleCloseUserMenu={handleCloseUserMenu}
          anchorElUser={anchorElUser}
          navigateToProfile={navigateToProfile}
        />
      </div>
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
            <NotesTab value={activeNotesTab} handleChange={handleChange2} />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button variant="primary">Save</Button>
            </Box>
          </Grid2>
          <Grid2 size={3}>
            <ChatGPTCard />
            <TestHistoryCard openModal={handleOpenTestModal} />
          </Grid2>
        </Grid2>
        <Modal
          open={isTestModalOpen}
          onClose={handleCloseTestModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 750,
              height: 700,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              overflow: "auto",
            }}
          >
            <Stack
              direction="row"
              useFlexGap
              sx={{ flexWrap: "wrap", gap: 57 }}
            >
              <Typography variant="h6">Test History</Typography>
              <IconButton onClick={handleCloseTestModal}>
                <Close />
              </IconButton>
            </Stack>
            <Document
              file={pdfFile}
              onLoadSuccess={onDocumentLoadSuccess}
              className={
                "h-screen overflow-y-auto flex justify-center  flex-1 "
              }
            >
              <Page
                className="pdf-page relative mx-20 z-0 "
                pageNumber={1}
                width={650}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>

            <Box sx={{marginTop: 2, outline: "1px solid #000", padding: 1}}>
              <Typography variant="h5">Summary Insights</Typography>
              <Typography>
                {bloodReport ? <span dangerouslySetInnerHTML={{ __html: bloodReport }} /> : <CircularProgress />}
              </Typography>
            </Box>
          </Box>
        </Modal>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default PrescriptionV2;
