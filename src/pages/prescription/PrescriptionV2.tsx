import { LocalHospital, Medication, Mic, Notes } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  Grid2,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
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

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveHistoryTab(newValue);
  };

  const handleChange2 = (event: React.SyntheticEvent, newValue: number) => {
    setActiveNotesTab(newValue);
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state.doctor as IDoctor;
  const patient: IPatient = location.state.patient;
  const appointment: IAppointment = location.state.appointment;

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
    <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
      <div>
        <Header
          handleOpenUserMenu={handleOpenUserMenu}
          handleCloseUserMenu={handleCloseUserMenu}
          anchorElUser={anchorElUser}
          navigateToProfile={navigateToProfile}
        />
      </div>
      <div style={{ height: "80vh", overflowY: "scroll", padding: "4rem" }}>
        <Grid2 container spacing={2}>
          <Grid2 size={3}>
            <PatientDetailsCard patient={patient} />
            <SymptomsBox symptoms={appointment.symptoms} />
          </Grid2>
          <Grid2 size={6}>
            <PatientHistoryTabs
              value={activeHistoryTab}
              handleChange={handleChange}
            />
            <NotesTab value={activeNotesTab} handleChange={handleChange2} />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button variant="primary">Save</Button>
            </Box>
          </Grid2>
          <Grid2 size={3}>
            <ChatGPTCard />
            <TestHistoryCard />
          </Grid2>
        </Grid2>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default PrescriptionV2;
