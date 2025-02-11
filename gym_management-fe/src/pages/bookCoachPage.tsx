import React, { useState } from "react";
import Testimonials from "../components/Testimonials.tsx";
import { Grid, Box, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Calendar from "react-calendar";
import TimeSlotSelector from "../components/Slots.tsx";
import BookWorkoutProfileCard from "../components/bookWorkoutProfileCard.tsx";
import { Coach } from "../types/coach.ts";
import { useLocation, Navigate } from "react-router-dom";

import CalenderComponent from "../components/CalenderComponent.tsx";

const BookCoachPage: React.FC = () => {
  const location = useLocation();
  const coach = location.state?.coach;
  const coachImage = "https://via.placeholder.com/150";
  const availableSlots = [
    "8:00 - 9:00 AM",
    "9:00 - 10:00 AM",
    "10:00 - 11:00 AM",
    "3:00 - 4:00 PM",
    "4:00 - 5:00 PM",
    "5:00 - 6:00 PM",
    "6:00 - 7:00 PM",
    "7:00 - 8:00 PM",
    "8:00 - 9:00 PM",
    "9:00 - 10:00 PM",
  ];

  const handleSlotSelection = (slot: string) => {
    console.log("Selected Slot:", slot);
  };
  if (!coach) {
    return <Navigate to="/coaches" replace />;
  }

  return (
    <Grid container spacing={2}>
      <BookWorkoutProfileCard
        image={coachImage}
        firstName={coach.firstName}
        lastName={coach.lastName}
        userSummary={coach.userSummary}
        title={coach.title}
        ratings={coach.ratings}
      />
      <Grid item xs={12} md={9}>
        <Grid
          container
          spacing={1}
          display="flex"
          justifyContent="space-between"
        >
          <Grid item xs={12} md={6}>
            <CalenderComponent />
          </Grid>

          <Grid item xs={12} md={6}>
            <TimeSlotSelector
              date="Jul 3"
              availableSlots={availableSlots}
              onSelect={handleSlotSelection}
            />
          </Grid>
          <Grid item xs={12} md={12} display="flex">
            <Typography variant="body2">Upcoming Workouts</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BookCoachPage;
