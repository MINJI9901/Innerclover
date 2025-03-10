import { Link } from "@mui/material";
import React, { EventHandler } from "react";

interface LinkProps {
  text: string;
  my?: string;
  clickEvent?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export default function SubLink({ text, my = "0", clickEvent }: LinkProps) {
  return (
    <Link
      component="a"
      variant="body2"
      onClick={clickEvent || undefined}
      sx={{
        textAlign: "center",
        my: my,
        color: "text.secondary",
        textDecoration: "none",
        cursor: "pointer",
        "&:hover": {
          color: "text.primary",
        },
      }}
    >
      {text}
    </Link>
  );
}
