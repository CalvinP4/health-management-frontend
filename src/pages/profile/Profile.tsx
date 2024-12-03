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
import hospitalSvg from "../../assets/hospital.png";
import Footer from "../../components/Footer";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IProfile } from "../../types/Profile";
import axios from "axios";
import { IPatient } from "../../types/Patients";
import FormControl from '@mui/material/FormControl';
import { Input, InputLabel, FormLabel, TextField} from '@mui/material';

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
                <Dropdown.Item eventKey={2}>Log out</Dropdown.Item>
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


    <FormControl>
  <InputLabel htmlFor="firstName" style={{ marginLeft: "-11px", fontWeight: "bold", fontSize: "20px" }}>First Name</InputLabel>
  <Input id="firstName" type="text" name="firstName" disabled onChange={props.handleRegisterChange}
          required/>
    </FormControl>
<TextField > </TextField>
    <FormControl>
  <InputLabel htmlFor="middleName" style={{ marginLeft: "-11px", fontWeight: "bold", fontSize: "20px" }}>Middle Name</InputLabel>
  <Input id="middleName" type="text" name="middleName" disabled
          onChange={props.handleRegisterChange}/>
    </FormControl>
    <TextField>  </TextField>
    <FormControl>
  <InputLabel htmlFor="lastName" style={{ marginLeft: "-11px", fontWeight: "bold", fontSize: "20px" }}>Last Name</InputLabel>
  <Input id="lastName" type="text" name="lastName" disabled
          onChange={props.handleRegisterChange}  required/>
    </FormControl>
    <TextField>  </TextField>


    <FormControl>
  <InputLabel htmlFor="phoneNo" style={{ marginLeft: "-11px", fontWeight: "bold", fontSize: "20px" }}>Phone</InputLabel>
  <Input id="phoneNo" type="text" name="phoneNo" disabled
          onChange={props.handleRegisterChange}  required/>
    </FormControl>
    <TextField>  </TextField>
    
    <FormControl>
  <InputLabel htmlFor="age" style={{ marginLeft: "-11px", fontWeight: "bold", fontSize: "20px" }}>Age</InputLabel>
  <Input id="age" type="number" name="age" disabled
          onChange={props.handleRegisterChange} required/>
    </FormControl>
    <TextField> </TextField>

  <FormControl>
  <InputLabel htmlFor="address" style={{ marginLeft: "-11px", fontWeight: "bold", fontSize: "20px" }}>Address</InputLabel>
  <Input id="address" type="text" name="address" disabled
          onChange={props.handleRegisterChange}  required/>
    </FormControl>
<TextField>  </TextField>

    <FormControl>
  <InputLabel htmlFor="email" style={{ marginLeft: "-11px", fontWeight: "bold", fontSize: "20px" }}>Email</InputLabel>
  <Input id="email" type="email" name="email" disabled
          onChange={props.handleRegisterChange}  required/>
    </FormControl>
    <TextField> </TextField>

    <FormControl>
  <InputLabel htmlFor="password" style={{ marginLeft: "-11px", fontWeight: "bold", fontSize: "20px" }}>Password</InputLabel>
  <Input id="password" type="password" name="password" disabled
          onChange={props.handleRegisterChange}  required/>
    </FormControl>
<TextField> </TextField>


      <Button variant="primary"
        data-testid="profile-update-btn"
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

  const [isPatient] = useState<boolean>(
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
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/doctor/${profile.id}`,
          {
            phoneNo: profile.phoneNo,
            address: profile.address,
            password: profile.password,
            email: profile.email,
          }
        );

        if (response.status === 200) {
          console.log("Navigating with state:", response.data);
          navigate("/doctor", { state: response.data as IPatient });
        }
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
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
