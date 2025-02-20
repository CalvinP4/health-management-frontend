import React from "react";
import { TextField, FormControl, Button, Box } from "@mui/material";
import { IProfile } from "../../../types/Profile";

const FormComponent = ({
  registerForm,
  handleRegisterChange,
  onSubmit,
}: {
  registerForm: IProfile;
  handleRegisterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}) => {
  const formFields = [
    { id: "firstName", label: "First Name", type: "text", disabled: true },
    { id: "middleName", label: "Middle Name", type: "text", disabled: true },
    { id: "lastName", label: "Last Name", type: "text", disabled: true },
    { id: "phoneNo", label: "Phone", type: "text" },
    { id: "age", label: "Age", type: "number", disabled: true },
    { id: "address", label: "Address", type: "text" },
    { id: "email", label: "Email", type: "email", disabled: true },
    { id: "password", label: "Password", type: "password" },
  ];

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        mx: "auto",
        mt: 4,
      }}
    >
      {formFields.map(({ id, label, type, disabled }) => (
        <FormControl key={id} fullWidth>
          <TextField
            id={id}
            label={label}
            type={type}
            name={id}
            value={registerForm[id as keyof IProfile] || ""}
            onChange={handleRegisterChange}
            disabled={disabled}
            required={!disabled}
            variant="outlined"
          />
        </FormControl>
      ))}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        data-testid="profile-update-btn"
        sx={{ alignSelf: "center", width: "50%", mt: 2 }}
      >
        Update
      </Button>
    </Box>
  );
};

export default FormComponent;