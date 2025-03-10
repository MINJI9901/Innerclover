import { Button } from "@mui/material";
import React from "react";

interface ButtonProps {
  text: string;
  formAction?: string;
  clickEvent?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export default function PrimaryButton({
  text,
  formAction,
  clickEvent,
}: ButtonProps) {
  return (
    <Button
      type="submit"
      variant="outlined"
      sx={{
        bgcolor: "rgba(122, 199, 79, 0.07)",
        borderColor: "rgba(122, 199, 79, 0.2)",
        color: "text.secondary",
        fontWeight: "normal",
        fontSize: "1rem",
        "&:hover": {
          bgcolor: "rgba(122, 199, 79, 0.1)",
          borderColor: "rgba(122, 199, 79, 0.3)",
        },
      }}
      formAction={formAction || undefined}
      onClick={clickEvent || undefined}
    >
      {`[ ${text} ]`}
    </Button>
  );
}
