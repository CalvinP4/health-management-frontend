import {
  Typography,
  Button as ButtonMUI,
  IconButton,
  Modal,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { IHospital } from "../../../types/Hospital";
import { IDoctor } from "../../../types/Doctors";
import { ISlot } from "../../../types/Slot";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const BookAppointmentModal = (props: {
  open: boolean;
  setOpen: (value: boolean) => void;
  hospitalList: IHospital[];
  doctorsList: IDoctor[];
  hospital: number;
  setHospital: (value: number) => void;
  doctor: number;
  setDoctor: (value: number) => void;
  slot: number;
  setSlot: (value: number) => void;
  type: string;
  setType: (value: string) => void;
  value: Dayjs | null;
  reason: string;
  setReason: (value: string) => void;
  symptoms: string;
  setSymptoms: (value: string) => void;
  fetchDoctorsByHospital: (hospitalId: number) => void;
  fetchSlots: () => void;
  slots: ISlot[];
  bookAppointment: () => void;
  setValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
}) => {
  return (
    <Modal
      open={props.open}
      onClose={() => {
        props.setOpen(false);
      }}
    >
      <Box
        component="form"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Book Appointment</Typography>
          <IconButton
            onClick={() => {
              props.setOpen(false);
            }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <TextField
          id="outlined-basic"
          label="Reason"
          variant="outlined"
          value={props.reason}
          onChange={(e) => props.setReason(e.target.value)}
          fullWidth
        />
        <TextField
          id="symptoms"
          label="Symptoms"
          variant="outlined"
          value={props.symptoms}
          fullWidth
          multiline
          onChange={(e) => props.setSymptoms(e.target.value)}
          maxRows={4}
        />
        <FormControl>
          <InputLabel>Hospital</InputLabel>
          <Select
            value={props.hospital}
            onChange={(e) => {
              props.setHospital(e.target.value as number);
              props.fetchDoctorsByHospital(e.target.value as number);
            }}
            label="Hospital"
          >
            {props.hospitalList.map((h) => (
              <MenuItem value={h.id}>{h.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Type</InputLabel>
          <Select
            value={props.type}
            onChange={(e) => props.setType(e.target.value)}
            label="Type"
          >
            <MenuItem value={"Checkup"}>Checkup</MenuItem>
            <MenuItem value={"Emergency"}>Emergency</MenuItem>
            <MenuItem value={"Follow up"}>Follow up</MenuItem>
            <MenuItem value={"Consultation"}>Consultation</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Doctor</InputLabel>
          <Select
            value={props.doctor}
            onChange={(e) => {
              props.setDoctor(e.target.value as number);
              props.fetchSlots();
            }}
            label="Doctor"
          >
            {props.doctorsList.map((d: IDoctor) => (
              <MenuItem value={d.id}>{d.firstName + " " + d.lastName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Slot</InputLabel>
          <Select
            value={props.slot}
            onChange={(e) => props.setSlot(e.target.value as number)}
            label="Slot"
          >
            {props.slots
              .filter((s: ISlot) => s.apptStatus === 0)
              .map((s: ISlot) => (
                <MenuItem value={s.id}>
                  {s.startTime + " - " + s.endTime}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={props.value}
            defaultValue={dayjs("2022-04-17")}
            onChange={(newValue) => {
              props.setValue(newValue);
            }}
          />
        </LocalizationProvider>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <ButtonMUI
            variant="contained"
            onClick={() => {
              props.bookAppointment();
            }}
          >
            Book
          </ButtonMUI>
          <ButtonMUI
            variant="outlined"
            onClick={() => {
              props.setOpen(false);
            }}
          >
            Cancel
          </ButtonMUI>
        </Box>
      </Box>
    </Modal>
  );
};


export default BookAppointmentModal;