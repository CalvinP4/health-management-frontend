import { IAppointment } from "../../../types/Appointments";
import { IDoctor } from "../../../types/Doctors";
import { IPatient } from "../../../types/Patients";
import {
  Box,
  Button as ButtonMUI,
  Typography,
  Card as CardMUI,
  CardContent,
  Avatar,
  Grid,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  DeviceThermostat,
  MedicalInformation,
  Notes,
  Place,
} from "@mui/icons-material";

interface IUpcomingAppointment {
  appointments: IAppointment[];
  patients: IPatient[];
  doctor: IDoctor | null;
}

const UpcomingAppointments = (props: IUpcomingAppointment) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 4, mb: 4, px: { xs: 2, md: 8 } }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Scheduled Appointments
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {props.appointments.map((appointment: IAppointment, index: number) => {
          const patient = props.patients.find(
            (p: IPatient) => p.id === appointment.patientId
          );

          return (
            appointment.status === "Not started" && (
              <Grid item xs={12} md={6} key={index}>
                <CardMUI sx={{ boxShadow: 2, borderRadius: 2 }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt={patient?.firstName}
                        src={require("../../../assets/trump.jpg")}
                      />
                    }
                    title={
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {patient?.firstName + " " + patient?.lastName}
                      </Typography>
                    }
                    subheader={`Appointment ID: ${appointment.id}`}
                  />
                  <CardContent>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <Place color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Hospital ID: ${appointment.hospitalId}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <DeviceThermostat color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={`Type: ${appointment.type}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Notes color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Reason: ${appointment.reason}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <MedicalInformation color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Symptoms: ${appointment.symptoms}`}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                  <Box sx={{ textAlign: "center", p: 2 }}>
                    <ButtonMUI
                      variant="contained"
                      onClick={() =>
                        navigate("/prescription", {
                          state: { appointment, patient, doctor: props.doctor },
                        })
                      }
                      sx={{ textTransform: "none", px: 3 }}
                    >
                      Start Consultation
                    </ButtonMUI>
                  </Box>
                </CardMUI>
              </Grid>
            )
          );
        })}
      </Grid>
    </Box>
  );
};

export default UpcomingAppointments;
