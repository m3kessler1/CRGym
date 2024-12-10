import {
  Typography,
  Box,
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const HomePage: React.FC = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      activity: "All",
    },
  });

  const activity = watch("activity");

  return (
    <Box sx={{ pl: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h4">Achieve your fitness goals!</Typography>
          <Typography variant="h4">Find a workout and book today.</Typography>
        </Grid>

        <Grid item xs={12} md={12}>
          <Typography fontWeight={300}>BOOK A WORKOUT</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
              mb: 2,
            }}
          >
            <InputLabel id="activity">Activity</InputLabel>
            <Select
              labelId="activity"
              id="activity"
              value={activity || "All"}
              label="Activity"
              {...register("activity")}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Yoga">Yoga</MenuItem>
              <MenuItem value="Climbing">Climbing</MenuItem>
              <MenuItem value="Strength training">Strength training</MenuItem>
              <MenuItem value="Cross-fit">Cross-fit</MenuItem>
              <MenuItem value="Cardio Training">Cardio Training</MenuItem>
              <MenuItem value="Rehabilitation">Rehabilitation</MenuItem>
            </Select>
            {errors.activity && (
              <Typography color="error">{errors.activity.message}</Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}></Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
