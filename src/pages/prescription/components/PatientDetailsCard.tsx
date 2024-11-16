import { IPatient } from "../../../types/Patients";
import { Avatar, Card, CardContent, Typography } from "@mui/material";

const PatientDetailsCard = (props: { patient: IPatient }) => {
  return (
    <Card variant="outlined" sx={{ padding: 1 }}>
      <>
        <Avatar
          alt="Remy Sharp"
          src={require("../../../assets/kamala.jpg")}
          sx={{ width: 100, height: 100, margin: "auto" }}
        />
        <CardContent>
          <Typography variant="h5">
            {props.patient.firstName + " " + props.patient.lastName}
          </Typography>
          <Typography>Age: {props.patient.age}</Typography>
          <Typography>Sex: Male</Typography>
          <Typography>Blood group: O+</Typography>
          <Typography>Weight: 70 kg</Typography>
          <Typography>Height: 6ft</Typography>
          <Typography>DOB: {props.patient.dob.toString()}</Typography>
        </CardContent>
      </>
    </Card>
  );
};

export default PatientDetailsCard;
