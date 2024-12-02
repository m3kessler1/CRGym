import React, { useState, MouseEvent } from "react";
import {
  styled,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ProfileTooltip from "./ProfileTooltip";
import { useThemeContext } from "../context/ThemeContextProvider";
import { useNavigate } from "react-router-dom";
import AlertComp from "./Alert";

// Define props for the component
interface CustomAppBarProps {
  positioning?: "fixed" | "absolute" | "sticky" | "static" | "relative";
  logo: string; // URL for the logo image
  height?: string; // Height of the AppBar
}

// Styled AppBar component with TypeScript support
const AppBar = styled(MuiAppBar)<{ color: string; height?: string }>(
  ({ color, height }) => ({
    backgroundColor: color,
    height: height,
  })
);

const CustomAppBar: React.FC<CustomAppBarProps> = React.memo(
  ({ positioning = "fixed", logo, height = "4rem" }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // For tooltip
    const { toggleTheme, mode } = useThemeContext();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0); // Default active tab index

    // Handle tab change and navigation
    const handleTabChange = (
      _event: React.SyntheticEvent,
      newValue: number
    ) => {
      setActiveTab(newValue);

      // Navigate based on the selected tab
      const routes = ["/home", "/workouts", "/coaches"];
      if (routes[newValue]) {
        navigate(routes[newValue]);
      }
    };

    // Handle avatar (profile) icon click
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    // Close the tooltip
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <Grid container>
        <Grid item xs={12}>
          <AppBar
            position={positioning}
            color={mode === "light" ? "default" : "primary"}
            height={height}
          >
            <Toolbar>
              {/* Logo */}
              <Box sx={{ p: { xs: 0, md: 4 } }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    height: "2rem", // Consistent heightAvat
                    filter: mode === "dark" ? "invert(1)" : "none",
                  }}
                />
              </Box>

              {/* Tabs */}
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                sx={{ flexGrow: 1 }}
              >
                <Tab label="Home" sx={{ fontSize: "1.1rem" }} />
                <Tab label="Workouts" sx={{ fontSize: "1.1rem" }} />
                <Tab label="Coaches" sx={{ fontSize: "1.1rem" }} />
              </Tabs>

              {/* Theme Toggle Button */}
              <IconButton
                sx={{ color: "primary.main" }}
                onClick={toggleTheme}
                data-testid="theme-toggle"
              >
                {mode === "light" ? (
                  <Brightness7Icon fontSize="large" />
                ) : (
                  <Brightness4Icon fontSize="large" />
                )}
              </IconButton>

              {/* Profile Avatar */}
              <IconButton
                onClick={handleClick}
                sx={{ color: "primary.main" }}
                data-testid="profile-button"
              >
                <Avatar
                  data-testid="profile-avatar"
                  sx={{ bgcolor: "primary.main" }}
                >
                  A
                </Avatar>
              </IconButton>
            </Toolbar>

            {/* Profile Tooltip */}
            <ProfileTooltip
              handleClose={handleClose}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              setAnchorEl={setAnchorEl}
            />
          </AppBar>

          {/* Add Toolbar Spacer Here */}
          <Toolbar />
        </Grid>

        {/* Alert Component */}
        <Grid item xs={12}>
          <AlertComp message={`Hello!`} />
        </Grid>
      </Grid>
    );
  }
);

export default CustomAppBar;
