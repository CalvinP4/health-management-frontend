import React from 'react';
import {
  Navbar,
  Container,
  Nav,
  DropdownButton,
  Dropdown,
  Form,
  Button,
} from "react-bootstrap";
import hospitalSvg from "../assets/hospital.png";
import Footer from "../../components/Footer";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IProfile } from "../../types/Profile";
import axios from "axios";
import { IPatient } from "../../types/Patients";

const HeaderSection = (props: { firstName: string }) => {
  return (
    <section>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <img
            src={hospitalSvg}
            alt="Doctor"
            style={{ marginLeft: "10px", height: "40px", width: "auto" }}
          />
          <Navbar.Brand
            style={{ marginLeft: "10px", fontWeight: "bold", fontSize: "20px" }}
          >
            {" "}
            MediTech HealthCare
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <DropdownButton
                variant="Secondary"
                title={props.firstName[0]}
                style={{
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  padding: 0,
                }}
              >
                <Dropdown.Item eventKey={1}>Profile</Dropdown.Item>
                <Dropdown.Item eventKey={2}>Sign out</Dropdown.Item>
              </DropdownButton>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
};

const FormComponent = (props: {
  registerForm: IProfile;
  handleRegisterChange: any;
  onSubmit: (e: React.FormEvent) => void;
  isPatient: boolean;
}) => {
  return (
    <Form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={(e) => {
        props.onSubmit(e);
      }}
    >
      <Form.Group>
        <Form.Label htmlFor="firstName">First Name</Form.Label>
        <Form.Control
          id="firstName"
          type="text"
          name="firstName"
          disabled
          value={props.registerForm.firstName}
          onChange={props.handleRegisterChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="middleName">Middle Name</Form.Label>
        <Form.Control
          type="text"
          id="middleName"
          name="middleName"
          disabled
          value={props.registerForm.middleName}
          onChange={props.handleRegisterChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="lastName">Last Name</Form.Label>
        <Form.Control
          type="text"
          id="lastName"
          name="lastName"
          disabled
          value={props.registerForm.lastName}
          onChange={props.handleRegisterChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="dob">DOB</Form.Label>
        <Form.Control
          type="date"
          id="dob"
          name="dob"
          disabled
          value={props.registerForm.dob}
          onChange={props.handleRegisterChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="phoneNo">Phone</Form.Label>
        <Form.Control
          type="text"
          id="phoneNo"
          name="phoneNo"
          value={props.registerForm.phoneNo}
          onChange={props.handleRegisterChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="age">Age</Form.Label>
        <Form.Control
          type="number"
          id="age"
          name="age"
          disabled
          value={props.registerForm.age}
          onChange={props.handleRegisterChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="address">Address</Form.Label>
        <Form.Control
          type="text"
          id="address"
          name="address"
          value={props.registerForm.address}
          onChange={props.handleRegisterChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          type="email"
          id="email"
          name="email"
          value={props.registerForm.email}
          onChange={props.handleRegisterChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          id="password"
          name="password"
          value={props.registerForm.password}
          onChange={props.handleRegisterChange}
          required
        />
      </Form.Group>
      <Button
        data-testid="profile-update-btn"
        variant="primary"
        type="submit"
        style={{ width: "10%", marginTop: "16px", alignSelf: "center" }}
      >
        Update
      </Button>
    </Form>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isPatient, setIsPatient] = useState<boolean>(
    location.state?.isPatient ?? false
  );
  
  const [profile, setProfile] = useState<IProfile>(
    location.state?.profile ?? {
      id: 0,
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      phoneNo: "",
      address: "",
      password: "",
      age: "",
      email: "",
    }
  );

  const updateProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isPatient) {
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/patient/${profile.id}`,
          {
            phoneNo: profile.phoneNo,
            address: profile.address,
            password: profile.password,
            email: profile.email,
          }
        );

        if (response.status === 200) {
          console.log("Navigating with state:", response.data);
          navigate("/patient", { state: response.data as IPatient });
        }
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    } else {
    }
  };

  const handleRegisterChange = (e: any) => {
    const { name, value } = e.target;

    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={{ paddingLeft: "15rem", paddingRight: "15rem" }}>
      <HeaderSection firstName="Temp" />
      <FormComponent
        registerForm={profile}
        handleRegisterChange={handleRegisterChange}
        onSubmit={updateProfile}
        isPatient={isPatient}
      />
      <Footer />
    </div>
  );
};

export default Profile;
