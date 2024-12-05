import { Box, Alert, Typography } from "@mui/material";
import React from "react";
import BaseImage from "../assets/Base.svg";

interface AlertCompProps {
  message: string;
}

const AlertComp: React.FC<AlertCompProps> = ({ message }) => {
  return (
    <Alert
      variant="filled"
      icon={false}
      sx={{
        backgroundImage: `url(${BaseImage})`, // Add your image path here
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
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
  );
};

export default AlertComp;
