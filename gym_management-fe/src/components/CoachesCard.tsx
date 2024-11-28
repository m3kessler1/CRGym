import * as React from "react";
import {
  Grid,
  Typography,
  CardMedia,
  Button,
  CardContent,
  Box,
  Card,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";

// Define the props interface
interface CoachesCardProps {
  cardHeight?: string | number; // Optional height for the card
  mediaHeight?: string | number; // Optional height for the media section
  cardWidth?: string | number; // Optional width for the card
  booking?: boolean; // Indicates if the "Repeat Previous Workout" button should be displayed
}

// CoachesCard component
const CoachesCard: React.FC<CoachesCardProps> = ({
  cardHeight,
  mediaHeight,
  cardWidth,
  booking,
}) => {
  const navigate = useNavigate();

  // Handle booking navigation
  const handleBookWorkout = () => {
    navigate("/book-coach");
  };

  return (
    <Grid
      item
      xs={6}
      md={3}
      lg={3}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Card
        sx={{
          borderRadius: "16px",
          height: cardHeight || "100%", // Default to 100% if cardHeight is undefined
          width: cardWidth || "85%", // Default to 90% if cardWidth is undefined
        }}
      >
        {/* Media Section */}
        <Suspense fallback={<Box sx={{ height: mediaHeight || 240 }} />}>
          <CardMedia
            sx={{ height: mediaHeight || 240 }}
            image="/Images/Avatar.svg"
            title="Coach Avatar"
            component="img"
          />
        </Suspense>
        {/* Card Content */}
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <Box>
              <Typography gutterBottom variant="h6">
                Aditya Singh
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Certified personal yoga trainer
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Typography>4.6</Typography>
            <Rating name="read-only" value={1} max={1} readOnly />
          </Box>

          <Box sx={{ pt: 3 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              A Yoga Expert dedicated to crafting personalized workout plans
              that align with your goals.
            </Typography>
          </Box>
        </CardContent>

        {/* Card Actions */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: [0, 2],
            gap: booking ? 2 : 0,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            size="medium"
            fullWidth
            onClick={handleBookWorkout}
            sx={{
              fontFamily: "Lexend, Arial, sans-serif",
              textTransform: "none",
            }}
          >
            Book Workout
          </Button>
          {booking && (
            <Button
              variant="contained"
              size="medium"
              fullWidth
              sx={{
                backgroundColor: "white",
                color: "black",
                fontFamily: "Lexend, Arial, sans-serif",
                textTransform: "none",
              }}
              onClick={handleBookWorkout}
            >
              Repeat Previous Workout
            </Button>
          )}
        </Box>
      </Card>
    </Grid>
  );
};

export default CoachesCard;
