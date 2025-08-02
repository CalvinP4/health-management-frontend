import React from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Avatar,
  Chip,
  Paper,
} from "@mui/material";
import {
  AccountBox as ProfileIcon,
  Schedule as ScheduleIcon,
  Person as DoctorIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IDoctor } from "../../../types/Doctors";

/**
 * DoctorProfile Component
 * 
 * A professional profile section for doctors with:
 * - Welcome message with doctor's name
 * - Quick action buttons for schedule and profile management
 * - Modern card-based design with enhanced styling
 * - Maintains existing gray theme
 */
const DoctorProfile: React.FC<{ doctor: IDoctor | null }> = ({ doctor }) => {
  const navigate = useNavigate();

  // Get doctor's initials for avatar fallback
  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName || !lastName) return "DR";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Paper
      elevation={2}
      sx={{
        background: 'linear-gradient(135deg, #d1d1d1 0%, #c8c8c8 100%)',
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid #bbb',
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
          }}
        >
          {/* Welcome Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flex: 1,
            }}
          >
            {/* Doctor Avatar */}
            <Avatar
              sx={{
                width: 64,
                height: 64,
                backgroundColor: '#999',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                border: '3px solid #fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              {doctor ? getInitials(doctor.firstName, doctor.lastName) : <DoctorIcon />}
            </Avatar>

            {/* Welcome Text */}
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#333',
                  mb: 0.5,
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                }}
              >
                {doctor 
                  ? `Welcome, Dr. ${doctor.firstName} ${doctor.lastName}`
                  : "Welcome, Doctor"
                }
              </Typography>
              
              {doctor && (
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Chip
                    label={doctor.specialization || "General Practice"}
                    size="small"
                    sx={{
                      backgroundColor: '#fff',
                      color: '#666',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                    }}
                  />
                  <Chip
                    label={`Licensed ${new Date(doctor.licensedYear).getFullYear()}`}
                    size="small"
                    sx={{
                      backgroundColor: '#4caf50',
                      color: 'white',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                    }}
                  />
                </Stack>
              )}
            </Box>
          </Box>

          {/* Actions Section */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: '#444',
                mb: 2,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Quick Actions
            </Typography>
            
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ minWidth: { md: '280px' } }}
            >
              <Button
                variant="contained"
                startIcon={<ScheduleIcon />}
                onClick={() => {
                  navigate("/doctor-schedule", { state: doctor });
                }}
                sx={{
                  backgroundColor: '#666',
                  color: 'white',
                  fontWeight: 600,
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  '&:hover': {
                    backgroundColor: '#555',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Manage Schedule
              </Button>
              
              <Button
                variant="contained"
                startIcon={<ProfileIcon />}
                onClick={() => {
                  console.log("Update Profile");
                  // TODO: Navigate to profile edit page
                }}
                sx={{
                  backgroundColor: '#777',
                  color: 'white',
                  fontWeight: 600,
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  '&:hover': {
                    backgroundColor: '#666',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Update Profile
              </Button>
            </Stack>
          </Box>
        </Box>
      </CardContent>
    </Paper>
  );
};

export default DoctorProfile;
