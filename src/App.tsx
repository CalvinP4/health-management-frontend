import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Staff from './pages/Staff';
import Patient from './pages/Patient';
import DoctorComponent from './pages/Doctor';
import Register from './pages/Register';  
import Appointments from './pages/Appointments'; 
import DoctorSchedule from './pages/DoctorSchedule';
import DoctorScheduleV2 from './pages/DoctorScheduleV2';
import PatientSchedule from './pages/PatientSchedule';
import Prescription from './pages/Prescription';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/patient" element={<Patient />} />
      <Route path="/doctor" element={<DoctorComponent />} />
      <Route path="/register" element={<Register />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/doctor-schedule" element={<DoctorScheduleV2 />} />
      <Route path="/patient-schedule" element={<PatientSchedule />} />
      <Route path="/prescription" element={<Prescription />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
