import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Chip,
  Stack,
  Avatar,
  Divider,
  Paper,
  Alert,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationIcon,
  CheckCircle as BookedIcon,
  RadioButtonUnchecked as AvailableIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";
import dayjs from "dayjs";

// Types
import { ISlot, Status } from "../../../types/Slot";
import { hospitalMapping } from "../../../types/Hospital";

// Component props interface
interface SlotsByDayProps {
  slots: ISlot[];
  deleteSlot: (slotId: string) => void;
}

/**
 * SlotsByDay Component
 * 
 * Displays a list of doctor's time slots for a selected day with:
 * - Visual status indicators (booked/available)
 * - Hospital and time information
 * - Action buttons for editing and deleting slots
 * - Responsive card-based layout
 */
const SlotsByDay: React.FC<SlotsByDayProps> = ({ slots, deleteSlot }) => {
  
  // Memoized slot statistics for better performance
  const slotStats = useMemo(() => {
    const total = slots.length;
    const booked = slots.filter(slot => slot.apptStatus === Status.Booked).length;
    const available = total - booked;
    
    return { total, booked, available };
  }, [slots]);

  /**
   * Get status configuration for visual styling
   * Returns color scheme and icons based on appointment status
   */
  const getStatusConfig = (status: Status) => {
    switch (status) {
      case Status.Booked:
        return {
          color: 'success' as const,
          icon: <BookedIcon />,
          label: 'Booked',
          bgColor: '#e8f5e8',
          textColor: '#2e7d2e',
        };
      default:
        return {
          color: 'info' as const,
          icon: <AvailableIcon />,
          label: 'Available',
          bgColor: '#e3f2fd',
          textColor: '#1976d2',
        };
    }
  };

  /**
   * Format time range for display
   * Converts 24-hour format to 12-hour AM/PM format
   */
  const formatTimeRange = (startTime: string, endTime: string) => {
    const start = dayjs(startTime, "HH:mm").format("h:mm A");
    const end = dayjs(endTime, "HH:mm").format("h:mm A");
    return `${start} - ${end}`;
  };

  // Show empty state when no slots are available
  if (slots.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          borderRadius: 3,
          border: '1px dashed #dee2e6',
        }}
      >
        <ScheduleIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No slots scheduled
        </Typography>
        <Typography variant="body2" color="text.disabled">
          Click "Add New Slot" to create your first availability slot for this date.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      {/* Statistics Summary */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          backgroundColor: '#f8f9fa',
          borderRadius: 2,
          border: '1px solid #e9ecef',
        }}
      >
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <Chip
            icon={<ScheduleIcon />}
            label={`${slotStats.total} Total Slots`}
            variant="outlined"
            size="small"
          />
          <Chip
            icon={<BookedIcon />}
            label={`${slotStats.booked} Booked`}
            color="success"
            variant="outlined"
            size="small"
          />
          <Chip
            icon={<AvailableIcon />}
            label={`${slotStats.available} Available`}
            color="info"
            variant="outlined"
            size="small"
          />
        </Stack>
      </Paper>

      {/* Slots List */}
      <Stack spacing={2}>
        {slots.map((slot, index) => {
          const statusConfig = getStatusConfig(slot.apptStatus);
          
          return (
            <Card
              key={slot.id || index}
              elevation={2}
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                border: `2px solid ${statusConfig.bgColor}`,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
              }}
            >
              {/* Card Header with Status Indicator */}
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${statusConfig.bgColor} 0%, ${statusConfig.bgColor}dd 100%)`,
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {/* Hospital Avatar */}
                  <Avatar
                    sx={{
                      backgroundColor: statusConfig.textColor,
                      color: 'white',
                      width: 40,
                      height: 40,
                    }}
                  >
                    <LocationIcon />
                  </Avatar>
                  
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: statusConfig.textColor,
                        fontSize: '1.1rem',
                      }}
                    >
                      {hospitalMapping[slot.hospitalId] || 'Unknown Hospital'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: statusConfig.textColor,
                        opacity: 0.8,
                        fontSize: '0.875rem',
                      }}
                    >
                      {dayjs(slot.slotDate).format("dddd, MMMM DD, YYYY")}
                    </Typography>
                  </Box>
                </Box>

                {/* Status Chip */}
                <Chip
                  icon={statusConfig.icon}
                  label={statusConfig.label}
                  color={statusConfig.color}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    '& .MuiChip-icon': {
                      fontSize: 18,
                    },
                  }}
                />
              </Box>

              <CardContent sx={{ p: 3 }}>
                {/* Time Information */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 3,
                    p: 2,
                    backgroundColor: '#f8f9fa',
                    borderRadius: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: '#6c757d',
                      color: 'white',
                      width: 36,
                      height: 36,
                    }}
                  >
                    <TimeIcon />
                  </Avatar>
                  
                  <Box flex={1}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Time Slot
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        fontFamily: 'monospace',
                      }}
                    >
                      {formatTimeRange(slot.startTime, slot.endTime)}
                    </Typography>
                  </Box>
                  
                  {/* Duration Badge */}
                  <Chip
                    label={`${dayjs(slot.endTime, "HH:mm").diff(dayjs(slot.startTime, "HH:mm"), 'minute')} min`}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 500 }}
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Action Buttons */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  <Tooltip title="Edit this time slot" arrow>
                    <IconButton
                      color="primary"
                      size="large"
                      sx={{
                        backgroundColor: '#e3f2fd',
                        '&:hover': {
                          backgroundColor: '#bbdefb',
                          transform: 'scale(1.05)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Delete this time slot" arrow>
                    <IconButton
                      color="error"
                      size="large"
                      onClick={() => deleteSlot(slot.id)}
                      sx={{
                        backgroundColor: '#ffebee',
                        '&:hover': {
                          backgroundColor: '#ffcdd2',
                          transform: 'scale(1.05)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Booked Slot Alert */}
                {slot.apptStatus === Status.Booked && (
                  <Alert
                    severity="info"
                    sx={{
                      mt: 2,
                      borderRadius: 2,
                      '& .MuiAlert-message': {
                        fontSize: '0.875rem',
                      },
                    }}
                  >
                    This slot is currently booked and cannot be deleted.
                  </Alert>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
};

export default SlotsByDay;
