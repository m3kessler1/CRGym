import React, { useState } from "react";
import Testimonials from "../components/Testimonials.tsx";
import { Grid } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import CoachesCard from "../components/CoachesCard";
import Slot from "../components/Slots.tsx";

const BookCoachPage: React.FC = () => {
  const [value, setValue] = useState<Dayjs>(dayjs("2022-04-17"));

  return (
    <Grid
      container
      spacing={0}
      sx={{
        p: 6,
      }}
    >
      <Grid item sx={{ position: "fixed" }}>
        <CoachesCard
          cardHeight={630}
          mediaHeight={300}
          cardWidth="85%"
          booking={true}
        />
      </Grid>
      <Grid container item xs={5} md={9} lg={9}>
        <Grid
          item
          xs={12}
          md={5}
          lg={6}
          sx={{
            height: 300,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={value}
              sx={{ height: "100%" }}
              onChange={(newValue: Dayjs | null) => setValue(newValue ?? value)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          lg={6}
          sx={{
            height: 300,
          }}
        >
          <Slot testimonials={[]} />
        </Grid>
        <Grid item xs={12} md={12} lg={12} sx={{ p: 8 }}>
          <Testimonials />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BookCoachPage;
