import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    userType: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    password: "",
    speciality: "", // Add speciality field for doctors
    location: "", // Add location field for doctors
  });

  const handleRegisterChange = (e:any) => {
    const { name, value } = e.target;
    setRegisterForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = async (e: any) => {
    e.preventDefault();
    // Logic for registering
    console.log("Register form submitted:", registerForm);

    // Make API call
    try {
      console.log(JSON.stringify(registerForm));
      const response = await fetch(`http://localhost:3000/${registerForm.userType}s`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerForm),
      });

      const data = await response.json();
      console.log(data);

      // Navigate to user page after successful registration
      if (data.id) {
        navigate(`/${registerForm.userType}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderPatientForm = () => (
    <>
      <label htmlFor="firstName" style={{ display: "block" }}>
        First Name:
      </label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={registerForm.firstName}
        onChange={handleRegisterChange}
        required
        style={{ width: "100%" }}
      />
      <label htmlFor="lastName" style={{ display: "block" }}>
        Last Name:
      </label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={registerForm.lastName}
        onChange={handleRegisterChange}
        required
        style={{ width: "100%" }}
      />
      <label htmlFor="gender" style={{ display: "block" }}>
        Gender:
      </label>
      <select
        id="gender"
        name="gender"
        value={registerForm.gender}
        onChange={handleRegisterChange}
        required
        style={{ width: "100%" }}
      >
        <option value="">Select...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <label htmlFor="email" style={{ display: "block" }}>
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={registerForm.email}
        onChange={handleRegisterChange}
        required
        style={{ width: "100%" }}
      />
      <label htmlFor="dateOfBirth" style={{ display: "block" }}>
        Date of Birth:
      </label>
      <input
        type="date"
        id="dateOfBirth"
        name="dateOfBirth"
        value={registerForm.dateOfBirth}
        onChange={handleRegisterChange}
        required
        style={{ width: "100%" }}
      />
      <label htmlFor="phone" style={{ display: "block" }}>
        Phone:
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={registerForm.phone}
        onChange={handleRegisterChange}
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
        value={registerForm.password}
        onChange={handleRegisterChange}
        required
        style={{ width: "100%" }}
      />
    </>
  );

  const renderDoctorForm = () => (
    <>
      <label htmlFor="firstName" style={{ display: "block" }}>
        First Name:
      </label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={registerForm.firstName}
        onChange={handleRegisterChange}
        required
        style={{ width: "100%" }}
      />
      <label htmlFor="lastName" style={{ display: "block" }}>
        Last Name:
      </label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={registerForm.lastName}
        onChange={handleRegisterChange}
        required
        style={{ width: "100%" }}
      />
      <label htmlFor="email" style={{ display: "block" }}>
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={registerForm.email}
        onChange={handleRegisterChange}
        required
        style={{ width: "100%" }}
      />
      <label htmlFor="speciality" style={{ display: "block" }}>
        Speciality:
      </label>
      <select
        id="speciality"
        name="speciality"
        value={registerForm.speciality}
        onChange={handleRegisterChange}
        required
        style={{ width: "100%" }}
      >
        <option value="">Select...</option>
        <option value="Pediatrics">Pediatrics</option>
        <option value="Ortho">Ortho</option>
        <option value="Family Medicine">Family Medicine</option>
        <option value="Cardiology">Cardiology</option>
        <option value="Endocrine">Endocrine</option>
      </select>
      <label htmlFor="location" style={{ display: "block" }}>
        Location:
      </label>
      <select
        id="location"
        name="location"
        value={registerForm.location}
        onChange={handleRegisterChange}
        required
        style={{ width: "100%" }}
      >
        <option value="">Select...</option>
        <option value="Kaiser San Jose">Kaiser San Jose</option>
        <option value="Kaiser Santa Clara">Kaiser Santa Clara</option>
        <option value="Kaiser Fremont">Kaiser Fremont</option>
      </select>
      <label htmlFor="phone" style={{ display: "block" }}>
        Phone:
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={registerForm.phone}
        onChange={handleRegisterChange}
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
        value={registerForm.password}
        onChange={handleRegisterChange}
        required
        style={{ width: "100%" }}
      />
    </>
  );

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
        {" "}
        MEDTECH - User Registration System
      </h2>
      <div
        style={{
          maxWidth: "400px",
          marginTop: "40px",
          width: "100%",
          padding: "20px",
          borderRadius: "5px",
          background: "rgba(255,255,255,0.8)",
          textAlign: "left",
        }}
      >
        <form onSubmit={handleRegisterSubmit} style={{ marginBottom: "20px" }}>
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
          <h3>Register</h3>
          {registerForm.userType === "patient" && renderPatientForm()}
          {registerForm.userType === "doctor" && renderDoctorForm()}
          <input
            type="submit"
            value="Register"
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

export default Register;
