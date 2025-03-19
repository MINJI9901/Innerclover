"use client";
import { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
// CONTEXTS
import { RandColorContext } from "@/src/context/RandColorContext";
import { UserContext } from "@/src/context/UserContext";
// COMPONENTS
import MessageDetail from "./MessageDetail";
// HOOKS
import { updateArrayColumnById } from "@/src/app/actions";

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
  likes?: string[] | null;
}

interface MessageProps {
  messageData?: DataFormat;
  displayHeader?: boolean;
  height?: string;
  bgcolor?: string;
  detailDisplay?: Boolean;
}

export default function MessageBlock({
  messageData = {
    id: "123",
    created_at: new Date().toLocaleDateString(),
    message: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    userId: "123",
    is_public: true,
    likes: null,
  },
  displayHeader = true,
  height = "6rem",
  bgcolor,
  detailDisplay = false,
}: MessageProps) {
  const getRandomColor = useContext(RandColorContext);
  const { user, profile } = useContext(UserContext);

  const { message, created_at, is_public, likes } = messageData;

  const [dynamicLikes, setDynamicLikes] = useState(likes?.length || 0);
  const [myLikes, setMyLikes] = useState(false);
  const [displayDetail, setDisplayDetail] = useState(false);

  useEffect(() => {
    // TO CHECK IF THE MESSAGES IS LIKED BY THE USER
    if (displayHeader) {
      profile?.liked_messages?.forEach((msgId) => {
        if (msgId === messageData.id) {
          setMyLikes(true);
        }
      });
    }
  }, []);

  const likesClickEvent = async () => {
    if (!myLikes) {
      const userRes = await updateArrayColumnById(
        "users",
        user ? user?.id : "",
        "liked_messages",
        messageData.id
      );

      console.log(userRes);

      const messageRes = await updateArrayColumnById(
        "messages",
        messageData.id,
        "likes",
        user ? user?.id : ""
      );

      console.log(messageRes);

      setDynamicLikes((prev) => prev + 1);
      setMyLikes(true);
    } else {
      const userRes = await updateArrayColumnById(
        "users",
        user ? user?.id : "",
        "liked_messages",
        messageData.id,
        true
      );

      console.log(userRes);

      const messageRes = await updateArrayColumnById(
        "messages",
        messageData.id,
        "likes",
        user ? user?.id : "",
        true
      );

      console.log(messageRes);

      setDynamicLikes((prev) => prev - 1);
      setMyLikes(false);
    }
  };

  return (
    <>
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
          <span style={{ cursor: "pointer" }} onClick={likesClickEvent}>
            {is_public ? `${myLikes ? "♥" : "♡"} ${dynamicLikes}` : ""}
          </span>
        </Box>
        <Typography
          height={height}
          overflow={"auto"}
          sx={{ "&::-webkit-scrollbar": { display: "none" } }}
          onClick={() => setDisplayDetail(true)}
        >
          {message}
        </Typography>
      </Box>
      {displayDetail && detailDisplay ? (
        <MessageDetail
          messageData={messageData}
          ExitFunction={() => setDisplayDetail(false)}
        />
      ) : (
        ""
      )}
    </>
  );
}
