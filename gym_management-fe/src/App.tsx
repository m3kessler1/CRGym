import { Box } from "@mui/material";
import AppRoutes from "./routes/Routes.tsx";
import ThemeContextProvider from "./context/ThemeContextProvider.tsx";
import React from "react";

//import UpdateProfile from "./components/UpdateProfile";

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <Box
        sx={{
          m: 0,
          height: "100%",
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <AppRoutes />
      </Box>
    </ThemeContextProvider>
  );
};

export default App;
