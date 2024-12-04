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
import WorkoutDialog from "./WorkoutDialog";
import WorkoutFeedback from "./WorkoutFeedback";

type EventStatus = "" | "finish" | "feedback" | "cancel";

type WorkoutAction =
  | { type: "FINISH_WORKOUT" }
  | { type: "CANCEL_WORKOUT" }
  | { type: "LEAVE_FEEDBACK" }
  | { type: "OPEN_DIALOG"; payload: "cancel" | "finish" }
  | { type: "CLOSE_DIALOG" };

interface WorkoutState {
  status: EventStatus;
  openDialog: boolean;
  dialogType: "cancel" | "finish" | null;
}

function workoutReducer(
  state: WorkoutState,
  action: WorkoutAction
): WorkoutState {
  switch (action.type) {
    case "FINISH_WORKOUT":
      return { ...state, status: "finish", openDialog: false };
    case "CANCEL_WORKOUT":
      return { ...state, status: "cancel", openDialog: false };
    case "LEAVE_FEEDBACK":
      return { ...state, status: "feedback" };
    case "OPEN_DIALOG":
      return { ...state, openDialog: true, dialogType: action.payload };
    case "CLOSE_DIALOG":
      return { ...state, openDialog: false, dialogType: null };
    default:
      return state;
  }
}

const WorkoutCard: React.FC = () => {
  const [state, dispatch] = React.useReducer(workoutReducer, {
    status: "",
    openDialog: false,
    dialogType: null,
  });
  const [feedbackDialogOpen, setFeedbackDialogOpen] = React.useState(false);

  return (
    <>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Card
          sx={{
            borderRadius: "16px",
            p: 1,
            minHeight: "220px", // Set a minimum height to maintain consistency
            minWidth: "664px",
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
                  state.status === ""
                    ? "Scheduled"
                    : state.status === "finish"
                    ? "Waiting for feedback"
                    : state.status === "feedback"
                    ? "Finished"
                    : "Canceled"
                }
                sx={{
                  backgroundColor:
                    state.status === ""
                      ? "#009ECC"
                      : state.status === "finish"
                      ? "#6C6F80"
                      : state.status === "feedback"
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
              Reprehenderit, odit provident.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "left", width: "50%" }}>
              <EventAvailableIcon fontSize="medium" />
              <Typography variant="body1" sx={{ ml: 1 }}>
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
              minHeight: "68px",
              alignItems: "center",
            }}
          >
            {state.status === "" ? (
              <>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "white",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    border: "1px solid black",
                  }}
                  onClick={() =>
                    dispatch({ type: "OPEN_DIALOG", payload: "cancel" })
                  }
                >
                  Cancel Workout
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ fontWeight: "bold", borderRadius: "8px" }}
                  onClick={() =>
                    dispatch({ type: "OPEN_DIALOG", payload: "finish" })
                  }
                >
                  Finish Workout
                </Button>
              </>
            ) : state.status === "finish" ? (
              <Button
                variant="contained"
                size="medium"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid black",
                }}
                onClick={() => setFeedbackDialogOpen(true)}
              >
                Leave Feedback
              </Button>
            ) : null}
          </CardActions>
        </Card>
      </Grid>

      <WorkoutDialog
        open={state.openDialog}
        dialogType={state.dialogType}
        onClose={() => dispatch({ type: "CLOSE_DIALOG" })}
        onFinishWorkout={() => dispatch({ type: "FINISH_WORKOUT" })}
        onCancelWorkout={() => dispatch({ type: "CANCEL_WORKOUT" })}
      />

      <WorkoutFeedback
        open={feedbackDialogOpen}
        onClose={() => setFeedbackDialogOpen(false)}
        onSubmit={(feedback) => {
          console.log("Feedback submitted:", feedback);
          dispatch({ type: "LEAVE_FEEDBACK" });
          setFeedbackDialogOpen(false);
        }}
      />
    </>
  );
};

export default WorkoutCard;
