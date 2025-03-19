import React from "react";
import { Card, Box, Typography } from "@mui/material";
// COMPONENTS
import CloverLogo from "../Common/CloverLogo";
import Title from "../Common/Title";

interface FrameProps {
  text: string | React.ReactNode;
  children: React.ReactNode;
}

export default function CloverFrame({ text, children }: FrameProps) {
  return (
    <Card
      sx={{
        minWidth: "30rem",
        padding: 3,
        // bgcolor: "rgba(255, 255, 255, 0.7)",
        bgcolor: "primary.light",
        backdropFilter: "blur(8px)",
        border: "none",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        borderRadius: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Box sx={{ width: 96, height: 96, position: "relative", mx: "auto" }}>
          <CloverLogo />
        </Box>

        <Title text={text} />
        {/* <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: 500,
            color: "text.secondary",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        ></Typography> */}
        {children}
      </Box>
    </Card>
  );
}
