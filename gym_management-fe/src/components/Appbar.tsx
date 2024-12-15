import React, { useState, MouseEvent } from "react";
import {
  styled,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Tabs,
  Button,
  Tab,
  Grid,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ProfileTooltip from "./ProfileTooltip";
import { useThemeContext } from "../context/ThemeContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import AlertComp from "./Alert";
import { useReducer } from "react"; // Import type
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

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

// Add reducer types and state
type NavigationState = {
  activeTab: number;
};

type NavigationAction = {
  type: "SET_TAB";
  payload: number;
};

// Add reducer function
const navigationReducer = (
  state: NavigationState,
  action: NavigationAction
): NavigationState => {
  switch (action.type) {
    case "SET_TAB":
      return { ...state, activeTab: action.payload };
    default:
      return state;
  }
};

const CustomAppBar: React.FC<CustomAppBarProps> = React.memo(
  ({ positioning = "fixed", logo, height = "4rem" }) => {
    const location = useLocation();
    const userData = useSelector((state: RootState) => state.user);
    const isAuthenticated = !!Cookies.get("authToken");

    // Create a function to get initial tab based on current route
    const getInitialTab = () => {
      const currentPath = location.pathname;

      // Define routes and their corresponding tab indices
      if (isAuthenticated) {
        switch (currentPath) {
          case "/home":
            return 0;
          case "/workouts":
            return 1;
          case "/coaches":
            return 2;
          default:
            return 0;
        }
      } else {
        switch (currentPath) {
          case "/home":
            return 0;
          case "/coaches":
            return 1;
          default:
            return 0;
        }
      }
    };

    // Initialize reducer with current route's tab
    const [state, dispatch] = useReducer(navigationReducer, {
      activeTab: getInitialTab(),
    });

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { toggleTheme, mode } = useThemeContext();
    const navigate = useNavigate();

    // Add effect to sync tab with route on hard refresh
    React.useEffect(() => {
      const currentTab = getInitialTab();
      if (state.activeTab !== currentTab) {
        dispatch({ type: "SET_TAB", payload: currentTab });
      }
    }, [location.pathname]);

    // Handle tab change and navigation
    const handleTabChange = (
      _event: React.SyntheticEvent,
      newValue: number
    ) => {
      dispatch({ type: "SET_TAB", payload: newValue });

      if (isAuthenticated) {
        switch (newValue) {
          case 0:
            navigate("/home");
            break;
          case 1:
            navigate("/workouts");
            break;
          case 2:
            navigate("/coaches");
            break;
        }
      } else {
        switch (newValue) {
          case 0:
            navigate("/home");
            break;
          case 1:
            navigate("/coaches");
            break;
        }
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
                value={state.activeTab}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                sx={{ flexGrow: 1 }}
              >
                <Tab label="Home" sx={{ fontSize: "1.1rem" }} />
                {isAuthenticated && (
                  <Tab label="Workouts" sx={{ fontSize: "1.1rem" }} />
                )}
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
              {isAuthenticated ? (
                <IconButton
                  onClick={handleClick}
                  sx={{ color: "primary.main" }}
                  data-testid="profile-button"
                >
                  <Avatar
                    data-testid="profile-avatar"
                    sx={{
                      bgcolor: "primary.main",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    {userData.firstName.charAt(0)}
                  </Avatar>
                </IconButton>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => navigate("/login")}
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                  }}
                >
                  Login
                </Button>
              )}
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
          <AlertComp />
        </Grid>
      </Grid>
    );
  }
);

export default CustomAppBar;
