import { Box, Typography } from "@mui/material";

const SymptomsBox = (props: {symptoms: string}) => {
    return (
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5">Symptoms</Typography>
        <Typography>{props.symptoms}</Typography>
      </Box>
    );
  };


  export default SymptomsBox;