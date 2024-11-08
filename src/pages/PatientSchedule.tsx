import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // or 'react-router-dom' for react-router v6

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import { IAppointment } from "../types/Appointments";
import axios from "axios";


interface AppointmentsProps {
  appointments: IAppointment[];
}

interface AppointmentFormProps {
  onSubmit: (appointmentDetails: IAppointment) => void;
  doctorsList: any[];
}

const Appointments: React.FC<AppointmentsProps> = ({ appointments }) => {
  return (
    <div>
      <h2>Patient's Appointments</h2>
      <ul className="list-group">
        {appointments.map((appointment, index) => (
          <li key={index} className="list-group-item">
            {appointment.doctorId}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  onSubmit,
  doctorsList,
}) => {
  console.log("dlist", doctorsList);
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [specialty, setSpecialty] = useState("Cardiology");
  const [doctors, setDoctors] = useState(doctorsList);
  const specialties = ["Cardiology", "Neurology", "Pediatrics", "Pulmonolgy"];

  useEffect(() => {
    setDoctors(doctorsList);
  }, [doctorsList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleClick = async (event: any) => {
    event.preventDefault();
    let appointmentInfo: any = {};
    appointmentInfo.patientId = "";
    appointmentInfo.doctorId = "";
    appointmentInfo.fees = 49.99;
    appointmentInfo.scheduledAt = new Date();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/appointments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: appointmentInfo, // or null if 'GET'
      }
    );

    const data = await response.json();
  };

  // console.log('doctors',doctors);

  const handleDepartmentChange = (e: any) => {
    setSpecialty(e.target.value);
    // setDoctors(doctors.filter((d: any) => d.specialty === e.target.value));
    console.log("dr", doctors);
  };

  const navigate = useNavigate();


  console.log(doctors);
  return (
    <div
      style={{
        maxWidth: "600px",
        marginTop: "40px",
        width: "110%",
        padding: "20px",
        borderRadius: "5px",
        background: "rgba(255,255,255,0.8)",
        textAlign: "left",
      }}
    >
      <h2>Schedule Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Department:</label>
          <select
            className="form-select"
            value={specialty}
            onChange={(e) => handleDepartmentChange(e)}
          >
            {specialties.map((s: string) => (
              <option value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Doctor Name:</label>
          <select
            className="form-select"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          >
            {doctors
              .filter((d: any) => d.specialty === specialty)
              .map((d: any, index: any) => (
                <option key={index} value={d.name}>
                  {d.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Date:</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Reason:</label>
          <textarea
            className="form-control"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Search
        </button>
      </form>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th scope="col">S.NO</th>
            <th scope="col">Doctor Name</th>
            <th scope="col">Date</th>
            <th scope="col">Available Time</th>
            <th scope="col">Schedule</th>
          </tr>
        </thead>
        <tbody>
          {doctors
            .filter((d: any) => d.specialty === specialty)
            .map((row: any, i: any) =>
              row.availableSlots.map(
                (slot: { start: string; end: string }, j: any) => {
                  let startDate = slot.start.split(" ")[0];
                  console.log(startDate);
                  console.log(date);
                  if (startDate === date) {
                    return (
                      <tr key={i + j + 1}>
                        <th scope="row">{i + j + 1}</th>
                        <td>{row.name}</td>
                        <td>{slot.start.split(" ")[0]}</td>
                        <td>
                          {new Date(slot.start).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}{" "}
                          -{" "}
                          {new Date(slot.end).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </td>
                        <td>
                          <button className="btn btn-secondary" onClick={() => navigate('/patient')}>
                            Schedule
                          </button>
                        </td>
                      </tr>
                    );
                  }
                }
              )
            )}
        </tbody>
      </table>
    </div>
  );
};

function AppointmentScheduler() {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  // const [doctorNames, setDoctorNames] = useState<string[]>([]);
  const [doctors, setDoctors] = useState<[]>([]);

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
    // fetchDoctorNames();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("api/appointments");
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments: ", error);
    }
  };
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/doctors`
      );

      setDoctors(response.data);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
  };

  const scheduleAppointment = async (appointmentDetails: IAppointment) => {
    try {
      const response = await fetch("api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentDetails),
      });
      if (!response.ok) {
        throw new Error("Failed to schedule appointment");
      }
      const newAppointment = await response.json();
      setAppointments([...appointments, newAppointment]);
    } catch (error) {
      console.error("Error scheduling appointment: ", error);
    }
  };
  console.log(doctors);

  return (
    <div
      className="container"
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundImage: `url(${process.env.PUBLIC_URL}/home.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "0.5in",
        minHeight: "calc(100vh - 0.5in)",
      }}
    >
      <div className="row">
        <div className="col">
          <Appointments appointments={appointments} />
          <AppointmentForm
            onSubmit={scheduleAppointment}
            doctorsList={doctors}
          />
        </div>
      </div>
      <div
        style={{
          marginTop: "auto",
          fontWeight: "bold",
          marginBottom: "0px",
          textAlign: "center",
          fontSize: "12px",
          color: "#666",
        }}
      >
        Copyright © {new Date().getFullYear()} MedTech. All rights reserved.
      </div>
    </div>
  );
}

export default AppointmentScheduler;
