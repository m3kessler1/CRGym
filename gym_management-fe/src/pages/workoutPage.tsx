import { Grid, Pagination, Box, Typography } from "@mui/material";
import WorkoutCard from "../components/WorkoutCard.tsx";
import { useEffect, useState } from "react";
import { getBookedWorkoutsByUsers } from "../services/workoutService.ts";
import SkeletonWorkoutPage from "../components/Skeleton/SkeletonWorkoutPage.tsx";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";

interface BookedWorkout {
  _id: string;
  userId: string;
  coachId: string;
  date: string;
  time: string;
  activity: string;
}

const Workouts: React.FC = () => {
  const itemsPerPage = 8;
  const totalItems = 8;
  const [page, setPage] = useState<number>(1);
  const [bookedWorkouts, setBookedWorkouts] = useState<BookedWorkout[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const userId = user.id;

  useEffect(() => {
    const fetchBookedWorkouts = async () => {
      try {
        const response = await getBookedWorkoutsByUsers(userId);
        setBookedWorkouts(response);
      } catch (error) {
        enqueueSnackbar("Error fetching booked workouts:", {
          variant: "error",
        });
        console.error("Error fetching booked workouts:", error);
      }
    };
    fetchBookedWorkouts();
  }, [userId]);

  const components = (bookedWorkouts || []).map((workout, index) => (
    <WorkoutCard key={index} workout={workout} />
  ));

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedComponents = (components || []).slice(startIndex, endIndex);

  console.log();
  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setPage(value);
  };

  return (
    <>
      {bookedWorkouts.length === 0 ? (
        <Grid
          container
          spacing={6}
          sx={{
            width: "100%",
            pl: 5,
            mb: 2,
          }}
        >
          <SkeletonWorkoutPage />
        </Grid>
      ) : (
        <>
          <Grid
            container
            spacing={6}
            sx={{
              width: "100%",
              pl: 5,
              mb: 2,
            }}
          >
            {bookedWorkouts.length > 0 ? (
              displayedComponents
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  p: 2,
                }}
              >
                <Typography variant="h6">No workouts found</Typography>
              </Box>
            )}
          </Grid>

          {/* Pagination controls */}
          {bookedWorkouts.length > 6 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 2,
              }}
            >
              <Pagination
                count={Math.ceil(totalItems / itemsPerPage)} // Total number of pages
                page={page}
                onChange={handleChange}
                color="primary"
                size="large"
              />
            </Box>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default Workouts;
