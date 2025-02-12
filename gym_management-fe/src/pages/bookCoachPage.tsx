import React, { useState } from "react";
import Testimonials from "../components/Testimonials.tsx";
import { Grid, Typography } from "@mui/material";
import TimeSlotSelector from "../components/Slots.tsx";
import BookWorkoutProfileCard from "../components/bookWorkoutProfileCard.tsx";
import { useLocation, Navigate } from "react-router-dom";
import CalenderComponent from "../components/CalenderComponent.tsx";
import SessionCard from "../components/SessionCard.tsx";
import { format } from "date-fns";

const BookCoachPage: React.FC = () => {
  const location = useLocation();
  const coach = location.state?.coach;
  const availableSlots = coach.timeSlots;

  const [selectedDate, setSelectedDate] = useState(new Date(2024, 6, 3));
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleSlotSelection = (slot: string) => {
    setSelectedSlot(slot);
  };
  if (!coach) {
    return <Navigate to="/coaches" replace />;
  }

  return (
    <Grid container spacing={2}>
      <BookWorkoutProfileCard
        coach={coach}
        onSelect={() => {
          if (selectedSlot && selectedDate) {
            console.log("Booking:", {
              date: format(selectedDate, "MMM d, yyyy"),
              slot: selectedSlot,
              coach: coach._id,
            });
          }
        }}
      />
      <Grid item xs={12} md={9} sx={{ padding: "2 rem" }}>
        <Grid
          container
          spacing={1}
          display="flex"
          justifyContent="space-between"
        >
          <Grid item xs={12} md={12}>
            <Typography variant="body2">SCHEDULE YOUR SESSION</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <CalenderComponent
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TimeSlotSelector
              date={format(selectedDate, "MMM d")}
              availableSlots={availableSlots}
              onSelect={handleSlotSelection}
            />
          </Grid>
          <Grid item xs={12} md={12} display="flex" marginTop="10px">
            <Typography variant="body2">YOUR UPCOMING WORKOUTS</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <SessionCard
              title="Yoga"
              date="July 9"
              time="9:30 AM"
              duration="1 hour"
            />
          </Grid>
          <Grid item xs={12} md={12} display="flex" marginTop="10px">
            <Typography variant="body2">FEEDBACK</Typography>
          </Grid>
          <Grid item xs={12} md={12} display="flex" justifyContent="flex-start">
            <Testimonials />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BookCoachPage;
