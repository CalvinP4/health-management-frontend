import { Button, Card, Typography } from "@mui/material";

const TestHistoryCard = (props: {openModal: () => void}) => {
  return (
    <Card variant="outlined" sx={{ padding: 4, marginTop: 2 }}>
      <Typography variant="h5">Test history</Typography>
      <ol>
        <li>
          <Button variant="text">22-02-2022</Button>
        </li>
        <li>
          <Button variant="text" onClick={props.openModal}>22-02-2022</Button>
        </li>
      </ol>
    </Card>
  );
};

export default TestHistoryCard;
