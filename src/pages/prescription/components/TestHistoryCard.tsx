import { Button, Card, Typography } from "@mui/material";

const TestHistoryCard = () => {
  return (
    <Card variant="outlined" sx={{ padding: 4, marginTop: 2 }}>
      <Typography variant="h5">Test history</Typography>
      <ol>
        <li>
          <Button variant="text">22-02-2022: Basic Metabolic Panel</Button>
        </li>
        <li>
          <Button variant="text">22-02-2022: MRI</Button>
        </li>
      </ol>
    </Card>
  );
};

export default TestHistoryCard;
