import {
  Box,
  Typography,
  Card as CardMUI,
  CardHeader,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ISlot, Status } from "../../../types/Slot";
import { hospitalMapping } from "../../../types/Hospital";
import {
  ClockIcon,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Delete, Edit } from "@mui/icons-material";


const SlotsByDay = (props: {
  slots: ISlot[];
  deleteSlot: (slotId: number) => void;
}) => {
  return (
    <section
      style={{
        marginTop: "4rem",
        marginBottom: "4rem",
        padding: "2rem",
      }}
    >
      <Box display="flex" flexDirection="column" gap={4}>
        {props.slots.map((slot: ISlot, index: number) => (
          <CardMUI
            variant="outlined"
            key={index}
            sx={{
              boxShadow: 2,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <CardHeader
              sx={{
                bgcolor:
                  slot?.apptStatus === Status.Booked
                    ? "success.main"
                    : "grey.300",
                color: slot?.apptStatus === Status.Booked ? "white" : "black",
              }}
              titleTypographyProps={{ fontWeight: "bold", fontSize: "1.2rem" }}
              title={hospitalMapping[slot?.hospitalId]}
              subheader={dayjs(slot?.slotDate).format("DD-MMM-YYYY")}
            />
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <ClockIcon fontSize="small" />
                <Typography variant="body1">
                  {dayjs(slot?.startTime, "HH:mm").format("h:mm A")} -{" "}
                  {dayjs(slot?.endTime, "HH:mm").format("h:mm A")}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" gap={2}>
                <Tooltip title="Delete Slot">
                  <IconButton
                    onClick={() => props.deleteSlot(slot?.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Slot">
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </CardMUI>
        ))}
      </Box>
    </section>
  );
};

export default SlotsByDay;
