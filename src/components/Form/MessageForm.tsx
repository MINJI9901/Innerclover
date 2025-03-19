import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
// CONTEXTS
import { UserContext } from "@/src/context/UserContext";
// COMPONENTS
import BasicButton from "../Common/BasicButton";
// HOOKS
import { insertOneRow, updateRowById } from "@/src/app/actions";

interface MessageProps {
  messageData?:
    | {
        id: string;
        message: string;
        user_id: string | null;
        is_public: boolean;
      }
    | undefined;
  fetchData?: () => void;
  afterAction?: () => void;
  disabled?: Boolean;
}

export default function MessageForm({
  messageData,
  fetchData,
  afterAction,
  disabled = false,
}: MessageProps) {
  const { user, profile } = useContext(UserContext);

  const [newMessage, setNewMessage] = useState(
    messageData || {
      message: "",
      user_id: user?.id,
      is_public: false,
    }
  );
  const [leftLetters, setLeftLetters] = useState(
    messageData?.message ? 5000 - messageData.message.length : 5000
  );

  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numOfLetters = value.length;
    console.log(numOfLetters);
    setNewMessage((prev) => ({ ...prev, message: value }));
    setLeftLetters(5000 - numOfLetters);
  };

  const handlePublicOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage((prev) => ({ ...prev, is_public: e.target.checked }));
  };

  const handleSubmit = async () => {
    if (!messageData) {
      const res = await insertOneRow("messages", {
        ...newMessage,
        user_id: user?.id,
      });

      console.log("res in insert: ", res);
    } else {
      const res = await updateRowById("messages", messageData.id, {
        message: newMessage.message,
        is_public: newMessage.is_public,
      });

      console.log("res in update: ", res);
    }

    if (fetchData) {
      fetchData();
    }

    if (afterAction) {
      console.log("it's working");
      afterAction();
    }
  };

  return (
    <Box
      component={"form"}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
    >
      <TextField
        fullWidth
        multiline
        rows={8}
        sx={{
          "& .MuiInputBase-root": { bgcolor: "secondary.light", pb: "2rem" },
          "& .MuiFormHelperText-root": {
            color: "text.primary",
            position: "absolute",
            bottom: "5px",
            right: 0,
          },
        }}
        placeholder="Whatever you want to say or you don't want to forget about..."
        helperText={`${leftLetters} chars left`}
        value={newMessage.message}
        onChange={handleMessage}
      />
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={newMessage ? newMessage.is_public : false}
            onChange={handlePublicOption}
          />
        }
        label="I would like to share with people"
        slotProps={{
          typography: { color: "text.secondary", fontSize: "0.8rem" },
        }}
        sx={{ mx: "auto", mb: "1rem" }}
      />
      {disabled ? (
        <BasicButton text="Please, login to push the message" />
      ) : (
        <BasicButton
          text="This is my word for today →"
          clickEvent={handleSubmit}
        />
      )}
    </Box>
  );
}
