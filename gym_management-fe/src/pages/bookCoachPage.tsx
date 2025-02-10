import React, { useState } from "react";
import Testimonials from "../components/Testimonials.tsx";
import { Grid, Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Slot from "../components/Slots.tsx";

const BookCoachPage: React.FC = () => {
  const [value, setValue] = useState<Dayjs>(dayjs("2022-04-17"));

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          sx={{
            height: "510px",
            width: "370px", // This controls the full calendar width
            "& .MuiDayCalendar-weekDayLabel": {
              justifyContent: "space-between", // Adjusts spacing of week slots
              width: "100%", // Expands each row to fit the container
            },
          }}
          slotProps={{
            day: {
              sx: {
                height: "45px",
                width: "45px",
              },
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default BookCoachPage;
