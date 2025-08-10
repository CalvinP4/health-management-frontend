import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Grid2,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { pdfjs } from "react-pdf";

// Types
import { IPatient } from "../../types/Patients";
import { IAppointment } from "../../types/Appointments";
import { IDoctor } from "../../types/Doctors";
import { IProfile } from "../../types/Profile";

// Components
import PatientDetailsCard from "./components/PatientDetailsCard";
import SymptomsBox from "./components/SymptomsBox";
import PatientHistoryTabs from "./components/PatientHistoryTabs";
import NotesTab from "./components/NotesTab";
import ChatGPTCard from "./components/ChatGPTCard";
import TestHistoryCard from "./components/TestHistoryCard";
import ReportModal from "./components/ReportModal";
import FooterV2 from "../../components/FooterV2";
import HeaderV2 from "../../components/HeaderV2";
import { HeaderProvider } from "../../context/HeaderContext";

// Assets
import pdfFile from "../../assets/mock2.pdf";

// API
import axios from "axios";

// Constants
const PDF_WORKER_SRC = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;
const BACKEND_URL = process.env.REACT_APP_BACKEND_SERVER_URL || "http://localhost:8000";

// Configure PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC;

// Types
interface PrescriptionState {
  doctor: IDoctor;
  patient: IPatient;
  appointment: IAppointment;
}

interface LoadingStates {
  savingNotes: boolean;
  completingAppointment: boolean;
  fetchingHistory: boolean;
  uploadingPdf: boolean;
}

interface ErrorStates {
  history: string | null;
  notes: string | null;
  appointment: string | null;
  pdf: string | null;
}

// Custom hooks
const useLocationState = (): PrescriptionState => {
  const location = useLocation();
  
  if (!location.state) {
    throw new Error("No state data provided to PrescriptionV2 component");
  }

  return {
    doctor: location.state.doctor as IDoctor,
    patient: location.state.patient as IPatient,
    appointment: location.state.appointment as IAppointment,
  };
};

