import { Card, Typography } from "@mui/material";

const ChatGPTCard = () => {
  return (
    <Card variant="outlined" sx={{ padding: 4 }}>
      <Typography variant="h5">Recommendations</Typography>
      <Typography>
        Given the history and symptoms described by Patient
      </Typography>
    </Card>
  );
};

export default ChatGPTCard;
