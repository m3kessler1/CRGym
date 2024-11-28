import { Box, Grid, Typography, TextField, Button, Link } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Image from "../components/Image.tsx";

// Define schema using Zod
const schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// Define the form data type
type FormData = z.infer<typeof schema>;

function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data); // Post form data
    navigate("/home"); // Navigate to home after submission
  };

  return (
    <Grid
      container
      spacing={6}
      sx={{
        height: {
          xs: "15vh", // 40vh for xs screens
          md: "100vh", // 100vh for larger screens
        },
        mt: {
          md: 0,
          lg: 0,
        },
        display: {
          xs: "flex",
        },
        justifyContent: {
          xs: "center",
        },
        alignItems: {
          xs: "center",
        },
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        lg={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box
          component="form"
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "500px",
            p: 3,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography component="h1" variant="h5" align="left" width="100%">
            WELCOME BACK!
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            align="left"
            sx={{ fontFamily: "Arial, sans-serif", fontWeight: "bold" }}
            width="100%"
          >
            Log In Your Account
          </Typography>
          <TextField
            margin="normal"
            required
            id="email"
            label="Email Address"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <TextField
            margin="normal"
            required
            type="password"
            id="password"
            label="Password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              m: 1,
              borderRadius: "6px",
              height: "3rem",
              textTransform: "none",
            }}
            disabled={!isValid}
          >
            Log In
          </Button>
          <Grid item xs={12} md={12}>
            <Typography>
              Don't have an Account?{" "}
              <Link href="/register" variant="body2">
                Create New Account
              </Link>
            </Typography>
          </Grid>
        </Box>
      </Grid>
      <Image />
    </Grid>
  );
}

export default LoginPage;
