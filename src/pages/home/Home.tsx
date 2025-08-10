import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Container,
  Stack,
  Alert,
  CircularProgress,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  Login,
  Person,
  LocalHospital,
  Email,
  Lock,
  PersonAdd,
  MedicalServices,
} from "@mui/icons-material";
import { IPatient } from "../../types/Patients";
import { IDoctor } from "../../types/Doctors";

/**
 * Home Component - Professional Login Portal
 * 
 * A modern login interface with:
 * - Clean, professional design maintaining medical theme
 * - Enhanced user experience with loading states and error handling
 * - Responsive layout for all screen sizes
 * - Accessible form controls with proper icons
 * - Improved visual hierarchy and spacing
 */
const Home: React.FC = () => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [userType, setUserType] = useState("patient");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(null); // Clear error when user starts typing
    
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (e: any) => {
    setUserType(e.target.value);
    setError(null);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!loginForm.email || !loginForm.password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    try {
      let found = false;
      
      if (userType.toLowerCase() === "patient") {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/patient/login`,
          loginForm
        );
        
        const patient = response.data as IPatient;
        
        if (patient) {
          navigate("/patient", { state: patient });
          found = true;
        }
      } else if (userType.toLowerCase() === "doctor") {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/doctor/login`,
          loginForm
        );

        const doctor = response.data as IDoctor;
        
        if (doctor) {
          navigate("/doctor", { state: doctor });
          found = true;
        }
      }
      
      if (!found) {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${process.env.PUBLIC_URL}/home.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          zIndex: 0,
        },
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: "relative", 
          zIndex: 1, 
          py: 4,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Header Section */}
        <Paper
          elevation={2}
          sx={{
            p: 4,
            mb: 6,
            background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
            borderRadius: 3,
            border: "1px solid #ddd",
            textAlign: "center",
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mb: 2 }}>
            <LocalHospital sx={{ fontSize: 40, color: "#666" }} />
            <MedicalServices sx={{ fontSize: 40, color: "#666" }} />
          </Stack>
          
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#333",
              mb: 1,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              lineHeight: 1.2,
            }}
          >
            Welcome to MEDTECH
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: "#666",
              fontWeight: 500,
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            Making Healthcare Better Together
          </Typography>
        </Paper>

        {/* Login Form Section */}
        <Box sx={{ display: "flex", justifyContent: "center", flex: 1 }}>
          <Paper
            elevation={3}
            sx={{
              maxWidth: 450,
              width: "100%",
              p: 4,
              borderRadius: 3,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #e0e0e0",
              backdropFilter: "blur(10px)",
              height: "fit-content",
            }}
          >
            {/* Form Header */}
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Login sx={{ fontSize: 28, color: "#666" }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#333",
                }}
              >
                Login to Your Account
              </Typography>
            </Stack>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                }}
                onClose={() => setError(null)}
              >
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleLoginSubmit}>
              {/* User Type Selection */}
              <FormControl 
                fullWidth 
                sx={{ mb: 3 }}
              >
                <InputLabel sx={{ color: "#666", fontWeight: 500 }}>
                  I am a:
                </InputLabel>
                <Select
                  value={userType}
                  onChange={handleUserTypeChange}
                  label="I am a:"
                  disabled={isLoading}
                  startAdornment={
                    <InputAdornment position="start">
                      <Person sx={{ fontSize: 20, color: "#666" }} />
                    </InputAdornment>
                  }
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#999",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#666",
                      borderWidth: 2,
                    },
                  }}
                >
                  <MenuItem value="patient">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Person sx={{ fontSize: 18 }} />
                      <span>Patient</span>
                    </Stack>
                  </MenuItem>
                  <MenuItem value="doctor">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <MedicalServices sx={{ fontSize: 18 }} />
                      <span>Doctor</span>
                    </Stack>
                  </MenuItem>
                </Select>
              </FormControl>

              {/* Email Field */}
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                required
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ fontSize: 20, color: "#666" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    "& fieldset": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#999",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#666",
                      borderWidth: 2,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#666",
                    fontWeight: 500,
                    "&.Mui-focused": {
                      color: "#666",
                    },
                  },
                }}
              />

              {/* Password Field */}
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ fontSize: 20, color: "#666" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 4,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    "& fieldset": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#999",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#666",
                      borderWidth: 2,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#666",
                    fontWeight: 500,
                    "&.Mui-focused": {
                      color: "#666",
                    },
                  },
                }}
              />

              {/* Login Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isLoading}
                startIcon={
                  isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <Login />
                  )
                }
                sx={{
                  py: 1.5,
                  backgroundColor: "#666",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  borderRadius: 2,
                  textTransform: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  "&:hover": {
                    backgroundColor: "#555",
                    transform: "translateY(-1px)",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                  },
                  "&:disabled": {
                    backgroundColor: "#ccc",
                    transform: "none",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {isLoading ? "Signing In..." : "Login"}
              </Button>

              <Divider sx={{ my: 3, borderColor: "#e8e8e8" }} />

              {/* Register Link */}
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                  Don't have an account?
                </Typography>
                <Button
                  component={Link}
                  to="/register"
                  data-testid="register-link"
                  variant="outlined"
                  startIcon={<PersonAdd />}
                  sx={{
                    color: "#666",
                    borderColor: "#666",
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": {
                      borderColor: "#555",
                      backgroundColor: "rgba(102, 102, 102, 0.04)",
                    },
                  }}
                >
                  Register Here
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              fontWeight: 500,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              py: 1,
              px: 2,
              borderRadius: 2,
              display: "inline-block",
            }}
          >
            Copyright © {new Date().getFullYear()} MedTech. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
