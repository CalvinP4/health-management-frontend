import { IconButton } from "@mui/material";
import { MedicalServices, Medication, Today } from "@mui/icons-material";

const ButtonGridSection = () => {
  return (
    <section style={styles.buttonSection}>
      <h3>Explore our services</h3>
      <div style={styles.buttonGrid}>
        <IconButton sx={{ fontSize: 80 }}>
          <MedicalServices fontSize="inherit" />
        </IconButton>
        <IconButton sx={{ fontSize: 80 }}>
          <Medication fontSize="inherit" />
        </IconButton>
        <IconButton sx={{ fontSize: 80 }}>
          <Today fontSize="inherit" />
        </IconButton>
      </div>
    </section>
  );
};

const styles = {
  buttonSection: {
    padding: "20px",
  },
  buttonGrid: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "50px",
  },
};

export default ButtonGridSection;
