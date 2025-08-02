import React, { useMemo } from "react";
import { 
  Avatar, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Chip,
  Divider,
  Stack
} from "@mui/material";
import { 
  Person as PersonIcon,
  Cake as CakeIcon,
  Monitor as MonitorIcon,
  Bloodtype as BloodtypeIcon
} from "@mui/icons-material";
import { IPatient } from "../../../types/Patients";
import avatarImage from "../../../assets/kamala.jpg";

// Types
interface PatientDetailsCardProps {
  patient: IPatient;
}

interface PatientInfo {
  label: string;
  value: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}

// Utility functions
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
};

const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

const PatientDetailsCard: React.FC<PatientDetailsCardProps> = ({ patient }) => {
  // Memoized patient information
  const patientInfo = useMemo((): PatientInfo[] => [
    {
      label: 'Age',
      value: `${patient.age} years`,
      icon: <PersonIcon sx={{ fontSize: 16 }} />,
      color: 'primary'
    },
    {
      label: 'Gender',
      value: 'Male', // TODO: Add gender field to IPatient interface
      icon: <PersonIcon sx={{ fontSize: 16 }} />,
      color: 'info'
    },
    {
      label: 'Blood Group',
      value: 'O+', // TODO: Add bloodGroup field to IPatient interface
      icon: <BloodtypeIcon sx={{ fontSize: 16 }} />,
      color: 'error'
    },
    {
      label: 'Weight',
      value: '70 kg', // TODO: Add weight field to IPatient interface
      icon: <MonitorIcon sx={{ fontSize: 16 }} />,
      color: 'secondary'
    },
    {
      label: 'Height',
      value: '6ft', // TODO: Add height field to IPatient interface
      icon: <MonitorIcon sx={{ fontSize: 16 }} />,
      color: 'secondary'
    },
    {
      label: 'Date of Birth',
      value: formatDate(patient.dob),
      icon: <CakeIcon sx={{ fontSize: 16 }} />,
      color: 'success'
    }
  ], [patient]);

  const fullName = useMemo(() => 
    `${patient.firstName} ${patient.lastName}`.trim(),
    [patient.firstName, patient.lastName]
  );

  const initials = useMemo(() => 
    getInitials(patient.firstName, patient.lastName),
    [patient.firstName, patient.lastName]
  );

  return (
    <Card 
      variant="outlined" 
      sx={{
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #e0e7ff',
        background: 'linear-gradient(135deg, #f8faff 0%, #ffffff 100%)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        }
      }}
    >
      {/* Header Section with Avatar and Name */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: 3,
          textAlign: 'center',
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
        <Avatar
          alt={fullName}
          src={avatarImage}
          sx={{
            width: 80,
            height: 80,
            margin: '0 auto 16px',
            border: '4px solid rgba(255,255,255,0.2)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          {initials}
        </Avatar>
        
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 700,
            fontSize: '1.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: 1,
            position: 'relative',
            zIndex: 1
          }}
        >
          {fullName}
        </Typography>
        
        <Chip 
          label="Patient" 
          size="small"
          sx={{ 
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            fontWeight: 500,
            position: 'relative',
            zIndex: 1
          }} 
        />
      </Box>

      {/* Patient Information Section */}
      <CardContent sx={{ padding: 0 }}>
        <Stack spacing={0} divider={<Divider />}>
          {patientInfo.map((info, index) => (
            <Box
              key={index}
              sx={{
                padding: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  backgroundColor: '#f8faff',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: `${info.color}.light`,
                    color: `${info.color}.main`,
                  }}
                >
                  {info.icon}
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 500,
                    color: 'text.secondary',
                    fontSize: '0.875rem'
                  }}
                >
                  {info.label}
                </Typography>
              </Box>
              
              <Chip
                label={info.value}
                size="small"
                color={info.color}
                variant="outlined"
                sx={{
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  '& .MuiChip-label': {
                    padding: '0 8px'
                  }
                }}
              />
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PatientDetailsCard;
