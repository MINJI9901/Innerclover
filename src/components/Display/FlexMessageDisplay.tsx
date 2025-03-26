import { Box, CircularProgress } from "@mui/material";
// COMPONENTS
import Title from "../Common/Title";
import MessageBlock from "./MessageBlock";
import { Ref } from "react";

interface DataFormat {
  id: string;
  created_at: string;
  message: string;
  user_id: string;
  is_public: boolean;
  likes?: string[] | null;
}

interface DisplayProps {
  titleText: string;
  titleLink?: string;
  messages: DataFormat[] | undefined;
  colors: string[] | undefined;
  afterDeletion?: Function;
  children?: React.ReactNode;
}

export default function FlexMessageDisplay({
  titleText,
  titleLink,
  messages,
  colors,
  afterDeletion,
  children,
}: DisplayProps) {
  return (
    <Box my={"3rem"}>
      <Title
        text={titleText}
        mb="2rem"
        fontWeight={700}
        textAlign="start"
        link={titleLink ? titleLink : undefined}
      />
      <Box
        display={"flex"}
        flexWrap={"nowrap"}
        sx={{
          overflowX: "scroll",
          "&::-webkit-scrollbar": { display: "none" },
        }}
        gap={2}
      >
        {messages?.map((data, index) => (
          <Box key={index} minWidth={"20rem"}>
            <MessageBlock
              messageData={data}
              bgcolor={colors?.length ? colors[index] : ""}
              afterDeletion={afterDeletion || undefined}
            />
          </Box>
        ))}
        {children}
      </Box>
    </Box>
  );
}
