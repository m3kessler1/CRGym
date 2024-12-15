import {
  Card,
  Grid,
  CardContent,
  Typography,
  Chip,
  Stack,
  CardActions,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

import StarIcon from "@mui/icons-material/Star";

function HomeCard() {
  // Create a variable to hold the mapped Grid items
  const timeSlots = Array(8)
    .fill(0)
    .map((_, index) => (
      <Grid item xs={3} md={2} lg={2} key={index}>
        <Chip
          label={`${index + 10}:00 - ${index + 11}:00 AM`}
          variant="filled"
          sx={{
            maxHeight: "28px",
            borderRadius: "4px",
            fontWeight: 300,
            backgroundColor: "#F6FFE5",
            color: "black",
            "& .MuiChip-label": {
              fontSize: "10.5px",
            },
          }}
        />
      </Grid>
    ));

  return (
    <Grid item xs={12} md={6} sx={{ pb: 1, pr: 2, pt: 1 }}>
      <Card
        sx={{
          borderRadius: "16px",
          minWidth: "100%",
          minHeight: "100%",
          margin: "0 auto",
        }}
      >
        <CardContent
          sx={{
            my: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            pb: 0,
          }}
        >
          <Grid container spacing={2} sx={{ mb: 0 }}>
            <Grid item xs={7} md={7} sx={{ display: "flex" }}>
              <Grid item xs={3.2} md={3.2}>
                <Avatar
                  src="/Images/image1.svg"
                  sx={{ width: "88px", height: "88px" }}
                />
              </Grid>
              <Grid item xs={8.8} md={8.8}>
                <Typography variant="body1" fontWeight={500} fontSize="18px">
                  Kristin Watson
                </Typography>
                <Typography variant="body2" fontWeight={300} fontSize="14px">
                  Certified personal yoga trainer
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={300}
                  fontSize="14px"
                  marginTop={1}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  4.96
                  <StarIcon sx={{ fontSize: "large", color: "#FDD63B" }} />
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={5}
              md={5}
              sx={{
                alignItems: "flex-start",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={500}
                fontSize="14px"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  whiteSpace: "nowrap",
                }}
              >
                <FitnessCenterIcon
                  sx={{ fontSize: "small", color: "grey.500" }}
                />
                Type :{" "}
                <Typography variant="body2" fontWeight={300} component="span">
                  Yoga
                </Typography>
              </Typography>
              <Typography
                variant="body2"
                fontWeight={500}
                fontSize="14px"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  whiteSpace: "nowrap",
                }}
              >
                <QueryBuilderIcon
                  sx={{ fontSize: "small", color: "grey.500" }}
                />
                Time :{" "}
                <Typography variant="body2" fontWeight={300} component="span">
                  1h
                </Typography>
              </Typography>
              <Typography
                variant="body2"
                fontWeight={500}
                fontSize="14px"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  whiteSpace: "nowrap",
                }}
              >
                <EventAvailableIcon
                  sx={{ fontSize: "small", color: "grey.500" }}
                />
                Date :{" "}
                <Typography variant="body2" fontWeight={300} component="span">
                  July 9th, 12:30 AM
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body2" fontWeight={300} fontSize="14px">
                A Yoga Expert dedicated to crafting personalized workout plans
                that align with your goals.
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body2" fontWeight={300} fontSize="14px">
                Also available for this date:
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {timeSlots}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ mt: 0, mb: 1 }}>
          <Box
            sx={{
              display: { md: "flex", lg: "flex" },
              flexDirection: {
                md: "row",
                lg: "row",
                xs: "column",
                sm: "column",
              },
              gap: 1,
              flexGrow: 1,
              ml: 1,
              mr: 1,
            }}
          >
            <Button
              variant="contained"
              size="medium"
              fullWidth
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid black",
                mb: { md: 0, lg: 0, xs: 1, sm: 1 },
              }}
            >
              Coach Profile
            </Button>
            <Button fullWidth variant="contained" sx={{ borderRadius: "8px" }}>
              Book Workout
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default HomeCard;
