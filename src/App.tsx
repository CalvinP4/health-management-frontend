import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Staff from './pages/Staff';
import Patient from './pages/Patient';
import Doctor from './pages/Doctor';
import Register from './pages/register';  
import Appointments from './pages/Appointments'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/patient" element={<Patient />} />
      <Route path="/doctor" element={<Doctor />} />
      <Route path="/register" element={<Register />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
