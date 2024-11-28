import * as React from "react";
import {
  Grid,
  Typography,
  Button,
  CardContent,
  CardActions,
  Card,
  Box,
  Chip,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

type EventStatus = "" | "finish" | "feedback" | "cancel";

const WorkoutCard: React.FC = () => {
  const [event, setEvent] = React.useState<EventStatus>("");

  const handleClick = (action: EventStatus): void => {
    setEvent(action);
  };

  return (
    <Grid item xs={12} md={6} lg={6}>
      <Card
        sx={{
          borderRadius: "16px",
          p: 1,
          minHeight: "240px", // Set a minimum height to maintain consistency
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h6" fontWeight={"bold"}>
              Yoga
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Chip
              label={
                event === ""
                  ? "Scheduled"
                  : event === "finish"
                  ? "Waiting for feedback"
                  : event === "feedback"
                  ? "Finished"
                  : "Canceled"
              }
              sx={{
                backgroundColor:
                  event === ""
                    ? "#009ECC"
                    : event === "finish"
                    ? "#6C6F80"
                    : event === "feedback"
                    ? "#FDD63B"
                    : "#FF4242",
                color: "#fff",
                height: "32px", // Increase height
                "& .MuiChip-label": {
                  fontSize: "0.95rem", // Increase font size
                  padding: "0 12px", // Add more horizontal padding
                  fontWeight: "bold",
                },
              }}
            />
          </Box>
          <Typography variant="h6" sx={{ pt: 1, pb: 2 }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Reprehenderit, odit provident. Temporibus ex nam vero ipsa ducimus
            aspernatur! Sequi similique dignissimos a possimus quos minus
            praesentium laudantium explicabo rerum reiciendis.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "left", width: "50%" }}>
            <EventAvailableIcon fontSize="large" />
            <Typography variant="h6" sx={{ ml: 1 }}>
              July 9, 12:30
            </Typography>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            pb: 2,
            pr: 2,
            minHeight: "68px", // Added minimum height
            alignItems: "center", // Added to vertically
          }}
        >
          {event === "" ? (
            <>
              <Button
                variant="contained"
                size="large"
                sx={{ backgroundColor: "white", fontWeight: "bold" }}
                onClick={() => handleClick("cancel")}
              >
                Cancel Workout
              </Button>
              <Button
                variant="contained"
                size="large"
                sx={{ fontWeight: "bold" }}
                onClick={() => handleClick("finish")}
              >
                Finish Workout
              </Button>
            </>
          ) : event === "finish" ? (
            <Button
              variant="contained"
              size="medium"
              sx={{ backgroundColor: "white" }}
              onClick={() => handleClick("feedback")}
            >
              Leave Feedback
            </Button>
          ) : null}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default WorkoutCard;
