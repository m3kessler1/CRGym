import React, { useState } from "react";
import { Grid, Pagination, Box } from "@mui/material";
import CoachesCard from "../components/CoachesCard";

const Coaches: React.FC = () => {
  // Mock data for demonstration (can be replaced with API data)
  const coachesData = Array(50)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      name: `Coach ${index + 1}`,
    }));

  const itemsPerPage = 8; // Number of items per page
  const [page, setPage] = useState(1); // Current page

  // Calculate total pages
  const totalPages = Math.ceil(coachesData.length / itemsPerPage);

  // Get the data for the current page
  const currentPageData = coachesData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      {/* Coaches Grid */}
      <Grid
        container
        spacing={6}
        sx={{
          p: 1,
          display: "flex",
        }}
      >
        {currentPageData.map((coach) => (
          <CoachesCard key={coach.id} />
        ))}
      </Grid>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
        }}
      >
        <Pagination
          count={totalPages} // Total number of pages
          page={page} // Current page
          onChange={handlePageChange} // Page change handler
          color="primary"
          size="large" // Primary color for the pagination
        />
      </Box>
    </Box>
  );
};

export default Coaches;
