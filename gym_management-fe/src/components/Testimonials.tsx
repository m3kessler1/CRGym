import React from "react";
import Testimonial from "./Testimonial.tsx";
import { Box } from "@mui/material";

interface TestimonialsProps {
  testimonials?: any[]; // Consider defining a more specific type for testimonials
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const component = Array(8)
    .fill(null)
    .map((_, index) => <Testimonial key={index} />);

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        padding: 2,
        width: "100%",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {component}
    </Box>
  );
};

export default Testimonials;
