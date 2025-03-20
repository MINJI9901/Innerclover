"use client";
import { Box, useTheme } from "@mui/material";
// COMPONENTS
import MenuStepper from "./MenuStepper";
import MobileNav from "./MobileNav";

interface FrameProps {
  step: number;
  children?: React.ReactNode;
  alignItems?: string;
}

export default function MainFrame({
  step,
  children,
  alignItems = "center",
}: FrameProps) {
  const { palette } = useTheme();

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: { xs: "block", md: "flex" },
          alignItems: alignItems,
          justifyContent: "center",
          // background: "linear-gradient(to bottom, #f0f8f0, #e0f0e0)",
          bgcolor: "background.default",
          padding: { xs: 0, sm: 2 },
        }}
      >
        <MenuStepper activeStep={step} />
        <Box width={{ xs: "100%", md: "80%" }} padding={"3rem"}>
          {children}
        </Box>
      </Box>
      <MobileNav />
    </>
  );
}
