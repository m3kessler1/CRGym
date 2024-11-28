import { Box, Alert, Typography } from "@mui/material";
import React from "react";

interface AlertCompProps {
  message: string;
}

const AlertComp: React.FC<AlertCompProps> = ({ message }) => {
  return (
    <Box>
      <Alert
        variant="filled"
        icon={false}
        sx={{ backgroundColor: "primary.main" }}
      >
        <Typography
          variant="h5"
          sx={{
            justifyContent: "center",
            alignItems: "start",
            fontFamily: "lexend",
            p: 4,
          }}
        >
          {message}
        </Typography>
      </Alert>
    </Box>
  );
};

export default AlertComp;
