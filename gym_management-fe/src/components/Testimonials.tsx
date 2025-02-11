import React, { useState } from "react";
import Testimonial from "./Testimonial.tsx";
import { Box, Pagination } from "@mui/material";

interface TestimonialsProps {
  testimonials?: any[]; // Consider defining a more specific type for testimonials
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(8 / itemsPerPage); // Using 8 as total items from your original array

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const component = Array(8)
    .fill(null)
    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    .map((_, index) => <Testimonial key={index} />);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          width: "100%",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {component}
      </Box>
      <Pagination 
        count={totalPages} 
        page={page} 
        onChange={handlePageChange} 
        color="primary"
        sx={{
          mb:4
        }}
      />
    </Box>
  );
};

export default Testimonials;
