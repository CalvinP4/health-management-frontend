import React, { useState } from 'react';

const Register = () => {
    const [registerForm, setRegisterForm] = useState({
        userType: '',
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        username: '',
        password: ''
    });

    const handleRegisterChange = (e:any) => {
        const { name, value } = e.target;
        setRegisterForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegisterSubmit = (e:any) => {
        e.preventDefault();
        // Logic for registering
        console.log('Register form submitted:', registerForm);
    };

    return (
        <div style={{ 
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
            <h2 style={{ marginBottom: '20px', textAlign: 'left', marginLeft: '20px' , fontWeight: 'bold'}}> MEDTECH - User Registration System</h2>
            <div style={{ maxWidth: '400px', marginTop: '40px', width: '100%', padding: '20px', borderRadius: '5px', background: 'rgba(255,255,255,0.8)', textAlign: 'left' }}>
                <form onSubmit={handleRegisterSubmit} style={{ marginBottom: '20px' }}> 
                    <label htmlFor="userType" style={{ marginBottom: '10px' }}>I am a : </label>
                    <select id="userType" name="userType" value={registerForm.userType} onChange={handleRegisterChange} required>
                        <option value=" ">Select User Type</option>
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                    </select>
                    <h3 >Register</h3>
                    <label htmlFor="firstName" style={{ display: 'block' }}>First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={registerForm.firstName} onChange={handleRegisterChange} required style={{ width: '100%' }} />
                    <label htmlFor="lastName" style={{ display: 'block' }}>Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={registerForm.lastName} onChange={handleRegisterChange} required style={{ width: '100%' }} />
                    <label htmlFor="email" style={{ display: 'block' }}>Email:</label>
                    <input type="email" id="email" name="email" value={registerForm.email} onChange={handleRegisterChange} required style={{ width: '100%' }} />
                    <label htmlFor="dob" style={{ display: 'block' }}>DOB:</label>
                    <input type="date" id="dob" name="dob" value={registerForm.dob} onChange={handleRegisterChange} required style={{ width: '100%' }} />
                    <label htmlFor="username" style={{ display: 'block' }}>Username:</label>
                    <input type="text" id="username" name="username" value={registerForm.username} onChange={handleRegisterChange} required style={{ width: '100%' }} />
                    <label htmlFor="password" style={{ display: 'block' }}>Password:</label>
                    <input type="password" id="password" name="password" value={registerForm.password} onChange={handleRegisterChange} required style={{ width: '100%' }} />
                    <input type="submit" value="Register" style={{ width: '100%', backgroundColor: '#4CAF50', color: 'white', padding: '14px 20px', margin: '8px 0', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
                </form>
            </div>
            <div style={{ marginTop: 'auto', fontWeight: 'bold', marginBottom: '0px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
                Copyright © {new Date().getFullYear()} MedTech. All rights reserved.
            </div>
        </div>
    );
};

export default Register;
