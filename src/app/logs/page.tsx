"use client";
import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  Box,
  Typography,
  Grid2,
  CircularProgress,
  Button,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// CONTEXTS
import { RandColorContext } from "@/src/context/RandColorContext";
import { UserContext } from "@/src/context/UserContext";
// COMPONENTS
import MainFrame from "@/src/components/Layout/MainFrame";
import Loading from "@/src/components/Common/Loading";
import FlexMessageDisplay from "@/src/components/Display/FlexMessageDisplay";
// HOOKS
import {
  getPublicMessages,
  getMessagesByUserId,
  getRowsInArray,
} from "../actions";

interface DataFormat {
  id: string;
  created_at: string;
  message: string;
  user_id: string;
  is_public: boolean;
  likes?: string[] | null;
}

let start = 0;
let end = 4;

export default function LogsPage() {
  const router = useRouter();
  // CONTEXTS
  const getRandomColor = useContext(RandColorContext);
  const { user, isLoading, profile } = useContext(UserContext);
  // STATE
  const [myMessages, setMyMessages] = useState<DataFormat[] | undefined>(
    undefined
  );
  const [likedMessages, setLikedMessages] = useState<DataFormat[] | undefined>(
    undefined
  );
  const [myColors, setMyColors] = useState<string[] | undefined>(undefined);
  const [likedColors, setLikedColors] = useState<string[] | undefined>(
    undefined
  );
  const [pageLoading, setPageLoading] = useState(true);

  const getMyMessages = async () => {
    if (user) {
      const data = await getMessagesByUserId(user?.id, start, end);

      // console.log("my messages: ", data);

      if (data.length) {
        const colorArray = Array.from({ length: end }, () =>
          getRandomColor("light")
        );
        setMyMessages(data);
        setMyColors((prev) => (prev?.length ? prev : colorArray));
      }
    }
  };

  const getLikedMessages = async () => {
    const likedList = profile?.liked_messages || [];

    if (likedList.length) {
      const data = await getRowsInArray("messages", likedList, start, end);

      // console.log("Liked messages: ", data);

      if (data.length) {
        const colorArray = Array.from({ length: end }, () =>
          getRandomColor("light")
        );
        setLikedMessages(data);
        setLikedColors((prev) => (prev?.length ? prev : colorArray));
      }
    }
    setPageLoading(false);
  };

  useEffect(() => {
    getMyMessages();
    getLikedMessages();
  }, [profile]);

  return (
    <>
      <MainFrame step={2} alignItems="start">
        {isLoading || pageLoading ? (
          <Loading />
        ) : (
          <>
            <FlexMessageDisplay
              titleText="My Logs"
              titleLink="/logs/my"
              messages={myMessages}
              colors={myColors}
              afterDeletion={getMyMessages}
            >
              <Button onClick={() => router.push("/logs/my")}>
                <ArrowForwardIcon
                  sx={{ my: "auto", fontSize: "5rem", color: "secondary.dark" }}
                />
              </Button>
            </FlexMessageDisplay>
            <FlexMessageDisplay
              titleText="Saved Messages"
              titleLink="/logs/liked"
              messages={likedMessages}
              colors={likedColors}
              afterDeletion={getLikedMessages}
            >
              <Button onClick={() => router.push("/logs/liked")}>
                <ArrowForwardIcon
                  sx={{ my: "auto", fontSize: "5rem", color: "secondary.dark" }}
                />
              </Button>
            </FlexMessageDisplay>
          </>
        )}
      </MainFrame>
    </>
  );
}
