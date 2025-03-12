"use client";
import { Box, useTheme } from "@mui/material";
// COMPONENTS
import MenuStepper from "./MenuStepper";

interface FrameProps {
  step: number;
  children?: React.ReactNode;
}

export default function MainFrame({ step, children }: FrameProps) {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // background: "linear-gradient(to bottom, #f0f8f0, #e0f0e0)",
        background: "secondary.dark",
        padding: 2,
      }}
    >
      <MenuStepper activeStep={step} />
      <Box width={"80%"} padding={"2rem"}>
        {children}
      </Box>
    </Box>
  );
}
