import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
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
import { login, signup, checkEmailVerified } from "@/src/app/signup/actions";
// TOAST
import { toast } from "react-toastify";

interface SlideProps {
  setPageStep?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentView?: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignupForm({
  setPageStep,
  setCurrentView,
}: SlideProps) {
  const emailRegex = /^.+@.+\..+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

  const router = useRouter();

  const { palette } = useTheme();
  const { user, setUser, fetchUser } = useContext(UserContext);

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [step, setStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (currentStep: number) => {
    if (currentStep === 0 && formData.name.trim()) {
      setStep(1);
    } else if (
      currentStep === 1 &&
      formData.email.trim() &&
      emailRegex.test(formData.email)
    ) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step > 1) {
      if (passwordRegex.test(formData.password)) {
        const isVerified = await checkEmailVerified(formData.email);

        if (isVerified && !isSubmitted) {
          return toast(
            <ToastMsg
              title="Already Existing Account"
              message="This email already registered. Try logging in!"
            />,
            { autoClose: 2000, hideProgressBar: true }
          );
        } else if (isVerified && isSubmitted) {
          const userData = await login({
            email: formData.email,
            password: formData.password,
          });
          if (userData) {
            fetchUser ? await fetchUser() : "";
            setPageStep ? setPageStep(2) : "";
          }
        } else if (!isSubmitted) {
          // It returns Boolean of userData
          const res = await signup(formData);
          if (res) {
            setIsSubmitted(true);
            return toast(
              <ToastMsg
                title="Check Email"
                message="We send an email to your email. Please, check and verify it."
              />,
              { autoClose: 2000, hideProgressBar: true }
            );
          } else {
            return toast(
              <ToastMsg
                title="Cannot Sign-up"
                message="Cannot sign up with this email. Already existing email or invalid email."
                titleColor={palette.error.dark}
              />,
              { autoClose: 2000, hideProgressBar: true }
            );
          }
        } else {
          return toast(
            <ToastMsg
              title="Verify Your Email"
              message="Please, verify your email first to go to the next step"
              titleColor={palette.error.dark}
            />,
            { autoClose: 2000, hideProgressBar: true }
          );
        }
      }
      // else {
      //   // Password validation not passes
      //   console.log("no");
      // }
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
        type="text"
        placeholder="Hi! What is your name?"
        name="name"
        value={formData.name}
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
        type="email"
        placeholder="Please enter your email"
        name="email"
        value={formData.email}
        onChange={handleChangeInput}
        sx={{
          "& .MuiOutlinedInput-root": {
            pr: step === 1 ? 6 : 2,
            py: 0.75,
            bgcolor: step > 1 ? "rgba(0, 0, 0, 0.02)" : "transparent",
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
                  onClick={() => handleNext(1)}
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
            pr: step === 2 ? 6 : 2,
            py: 0.75,
          },
          "& .MuiOutlinedInput-input": {
            fontSize: "1rem",
          },
          opacity: step < 2 ? 0.5 : 1,
        }}
        disabled={step < 2}
        InputProps={{
          endAdornment:
            step === 2 ? (
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

      <PrimaryButton
        text={isSubmitted ? "Verify your email" : "Click me to sign up!"}
      />

      <SubLink
        text="I already have account →"
        clickEvent={() => (setCurrentView ? setCurrentView("login") : "")}
      />
      {setPageStep ? (
        <SubLink
          text="No, I want to be anonymous →"
          clickEvent={() => setPageStep((prev) => prev + 1)}
        />
      ) : (
        ""
      )}
    </Box>
  );
}
