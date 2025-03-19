"use client";
import { useContext, useEffect, useState } from "react";

import { Box, Container, Typography } from "@mui/material";
// CONTEXTS
import { UserContext } from "@/src/context/UserContext";
// COMPONENTS
import MainFrame from "@/src/components/Layout/MainFrame";
import MessageForm from "@/src/components/Form/MessageForm";
// import EditMessageForm from "@/src/components/Form/EditMessageForm";
import MessageBlock from "@/src/components/Display/MessageBlock";
import Title from "@/src/components/Common/Title";
import BasicButton from "@/src/components/Common/BasicButton";
import Loading from "@/src/components/Common/Loading";
// HOOKS
import { getMessagesByUserId, getMessagesByUserIdAndPeriod } from "../actions";

interface DataFormat {
  id: string;
  created_at: string;
  message: string;
  userId: string;
  is_public: boolean;
  likes?: string[] | null;
}

const now = new Date();
const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const todayEnd = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  23,
  59,
  59
);

export default function TodayPage() {
  const { user, isLoading } = useContext(UserContext);

  const [todayData, setTodayData] = useState<DataFormat | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const getTodayMessage = async () => {
    if (user) {
      console.log("user id in today page: ", user.id);
      const data = await getMessagesByUserIdAndPeriod(
        user?.id,
        todayStart,
        todayEnd
      );

      console.log("today message in page: ", data[0]);

      if (data[0]) {
        setTodayData(data[0]);
        setIsEditing(false);
      } else {
        setIsEditing(true);
      }
    }
    setPageLoading(false);
  };

  useEffect(() => {
    getTodayMessage();
  }, [user]);

  const handleOpenForm = () => {
    setIsEditing(true);
  };

  return (
    <MainFrame step={0}>
      {isLoading || pageLoading ? (
        <Loading />
      ) : (
        <Container
          sx={{ width: { xs: "100%", sm: "80%", md: "70%" }, mx: "auto" }}
        >
          <Title
            text={
              todayData
                ? "Today's message"
                : "What is words you want to deliver ?"
            }
            mb="3rem"
            fontWeight={700}
          />
          {!isEditing && todayData ? (
            <>
              <MessageBlock
                height="12rem"
                messageData={todayData}
                displayHeader={false}
                bgcolor="secondary.dark"
              />
              <BasicButton
                text="Modify"
                fullWidth={true}
                clickEvent={handleOpenForm}
              />
            </>
          ) : (
            <MessageForm
              messageData={
                todayData
                  ? {
                      id: todayData?.id,
                      message: todayData?.message,
                      user_id: todayData?.userId,
                      is_public: todayData?.is_public,
                    }
                  : undefined
              }
              fetchData={getTodayMessage}
              disabled={true}
            />
          )}
        </Container>
      )}
    </MainFrame>
  );
}
