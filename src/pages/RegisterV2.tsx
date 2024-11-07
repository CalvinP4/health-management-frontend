import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    age: 0,
    email: "",
    dob: "",
    phoneNo: "",
    password: "",
    address: "",
  });

  const handleRegisterChange = (e: any) => {
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
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/patient`,
        registerForm
      );

      if (response.status === 200) {
        console.log("User registered successfully:", response.data);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
        <Form onSubmit={handleRegisterSubmit}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={registerForm.firstName}
              onChange={handleRegisterChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Middle Name</Form.Label>
            <Form.Control
              type="text"
              id="middleName"
              name="middleName"
              value={registerForm.middleName}
              onChange={handleRegisterChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              id="lastName"
              name="lastName"
              value={registerForm.lastName}
              onChange={handleRegisterChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>DOB</Form.Label>
            <Form.Control
              type="date"
              id="dob"
              name="dob"
              value={registerForm.dob}
              onChange={handleRegisterChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              id="phoneNo"
              name="phoneNo"
              value={registerForm.phoneNo}
              onChange={handleRegisterChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              id="age"
              name="age"
              value={registerForm.age}
              onChange={handleRegisterChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              id="address"
              name="address"
              value={registerForm.address}
              onChange={handleRegisterChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              value={registerForm.email}
              onChange={handleRegisterChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              value={registerForm.password}
              onChange={handleRegisterChange}
              required
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ width: "100%", marginTop: "16px" }}
          >
            Register
          </Button>
        </Form>
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
