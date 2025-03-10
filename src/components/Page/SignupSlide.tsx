"use client";
import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// COMPONENTS
import CloverFrame from "../Layout/CloverFrame";
import CloverLogo from "../Common/CloverLogo";
import PrimaryButton from "../Common/PrimaryButton";
import SubLink from "../Common/SubLink";
import SignupForm from "../Form/SignupForm";
import LoginForm from "../Form/LoginForm";

interface SlideProps {
  setPageStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function SignupSlide({ setPageStep }: SlideProps) {
  const [currentView, setCurrentView] = useState("signup");

  return (
    <CloverFrame
      text={
        <>
          {currentView === "login" ? (
            <>Hi, Nice to see you again!</>
          ) : (
            <>
              To start, please create an <br /> account if needed
            </>
          )}
        </>
      }
    >
      {currentView === "login" ? (
        <LoginForm setPageStep={setPageStep} setCurrentView={setCurrentView} />
      ) : (
        <SignupForm setPageStep={setPageStep} setCurrentView={setCurrentView} />
      )}
    </CloverFrame>
  );
}
