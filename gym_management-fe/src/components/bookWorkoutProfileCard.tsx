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
  firstName: string;
  lastName: string;
  image: string;
  userSummary: string;
  title: string;
  ratings: number;
}

// CoachesCard component
const BookWorkoutProfileCard: React.FC<CoachesCardProps> = ({
  firstName,
  lastName,
  userSummary,
  title,
  image,
  ratings,
}) => {
  const navigate = useNavigate();

  // Handle booking navigation
  const handleBookWorkout = () => {
    navigate("/book-coach");
  };
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={3}
      lg={3}
    >
      <Card
        sx={{
          borderRadius: "16px",
          height: "auto",
          width: { xs: "100%", sm: "90%", md: "100%", lg: "80%" },
          maxWidth: { xs: "100%", sm: "400px", md: "400px", lg: "400px" },
          margin: "0 auto",
        }}
      >
        {/* Media Section */}
        <Suspense fallback={<Box sx={{ height: 240 }} />}>
          <CardMedia
            sx={{ height: 240 }}
            image={`/Images/${image}.svg`}
            title={firstName + " " + lastName}
            component="img"
            alt={firstName + " " + lastName}
          />
        </Suspense>
        {/* Card Content */}
        <CardContent>
          <Box sx={{ display: "flex", mb: 2 }}>
            <Box>
              <Typography gutterBottom variant="h6">
                {firstName + " " + lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {title}
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Typography>{ratings}</Typography>
            <Rating name="read-only" value={1} max={1} readOnly />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>About Coach</Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
              }}
            >
              {userSummary}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" gutterBottom>Specialization</Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
              }}
            >
              {"specialization"}
            </Typography>
          </Box>

          {/* Card Actions */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: [0, 2],
              gap: 2,
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
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BookWorkoutProfileCard;
