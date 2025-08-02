import React, { useCallback, useMemo } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogContent,
  MenuItem,
  DialogActions,
  Typography,
  Paper,
  Divider,
  Alert,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import {
  EventAvailable as EventIcon,
  AccessTime as TimeIcon,
  LocalHospital as HospitalIcon,
  Close as CloseIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";

// Types
import { IDoctor } from "../../../types/Doctors";

/**
 * Props interface for ScheduleModal component
 */
interface IScheduleModalProps {
  value: Dayjs | null;
  slotForm: {
    day: string;
    start: string;
    end: string;
    hospitalId: number;
  };
  handleSlotFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hospitals: { id: number; name: string }[];
  addSlot: (
    doctorId: number,
    slotDate: string,
    startTime: string,
    endTime: string,
    hospitalId: number
  ) => void;
  setShowSlotModal: (show: boolean) => void;
  doctor: IDoctor;
}

/**
 * ScheduleModal Component
 * 
 * A modern modal for creating new availability slots with:
 * - Date and time selection
 * - Hospital assignment
 * - Form validation with visual feedback
 * - Professional medical interface design
 */
const ScheduleModal: React.FC<IScheduleModalProps> = (props) => {
  // Form validation state
  const [errors, setErrors] = React.useState({
    start: false,
    end: false,
    hospitalId: false,
  });

  // Loading state for better UX
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Memoized formatted date for display
  const formattedDate = useMemo(() => 
    props.value ? props.value.format("dddd, MMMM DD, YYYY") : "",
    [props.value]
  );

  // Memoized time validation - ensures end time is after start time
  const timeValidation = useMemo(() => {
    if (!props.slotForm.start || !props.slotForm.end) return { isValid: true, message: "" };
    
    const startTime = dayjs(props.slotForm.start, "HH:mm");
    const endTime = dayjs(props.slotForm.end, "HH:mm");
    
    if (endTime.isBefore(startTime) || endTime.isSame(startTime)) {
      return {
        isValid: false,
        message: "End time must be after start time"
      };
    }
    
    const duration = endTime.diff(startTime, 'minute');
    if (duration < 15) {
      return {
        isValid: false,
        message: "Minimum slot duration is 15 minutes"
      };
    }
    
    return { isValid: true, message: `Duration: ${duration} minutes` };
  }, [props.slotForm.start, props.slotForm.end]);

  /**
   * Validate all form inputs
   * Returns true if all validations pass
   */
  const validateInputs = useCallback((): boolean => {
    const newErrors = {
      start: !props.slotForm.start,
      end: !props.slotForm.end,
      hospitalId: props.slotForm.hospitalId === -1,
    };
    setErrors(newErrors);
    
    // Also check time validation
    const hasErrors = Object.values(newErrors).some((error) => error) || !timeValidation.isValid;
    return !hasErrors;
  }, [props.slotForm, timeValidation.isValid]);

  /**
   * Handle slot creation with loading state
   */
  const handleAddSlot = useCallback(async () => {
    if (!validateInputs()) return;
    
    try {
      setIsSubmitting(true);
      await props.addSlot(
        props.doctor.id,
        props.value?.format("YYYY-MM-DD") ?? "",
        props.slotForm.start,
        props.slotForm.end,
        props.slotForm.hospitalId
      );
    } catch (error) {
      console.error("Error adding slot:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateInputs, props]);

  /**
   * Handle modal close
   */
  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      props.setShowSlotModal(false);
    }
  }, [isSubmitting, props]);

  return (
    <Dialog
      open
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }
      }}
    >
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          p: 3,
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <EventIcon sx={{ fontSize: 32 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                Create New Slot
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Add availability for {formattedDate}
              </Typography>
            </Box>
          </Box>
          
          <IconButton
            onClick={handleClose}
            disabled={isSubmitting}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Paper>

      <DialogContent sx={{ p: 4 }}>
        {/* Date Display Section */}
        <Paper
          elevation={0}
          sx={{
            backgroundColor: '#f8f9fa',
            p: 3,
            borderRadius: 2,
            mb: 4,
            border: '1px solid #e9ecef',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <CalendarIcon sx={{ color: '#6c757d' }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#495057' }}>
              Selected Date
            </Typography>
          </Box>
          <Chip
            label={formattedDate}
            color="primary"
            size="medium"
            sx={{ fontWeight: 500 }}
          />
        </Paper>

        {/* Form Section */}
        <Box
          component="form"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 3,
          }}
        >
          {/* Time Fields */}
          <TextField
            label="Start Time"
            type="time"
            name="start"
            value={props.slotForm.start}
            onChange={props.handleSlotFormChange}
            error={errors.start}
            helperText={errors.start ? "Start time is required" : "Select appointment start time"}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: <TimeIcon sx={{ mr: 1, color: 'action.active' }} />,
            }}
            fullWidth
            disabled={isSubmitting}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />

          <TextField
            label="End Time"
            type="time"
            name="end"
            value={props.slotForm.end}
            onChange={props.handleSlotFormChange}
            error={errors.end || !timeValidation.isValid}
            helperText={
              errors.end 
                ? "End time is required" 
                : !timeValidation.isValid 
                  ? timeValidation.message 
                  : timeValidation.message || "Select appointment end time"
            }
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: <TimeIcon sx={{ mr: 1, color: 'action.active' }} />,
            }}
            fullWidth
            disabled={isSubmitting}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />

          {/* Hospital Selection */}
          <TextField
            select
            label="Hospital"
            name="hospitalId"
            value={props.slotForm.hospitalId}
            onChange={props.handleSlotFormChange}
            error={errors.hospitalId}
            helperText={errors.hospitalId ? "Please select a hospital" : "Choose the hospital location"}
            fullWidth
            disabled={isSubmitting}
            sx={{
              gridColumn: '1 / -1',
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          >
            <MenuItem value={-1} disabled>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.6 }}>
                <HospitalIcon />
                Select Hospital
              </Box>
            </MenuItem>
            {props.hospitals.map((hospital) => (
              <MenuItem key={hospital.id} value={hospital.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <HospitalIcon sx={{ color: 'primary.main' }} />
                  {hospital.name}
                </Box>
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Time Validation Alert */}
        {timeValidation.isValid && props.slotForm.start && props.slotForm.end && (
          <Alert 
            severity="success" 
            sx={{ mt: 3, borderRadius: 2 }}
            icon={<TimeIcon />}
          >
            {timeValidation.message}
          </Alert>
        )}

        {!timeValidation.isValid && props.slotForm.start && props.slotForm.end && (
          <Alert 
            severity="error" 
            sx={{ mt: 3, borderRadius: 2 }}
            icon={<TimeIcon />}
          >
            {timeValidation.message}
          </Alert>
        )}
      </DialogContent>

      {/* Action Buttons */}
      <DialogActions
        sx={{
          p: 3,
          backgroundColor: '#f8f9fa',
          borderTop: '1px solid #e9ecef',
        }}
      >
        <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            disabled={isSubmitting}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 3,
              py: 1,
            }}
          >
            Cancel
          </Button>
          
          <Button
            variant="contained"
            startIcon={isSubmitting ? null : <EventIcon />}
            onClick={handleAddSlot}
            disabled={isSubmitting || !timeValidation.isValid}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 4,
              py: 1,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                transform: 'translateY(-1px)',
              },
              '&:disabled': {
                background: '#e9ecef',
                color: '#6c757d',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {isSubmitting ? 'Creating Slot...' : 'Create Slot'}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleModal;
