import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
// CONTEXTS
import { UserContext } from "@/src/context/UserContext";
// COMPONENTS
import MessageForm from "../Form/MessageForm";
import CloverFrame from "../Layout/CloverFrame";
import BasicButton from "../Common/BasicButton";
import MessageBlock from "../Display/MessageBlock";
// HOOKS
import { getMessagesByUserIdAndPeriod } from "@/src/app/actions";
import { Box } from "@mui/material";

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

export default function InitialPushSlide() {
  const router = useRouter();

  const { user } = useContext(UserContext);

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
    <CloverFrame
      text={
        <>
          What do you want to say to
          <br />
          yourself of tomorrow?
        </>
      }
    >
      {!isEditing && todayData ? (
        <Box width={"27rem"}>
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
        </Box>
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
          afterAction={() => {
            router.push("/today");
          }}
        />
      )}
    </CloverFrame>
  );
}
