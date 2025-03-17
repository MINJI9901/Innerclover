import { Link } from "@mui/material";
import React, { EventHandler } from "react";

interface LinkProps {
  text: string;
  color?: string;
  my?: string;
  href?: string;
  clickEvent?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export default function SubLink({
  text,
  color,
  my = "0",
  href,
  clickEvent,
}: LinkProps) {
  return (
    <Link
      component="a"
      href={href}
      variant="body2"
      onClick={clickEvent || undefined}
      sx={{
        textAlign: "center",
        my: my,
        color: color || "text.secondary",
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
