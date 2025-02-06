import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e: any) => {
    const { name, value } = e.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [registerForm, setRegisterForm] = useState({
    userType: "Patient",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    password: "",
    speciality: "",
    location: "",
  });

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();

    if (registerForm.userType.toLowerCase() === "patient") {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/patient`
        );
        response.data.forEach((patient: any) => {
          if (
            patient.email === loginForm.email &&
            patient.password === loginForm.password
          ) {
            navigate("/patient", { state: patient });
          }
        });
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    } else if (registerForm.userType.toLowerCase() === "doctor") {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/doctor`
        );

        response.data.forEach((doctor: any) => {
          if (
            doctor.email === loginForm.email &&
            doctor.password === loginForm.password
          ) {
            navigate("/doctor", { state: doctor });
          }
        });
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    }
  };

  const handleRegisterChange = (e: any) => {
    const { name, value } = e.target;
    setRegisterForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box
      sx={{
        fontFamily: "Arial, sans-serif",
        backgroundImage: `url(${process.env.PUBLIC_URL}/home.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "0.5in",
        minHeight: "calc(100vh - 0.5in)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: "20px",
          textAlign: "left",
          marginLeft: "20px",
          fontWeight: "bold",
        }}
      >
        Welcome to Our Hospital System - MEDTECH - Making HealthCare Better
        Together
      </Typography>

      <Paper
        elevation={3}
        sx={{
          maxWidth: "400px",
          marginTop: "110px",
          width: "100%",
          padding: "20px",
          borderRadius: "5px",
          background: "rgba(255,255,255,0.8)",
          textAlign: "left",
        }}
      >
        <form onSubmit={handleLoginSubmit}>
          <Typography
            variant="h5"
            component="h3"
            sx={{ fontWeight: "bold", marginBottom: "16px" }}
          >
            Login
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: "16px" }}>
            <InputLabel htmlFor="userType">I am a :</InputLabel>
            <Select
              label="I am a :"
              value={registerForm.userType}
              onChange={handleRegisterChange}
              inputProps={{
                name: "userType",
                id: "userType",
              }}
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="email"
            label="Email"
            name="email"
            variant="filled"
            value={loginForm.email}
            onChange={handleLoginChange}
            required
            fullWidth
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            variant="filled"
            value={loginForm.password}
            onChange={handleLoginChange}
            required
            type="password"
            fullWidth
            sx={{ marginBottom: "16px" }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: "20px" }}
          >
            Login
          </Button>
        </form>
        <Box
          sx={{
            textAlign: "center",
            marginTop: "10px",
            fontWeight: "bold",
          }}
        >
          <Box
            sx={{
              color: "#4CAF50",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            <Link data-testid="register-link" to="/register">
              New User? Register Here
            </Link>
          </Box>
        </Box>
      </Paper>

      <Typography
        variant="body2"
        sx={{
          marginTop: "auto",
          fontWeight: "bold",
          marginBottom: "0px",
          textAlign: "center",
          fontSize: "12px",
          color: "#666",
        }}
      >
        Copyright © {new Date().getFullYear()} MedTech. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Home;
