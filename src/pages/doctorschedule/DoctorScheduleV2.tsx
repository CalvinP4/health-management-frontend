import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Chip,
  Alert,
  CircularProgress,
  Fab,
  Skeleton,
} from "@mui/material";
import {
  Add as AddIcon,
  CalendarMonth as CalendarIcon,
  Schedule as ScheduleIcon,
  Person as DoctorIcon,
} from "@mui/icons-material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";

// Types
import { IDoctor } from "../../types/Doctors";
import { ISlot } from "../../types/Slot";
import { IProfile } from "../../types/Profile";
import { IHospital } from "../../types/Hospital";

// Components
import FooterV2 from "../../components/FooterV2";
import { HeaderProvider } from "../../context/HeaderContext";
import HeaderV2 from "../../components/HeaderV2";
import ScheduleModal from "./components/ScheduleModal";
import SlotsByDay from "./components/SlotsByDay";

// Constants
const BACKEND_URL = process.env.REACT_APP_BACKEND_SERVER_URL;

/**
 * DoctorScheduleV2 Component
 * 
 * A modern, responsive schedule management interface for doctors to:
 * - View and manage their availability slots
 * - Add new time slots across different hospitals
 * - Navigate through dates using an interactive calendar
 * - View existing appointments and availability
 */
const DoctorScheduleV2: React.FC = () => {
  // Router hooks
  const location = useLocation();
  const navigate = useNavigate();

  // State management
  const [doctor, setDoctor] = useState<IDoctor>(
    (location.state as IDoctor) || {
      id: 0,
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      phoneNo: "",
      address: "",
      age: 0,
      email: "",
      password: "",
      specialization: "",
      licensedYear: 0,
      licensedBy: "",
      schedule: [],
      rating: 0,
    }
  );

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [hospitals, setHospitals] = useState<IHospital[]>([]);
  const [slots, setSlots] = useState<ISlot[]>([]);
  const [showSlotModal, setShowSlotModal] = useState<boolean>(false);

  // Loading and error states
  const [loading, setLoading] = useState({
    hospitals: true,
    slots: false,
    addingSlot: false,
    deletingSlot: false,
  });
  
  const [errors, setErrors] = useState({
    hospitals: null as string | null,
    slots: null as string | null,
    general: null as string | null,
  });

  // Form state for adding new slots
  const [slotForm, setSlotForm] = useState({
    day: "",
    start: "",
    end: "",
    hospitalId: -1,
  });

  // Memoized doctor's full name for display
  const doctorFullName = useMemo(() => 
    `${doctor.firstName} ${doctor.lastName}`.trim(),
    [doctor.firstName, doctor.lastName]
  );

  // Memoized formatted date for display
  const formattedDate = useMemo(() => 
    selectedDate ? selectedDate.format("MMMM DD, YYYY") : "",
    [selectedDate]
  );

  /**
   * Handle slot form input changes
   * Parses hospitalId as integer for proper backend communication
   */
  const handleSlotFormChange = useCallback((e: any) => {
    const { name, value } = e.target;
    const parsedValue = name === "hospitalId" ? parseInt(value, 10) : value;

    setSlotForm((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  }, []);

  /**
   * Load hospitals data on component mount
   * Displays available hospitals for slot assignment
   */
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(prev => ({ ...prev, hospitals: true }));
        setErrors(prev => ({ ...prev, hospitals: null }));
        
        const response = await axios.get(`${BACKEND_URL}/hospital`);
        setHospitals(response.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        setErrors(prev => ({ 
          ...prev, 
          hospitals: "Failed to load hospitals. Please refresh the page." 
        }));
      } finally {
        setLoading(prev => ({ ...prev, hospitals: false }));
      }
    };

    fetchHospitals();
  }, []);

  /**
   * Delete a specific time slot
   * Updates local state immediately for better UX
   */
  const deleteSlot = useCallback(async (slotId: number) => {
    try {
      setLoading(prev => ({ ...prev, deletingSlot: true }));
      
      const response = await axios.delete(`${BACKEND_URL}/slot/${slotId}`);

      if (response.status === 200) {
        // Optimistically update UI
        setSlots((prevSlots) => prevSlots.filter((s) => s.id !== slotId));
      }
    } catch (error) {
      console.error("Error deleting slot:", error);
      setErrors(prev => ({ 
        ...prev, 
        general: "Failed to delete slot. Please try again." 
      }));
    } finally {
      setLoading(prev => ({ ...prev, deletingSlot: false }));
    }
  }, []);

  /**
   * Navigate to doctor's profile page
   * Transforms doctor data to profile format
   */
  const navigateToProfile = useCallback(() => {
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
  }, [navigate, doctor]);

  /**
   * Add a new availability slot
   * Handles form submission and updates local state
   */
  const addSlot = useCallback(async (
    doctorId: number,
    slotDate: string,
    startTime: string,
    endTime: string,
    hospitalId: number
  ) => {
    try {
      setLoading(prev => ({ ...prev, addingSlot: true }));
      setErrors(prev => ({ ...prev, general: null }));
      
      const response = await axios.post(`${BACKEND_URL}/slot`, {
        doctorId,
        slotDate,
        startTime,
        endTime,
        hospitalId,
        apptStatus: 0,
      });

      if (response.status === 200) {
        setShowSlotModal(false);
        // Update slots list with new slot
        setSlots((prevSlots) => [...prevSlots, response.data]);
        
        // Reset form
        setSlotForm({
          day: "",
          start: "",
          end: "",
          hospitalId: -1,
        });
      }
    } catch (error) {
      console.error("Error adding slot:", error);
      setErrors(prev => ({ 
        ...prev, 
        general: "Failed to add slot. Please check the details and try again." 
      }));
    } finally {
      setLoading(prev => ({ ...prev, addingSlot: false }));
    }
  }, []);

  /**
   * Handle date selection from calendar
   * Fetches slots for the selected date
   */
  const handleDateSelect = useCallback(async (newDate: Dayjs | null) => {
    if (!newDate) return;
    
    setSelectedDate(newDate);
    
    try {
      setLoading(prev => ({ ...prev, slots: true }));
      setErrors(prev => ({ ...prev, slots: null }));
      
      const response = await axios.get(
        `${BACKEND_URL}/slot/doctor/${doctor.id}/date/${newDate.format("YYYY-MM-DD")}`
      );
      setSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots for selected date:", error);
      setErrors(prev => ({ 
        ...prev, 
        slots: "Failed to load slots for this date." 
      }));
      setSlots([]); // Clear slots on error
    } finally {
      setLoading(prev => ({ ...prev, slots: false }));
    }
  }, [doctor.id]);

  /**
   * Handle user logout
   * Redirects to home page
   */
  const handleLogout = useCallback(() => {
    navigate("/");
  }, [navigate]);
  

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <HeaderProvider>
        <HeaderV2 navigateToProfile={navigateToProfile} logout={handleLogout} />
        
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Hero Section - Doctor Welcome */}
          <Paper
            elevation={0}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              p: 4,
              borderRadius: 3,
              mb: 4,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                opacity: 0.1,
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DoctorIcon sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                  Welcome, Dr. {doctorFullName}
                </Typography>
              </Box>
              
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                Manage your schedule and availability
              </Typography>
              
              <Chip
                icon={<ScheduleIcon />}
                label={`Viewing: ${formattedDate}`}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 500,
                }}
              />
            </Box>
          </Paper>

          {/* Error Messages */}
          {(errors.general || errors.hospitals || errors.slots) && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errors.general || errors.hospitals || errors.slots}
            </Alert>
          )}

          <Grid container spacing={4}>
            {/* Left Column - Calendar */}
            <Grid item xs={12} md={5}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  height: 'fit-content',
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  {/* Calendar Header */}
                  <Box
                    sx={{
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      color: 'white',
                      p: 3,
                      textAlign: 'center',
                    }}
                  >
                    <CalendarIcon sx={{ fontSize: 32, mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Select Date
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Choose a date to view or manage slots
                    </Typography>
                  </Box>

                  {/* Calendar Component */}
                  <Box sx={{ p: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar
                        value={selectedDate}
                        onChange={handleDateSelect}
                        sx={{
                          width: '100%',
                          '& .MuiPickersDay-root': {
                            borderRadius: 2,
                            '&:hover': {
                              backgroundColor: '#f093fb20',
                            },
                            '&.Mui-selected': {
                              backgroundColor: '#f093fb',
                              '&:hover': {
                                backgroundColor: '#f093fb',
                              },
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Right Column - Slots Management */}
            <Grid item xs={12} md={7}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  minHeight: 600,
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  {/* Slots Header */}
                  <Box
                    sx={{
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      color: 'white',
                      p: 3,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        Schedule Management
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {formattedDate} • {slots.length} slot{slots.length !== 1 ? 's' : ''}
                      </Typography>
                    </Box>
                    
                    <Chip
                      label={`${slots.length} Slots`}
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontWeight: 500,
                      }}
                    />
                  </Box>

                  {/* Slots Content */}
                  <Box sx={{ p: 3 }}>
                    {loading.slots ? (
                      // Loading skeleton for slots
                      <Box>
                        {[1, 2, 3].map((item) => (
                          <Skeleton
                            key={item}
                            variant="rectangular"
                            height={80}
                            sx={{ mb: 2, borderRadius: 2 }}
                          />
                        ))}
                      </Box>
                    ) : (
                      <SlotsByDay
                        slots={slots}
                        deleteSlot={deleteSlot}
                      />
                    )}

                    {/* Add Slot Button */}
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                      <Button
                        onClick={() => setShowSlotModal(true)}
                        variant="contained"
                        size="large"
                        startIcon={<AddIcon />}
                        disabled={loading.addingSlot || !selectedDate}
                        sx={{
                          borderRadius: 3,
                          px: 4,
                          py: 1.5,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                          '&:hover': {
                            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                            transform: 'translateY(-1px)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {loading.addingSlot ? (
                          <>
                            <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                            Adding Slot...
                          </>
                        ) : (
                          'Add New Slot'
                        )}
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Floating Action Button for Mobile */}
          <Fab
            color="primary"
            aria-label="add slot"
            onClick={() => setShowSlotModal(true)}
            disabled={loading.addingSlot || !selectedDate}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              display: { xs: 'flex', md: 'none' },
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                transform: 'scale(1.1)',
              },
              transition: 'transform 0.2s ease',
            }}
          >
            {loading.addingSlot ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <AddIcon />
            )}
          </Fab>

          {/* Schedule Modal */}
          {showSlotModal && (
            <ScheduleModal
              value={selectedDate}
              slotForm={slotForm}
              handleSlotFormChange={handleSlotFormChange}
              hospitals={hospitals}
              addSlot={addSlot}
              setShowSlotModal={setShowSlotModal}
              doctor={doctor}
            />
          )}
        </Container>
        
        <FooterV2 />
      </HeaderProvider>
    </Box>
  );
};

export default DoctorScheduleV2;
