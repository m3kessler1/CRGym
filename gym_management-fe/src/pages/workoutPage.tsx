import { Grid, Pagination, Box } from "@mui/material";
import WorkoutCard from "../components/WorkoutCard.tsx";
import { useState } from "react";

const Workouts: React.FC = () => {
  const itemsPerPage = 6;
  const totalItems = 8;
  const [page, setPage] = useState<number>(1);

  const components = Array(totalItems)
    .fill(null)
    .map((_, index) => <WorkoutCard key={index} />);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedComponents = components.slice(startIndex, endIndex);

  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        overflow: "hidden",
        p: 3, // Prevents horizontal scrolling
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          width: "100%",
          ml: 0,
          mr: 0,
          m: 0,
          p: 0, // Remove default margin
        }}
      >
        {displayedComponents}
      </Grid>

      {/* Pagination controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
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
    </Box>
  );
};

export default Workouts;