const usePatientHistory = (patientId: string) => {
  const [history, setHistory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${BACKEND_URL}/get-history${patientId}`);
        setHistory(response.data.response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch patient history");
        console.error("Error fetching patient history:", err);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchHistory();
    }
  }, [patientId]);

  return { history, loading, error };
};

const useAppointmentActions = (appointment: IAppointment, navigate: ReturnType<typeof useNavigate>) => {
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    savingNotes: false,
    completingAppointment: false,
    fetchingHistory: false,
    uploadingPdf: false,
  });
  
  const [errors, setErrors] = useState<ErrorStates>({
    history: null,
    notes: null,
    appointment: null,
    pdf: null,
  });

  const updateLoadingState = useCallback((key: keyof LoadingStates, value: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateErrorState = useCallback((key: keyof ErrorStates, value: string | null) => {
    setErrors(prev => ({ ...prev, [key]: value }));
  }, []);

  const saveNotes = useCallback(async (notes: string) => {
    try {
      updateLoadingState('savingNotes', true);
      updateErrorState('notes', null);
      
      const updatedAppointment: IAppointment = {
        ...appointment,
        notes,
      };

      const response = await axios.put(`${BACKEND_URL}/appointment/`, updatedAppointment);
      
      if (response.status === 200) {
        console.log("Notes saved successfully");
        return true;
      }
      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to save notes";
      updateErrorState('notes', errorMessage);
      console.error("Error saving notes:", err);
      return false;
    } finally {
      updateLoadingState('savingNotes', false);
    }
  }, [appointment, updateLoadingState, updateErrorState]);

  const completeAppointment = useCallback(async (notes: string, doctor: IDoctor) => {
    try {
      updateLoadingState('completingAppointment', true);
      updateErrorState('appointment', null);
      
      const completedAppointment: IAppointment = {
        ...appointment,
        notes,
        apptStatus: "completed",
      };

      const response = await axios.put(`${BACKEND_URL}/appointment/`, completedAppointment);
      
      if (response.status === 200) {
        console.log("Appointment completed successfully");
        navigate("/doctor", { state: doctor });
        return true;
      }
      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to complete appointment";
      updateErrorState('appointment', errorMessage);
      console.error("Error completing appointment:", err);
      return false;
    } finally {
      updateLoadingState('completingAppointment', false);
    }
  }, [appointment, navigate, updateLoadingState, updateErrorState]);

  const uploadPdfForAnalysis = useCallback(async (setBloodReport: (report: string) => void) => {
    try {
      updateLoadingState('uploadingPdf', true);
      updateErrorState('pdf', null);
      
      const formData = new FormData();
      const blob = await fetch(pdfFile).then((r) => r.blob());
      formData.append("pdf", blob, "mock2.pdf");

      const response = await axios.post(`${BACKEND_URL}/upload-pdf`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.insights?.[0]?.content?.[0]?.text?.value) {
        setBloodReport(response.data.insights[0].content[0].text.value);
        return true;
      } else {
        throw new Error("Invalid response format from PDF analysis");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to analyze PDF";
      updateErrorState('pdf', errorMessage);
      console.error("Error uploading PDF:", err);
      return false;
    } finally {
      updateLoadingState('uploadingPdf', false);
    }
  }, [updateLoadingState, updateErrorState]);

  return {
    loadingStates,
    errors,
    saveNotes,
    completeAppointment,
    uploadPdfForAnalysis,
  };
};

const PrescriptionV2: React.FC = () => {
  // Router hooks
  const navigate = useNavigate();
  
  // Location state
  const { doctor, patient, appointment } = useLocationState();
  
  // Component state
  const [activeHistoryTab, setActiveHistoryTab] = useState<number>(0);
  const [activeNotesTab, setActiveNotesTab] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");
  const [isTestModalOpen, setIsTestModalOpen] = useState<boolean>(false);
  const [bloodReport, setBloodReport] = useState<string>("");
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  // Custom hooks
  const { history, loading: historyLoading, error: historyError } = usePatientHistory(patient._id);
  const { 
    loadingStates, 
    errors, 
    saveNotes: handleSaveNotes, 
    completeAppointment: handleCompleteAppointment,
    uploadPdfForAnalysis 
  } = useAppointmentActions(appointment, navigate);

  // Memoized values
  const profileData = useMemo((): IProfile => ({
    _id: doctor._id,
    firstName: doctor.firstName,
    middleName: doctor?.middleName || "",
    lastName: doctor.lastName,
    dob: doctor.dob.toString(),
    phoneNo: doctor.phoneNo,
    address: doctor.address,
    age: doctor.age,
    email: doctor.email,
    password: doctor.password,
  }), [doctor]);

  // Event handlers
  const handleHistoryTabChange = useCallback((_event: React.SyntheticEvent, newValue: number) => {
    setActiveHistoryTab(newValue);
  }, []);

  const handleNotesTabChange = useCallback((_event: React.SyntheticEvent, newValue: number) => {
    setActiveNotesTab(newValue);
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }, []);

  const handleOpenTestModal = useCallback(async () => {
    setIsTestModalOpen(true);
    await uploadPdfForAnalysis(setBloodReport);
  }, [uploadPdfForAnalysis]);

  const handleCloseTestModal = useCallback(() => {
    setIsTestModalOpen(false);
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate("/profile", {
      state: {
        isPatient: false,
        profile: profileData,
      },
    });
  }, [navigate, profileData]);

  const logout = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onSaveNotes = useCallback(async () => {
    await handleSaveNotes(notes);
  }, [handleSaveNotes, notes]);

  const onCompleteAppointment = useCallback(async () => {
    await handleCompleteAppointment(notes, doctor);
  }, [handleCompleteAppointment, notes, doctor]);

  // Error display component
  const ErrorAlert: React.FC<{ error: string | null; title: string }> = ({ error, title }) => {
    if (!error) return null;
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        <strong>{title}:</strong> {error}
      </Alert>
    );
  };

  return (
    <div style={styles.page}>
      <HeaderProvider>
        <HeaderV2 navigateToProfile={navigateToProfile} logout={logout} />
        
        {/* Doctor Info Section */}
        <Box sx={styles.doctorInfoBox}>
          <Grid2>
            <Grid2 size={6}>
              <Typography variant="h6">Hi, Dr. {doctor.firstName}</Typography>
              <Typography>Appointment: 1</Typography>
              <Typography>Location: County general hospital</Typography>
              <Typography>Date: 22-02-2022</Typography>
            </Grid2>
          </Grid2>
        </Box>

        {/* Error Messages */}
        <Box sx={{ padding: "1rem" }}>
          <ErrorAlert error={historyError} title="History Error" />
          <ErrorAlert error={errors.notes} title="Notes Error" />
          <ErrorAlert error={errors.appointment} title="Appointment Error" />
          <ErrorAlert error={errors.pdf} title="PDF Analysis Error" />
        </Box>

        {/* Main Content */}
        <Box sx={styles.mainContent}>
          {historyLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>Loading patient history...</Typography>
            </Box>
          ) : (
            <Grid2 container spacing={2}>
              {/* Left Column */}
              <Grid2 size={3}>
                <PatientDetailsCard patient={patient} />
                <SymptomsBox symptoms={appointment.symptoms} />
              </Grid2>

              {/* Center Column */}
              <Grid2 size={6}>
                <PatientHistoryTabs
                  value={activeHistoryTab}
                  handleChange={handleHistoryTabChange}
                  history={history}
                />
                <NotesTab
                  value={activeNotesTab}
                  handleChange={handleNotesTabChange}
                  setNotes={setNotes}
                />
                
                {/* Action Buttons */}
                <Box sx={styles.buttonContainer}>
                  <Button 
                    variant="contained" 
                    onClick={onSaveNotes}
                    disabled={loadingStates.savingNotes}
                    startIcon={loadingStates.savingNotes && <CircularProgress size={20} />}
                  >
                    {loadingStates.savingNotes ? 'Saving...' : 'Save'}
                  </Button>

                  <Button
                    variant="contained"
                    onClick={onCompleteAppointment}
                    disabled={loadingStates.completingAppointment}
                    startIcon={loadingStates.completingAppointment && <CircularProgress size={20} />}
                  >
                    {loadingStates.completingAppointment ? 'Completing...' : 'Complete'}
                  </Button>
                </Box>
              </Grid2>

              {/* Right Column */}
              <Grid2 size={3}>
                <ChatGPTCard />
                <TestHistoryCard 
                  openModal={handleOpenTestModal}
                />
              </Grid2>
            </Grid2>
          )}

          {/* Report Modal */}
          <ReportModal
            isTestModalOpen={isTestModalOpen}
            handleCloseTestModal={handleCloseTestModal}
            pdfFile={pdfFile}
            onDocumentLoadSuccess={onDocumentLoadSuccess}
            bloodReport={bloodReport}
          />
        </Box>

        <FooterV2 />
      </HeaderProvider>
    </div>
  );
};

// Styles
const styles = {
  page: {
    paddingLeft: "15rem",
    paddingRight: "15rem",
  },
  doctorInfoBox: {
    width: "30%",
    backgroundColor: "#e8f5fe",
    marginTop: 5,
    marginLeft: 1,
    padding: 1,
  },
  mainContent: {
    height: "80vh",
    overflowY: "scroll" as const,
    padding: "2rem",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    mt: 2,
    gap: 2,
  },
} as const;

export default PrescriptionV2;
