import React from "react";
import { IAppointment } from "../../../types/Appointments";
import { IDoctor } from "../../../types/Doctors";
import { IPatient } from "../../../types/Patients";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  DeviceThermostat,
  MedicalInformation,
  Notes,
  Place,
  Person,
  Schedule,
  LocalHospital,
} from "@mui/icons-material";

// Define the interface for component props
interface IUpcomingAppointment {
  appointments: IAppointment[];
  patients: IPatient[];
  doctor: IDoctor | null;
}

/**
 * UpcomingAppointments Component
 * 
 * Displays a professional grid of upcoming appointments for doctors with:
 * - Patient information cards with avatars
 * - Detailed appointment information with medical icons
 * - Status indicators and appointment type chips
 * - Action buttons for starting consultations
 * - Enhanced card design maintaining existing theme
 */
const UpcomingAppointments: React.FC<IUpcomingAppointment> = ({ 
  appointments, 
  patients, 
  doctor 
}) => {
  const navigate = useNavigate();

  // Filter for upcoming appointments only
  const upcomingAppointments = appointments.filter(
    (appointment: IAppointment) => appointment.status === "Not started"
  );

  // Get patient initials for avatar fallback
  const getPatientInitials = (patient?: IPatient) => {
    if (!patient?.firstName || !patient?.lastName) return "PT";
    return `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`.toUpperCase();
  };

  // Get appointment type color
  const getAppointmentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'routine': return '#4caf50';
      case 'emergency': return '#f44336';
      case 'follow-up': return '#ff9800';
      case 'consultation': return '#2196f3';
      default: return '#9e9e9e';
    }
  };

  return (
    <Box sx={{ mt: 4, mb: 4, px: { xs: 2, md: 4 } }}>
      {/* Header Section */}
      <Paper
        elevation={1}
        sx={{
          p: 3,
          mb: 4,
          background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
          borderRadius: 3,
          border: '1px solid #ddd',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Schedule sx={{ fontSize: 32, color: '#666' }} />
          <Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                color: '#333',
                mb: 0.5,
              }}
            >
              Scheduled Appointments
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#666',
                fontWeight: 500,
              }}
            >
              {upcomingAppointments.length} upcoming appointment{upcomingAppointments.length !== 1 ? 's' : ''} waiting for consultation
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Appointments Grid */}
      {upcomingAppointments.length === 0 ? (
        <Paper
          elevation={1}
          sx={{
            p: 6,
            textAlign: 'center',
            backgroundColor: '#fafafa',
            borderRadius: 3,
            border: '1px solid #e0e0e0',
          }}
        >
          <LocalHospital sx={{ fontSize: 64, color: '#bbb', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
            No Upcoming Appointments
          </Typography>
          <Typography variant="body2" sx={{ color: '#999' }}>
            All caught up! No pending consultations at the moment.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {upcomingAppointments.map((appointment: IAppointment, index: number) => {
            const patient = patients.find(
              (p: IPatient) => p.id === appointment.patientId
            );

            return (
              <Grid item xs={12} lg={6} key={appointment.id || index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderRadius: 3,
                    border: '1px solid #e0e0e0',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  {/* Patient Header */}
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{
                          width: 56,
                          height: 56,
                          backgroundColor: '#666',
                          color: 'white',
                          fontSize: '1.25rem',
                          fontWeight: 'bold',
                          border: '3px solid #fff',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        }}
                      >
                        {patient ? getPatientInitials(patient) : <Person />}
                      </Avatar>
                    }
                    title={
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700,
                          color: '#333',
                          mb: 0.5,
                        }}
                      >
                        {patient 
                          ? `${patient.firstName} ${patient.lastName}`
                          : "Unknown Patient"
                        }
                      </Typography>
                    }
                    subheader={
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Chip
                          label={`ID: ${appointment.id}`}
                          size="small"
                          sx={{
                            backgroundColor: '#f0f0f0',
                            color: '#666',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                          }}
                        />
                        <Chip
                          label={appointment.type}
                          size="small"
                          sx={{
                            backgroundColor: getAppointmentTypeColor(appointment.type),
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                          }}
                        />
                      </Stack>
                    }
                    sx={{ 
                      pb: 1,
                      backgroundColor: '#fafafa',
                      borderBottom: '1px solid #e0e0e0',
                    }}
                  />

                  {/* Appointment Details */}
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <List dense sx={{ py: 0 }}>
                      <ListItem sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Place sx={{ color: '#666', fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                              Hospital ID: {appointment.hospitalId}
                            </Typography>
                          }
                        />
                      </ListItem>
                      
                      <Divider sx={{ my: 1, mx: 0 }} />
                      
                      <ListItem sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Notes sx={{ color: '#666', fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                              Reason
                            </Typography>
                          }
                          secondary={
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: '#666',
                                mt: 0.5,
                                lineHeight: 1.4,
                              }}
                            >
                              {appointment.reason || "No reason specified"}
                            </Typography>
                          }
                        />
                      </ListItem>
                      
                      <ListItem sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <MedicalInformation sx={{ color: '#666', fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                              Symptoms
                            </Typography>
                          }
                          secondary={
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: '#666',
                                mt: 0.5,
                                lineHeight: 1.4,
                              }}
                            >
                              {appointment.symptoms || "No symptoms listed"}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                  </CardContent>

                  {/* Action Button */}
                  <Box 
                    sx={{ 
                      p: 3, 
                      pt: 0,
                      borderTop: '1px solid #f0f0f0',
                      backgroundColor: '#fafafa',
                    }}
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() =>
                        navigate("/prescription", {
                          state: { appointment, patient, doctor },
                        })
                      }
                      startIcon={<DeviceThermostat />}
                      sx={{
                        textTransform: "none",
                        py: 1.5,
                        px: 3,
                        fontWeight: 600,
                        fontSize: '1rem',
                        borderRadius: 2,
                        backgroundColor: '#666',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        '&:hover': {
                          backgroundColor: '#555',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Start Consultation
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default UpcomingAppointments;
