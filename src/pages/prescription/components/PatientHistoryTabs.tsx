import React, { useMemo, useCallback } from "react";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Card,
  Chip,
  Stack,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  History as HistoryIcon,
  Warning as AllergyIcon,
  Vaccines as VaccineIcon,
  Medication as MedicationIcon,
  CalendarToday as DateIcon,
} from "@mui/icons-material";

// Types
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface PatientHistoryTabsProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  history: string;
  loading?: boolean;
}

interface MedicalItem {
  id: string;
  name: string;
  details: string;
  severity?: 'low' | 'medium' | 'high';
  date?: string;
}

interface TabConfig {
  label: string;
  icon: React.ReactElement;
  color: 'primary' | 'warning' | 'success' | 'info';
}

// Tab Panel Component
const CustomTabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`patient-history-tabpanel-${index}`}
      aria-labelledby={`patient-history-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

// Medical Item Card Component
const MedicalItemCard: React.FC<{ 
  item: MedicalItem; 
  showSeverity?: boolean;
  showDate?: boolean;
}> = ({ item, showSeverity = false, showDate = false }) => {
  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'info';
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
        mb: 1.5,
        borderRadius: 2,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transform: 'translateY(-1px)',
        },
        '&:last-child': {
          mb: 0,
        }
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box flex={1}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 600, 
              color: 'text.primary',
              mb: 0.5 
            }}
          >
            {item.name}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              fontStyle: 'italic' 
            }}
          >
            {item.details}
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={1} alignItems="center">
          {showSeverity && item.severity && (
            <Chip
              label={item.severity.toUpperCase()}
              size="small"
              color={getSeverityColor(item.severity) as any}
              variant="outlined"
            />
          )}
          {showDate && item.date && (
            <Chip
              icon={<DateIcon sx={{ fontSize: 16 }} />}
              label={item.date}
              size="small"
              variant="outlined"
              color="default"
            />
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

// Empty State Component
const EmptyState: React.FC<{ message: string; icon: React.ReactNode }> = ({ message, icon }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4,
      color: 'text.secondary',
    }}
  >
    <Box sx={{ fontSize: 48, mb: 2, opacity: 0.5 }}>
      {icon}
    </Box>
    <Typography variant="body2" align="center">
      {message}
    </Typography>
  </Box>
);

// Main Component
const PatientHistoryTabs: React.FC<PatientHistoryTabsProps> = ({ 
  value, 
  handleChange, 
  history, 
  loading = false 
}) => {
  // Tab configuration
  const tabConfig: TabConfig[] = useMemo(() => [
    { label: 'History', icon: <HistoryIcon />, color: 'primary' },
    { label: 'Allergies', icon: <AllergyIcon />, color: 'warning' },
    { label: 'Vaccinations', icon: <VaccineIcon />, color: 'success' },
    { label: 'Medications', icon: <MedicationIcon />, color: 'info' },
  ], []);

  // Mock data - in real app, these would come from props or API
  const allergies: MedicalItem[] = useMemo(() => [
    {
      id: '1',
      name: 'Penicillin',
      details: 'Severe allergic reaction - anaphylaxis risk',
      severity: 'high',
    },
    {
      id: '2',
      name: 'Tree Nuts',
      details: 'Moderate reaction - swelling and rash',
      severity: 'medium',
    },
  ], []);

  const vaccinations: MedicalItem[] = useMemo(() => [
    {
      id: '1',
      name: 'COVID-19',
      details: 'Pfizer-BioNTech (2 doses + booster)',
      date: '20-02-2020',
    },
    {
      id: '2',
      name: 'Measles',
      details: 'MMR Vaccine',
      date: '16-05-2008',
    },
  ], []);

  const medications: MedicalItem[] = useMemo(() => [
    {
      id: '1',
      name: 'Metformin',
      details: '2mg - Twice daily with meals',
    },
    {
      id: '2',
      name: 'Lisinopril',
      details: '5mg - Once daily in the morning',
    },
  ], []);

  // Accessibility helper
  const a11yProps = useCallback((index: number) => ({
    id: `patient-history-tab-${index}`,
    'aria-controls': `patient-history-tabpanel-${index}`,
  }), []);

  if (loading) {
    return (
      <Card variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
        <CircularProgress size={40} />
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          Loading patient history...
        </Typography>
      </Card>
    );
  }

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      }}
    >
      {/* Tabs Header */}
      <Box sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        backgroundColor: '#f8faff',
      }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Patient medical history tabs"
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              minHeight: 64,
              textTransform: 'none',
              fontWeight: 500,
              '&.Mui-selected': {
                fontWeight: 600,
              }
            }
          }}
        >
          {tabConfig.map((tab, index) => (
            <Tab
              key={index}
              icon={tab.icon}
              iconPosition="start"
              label={tab.label}
              {...a11yProps(index)}
              sx={{
                '& .MuiTab-iconWrapper': {
                  marginRight: 1,
                  marginBottom: 0,
                }
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ 
        minHeight: 200, 
        maxHeight: 400, 
        overflowY: 'auto',
        p: 2,
        backgroundColor: '#ffffff',
      }}>
        {/* History Tab */}
        <CustomTabPanel value={value} index={0}>
          {history ? (
            <Alert 
              severity="info" 
              icon={<HistoryIcon />}
              sx={{ 
                borderRadius: 2,
                '& .MuiAlert-message': {
                  width: '100%'
                }
              }}
            >
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                {history}
              </Typography>
            </Alert>
          ) : (
            <EmptyState 
              message="No medical history available" 
              icon={<HistoryIcon />} 
            />
          )}
        </CustomTabPanel>

        {/* Allergies Tab */}
        <CustomTabPanel value={value} index={1}>
          {allergies.length > 0 ? (
            <Stack spacing={0}>
              <Typography variant="h6" sx={{ mb: 2, color: 'warning.main' }}>
                ⚠️ Known Allergies
              </Typography>
              {allergies.map((allergy) => (
                <MedicalItemCard 
                  key={allergy.id} 
                  item={allergy} 
                  showSeverity 
                />
              ))}
            </Stack>
          ) : (
            <EmptyState 
              message="No known allergies recorded" 
              icon={<AllergyIcon />} 
            />
          )}
        </CustomTabPanel>

        {/* Vaccinations Tab */}
        <CustomTabPanel value={value} index={2}>
          {vaccinations.length > 0 ? (
            <Stack spacing={0}>
              <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
                💉 Vaccination History
              </Typography>
              {vaccinations.map((vaccination) => (
                <MedicalItemCard 
                  key={vaccination.id} 
                  item={vaccination} 
                  showDate 
                />
              ))}
            </Stack>
          ) : (
            <EmptyState 
              message="No vaccination records available" 
              icon={<VaccineIcon />} 
            />
          )}
        </CustomTabPanel>

        {/* Medications Tab */}
        <CustomTabPanel value={value} index={3}>
          {medications.length > 0 ? (
            <Stack spacing={0}>
              <Typography variant="h6" sx={{ mb: 2, color: 'info.main' }}>
                💊 Current Medications
              </Typography>
              {medications.map((medication) => (
                <MedicalItemCard 
                  key={medication.id} 
                  item={medication} 
                />
              ))}
            </Stack>
          ) : (
            <EmptyState 
              message="No current medications recorded" 
              icon={<MedicationIcon />} 
            />
          )}
        </CustomTabPanel>
      </Box>
    </Card>
  );
};

export default PatientHistoryTabs;
