"use client";
import { Button, useTheme } from "@mui/material";
import React from "react";

interface ButtonProps {
  text: string | React.ReactNode;
  clickEvent?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  fullWidth?: boolean;
}

export default function BasicButton({
  text,
  clickEvent,
  fullWidth = false,
}: ButtonProps) {
  const { palette } = useTheme();

  return (
    <Button
      fullWidth={fullWidth}
      sx={{
        color: "text.secondary",
        border: "1px solid",
        borderColor: "primary.dark",
        my: "1rem",
      }}
      onClick={clickEvent || undefined}
    >
      {text}
    </Button>
  );
}
