import React, { useState } from 'react';

const Home = () => {
    const [registerForm, setRegisterForm] = useState({
        userType: '',
        newUsername: '',
        newPassword: ''
    });

    const [loginForm, setLoginForm] = useState({
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

    const handleLoginChange = (e:any) => {
        const { name, value } = e.target;
        setLoginForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegisterSubmit = (e:any) => {
        e.preventDefault();
        // Logic for registering
        console.log('Register form submitted:', registerForm);
    };

    const handleLoginSubmit = (e:any) => {
        e.preventDefault();
        // Logic for login
        console.log('Login form submitted:', loginForm);
    };

    return (
        <div style={{ 
            fontFamily: 'Arial, sans-serif',
            backgroundImage: `url('/Users/deepu/Downloads/1.png')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
        }}>
            <div style={{ maxWidth: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', background: 'rgba(255,255,255,0.8)' }}>
                <h2>Welcome to Our Hospital System - MEDTECH - Making HealthCare Better Together</h2>
                <form onSubmit={handleRegisterSubmit}>
                    <h3>Register</h3>
                    <label htmlFor="userType">I am a:</label>
                    <select id="userType" name="userType" value={registerForm.userType} onChange={handleRegisterChange} required>
                        <option value="">Select User Type</option>
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                    </select>
                    <label htmlFor="newUsername">Username:</label>
                    <input type="text" id="newUsername" name="newUsername" value={registerForm.newUsername} onChange={handleRegisterChange} required />
                    <label htmlFor="newPassword">Password:</label>
                    <input type="password" id="newPassword" name="newPassword" value={registerForm.newPassword} onChange={handleRegisterChange} required />
                    <input type="submit" value="Register" style={{ width: '100%', backgroundColor: '#4CAF50', color: 'white', padding: '14px 20px', margin: '8px 0', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
                </form>
                <form onSubmit={handleLoginSubmit}>
                    <h3>Login</h3>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={loginForm.username} onChange={handleLoginChange} required />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={loginForm.password} onChange={handleLoginChange} required />
                    <input type="submit" value="Login" style={{ width: '100%', backgroundColor: '#4CAF50', color: 'white', padding: '14px 20px', margin: '8px 0', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
                </form>
            </div>
        </div>
    );
};

export default Home;
