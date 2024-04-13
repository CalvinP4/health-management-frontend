import React, { useState, useEffect } from 'react';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

interface Appointment {
  doctorName: string;
  date: string;
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
            {appointment.doctorName}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit, doctorNames }) => {
  const [doctorName, setDoctorName] = useState(doctorNames[0] || '');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ doctorName, date });
  };

  // Dummy data for Dr. John Doe
  const dummyScheduleData = [
    { id: 1, doctorName: 'Dr. John Doe', date: '2024-04-15', availableTime: '10:00 AM - 11:00 AM' },
    { id: 2, doctorName: 'Dr. John Doe', date: '2024-04-15', availableTime: '11:30 AM - 12:30 PM' },
    { id: 3, doctorName: 'Dr. John Doe', date: '2024-04-16', availableTime: '09:00 AM - 10:00 AM' },
    { id: 4, doctorName: 'Dr. John Doe', date: '2024-04-16', availableTime: '10:30 AM - 11:30 AM' },
    { id: 5, doctorName: 'Dr. John Doe', date: '2024-04-17', availableTime: '01:00 PM - 02:00 PM' },
  ];

  return (
    <div style={{ maxWidth: '600px', marginTop: '40px', width: '110%', padding: '20px', borderRadius: '5px', background: 'rgba(255,255,255,0.8)', textAlign: 'left' }}>
      <h2>Schedule Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Doctor Name:</label>
          <select className="form-select" value={doctorName} onChange={(e) => setDoctorName(e.target.value)}>
            {doctorNames.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Date:</label>
          <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Schedule</button>
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
          {dummyScheduleData.map((row, index) => (
            <tr key={index}>
              <th scope="row">{row.id}</th>
              <td>{row.doctorName}</td>
              <td>{row.date}</td>
              <td>{row.availableTime}</td>
              <td><button className="btn btn-secondary">Schedule</button></td>
            </tr>
          ))}
        </tbody>
      </table>

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
      // Fetch doctor names from API or set statically
      const data = ["Dr. John Doe", "Dr. Jane Smith", "Dr. Michael Brown", "Dr. Sarah Johnson", "Dr. Robert Williams"];
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
