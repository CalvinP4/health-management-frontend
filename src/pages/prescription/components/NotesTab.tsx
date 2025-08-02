import React, { useState, useRef } from "react";
import { Box, IconButton, Tab, Tabs, TextField, Snackbar, Alert, CircularProgress } from "@mui/material";
import { Medication, Mic, MicOff, Notes } from "@mui/icons-material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const NotesTab = (props: {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  setNotes: (notes: string) => void;
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState<string | null>(null);
  const [currentNotes, setCurrentNotes] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      setTranscriptionError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      setTranscriptionError('Failed to start recording. Please check your microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.wav');
      formData.append('model', 'whisper-1');

      // Note: You'll need to replace 'YOUR_OPENAI_API_KEY' with your actual API key
      // In a production app, this should be handled by your backend for security
      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const transcribedText = result.text;
      
      // Append transcribed text to existing notes
      const updatedNotes = currentNotes + (currentNotes ? ' ' : '') + transcribedText;
      setCurrentNotes(updatedNotes);
      props.setNotes(updatedNotes);
    } catch (error) {
      console.error('Error transcribing audio:', error);
      setTranscriptionError('Failed to transcribe audio. Please try again.');
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const newValue = event.target.value;
    setCurrentNotes(newValue);
    props.setNotes(newValue);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginTop: 2 }}>
        <Tabs
          value={props.value}
          onChange={props.handleChange}
          aria-label="basic tabs example"
        >
          <Tab icon={<Notes />} label="Notes" />
          <Tab icon={<Medication />} label="Medication" />
        </Tabs>
      </Box>
      <Box sx={{ height: 200, overflowY: "auto" }}>
        <CustomTabPanel value={props.value} index={0}>
          <TextField
            id="outlined-multiline-static"
            label="Please enter your notes here"
            multiline
            rows={4}
            sx={{ width: "95%" }}
            value={currentNotes}
            onChange={handleNotesChange}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <IconButton
              onClick={handleMicClick}
              disabled={isTranscribing}
              color={isRecording ? "error" : "primary"}
              sx={{ 
                backgroundColor: isRecording ? 'rgba(244, 67, 54, 0.1)' : 'rgba(25, 118, 210, 0.1)',
                '&:hover': {
                  backgroundColor: isRecording ? 'rgba(244, 67, 54, 0.2)' : 'rgba(25, 118, 210, 0.2)',
                }
              }}
            >
              {isRecording ? <MicOff /> : <Mic />}
            </IconButton>
            {isTranscribing && <CircularProgress size={20} />}
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={props.value} index={1}></CustomTabPanel>
      </Box>
      
      {/* Snackbar for error messages */}
      <Snackbar 
        open={!!transcriptionError} 
        autoHideDuration={6000} 
        onClose={() => setTranscriptionError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={() => setTranscriptionError(null)} severity="error" sx={{ width: '100%' }}>
          {transcriptionError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NotesTab;
