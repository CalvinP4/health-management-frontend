import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Stack,
  Container,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  Home,
  Lock,
  CalendarToday,
  AccountCircle,
  AppRegistration,
} from "@mui/icons-material";

/**
 * Register Component - Professional User Registration
 * 
 * A modern registration form with:
 * - Clean Material-UI design maintaining existing theme
 * - Organized field layout with icons
 * - Loading states and error handling
 * - Responsive design for all screen sizes
 * - Professional medical theme consistency
 */
const Register: React.FC = () => {
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    age: 0,
    email: "",
    dob: "",
    phoneNo: "",
    password: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(null); // Clear error when user starts typing

    setRegisterForm((prevState) => ({
      ...prevState,
      [name]: name === "age" ? parseInt(value) || 0 : value,
    }));
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/patient`,
        registerForm
      );

      if (response.status === 200) {
        console.log("User registered successfully:", response.data);
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Error:", error);
      setError(
        error.response?.data?.message || 
        "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Form field configuration
  const formFields = [
    { 
      name: "firstName", 
      label: "First Name", 
      type: "text", 
      icon: <Person />, 
      required: true,
      gridSize: { xs: 12, sm: 6 }
    },
    { 
      name: "middleName", 
      label: "Middle Name", 
      type: "text", 
      icon: <Person />, 
      required: false,
      gridSize: { xs: 12, sm: 6 }
    },
    { 
      name: "lastName", 
      label: "Last Name", 
      type: "text", 
      icon: <Person />, 
      required: true,
      gridSize: { xs: 12, sm: 6 }
    },
    { 
      name: "age", 
      label: "Age", 
      type: "number", 
      icon: <AccountCircle />, 
      required: true,
      gridSize: { xs: 12, sm: 6 }
    },
    { 
      name: "dob", 
      label: "Date of Birth", 
      type: "date", 
      icon: <CalendarToday />, 
      required: true,
      gridSize: { xs: 12, sm: 6 }
    },
    { 
      name: "phoneNo", 
      label: "Phone Number", 
      type: "tel", 
      icon: <Phone />, 
      required: true,
      gridSize: { xs: 12, sm: 6 }
    },
    { 
      name: "address", 
      label: "Address", 
      type: "text", 
      icon: <Home />, 
      required: true,
      gridSize: { xs: 12 }
    },
    { 
      name: "email", 
      label: "Email Address", 
      type: "email", 
      icon: <Email />, 
      required: true,
      gridSize: { xs: 12 }
    },
    { 
      name: "password", 
      label: "Password", 
      type: "password", 
      icon: <Lock />, 
      required: true,
      gridSize: { xs: 12 }
    },
  ];

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
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, py: 4 }}>
        {/* Header */}
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
            borderRadius: 3,
            border: "1px solid #ddd",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <AppRegistration sx={{ fontSize: 32, color: "#666" }} />
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#333",
                  mb: 0.5,
                }}
              >
                MEDTECH - User Registration
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#666",
                  fontWeight: 500,
                }}
              >
                Create your account to access our healthcare services
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Registration Form */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "1px solid #e0e0e0",
            backdropFilter: "blur(10px)",
          }}
        >
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

          <Box component="form" onSubmit={handleRegisterSubmit}>
            <Grid container spacing={3}>
              {formFields.map((field) => (
                <Grid item {...field.gridSize} key={field.name}>
                  <TextField
                    fullWidth
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    value={registerForm[field.name as keyof typeof registerForm]}
                    onChange={handleRegisterChange}
                    required={field.required}
                    disabled={isLoading}
                    data-testid={field.name}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {React.cloneElement(field.icon, {
                            sx: { fontSize: 20, color: "#666" },
                          })}
                        </InputAdornment>
                      ),
                    }}
                    sx={{
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
                      "& .MuiInputBase-input": {
                        padding: "14px 16px",
                        fontSize: "1rem",
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Submit Button */}
            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                data-testid="submit-btn"
                startIcon={
                  isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <AppRegistration />
                  )
                }
                sx={{
                  backgroundColor: "#666",
                  color: "white",
                  fontWeight: 600,
                  py: 1.5,
                  px: 6,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1.1rem",
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
                {isLoading ? "Creating Account..." : "Register"}
              </Button>
            </Box>
          </Box>
        </Paper>

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

export default Register;
