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
}

export default function MessageForm({ messageData, fetchData }: MessageProps) {
  const { user, profile } = useContext(UserContext);

  const [newMessage, setNewMessage] = useState(
    messageData || {
      message: "",
      user_id: user?.id,
      is_public: false,
    }
  );

  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage((prev) => ({ ...prev, message: e.target.value }));
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
          "& .MuiInputBase-root": { bgcolor: "white", pb: "2rem" },
          // "& .MuiFormHelperText-root": { position: "absolute" },
        }}
        placeholder="Whatever you want to say or you don't want to forget about..."
        helperText={`${5000} chars left`}
        FormHelperTextProps={{
          sx: { position: "absolute", bottom: "5px", right: 0 },
        }}
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
      <BasicButton
        text="This is my word for today →"
        clickEvent={handleSubmit}
      />
    </Box>
  );
}
