import { useContext, useEffect } from "react";
import { Avatar, Box, Typography, useTheme } from "@mui/material";
// CONTEXTS
import { UserContext } from "@/src/context/UserContext";
// COMPONENTS
import MessageBlock from "./MessageBlock";
import Title from "../Common/Title";

interface DataFormat {
  id: string;
  created_at: string;
  message: string;
  userId: string;
  is_public: boolean;
  likes?: string[] | null;
}

interface DetailProps {
  messageData: DataFormat;
  ExitFunction?: Function;
}

let left: number, right: number, top: number, bottom: number;

export default function MessageDetail({
  messageData,
  ExitFunction,
}: DetailProps) {
  const { palette } = useTheme();

  const { user, profile } = useContext(UserContext);

  useEffect(() => {
    const background = document.querySelector(".bg");
    const detailBox = document.querySelector(".detail");

    if (detailBox) {
      const rec = detailBox.getBoundingClientRect();

      left = rec.left;
      right = rec.right;
      top = rec.top;
      bottom = rec.bottom;
    }
  }, []);

  const handleClosePopup = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX;
    const y = e.clientY;

    const outOfHori = x < left || x > right;
    const outOfVer = y < top || y > bottom;

    if (outOfHori || outOfVer) {
      ExitFunction ? ExitFunction() : "";
    }
  };

  return (
    <Box
      className="bg"
      position={"fixed"}
      top={0}
      left={0}
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      bgcolor={"rgb(200,200,200,0.3)"}
      onClick={handleClosePopup}
    >
      <Box
        className="detail"
        width={"50%"}
        borderRadius={"1rem"}
        bgcolor={"primary.light"}
        boxShadow={"0 0 10px grey"}
        padding={"2rem 3rem"}
      >
        <Title text="A Message" />
        <Box display={"flex"} justifyContent={"end"} gap={3} my={"1rem"}>
          <Avatar src={profile?.avatar_url} />
          <Typography fontSize={"1.2rem"} color="text.secondary">
            {profile?.name}
          </Typography>
        </Box>
        <MessageBlock
          messageData={messageData}
          detailDisplay={false}
          height="fit-content"
        />
      </Box>
    </Box>
  );
}
