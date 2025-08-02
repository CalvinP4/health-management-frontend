import React from "react";
import { 
  TextField, 
  FormControl, 
  Button, 
  Box, 
  Paper,
  Typography,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import { 
  Person, 
  Phone, 
  Email, 
  Home, 
  Lock, 
  Edit,
  Save,
} from "@mui/icons-material";
import { IProfile } from "../../../types/Profile";

/**
 * FormComponent - Professional Profile Update Form
 * 
 * A modern, accessible form component for updating user profile information with:
 * - Organized field sections with visual separation
 * - Disabled fields for read-only information
 * - Enhanced styling with icons and proper spacing
 * - Maintains gray theme consistency
 */
const FormComponent: React.FC<{
  registerForm: IProfile;
  handleRegisterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}> = ({ registerForm, handleRegisterChange, onSubmit }) => {
  
  // Form field configuration with icons and grouping
  const personalInfoFields = [
    { id: "firstName", label: "First Name", type: "text", disabled: true, icon: <Person /> },
    { id: "middleName", label: "Middle Name", type: "text", disabled: true, icon: <Person /> },
    { id: "lastName", label: "Last Name", type: "text", disabled: true, icon: <Person /> },
    { id: "age", label: "Age", type: "number", disabled: true, icon: <Person /> },
  ];

  const contactInfoFields = [
    { id: "phoneNo", label: "Phone Number", type: "text", disabled: false, icon: <Phone /> },
    { id: "email", label: "Email Address", type: "email", disabled: true, icon: <Email /> },
    { id: "address", label: "Home Address", type: "text", disabled: false, icon: <Home /> },
  ];

  const securityFields = [
    { id: "password", label: "Password", type: "password", disabled: false, icon: <Lock /> },
  ];

  const renderFieldSection = (
    title: string,
    fields: typeof personalInfoFields,
    chipColor: string
  ) => (
    <Box sx={{ mb: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Chip
          label={title}
          size="small"
          sx={{
            backgroundColor: chipColor,
            color: 'white',
            fontWeight: 600,
            fontSize: '0.8rem',
          }}
        />
      </Stack>
      <Stack spacing={2}>
        {fields.map(({ id, label, type, disabled, icon }) => (
          <FormControl key={id} fullWidth>
            <TextField
              id={id}
              label={label}
              type={type}
              name={id}
              value={registerForm[id as keyof IProfile] || ""}
              onChange={handleRegisterChange}
              disabled={disabled}
              required={!disabled}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                    {React.cloneElement(icon, {
                      sx: { 
                        fontSize: 20, 
                        color: disabled ? '#bbb' : '#666',
                      }
                    })}
                  </Box>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: disabled ? '#f8f8f8' : '#fff',
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: disabled ? '#e0e0e0' : '#999',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#666',
                    borderWidth: 2,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: disabled ? '#bbb' : '#666',
                  fontWeight: 500,
                  '&.Mui-focused': {
                    color: '#666',
                  },
                },
                '& .MuiInputBase-input': {
                  padding: '14px 16px',
                  fontSize: '1rem',
                },
              }}
            />
          </FormControl>
        ))}
      </Stack>
    </Box>
  );

  return (
    <Paper
      elevation={2}
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid #e0e0e0',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
          p: 3,
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Edit sx={{ fontSize: 28, color: '#666' }} />
          <Box>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                color: '#333',
                mb: 0.5,
              }}
            >
              Update Profile
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#666',
                fontWeight: 500,
              }}
            >
              Modify your contact information and security settings
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Form Content */}
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ p: 4 }}
      >
        {/* Personal Information Section */}
        {renderFieldSection("Personal Information", personalInfoFields, "#999")}
        
        <Divider sx={{ my: 3, borderColor: '#e8e8e8' }} />
        
        {/* Contact Information Section */}
        {renderFieldSection("Contact Information", contactInfoFields, "#777")}
        
        <Divider sx={{ my: 3, borderColor: '#e8e8e8' }} />
        
        {/* Security Section */}
        {renderFieldSection("Security", securityFields, "#666")}

        {/* Submit Button */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            type="submit"
            data-testid="profile-update-btn"
            startIcon={<Save />}
            sx={{
              backgroundColor: '#666',
              color: 'white',
              fontWeight: 600,
              py: 1.5,
              px: 4,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              '&:hover': {
                backgroundColor: '#555',
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Update Profile
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default FormComponent;