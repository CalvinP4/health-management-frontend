import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Home = () => {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });

    const handleLoginChange = (e:any) => {
        const { name, value } = e.target;
        setLoginForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLoginSubmit = (e:any) => {
        e.preventDefault();
        // Logic for login
        console.log('Login form submitted:', loginForm);
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
            <h2 style={{ marginBottom: '20px', textAlign: 'left', marginLeft: '20px' , fontWeight: 'bold'}}>Welcome to Our Hospital System - MEDTECH - Making HealthCare Better Together</h2>
            <div style={{ maxWidth: '400px', marginTop: '110px', width: '100%', padding: '20px', borderRadius: '5px', background: 'rgba(255,255,255,0.8)', textAlign: 'left' }}>
                <form onSubmit={handleLoginSubmit}>
                    <h3 style={{fontWeight: 'bold'}}>Login</h3>
                    <label htmlFor="username" style={{ display: 'block' }}>Username:</label>
                    <input type="text" id="username" name="username" value={loginForm.username} onChange={handleLoginChange} required style={{ width: '100%' }} />
                    <label htmlFor="password" style={{ display: 'block' }}>Password:</label>
                    <input type="password" id="password" name="password" value={loginForm.password} onChange={handleLoginChange} required style={{ width: '100%' }} />
                    <input type="submit" value="Login" style={{ width: '100%', backgroundColor: '#4CAF50', color: 'white', padding: '14px 20px', margin: '8px 0', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
                </form>
                <div style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>
                    <Link to="/register" style={{ color: '#4CAF50' }}>New User? Register Here</Link>
                </div>
            </div>
            <div style={{ marginTop: 'auto', fontWeight: 'bold', marginBottom: '0px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
                Copyright © {new Date().getFullYear()} MedTech. All rights reserved.
            </div>
        </div>
    );
};

export default Home;
