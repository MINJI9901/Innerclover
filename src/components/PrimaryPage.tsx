"use client";
import { useState, useContext } from "react";
import { Box } from "@mui/material";
// CONTEXTS
import { UserContext } from "../context/UserContext";
// COMPONENTS
import SignupSlide from "./Page/SignupSlide";
import PrimarySlide from "./Page/PrimarySlide";
import GreetSlide from "./Page/GreetSlide";
import InitialPushSlide from "./Page/InitialPushSlide";

export default function PrimaryPage() {
  const { user } = useContext(UserContext);

  const [pageStep, setPageStep] = useState(0);

  const pages = user
    ? [
        <PrimarySlide setPageStep={setPageStep} />,
        <GreetSlide setPageStep={setPageStep} />,
        <InitialPushSlide />,
      ]
    : [
        <PrimarySlide setPageStep={setPageStep} />,
        <Box sx={{ width: "100%", maxWidth: 440 }}>
          <SignupSlide setPageStep={setPageStep} />
        </Box>,
        <GreetSlide setPageStep={setPageStep} />,
        <InitialPushSlide />,
      ];

  return (
    <>
      {pages[pageStep]}
      {/* <PrimarySlide /> */}
      {/* <Box sx={{ width: "100%", maxWidth: 440 }}>
        <SignupSlide />
      </Box> */}
    </>
  );
}
