import React, { useState, useContext, SetStateAction } from "react";
// MUI
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// CONTEXTS
import { UserContext, useUser } from "@/src/context/UserContext";
// COMPONENTS
import PrimaryButton from "../Common/PrimaryButton";
import SubLink from "../Common/SubLink";
import { ToastMsg } from "../Notification/ToastMsg";
// HOOKS && FUNCTIONS
import { login, sendPasswordResetEmail } from "@/src/app/signup/actions";
// TOAST
import { toast } from "react-toastify";

interface SlideProps {
  setPageStep?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentView?: React.Dispatch<React.SetStateAction<string>>;
}

export default function SendPassResetForm({
  setPageStep,
  setCurrentView,
}: SlideProps) {
  const emailRegex = /^.+@.+\..+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

  const { palette } = useTheme();
  const { user, setUser, fetchUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNext = (currentStep: number) => {
    if (currentStep === 0 && email.trim() && emailRegex.test(email)) {
      setStep(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // IT RETURNS USER DATA OR FALSE (BOOLEAN)
    if (emailRegex.test(email)) {
      const res = await sendPasswordResetEmail(email);
      // console.log("send email to reset password res: ", res);
      if (!res) {
        return toast(
          <ToastMsg
            title="Failed To Send Email"
            message="Please try again."
            titleColor={palette.error.dark}
          />,
          { autoClose: 2000, hideProgressBar: true }
        );
      } else {
        return toast(
          <ToastMsg
            title="Email Sent!"
            message="Please check your email that you recieved to reset your password. I can take some minutes."
            titleColor={palette.success.main}
          />,
          { autoClose: 2000, hideProgressBar: true }
        );
      }
    } else {
      // WHEN EMAIL VALIDATION FAILED
      return toast(
        <ToastMsg
          title="Valid Email Needed"
          message="Please enter a valid email!"
          titleColor={palette.error.dark}
        />,
        { autoClose: 2000, hideProgressBar: true }
      );
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        fullWidth
        type="email"
        placeholder="Please enter your email"
        name="email"
        value={email}
        onChange={handleChangeInput}
        sx={{
          "& .MuiOutlinedInput-root": {
            pr: step === 0 ? 6 : 2,
            py: 0.75,
            bgcolor: step > 0 ? "rgba(0, 0, 0, 0.02)" : "transparent",
          },
          "& .MuiOutlinedInput-input": {
            fontSize: "1rem",
          },
          opacity: step < 0 ? 0.5 : 1,
        }}
      />

      {/* <TextField
        fullWidth
        type="password"
        placeholder="Password * 8-12 letters including alphabet, number, special character"
        name="password"
        value={password}
        onChange={handleChangeInput}
        sx={{
          "& .MuiOutlinedInput-root": {
            pr: step === 1 ? 6 : 2,
            py: 0.75,
          },
          "& .MuiOutlinedInput-input": {
            fontSize: "1rem",
          },
          opacity: step < 1 ? 0.5 : 1,
        }}
        disabled={step < 1 || step > 1}
        InputProps={{
          endAdornment:
            step === 1 ? (
              <InputAdornment position="end">
                <IconButton
                  type="submit"
                  edge="end"
                  sx={{
                    bgcolor: "rgba(122, 199, 79, 0.1)",
                    color: "primary.dark",
                    "&:hover": {
                      bgcolor: "rgba(122, 199, 79, 0.2)",
                    },
                  }}
                >
                  <ArrowForwardIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
      /> */}

      <PrimaryButton text={"Send email to reset password"} />

      <SubLink
        text="I need to sign up →"
        clickEvent={() => (setCurrentView ? setCurrentView("signup") : "")}
      />
      <SubLink
        text="Go back to login →"
        clickEvent={() => (setCurrentView ? setCurrentView("login") : "")}
      />
    </Box>
  );
}
