"use client";
import { useContext } from "react";
import { Box, Typography } from "@mui/material";
// CONTEXTS
import { RandColorContext } from "@/src/context/RandColorContext";
// COMPONENTS

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const weekday = date.toLocaleString("en-US", { weekday: "short" });

  return `${day}.${month}.${year} ${weekday}`;
};

interface DataFormat {
  id: string;
  created_at: string;
  message: string;
  userId: string;
  is_public: boolean;
  upvotes?: number | null;
}

interface MessageProps {
  messageData?: DataFormat;
  displayHeader?: boolean;
  height?: string;
  bgcolor?: string;
}

export default function MessageBlock({
  messageData = {
    id: "123jse",
    created_at: new Date().toLocaleDateString(),
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique placeat pariatur nisi optio tempore temporibus quae neque voluptates blanditiis aliquid quis non culpa necessitatibus doloremque dicta, qui veritatis quos consequatur. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique placeat pariatur nisi optio tempore temporibus quae neque voluptates blanditiis aliquid quis non culpa necessitatibus doloremque dicta, qui veritatis quos consequatur.",
    userId: "123jdjf",
    is_public: true,
    upvotes: 123,
  },
  displayHeader = true,
  height = "6rem",
  bgcolor,
}: MessageProps) {
  const getRandomColor = useContext(RandColorContext);

  const { message, created_at, is_public, upvotes } = messageData;

  return (
    <Box
      padding={"1rem"}
      borderRadius={"1rem"}
      border={"1px solid"}
      borderColor={"text.secondary"}
      bgcolor={bgcolor ? bgcolor : getRandomColor("light")}
    >
      <Box
        display={displayHeader ? "flex" : "none"}
        justifyContent={"space-between"}
        mb={"1rem"}
      >
        <span>{formatDate(created_at)}</span>
        <span>{is_public ? upvotes : ""}</span>
      </Box>
      <Typography
        height={height}
        overflow={"auto"}
        sx={{ "&::-webkit-scrollbar": { display: "none" } }}
      >
        {message}
      </Typography>
    </Box>
  );
}
