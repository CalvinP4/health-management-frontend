import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button as ButtonMUI,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { IDoctor } from "../../../types/Doctors";
import { IPatient } from "../../../types/Patients";
import { IAppointment } from "../../../types/Appointments";
import { useEffect, useState } from "react";
import { IHospital } from "../../../types/Hospital";
import axios from "axios";

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

const AppointmentSection = (props: {
  patient: IPatient;
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  appointments: IAppointment[];
  doctors: IDoctor[];
  hospitals: IHospital[];
}) => {

  return (
    <section>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={props.value}
          onChange={props.handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Upcoming Appointments" />
          <Tab label="Past Appointments" />
        </Tabs>
      </Box>
      <Box>
        <CustomTabPanel value={props.value} index={0}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">Doctor</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Hospital</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Date</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Time</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Type</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Reason</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.appointments.map((appointment) => {
                  const startTime = new Date(appointment.startTime);
                  const doctor =
                    props.doctors.find((d) => d.id === appointment.doctorId) ?? null;
                  const hospital =
                    props.hospitals.find((h) => h.id === appointment.hospitalId) ??
                    null;

                  return (
                    <TableRow
                      key={appointment.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {doctor?.firstName + " " + doctor?.lastName}
                      </TableCell>
                      <TableCell>{hospital?.name}</TableCell>
                      <TableCell>{startTime.toLocaleDateString()}</TableCell>
                      <TableCell>{startTime.toLocaleTimeString()}</TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>{appointment.reason}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>
        <CustomTabPanel value={props.value} index={1}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">Doctor</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Hospital</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Date</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Time</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Type</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.appointments.map((appointment) => {
                  const startTime = new Date(appointment.startTime);
                  const doctor = props.doctors.find(
                    (doctor) => doctor.id === appointment.doctorId
                  ) as IDoctor;
                  const hospital = props.hospitals.find(
                    (hospital) => hospital.id === appointment.hospitalId
                  ) as IHospital;

                  return (
                    <TableRow
                      key={appointment.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {doctor?.firstName + " " + doctor?.lastName}
                      </TableCell>
                      <TableCell>{hospital?.name}</TableCell>
                      <TableCell>{startTime.toLocaleDateString()}</TableCell>
                      <TableCell>{startTime.toLocaleTimeString()}</TableCell>
                      <TableCell>{appointment.type}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>
      </Box>
    </section>
  );
};

export default AppointmentSection;
