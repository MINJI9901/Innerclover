import { Typography } from "@mui/material";

interface TitleProps {
  text: string | React.ReactNode;
  mb?: string;
  fontWeight?: number;
}

export default function Title({ text, mb, fontWeight = 500 }: TitleProps) {
  return (
    <Typography
      variant="h5"
      component="h1"
      sx={{
        fontWeight: fontWeight,
        color: "text.secondary",
        textAlign: "center",
        lineHeight: 1.4,
        mb: mb,
      }}
    >
      {text}
    </Typography>
  );
}
