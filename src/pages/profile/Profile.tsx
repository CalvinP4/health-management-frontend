import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IProfile } from "../../types/Profile";
import axios from "axios";
import { HeaderProvider } from "../../context/HeaderContext";
import HeaderV2 from "../../components/HeaderV2";
import FooterV2 from "../../components/FooterV2";
import { IDoctor } from "../../types/Doctors";
import FormComponent from "./components/FormComponent";
import { IPatient } from "../../types/Patients";

const defaultProfile: IProfile = {
  _id: "",
  firstName: "",
  middleName: "",
  lastName: "",
  dob: "",
  phoneNo: "",
  address: "",
  password: "",
  age: 0,
  email: "",
};

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isPatient] = useState<boolean>(location.state?.isPatient ?? false);
  const [profile, setProfile] = useState<IProfile>(
    location.state?.profile ?? defaultProfile
  );

  useEffect(() => {
    if (!location.state?.profile) {
      console.error("Profile state is undefined. Redirecting...");
      // TODO: create an error page
    }
  }, [location, navigate]);

  const updateUserProfile = async (profile: IProfile, isPatient: boolean) => {
    const endpoint = `${process.env.REACT_APP_BACKEND_SERVER_URL}/${
      isPatient ? "patient" : "doctor"
    }/${profile._id}`;
    const payload = {
      phoneNo: profile.phoneNo,
      address: profile.address,
      email: profile.email,
      password: profile.password, // TODO: Remove password from payload
    };

    return axios.patch<IPatient | IDoctor>(endpoint, payload);
  };

  
  const updateProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await updateUserProfile(profile, isPatient);
      if (response.status === 200) {
        console.log("Navigating with state:", response.data);
        navigate(isPatient ? "/patient" : "/doctor", { state: response.data });
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={styles.page}>
      <HeaderProvider>
        <HeaderV2
          navigateToProfile={() => {}}
          logout={() => {
            navigate("/");
          }}
        />
        <FormComponent
          registerForm={profile}
          handleRegisterChange={handleRegisterChange}
          onSubmit={updateProfile}
        />
        <FooterV2 />
      </HeaderProvider>
    </div>
  );
};

const styles = {
  page: {
    paddingLeft: "15rem",
    paddingRight: "15rem",
  },
};

export default Profile;
