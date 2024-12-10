import {
  Box,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

type FormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const schema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"], // path of error
  });

function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      oldPassword: "aaaaaaaa",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data); // post
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={12}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <Box
            component="form"
            noValidate
            sx={{
              width: "100%",
              maxWidth: "700px",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  disabled
                  id="oldPassword"
                  label="Old Password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="oldPassword"
                  {...register("oldPassword")}
                  error={!!errors.oldPassword}
                  helperText={errors.oldPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      mb: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  margin="normal"
                  type="password"
                  id="newPassword"
                  label="New Password"
                  placeholder="Enter your password"
                  {...register("newPassword")}
                  error={!!errors.newPassword}
                  helperText={
                    errors.newPassword
                      ? errors.newPassword.message
                      : "At least one capital letter required"
                  }
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  margin="normal"
                  type="password"
                  id="confirmPassword"
                  label="Confirm New Password"
                  placeholder="Enter your password"
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.message
                      : "At least one capital letter required"
                  }
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </Grid>
            </Grid>
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
        </Box>
      </Grid>
    </Grid>
  );
}
//translate("Aditya","en")
export default ChangePassword;
