import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";

interface TestimonialData {
  // Add specific fields based on your data structure
  // For now it's empty since the data prop isn't being used
}

interface TestimonialProps {
  data?: TestimonialData;
}

const Testimonial: React.FC<TestimonialProps> = ({ data }) => {
  return (
    <Card
      sx={{
        minWidth: "19.75rem",
        minHeight: "15rem",
        margin: [0, 1, 0, 1],
        p: 1,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: "primary.main",
              fontSize: "large",
            }}
            aria-label="testimonial"
          >
            A
          </Avatar>
        }
        action={<Rating name="size-small" defaultValue={2} size="small" />}
        title="Aditya Singh"
        subheader="6/8/2024"
      />

      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          I've been attending classes with Kristin Watson for six months, and
          the transformation in my flexibility and overall well-being has been
          incredible. Her calm demeanor and expert guidance make each session a
          refreshing experience. Highly recommend for anyone looking to enhance
          their yoga practice!
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Testimonial;
