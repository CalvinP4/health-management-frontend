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

interface DoctorScheduleProps {
  doctorSchedule: ScheduleItem[];
}

interface AppointmentsProps {
  appointments: Appointment[];
}

interface AppointmentFormProps {
  onSubmit: (appointmentDetails: Appointment) => void;
  doctorName: string;
}

interface DoctorScheduleFormProps {
  onSubmit: (updatedSchedule: ScheduleItem[]) => void;
  doctorName: string;
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

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit, doctorName: initialDoctorName }) => {
  const [doctorName, setDoctorName] = useState(initialDoctorName);
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
          <input type="text" className="form-control" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
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
  const [doctorSchedule, setDoctorSchedule] = useState<ScheduleItem[]>([]);
  const [doctorName, setDoctorName] = useState('');

  useEffect(() => {
    fetchDoctorSchedule();
    fetchAppointments();
    fetchDoctorName(); // Fetch doctor's name
  }, []);

  const fetchDoctorSchedule = async () => {
    try {
      const response = await fetch('api/doctors/schedule');
      const data = await response.json();
      setDoctorSchedule(data);
    } catch (error) {
      console.error('Error fetching doctor schedule: ', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch('api/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments: ', error);
    }
  };

  const fetchDoctorName = async () => {
    try {
      const response = await fetch('api/doctors/name');
      const data = await response.json();
      setDoctorName(data.name);
    } catch (error) {
      console.error('Error fetching doctor name: ', error);
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
      // Assuming the server responds with the newly created appointment
      const newAppointment = await response.json();
      setAppointments([...appointments, newAppointment]);
    } catch (error) {
      console.error('Error scheduling appointment: ', error);
    }
  };

  const updateDoctorSchedule = async (updatedSchedule: ScheduleItem[]) => {
    try {
      const response = await fetch('api/doctors/schedule', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSchedule)
      });
      if (!response.ok) {
        throw new Error('Failed to update doctor schedule');
      }
      setDoctorSchedule(updatedSchedule);
    } catch (error) {
      console.error('Error updating doctor schedule: ', error);
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
        minHeight: 'calc(100vh - 0.5in)', // Adjusting height to start from 0.5 inch below the top
    }}>
      <div className="row">
        <div className="col">
          <Appointments appointments={appointments} />
          <AppointmentForm onSubmit={scheduleAppointment} doctorName={doctorName} />
        </div>
      </div>
      <div style={{ marginTop: 'auto', fontWeight: 'bold', marginBottom: '0px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
        Copyright © {new Date().getFullYear()} MedTech. All rights reserved.
      </div>
    </div>
  );
}

export default AppointmentScheduler;
