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
import BookedWorkoutDialog from "./bookedWorkoutDialog";
import StarIcon from "@mui/icons-material/Star";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

interface HomeCardProps {
  image: string;
  date: string;
  time: string;
  coach: any;
}

function HomeCard({ image, date, time, coach }: HomeCardProps) {
  // Create a variable to hold the mapped Grid items
  const token = Cookies.get("authToken") ? true : false;
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation();
  const timeSlots = (coach["timeSlots"] || []).map(
    (slot: any, index: number) => (
      <Grid item xs={2} md={2} lg={2} key={index}>
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
    <Grid item xs={12} md={6}>
      <Card
        sx={{
          borderRadius: "16px",
          width: "98%",
          height: "100%",
          //maxWidth: "664px",
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
                <Avatar src={image} sx={{ width: "75px", height: "75px" }} />
              </Grid>
              <Grid item xs={10} md={10} sx={{ ml: 2 }}>
                <Typography variant="body1" fontWeight={500} fontSize="18px">
                  {coach["firstName"] + " " + coach["lastName"]}
                </Typography>
                <Typography variant="body2" fontWeight={300} fontSize="14px">
                  {coach["title"]}
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
                  {5}
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
                    {coach["activity"]}
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
                  {time != "All" ? "Time :" : "Duration :"}
                  <Typography variant="body2" fontWeight={300} component="span">
                    {time != "All" ? time : "1h"}
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
                    {dayjs(date).format("MMMM D[th], h:mm A")}
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body2" fontWeight={300} fontSize="14px">
                {coach["userSummary"]}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body2" fontWeight={300} fontSize="14px">
                {t("Also available for this date:")}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                height: "100px",
                width: "100%",
              }}
            >
              {timeSlots}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
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
              fullWidth
              variant="contained"
              sx={{ borderRadius: "8px" }}
              onClick={() => {
                if (token) {
                  navigate("/book-coach", {
                    state: {
                      coach: coach,
                      image: image,
                    },
                  });
                } else {
                  setOpenDialog(true);
                }
              }}
            >
              {t("Book Workout")}
            </Button>
          </Box>
        </CardActions>
      </Card>
      <BookedWorkoutDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </Grid>
  );
}

export default HomeCard;
