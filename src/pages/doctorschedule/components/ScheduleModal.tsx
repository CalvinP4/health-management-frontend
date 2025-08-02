import React from "react";
import { IDoctor } from "../../../types/Doctors";
import dayjs, { Dayjs } from "dayjs";
import {
  Box,
  Button,
  Card as CardMUI,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  DialogActions,
} from "@mui/material";

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

const ScheduleModal: React.FC<IScheduleModalProps> = (props) => {
  const [errors, setErrors] = React.useState({
    start: false,
    end: false,
    hospitalId: false,
  });

  const validateInputs = (): boolean => {
    const newErrors = {
      start: !props.slotForm.start,
      end: !props.slotForm.end,
      hospitalId: props.slotForm.hospitalId === -1,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleAddSlot = () => {
    if (validateInputs()) {
      props.addSlot(
        props.doctor.id,
        props.value?.format("YYYY-MM-DD") ?? "",
        props.slotForm.start,
        props.slotForm.end,
        props.slotForm.hospitalId
      );
    }
  };

  return (
    <Dialog
      open
      onClose={() => props.setShowSlotModal(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add Slot</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        >
          <TextField
            label="Day"
            type="date"
            name="day"
            value={props.value?.format("YYYY-MM-DD")}
            onChange={props.handleSlotFormChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Start Time"
            type="time"
            name="start"
            value={props.slotForm.start}
            onChange={props.handleSlotFormChange}
            error={errors.start}
            helperText={errors.start ? "Start time is required" : ""}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="End Time"
            type="time"
            name="end"
            value={props.slotForm.end}
            onChange={props.handleSlotFormChange}
            error={errors.end}
            helperText={errors.end ? "End time is required" : ""}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            select
            label="Hospital"
            name="hospitalId"
            value={props.slotForm.hospitalId}
            onChange={props.handleSlotFormChange}
            error={errors.hospitalId}
            helperText={errors.hospitalId ? "Please select a hospital" : ""}
            fullWidth
          >
            <MenuItem value={-1}>Select Hospital</MenuItem>
            {props.hospitals.map((hospital) => (
              <MenuItem key={hospital.id} value={hospital.id}>
                {hospital.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddSlot}
          sx={{ textTransform: "none" }}
        >
          Add Slot
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => props.setShowSlotModal(false)}
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleModal;
