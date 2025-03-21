import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Patient from './pages/patient/Patient';
import DoctorComponent from './pages/doctor/Doctor';
import Register from './pages/register/RegisterV2';  
import DoctorScheduleV2 from './pages/doctorschedule/DoctorScheduleV2';
import PatientSchedule from './pages/patientschedule/PatientSchedule';
import Profile from './pages/profile/Profile';
import PrescriptionV2 from './pages/prescription/PrescriptionV2';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/patient" element={<Patient />} />
      <Route path="/doctor" element={<DoctorComponent />} />
      <Route path="/register" element={<Register />} />
      <Route path="/doctor-schedule" element={<DoctorScheduleV2 />} />
      <Route path="/patient-schedule" element={<PatientSchedule />} />
      <Route path="/prescription" element={<PrescriptionV2 />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
