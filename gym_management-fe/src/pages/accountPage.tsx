import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Logout from "../components/LogoutButton.jsx";
import { useTheme } from "@mui/material/styles";

type FormData = {
  name: string;
  email?: string;
  password?: string;
  target: string;
  activity: string;
};

const schema = z.object({
  name: z.string().min(3, "Name is required"),
  target: z.string().min(1, "Target is required"),
  activity: z.string().min(1, "Activity is required"),
});

function MyAccount() {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log(data); // post
  };
  const target = watch("target");
  const activity = watch("activity");

  return (
    <Grid
      container
      sx={{
        height: { md: "70vh", xs: "100%" }, // Set the grid container to fill the viewport height
        width: "100%",
      }}
    >
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{ display: "flex", height: "100%", width: "100%" }}
      >
        <Grid item xs={4} md={3} lg={3} sx={{ p: 3 }}>
          <Typography
            sx={{
              borderLeft: `0.2rem solid ${theme.palette.primary.main}`,
              width: "100%",
              height: "15%",
              display: "flex",
              justifyContent: "left",
              p: 1,
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            General Information
          </Typography>
          <Box sx={{ width: { xs: "100%", md: "50%" }, pt: 2 }}>
            <Logout padding={0} />
          </Box>
        </Grid>
        <Grid item xs={8} md={4} lg={4} sx={{ p: 3 }}>
          <Box
            component="form"
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: "400px",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              margin="normal"
              required
              id="name"
              autoComplete="name"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              value={"Aditya Singh"}
            />
            <TextField
              margin="normal"
              required
              id="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              value={"adityyasinggh@gmail.com"}
              disabled
            />
            <TextField
              margin="normal"
              required
              type="password"
              id="password"
              {...register("password")}
              value={"********"}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              disabled
            />
            <Divider sx={{ width: "100%", my: 2 }} />

            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                mb: 2,
              }}
            >
              <InputLabel id="yourTargetLabel">Target</InputLabel>
              <Select
                labelId="yourTargetLabel"
                id="yourTarget"
                value={target || ""}
                label="Target"
                {...register("target")}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="10">Ten</MenuItem>
                <MenuItem value="20">Twenty</MenuItem>
                <MenuItem value="30">Thirty</MenuItem>
              </Select>
              {errors.target && (
                <Typography color="error">{errors.target.message}</Typography>
              )}
            </FormControl>

            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                mb: 2,
              }}
            >
              <InputLabel id="activity">Activity</InputLabel>
              <Select
                labelId="activity"
                id="activity"
                value={activity || ""}
                label="Activity"
                {...register("activity")}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="10">Ten</MenuItem>
                <MenuItem value="20">Twenty</MenuItem>
                <MenuItem value="30">Thirty</MenuItem>
              </Select>
              {errors.activity && (
                <Typography color="error">{errors.activity.message}</Typography>
              )}
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                width: "100%",
              }}
            >
              <Button
                type="submit"
                variant="outlined"
                disabled={!isValid}
                sx={{
                  borderRadius: "10px",
                  width: { xs: "100%", md: "auto" },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MyAccount;
