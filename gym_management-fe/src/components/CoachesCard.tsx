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
import { Coach } from "../types/coach.ts";

// Define the props interface
interface CoachesCardProps {
  coach: Coach;
  image: string;
}

// CoachesCard component
const CoachesCard: React.FC<CoachesCardProps> = ({ coach, image }) => {
  const navigate = useNavigate();

  // Handle booking navigation
  const handleBookWorkout = (coach: Coach) => {
    navigate("/book-coach", {
      state: {
        coach: coach,
        image: image,
      },
    });
  };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      lg={3}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          borderRadius: "16px",
          height: "100%",
          width: { xs: "100%", sm: "90%", md: "100%", lg: "80%" },
          maxWidth: { xs: "100%", sm: "400px", md: "400px", lg: "400px" },
          margin: "0 auto",
        }}
      >
        {/* Media Section */}
        <Suspense fallback={<Box sx={{ height: 240 }} />}>
          <CardMedia
            sx={{ height: 240 }}
            image={image}
            title={coach.firstName + " " + coach.lastName}
            component="img"
            alt={coach.firstName + " " + coach.lastName}
          />
        </Suspense>
        {/* Card Content */}
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <Box>
              <Typography gutterBottom variant="h6">
                {coach.firstName + " " + coach.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {coach.title}
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Typography>{coach.ratings}</Typography>
            <Rating name="read-only" value={1} max={1} readOnly />
          </Box>

          <Box sx={{ pt: 3, height: "60px" }}>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}
            >
              {coach.userSummary}
            </Typography>
          </Box>
        </CardContent>

        {/* Card Actions */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: [0, 2],
            gap: 2,
            mb: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            size="medium"
            fullWidth
            onClick={() => handleBookWorkout(coach)}
            sx={{
              fontFamily: "Lexend, Arial, sans-serif",
              textTransform: "none",
            }}
          >
            Book Workout
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default CoachesCard;
