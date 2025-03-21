"use client";
import React, { useState, useContext, SetStateAction } from "react";
// MUI
import { Box, TextField, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// CONTEXTS
import { UserContext, useUser } from "@/src/context/UserContext";
// COMPONENTS
import PrimaryButton from "@/src/components/Common/PrimaryButton";
import CloverFrame from "@/src/components/Layout/CloverFrame";
import { ToastMsg } from "@/src/components/Notification/ToastMsg";
// HOOKS && FUNCTIONS
import { login, changePassword } from "@/src/app/signup/actions";
// TOAST
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

interface SlideProps {
  setPageStep?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentView?: React.Dispatch<React.SetStateAction<string>>;
}

export default function PasswordResetPage() {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

  const { palette } = useTheme();
  const { user, setUser, fetchUser } = useContext(UserContext);

  const [password, setPassword] = useState("");
  const [step, setStep] = useState(0);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNext = (currentStep: number) => {
    if (currentStep === 0 && password.trim() && passwordRegex.test(password)) {
      setStep(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // IT RETURNS USER DATA OR FALSE (BOOLEAN)
    if (passwordRegex.test(password)) {
      const res = await changePassword(password);
      // console.log("send email to reset password res: ", res);
      if (!res) {
        return toast(
          <ToastMsg
            title="Failed To Change Password"
            message="Please try again."
            titleColor={palette.error.dark}
          />,
          { autoClose: 2000, hideProgressBar: true }
        );
      } else {
        toast(
          <ToastMsg
            title="Successfully Password Changed!"
            message="Your password successfully changed."
            titleColor={palette.success.main}
          />,
          { autoClose: 2000, hideProgressBar: true }
        );
        redirect("/");
      }
    } else {
      // WHEN EMAIL VALIDATION FAILED
      return toast(
        <ToastMsg
          title="Valid Password Needed"
          message="Please enter a valid password!"
          titleColor={palette.error.dark}
        />,
        { autoClose: 2000, hideProgressBar: true }
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // background: "linear-gradient(90deg, #f0fae7, #bef6a6)",
        background: `linear-gradient(90deg, #f0fae7, ${palette.primary.main})`,
        padding: 2,
      }}
    >
      <CloverFrame text="Reset Password">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "27rem",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
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
          />

          <PrimaryButton text={"Reset Password"} />
        </Box>
      </CloverFrame>
    </Box>
  );
}
