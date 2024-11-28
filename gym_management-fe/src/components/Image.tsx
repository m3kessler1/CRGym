import { Box, Grid } from "@mui/material";
import SignUpImage from "../assets/SignUpImage.svg";
import React from "react";

const Image: React.FC<{ width?: string; height?: string }> = ({
  width = "70%",
  height = "95%",
}) => {
  return (
    <Grid
      item
      xs={false}
      md={6}
      lg={6}
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${SignUpImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: width,
          height: height,
          borderRadius: "2rem",
          mb: 2,
          boxShadow: 5,
        }}
      ></Box>
    </Grid>
  );
};

export default Image;
