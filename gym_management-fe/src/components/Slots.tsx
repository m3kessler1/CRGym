import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Box, useTheme } from "@mui/material";

interface SlotsProps {
  testimonials: any; // Replace 'any' with your testimonial type if available
}

export default function Slots({
  testimonials,
}: SlotsProps): React.ReactElement {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const handleClick = (index: number): void => {
    setSelectedIndex(index);
  };

  const component = Array(10)
    .fill(null)
    .map((_, index) => (
      <ListItem key={index} component="div" disablePadding sx={{ p: 1 }}>
        <ListItemButton
          onClick={() => handleClick(index)}
          sx={{
            border: `0.2px solid ${
              selectedIndex === index ? theme.palette.primary.main : "green"
            }`, // Conditional border color
            backgroundColor:
              selectedIndex === index ? theme.palette.primary.main : "",
            borderRadius: "4px",
            "&:hover": {
              borderColor: theme.palette.primary.main, // Change border color on hover
            },
          }}
        >
          <ListItemText primary={`Item ${index + 1}`} />
        </ListItemButton>
      </ListItem>
    ));

  return (
    <Box
      sx={{
        overflowY: "auto", // Enables vertical scrolling
        overflowX: "hidden", // Disables horizontal scrolling
        padding: 6,
        height: 300, // Set a fixed height for the scrolling container
        width: "100%", // Full width
        scrollbarWidth: "none", // Hides scrollbar in Firefox
        "&::-webkit-scrollbar": {
          display: "none", // Hides scrollbar in Chrome, Safari, and Edge
        },
      }}
    >
      {component}
    </Box>
  );
}
