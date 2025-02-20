import { Button as ButtonMUI, Card as CardMUI } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IDoctor } from "../../../types/Doctors";
import { AccountBox, Schedule } from "@mui/icons-material";

const DoctorProfile = (props: { doctor: IDoctor | null }) => {
  const navigate = useNavigate();
  return (
    <div style={{ ...styles.profileSection }}>
      <p
        style={{
          fontWeight: "bold",
          fontSize: "20px",
          width: "40%",
          height: "40%",
        }}
      >
        {props.doctor ? `Welcome Dr. ${props.doctor.firstName} ${props.doctor.lastName}` : "Welcome Doctor"}
      </p>
      <div>
        <h3>Actions</h3>
        <ButtonMUI
          variant="contained"
          onClick={() => {
            navigate("/doctor-schedule", { state: props.doctor });
          }}
          startIcon={<Schedule />}
        >
          Schedule
        </ButtonMUI>
        <ButtonMUI
          sx={{ marginLeft: 2 }}
          variant="contained"
          onClick={() => {
            console.log("Update Profile");
          }}
          startIcon={<AccountBox />}
        >
          Profile
        </ButtonMUI>
      </div>
    </div>
  );
};

const styles = {
  profileSection: {
    padding: "20px",
    backgroundColor: "#d1d1d1",
    display: "flex",
    justifyContent: "space-between",
  },
};

export default DoctorProfile;
