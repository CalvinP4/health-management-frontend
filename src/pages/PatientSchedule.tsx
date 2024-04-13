import React, { useState, useEffect } from 'react';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

interface ScheduleItem {
  day: string;
  startTime: string;
  endTime: string;
}

interface Appointment {
  doctorName: string;
  patientName: string;
  dateTime: string;
}

interface AppointmentsProps {
  appointments: Appointment[];
}

interface AppointmentFormProps {
  onSubmit: (appointmentDetails: Appointment) => void;
  doctorNames: string[];
}

const Appointments: React.FC<AppointmentsProps> = ({ appointments }) => {
  return (
    <div>
      <h2>Patient's Appointments</h2>
      <ul className="list-group">
        {appointments.map((appointment, index) => (
          <li key={index} className="list-group-item">
            {appointment.doctorName} - {appointment.patientName} - {appointment.dateTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit, doctorNames }) => {
  const [doctorName, setDoctorName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [dateTime, setDateTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ doctorName, patientName, dateTime });
    setPatientName('');
    setDateTime('');
  };

  return (
    <div style={{ maxWidth: '600px', marginTop: '40px', width: '110%', padding: '20px', borderRadius: '5px', background: 'rgba(255,255,255,0.8)', textAlign: 'left' }}>
      <h2>Schedule Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Doctor Name:</label>
          <select className="form-select" value={doctorName} onChange={(e) => setDoctorName(e.target.value)}>
            <option value="">Select Doctor</option>
            {doctorNames.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Patient Name:</label>
          <input type="text" className="form-control" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Date & Time:</label>
          <input type="datetime-local" className="form-control" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Schedule</button>
      </form>
    </div>
  );
};

function AppointmentScheduler() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctorNames, setDoctorNames] = useState<string[]>([]);

  useEffect(() => {
    fetchAppointments();
    fetchDoctorNames();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('api/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments: ', error);
    }
  };

  const fetchDoctorNames = async () => {
    try {
      const response = await fetch('api/doctors/names');
      const data = await response.json();
      setDoctorNames(data);
    } catch (error) {
      console.error('Error fetching doctor names: ', error);
    }
  };

  const scheduleAppointment = async (appointmentDetails: Appointment) => {
    try {
      const response = await fetch('api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentDetails)
      });
      if (!response.ok) {
        throw new Error('Failed to schedule appointment');
      }
      const newAppointment = await response.json();
      setAppointments([...appointments, newAppointment]);
    } catch (error) {
      console.error('Error scheduling appointment: ', error);
    }
  };

  return (
    <div className="container" style={{ 
        fontFamily: 'Arial, sans-serif',
        backgroundImage: `url(${process.env.PUBLIC_URL}/home.png)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '0.5in',
        minHeight: 'calc(100vh - 0.5in)',
    }}>
      <div className="row">
        <div className="col">
          <Appointments appointments={appointments} />
          <AppointmentForm onSubmit={scheduleAppointment} doctorNames={doctorNames} />
        </div>
      </div>
      <div style={{ marginTop: 'auto', fontWeight: 'bold', marginBottom: '0px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
        Copyright © {new Date().getFullYear()} MedTech. All rights reserved.
      </div>
    </div>
  );
}

export default AppointmentScheduler;
