import {
  Typography,
  Box,
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import { useForm } from "react-hook-form";
import { DateTime } from "luxon";
import dayjs from "dayjs";
import HomeCard from "../components/homeCard";

const generateTimeOptions = () => {
  const times: string[] = ["All"];
  let time = DateTime.now().startOf("day"); // Start at 12:00 AM

  for (let hour = 0; hour < 24; hour++) {
    times.push(time.toFormat("h:mm a")); // Format to 1:00 AM, 2:00 AM, etc.
    time = time.plus({ hours: 1 }); // Add an hour
  }
  return times;
};

const HomePage: React.FC = () => {
  const timeOptions = generateTimeOptions();
  const coachNames: string[] = [
    "All",
    "John Doe",
    "Jane Doe",
    "John Smith",
    "Jane Smith",
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      activity: "All",
      date: dayjs(DateTime.now().toJSDate()),
      time: "All",
      coach: "All",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  type FormData = {
    activity: string;
    date: dayjs.Dayjs | null;
    time: string;
    coach: string;
  };

  const activity = watch("activity");
  const time = watch("time");
  const coach = watch("coach");

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pl: 2,
      }}
    >
      <Grid item xs={12} md={12}>
        <Typography variant="h4">Achieve your fitness goals!</Typography>
        <Typography variant="h4">Find a workout and book today.</Typography>
      </Grid>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "100%", pl: 2, pr: 2 }}
      >
        <Grid container spacing={2} sx={{ ml: 0, mt: 2 }}>
          <Grid item xs={12} md={12}>
            <Typography fontWeight={300}>BOOK A WORKOUT</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                mt: 1,
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
          <Grid
            item
            xs={6}
            md={2}
            sm={6}
            sx={{
              display: { md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Select Date"
                  value={watch("date") || dayjs(DateTime.now().toJSDate())}
                  slotProps={{
                    textField: {
                      ...register("date"),
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                        },
                      },
                    },
                  }}
                  onChange={(newValue) => {
                    if (newValue && dayjs.isDayjs(newValue)) {
                      setValue("date", newValue);
                    }
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid
            item
            xs={6}
            md={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                mt: 1,
              }}
            >
              <InputLabel id="time">Time</InputLabel>
              <Select
                labelId="time"
                id="time"
                value={time}
                label="Time"
                {...register("time")}
              >
                {timeOptions.map((timeOption, index) => (
                  <MenuItem key={index} value={timeOption}>
                    {timeOption}
                  </MenuItem>
                ))}
              </Select>
              {errors.time && (
                <Typography color="error">{errors.time.message}</Typography>
              )}
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                mt: 1,
              }}
            >
              <InputLabel id="coach">Coach</InputLabel>
              <Select
                labelId="coach"
                id="coach"
                value={coach}
                label="Coach"
                {...register("coach")}
              >
                {coachNames.map((coachName, index) => (
                  <MenuItem key={index} value={coachName}>
                    {coachName}
                  </MenuItem>
                ))}
              </Select>
              {errors.coach && (
                <Typography color="error">{errors.coach.message}</Typography>
              )}
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            sx={{
              display: { xs: "flex" },
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: "224px",
                height: "53px",
                borderRadius: "10px",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                mt: 1,
              }}
            >
              Find Workout
            </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography fontWeight={300} sx={{ mt: 2 }}>
              AVAILABLE WORKOUTS
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} sx={{ display: "flex", flexWrap: "wrap" }}>
            {Array.from({ length: 4 }).map((_, index) => (
              <HomeCard key={index} />
            ))}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default HomePage;
