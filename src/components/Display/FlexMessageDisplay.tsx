import { Box, CircularProgress } from "@mui/material";
// COMPONENTS
import Title from "../Common/Title";
import MessageBlock from "./MessageBlock";
import { Ref } from "react";

interface DataFormat {
  id: string;
  created_at: string;
  message: string;
  userId: string;
  is_public: boolean;
  upvotes?: number | null;
}

interface DisplayProps {
  titleText: string;
  titleLink?: string;
  messages: DataFormat[] | undefined;
  colors: string[] | undefined;
  children?: React.ReactNode;
}

export default function FlexMessageDisplay({
  titleText,
  titleLink,
  messages,
  colors,
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
            />
          </Box>
        ))}
        {children}
      </Box>
    </Box>
  );
}
