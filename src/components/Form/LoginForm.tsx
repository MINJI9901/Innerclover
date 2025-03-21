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

export default function LoginForm({ setPageStep, setCurrentView }: SlideProps) {
  const emailRegex = /^.+@.+\..+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

  const { palette } = useTheme();
  const { user, setUser, fetchUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [step, setStep] = useState(0);

  // TO REFLECT CHANGES IN INPUT
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // IN CASE IT'S INITIAL PAGE, GO TO NEXT SLIDE
  const handleNext = (currentStep: number) => {
    if (
      currentStep === 0 &&
      formData.email.trim() &&
      emailRegex.test(formData.email)
    ) {
      setStep(1);
    }
  };

  // SUBMIT LOGIN
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // IT RETURNS USER DATA OR FALSE (BOOLEAN)
    if (passwordRegex.test(formData.password)) {
      const res = await login(formData);
      // console.log("login res: ", res);
      if (!res) {
        return toast(
          <ToastMsg
            title="Login Failed"
            message="Please check your email and password!"
            titleColor={palette.error.dark}
          />,
          { autoClose: 2000, hideProgressBar: true }
        );
      } else {
        // IF LOGIN IS SUCCESSFUL, FETCH USER AGAIN AND MOVE TO THE NEXT SLIDE
        fetchUser ? await fetchUser() : "";
        setPageStep ? setPageStep(1) : "";
      }
    }
    // else {
    //   // WHEN PASSWORD VALIDATION FAILED
    //   console.log("password validation wrong");
    // }
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
        value={formData.email}
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
        disabled={step > 0}
        InputProps={{
          endAdornment:
            step === 0 ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleNext(0)}
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
      />

      <TextField
        fullWidth
        type="password"
        placeholder="Password * 8-12 letters including alphabet, number, special character"
        name="password"
        value={formData.password}
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
      />

      <PrimaryButton text={"Login"} />

      <SubLink
        text="I need to sign up →"
        clickEvent={() => (setCurrentView ? setCurrentView("signup") : "")}
      />
      <SubLink
        text="Forgot my password →"
        clickEvent={() =>
          setCurrentView ? setCurrentView("forgotPassword") : ""
        }
      />
    </Box>
  );
}
