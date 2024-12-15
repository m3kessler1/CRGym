import { Alert, Typography } from "@mui/material";
import BaseImage from "../assets/Base.svg";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const AlertComp = () => {
  const userData = useSelector((state: RootState) => state.user);
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
        {`Hello! ${userData.firstName}`}
      </Typography>
    </Alert>
  );
};

export default AlertComp;
