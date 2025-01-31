import { Box, TextField, Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import usePasswordUser from "../hooks/usePasswordUser";
import { enqueueSnackbar } from "notistack";
import { setUser } from "../redux/userSlice";

import { useDispatch } from "react-redux";

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
  const userData = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { updatePasswordUser } = usePasswordUser();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (userData.password) {
      setValue("oldPassword", userData.password);
    }
  }, [userData.password, setValue]);

  const onSubmit = async (data: FormData) => {
    const newData: { newPassword: string } = {
      newPassword: data.newPassword,
    };

    try {
      await updatePasswordUser(newData);
      dispatch(setUser({ ...userData, password: newData.newPassword }));
      enqueueSnackbar("Password updated successfully!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } catch (error) {
      console.error("Error updating password:", error);
      enqueueSnackbar("Error updating password:", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
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
                  fullWidth
                  id="oldPassword"
                  label="Current Password"
                  value={userData.password}
                  autoComplete="oldPassword"
                  {...register("oldPassword")}
                  error={!!errors.oldPassword}
                  helperText={
                    errors.oldPassword
                      ? errors.oldPassword.message
                      : "Enter your current password"
                  }
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
