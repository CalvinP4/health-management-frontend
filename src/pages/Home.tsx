import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom

const Home = () => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e: any) => {
    const { name, value } = e.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [registerForm, setRegisterForm] = useState({
    userType: "Patient",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    password: "",
    speciality: "", 
    location: "", 
  });

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();

    if (registerForm.userType.toLowerCase() === "patient")
      navigate("/patient");
    else if (registerForm.userType.toLowerCase() === "doctor") {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/doctor`
        );

        response.data.forEach((doctor: any) => {
          if (
            doctor.email === loginForm.email &&
            doctor.password === loginForm.password
          ) {
            navigate("/doctor", {state: doctor});
          }
        });
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    }
  };

  const handleRegisterChange = (e: any) => {
    const { name, value } = e.target;
    setRegisterForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundImage: `url(${process.env.PUBLIC_URL}/home.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "0.5in",
        minHeight: "calc(100vh - 0.5in)", // Adjusting height to start from 0.5 inch below the top
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          textAlign: "left",
          marginLeft: "20px",
          fontWeight: "bold",
        }}
      >
        Welcome to Our Hospital System - MEDTECH - Making HealthCare Better
        Together
      </h2>
      <div
        style={{
          maxWidth: "400px",
          marginTop: "110px",
          width: "100%",
          padding: "20px",
          borderRadius: "5px",
          background: "rgba(255,255,255,0.8)",
          textAlign: "left",
        }}
      >
        <form onSubmit={handleLoginSubmit}>
          <h3 style={{ fontWeight: "bold" }}>Login</h3>
          <label htmlFor="userType" style={{ marginBottom: "10px" }}>
            I am a :{" "}
          </label>
          <select
            id="userType"
            name="userType"
            value={registerForm.userType}
            onChange={handleRegisterChange}
            required
          >
            {/* <option value="">Select User Type</option> */}
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
          <label htmlFor="email" style={{ display: "block" }}>
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={loginForm.email}
            onChange={handleLoginChange}
            required
            style={{ width: "100%" }}
          />
          <label htmlFor="password" style={{ display: "block" }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginForm.password}
            onChange={handleLoginChange}
            required
            style={{ width: "100%" }}
          />
          <input
            type="submit"
            value="Login"
            style={{
              width: "100%",
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "14px 20px",
              margin: "8px 0",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          />
        </form>
        <div
          style={{ textAlign: "center", marginTop: "10px", fontWeight: "bold" }}
        >
          <Link to="/register" style={{ color: "#4CAF50" }}>
            New User? Register Here
          </Link>
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
};

export default Home;
