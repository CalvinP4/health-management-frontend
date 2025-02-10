import React from "react";
import {
  Form,
  Button,
} from "react-bootstrap";
import hospitalSvg from "../../assets/hospital.png";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IProfile } from "../../types/Profile";
import axios from "axios";
import { IPatient } from "../../types/Patients";
import FormControl from "@mui/material/FormControl";
import { Input, InputLabel, FormLabel, TextField } from "@mui/material";
import { HeaderProvider } from "../../context/HeaderContext";
import HeaderV2 from "../../components/HeaderV2";
import FooterV2 from "../../components/FooterV2";


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
        <TextField
          id="firstName"
          label="First Name"
          type="text"
          name="firstName"
          value={props.registerForm.firstName}
          disabled
          onChange={props.handleRegisterChange}
          required
          variant="outlined"
          margin="normal"
        />
      </FormControl>
      <FormControl>
        <TextField
          id="middleName"
          label="Middle Name"
          type="text"
          name="middleName"
          value={props.registerForm.middleName}
          disabled
          onChange={props.handleRegisterChange}
          variant="outlined"
          margin="normal"
        />
      </FormControl>
      <FormControl>
        <TextField
          id="lastName"
          label="Last Name"
          type="text"
          name="lastName"
          value={props.registerForm.lastName}
          disabled
          onChange={props.handleRegisterChange}
          required
          variant="outlined"
          margin="normal"
        />
      </FormControl>
      <FormControl>
        <TextField
          id="phoneNo"
          label="Phone"
          type="text"
          name="phoneNo"
          value={props.registerForm.phoneNo}
          onChange={props.handleRegisterChange}
          required
          variant="outlined"
          margin="normal"
        />
      </FormControl>
      <FormControl>
        <TextField
          id="age"
          label="Age"
          type="number"
          name="age"
          value={props.registerForm.age}
          disabled
          onChange={props.handleRegisterChange}
          required
          variant="outlined"
          margin="normal"
        />
      </FormControl>
      <FormControl>
        <TextField
          id="address"
          label="Address"
          type="text"
          name="address"
          value={props.registerForm.address}
          onChange={props.handleRegisterChange}
          required
          variant="outlined"
          margin="normal"
        />
      </FormControl>
      <FormControl>
        <TextField
          id="email"
          label="Email"
          type="email"
          name="email"
          value={props.registerForm.email}
          disabled
          onChange={props.handleRegisterChange}
          required
          variant="outlined"
          margin="normal"
        />
      </FormControl>
      <FormControl>
        <TextField
          id="password"
          label="Password"
          type="password"
          name="password"
          value={props.registerForm.password}
          onChange={props.handleRegisterChange}
          required
          variant="outlined"
          margin="normal"
        />
      </FormControl>
      <Button
        color="primary"
        data-testid="profile-update-btn"
        type="submit"
        style={{ width: "10%", marginTop: "16px", alignSelf: "center", marginBottom: "20px" }}
      >
        Update
      </Button>
    </Form>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isPatient] = useState<boolean>(location.state?.isPatient ?? false);

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

  console.log("Profile state:", profile);

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
      <HeaderProvider>
        <HeaderV2 navigateToProfile={() => {}} logout={() => {navigate("/")}} />
        <FormComponent
          registerForm={profile}
          handleRegisterChange={handleRegisterChange}
          onSubmit={updateProfile}
          isPatient={isPatient}
        />
        <FooterV2 />
      </HeaderProvider>
    </div>
  );
};

export default Profile;
