import {
  Card,
  Grid,
  CardContent,
  Typography,
  Chip,
  CardActions,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

import StarIcon from "@mui/icons-material/Star";
import dayjs from "dayjs";

interface HomeCardProps {
  workout: any;
}

function HomeCard({ workout }: HomeCardProps) {
  // Create a variable to hold the mapped Grid items
  const timeSlots = (workout["freeSlots"] || []).map(
    (slot: any, index: number) => (
      <Grid item xs={3} md={2} lg={3} key={index} sx={{ mb: 1 }}>
        <Chip
          label={`${slot}`}
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
    )
  );

  return (
    <Grid item xs={12} md={6} sx={{ p: 1 }}>
      <Card
        sx={{
          borderRadius: "16px",
          width: "100%",
          height: "100%",
          maxWidth: "664px",
        }}
      >
        <CardContent
          sx={{
            my: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            pb: 0,
            px: 2,
          }}
        >
          <Grid container spacing={2} sx={{ mb: 0 }}>
            <Grid item xs={7} md={7} sx={{ display: "flex", gap: 1 }}>
              <Grid item xs={2} md={2}>
                <Avatar
                  src={`/Images/${workout["coachName"]["profilePicture"]}`}
                  sx={{ width: "75px", height: "75px" }}
                />
              </Grid>
              <Grid item xs={10} md={10} sx={{ ml: 2 }}>
                <Typography variant="body1" fontWeight={500} fontSize="18px">
                  {workout["coachName"]["name"]}
                </Typography>
                <Typography variant="body2" fontWeight={300} fontSize="14px">
                  {workout["coachName"]["tittle"]}
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
                  {workout["coachName"]["ratings"]}
                  <StarIcon sx={{ fontSize: "large", color: "#FDD63B" }} />
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={5}
              md={5}
              sx={{
                alignItems: "flex-end",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  padding: 2,
                  borderRadius: "10px",
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
                    {workout["sport"]}
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
                    {workout["time"]}
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
                    {dayjs(workout["date"]).format("MMMM D[th], h:mm A")}
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body2" fontWeight={300} fontSize="14px">
                {workout["coachName"]["shortSummary"]}
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
