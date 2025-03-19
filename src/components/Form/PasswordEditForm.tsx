import React, { useState, useContext } from "react";
// MUI
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// CONTEXTS
import { UserContext, useUser } from "@/src/context/UserContext";
// COMPONENTS
import BasicButton from "../Common/BasicButton";
import SubLink from "../Common/SubLink";
import { ToastMsg } from "../Notification/ToastMsg";
// HOOKS && FUNCTIONS
import { login, changePassword } from "@/src/app/signup/actions";
// TOAST
import { toast } from "react-toastify";
// SUPABASE
import { createClient } from "@/src/utils/supabase/client";
import { profile } from "console";

export default function PasswordEditForm({
  afterEvent,
}: {
  afterEvent: Function;
}) {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

  const { palette } = useTheme();

  const { user, setUser, fetchUser, profile } = useContext(UserContext);

  const [formData, setFormData] = useState({
    currPassword: "",
    newPassword: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "newPassword") {
      setIsValid(passwordRegex.test(value));
    }
  };

  const handleSubmit = async () => {
    if (!notValidPassword && profile) {
      const loginRes = await login({
        email: profile.email,
        password: formData.currPassword,
      });

      // CHECK THE CURRENT PASSWORD FIRST TO GO NEXT
      if (!loginRes) {
        return toast(
          () => (
            <ToastMsg
              title="Wrong Password"
              titleColor="error.dark"
              message="The current password doesn't match."
            />
          ),
          { hideProgressBar: true }
        );
      }

      const res = await changePassword(formData.newPassword);

      if (!res) {
        return toast(
          () => (
            <ToastMsg
              title="Password Update Failed"
              titleColor="error.dark"
              message="Failed to change the password. Try again please."
            />
          ),
          { hideProgressBar: true }
        );
      }

      toast(
        () => (
          <ToastMsg
            title="Successfully Changed!"
            titleColor="success.main"
            message="Your password successfully changed!"
          />
        ),
        { hideProgressBar: true }
      );

      afterEvent();
    }
  };

  const notValidPassword = !isValid && formData.newPassword.length;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box>
        <Typography>Current Password</Typography>
        <TextField
          fullWidth
          size="small"
          type="password"
          name="currPassword"
          value={formData.currPassword}
          placeholder="Current Password"
          sx={{
            "& .MuiOutlinedInput-input": {
              fontSize: "1rem",
            },
          }}
          onChange={handleChangeInput}
        />
      </Box>

      <Box>
        <Typography>New Password</Typography>
        <TextField
          fullWidth
          size="small"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          placeholder="New Password"
          error={notValidPassword ? true : false}
          helperText={
            notValidPassword
              ? "Please, type 8-16 letters including at least one alphabet, number, and special character."
              : ""
          }
          sx={{
            "& .MuiOutlinedInput-input": {
              fontSize: "1rem",
            },
          }}
          onChange={handleChangeInput}
        />
      </Box>

      <Box alignSelf={"end"}>
        <BasicButton text={"Change Password"} clickEvent={handleSubmit} />
      </Box>
    </Box>
  );
}
