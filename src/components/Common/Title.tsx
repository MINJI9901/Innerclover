import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface TitleProps {
  text: string | React.ReactNode;
  link?: string;
  mb?: string;
  fontWeight?: number;
  textAlign?: "center" | "start" | "end";
}

export default function Title({
  text,
  link,
  mb,
  fontWeight = 500,
  textAlign = "center",
}: TitleProps) {
  const router = useRouter();

  return (
    <Typography
      variant="h5"
      component="h1"
      sx={{
        fontWeight: fontWeight,
        color: "text.secondary",
        textAlign: textAlign,
        lineHeight: 1.4,
        mb: mb,
        cursor: link ? "pointer" : "",
      }}
      onClick={() => (link ? router.push(link) : {})}
    >
      {text}
    </Typography>
  );
}
