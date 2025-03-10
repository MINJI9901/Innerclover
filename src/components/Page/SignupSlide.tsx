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

interface SlideProps {
  setPageStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function SignupSlide({ setPageStep }: SlideProps) {
  return (
    <CloverFrame
      text={
        <>
          To start, please create an <br /> account if needed
        </>
      }
    >
      <SignupForm setPageStep={setPageStep} />
    </CloverFrame>
  );
}
