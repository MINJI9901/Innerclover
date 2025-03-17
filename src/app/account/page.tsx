"use client";
import { useContext, useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Container,
  Grid2,
  Typography,
  useTheme,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Divider,
  TextField,
} from "@mui/material";
// CONTEXTS
import { UserContext } from "@/src/context/UserContext";
import { ThemeContext } from "@/src/theme/ThemeProvider";
// COMPONENTS
import MainFrame from "@/src/components/Layout/MainFrame";
// import EditMessageForm from "@/src/components/Form/EditMessageForm";
import Title from "@/src/components/Common/Title";
import BasicButton from "@/src/components/Common/BasicButton";
import Loading from "@/src/components/Common/Loading";
import SubLink from "@/src/components/Common/SubLink";
import ThemeSelector from "@/src/components/Form/ThemeSelector";

export default function AccountPage() {
  const { palette } = useTheme();

  const { user, isLoading, profile } = useContext(UserContext);

  const [formData, setFormData] = useState({
    imgUrl: profile?.avatar_url,
    name: profile?.name,
    email: profile?.email,
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {}, [user]);

  const handleOpenForm = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setIsEditing(false);
  };

  return (
    <MainFrame step={3}>
      {isLoading || pageLoading ? (
        <Loading />
      ) : (
        <>
          <Title
            text={"My Account"}
            mb="3rem"
            fontWeight={700}
            textAlign="start"
          />
          <Grid2
            container
            spacing={7}
            padding={"2rem"}
            border={"1px solid"}
            borderRadius={"1rem"}
            borderColor={palette.grey[300]}
            bgcolor={"primary.light"}
          >
            <Grid2 size={8} component={"form"}>
              <Avatar sx={{ width: "7rem", height: "7rem", mb: "2rem" }} />
              {["Name", "Email"].map((label, index) => (
                <Box key={label} my={"1rem"}>
                  <Typography paddingLeft={"0.3rem"}>{label}</Typography>
                  <Box
                    borderRadius={"0.8rem"}
                    border={"1px solid"}
                    borderColor={palette.grey[300]}
                    height={"2.5rem"}
                  >
                    {isEditing ? (
                      <TextField
                        fullWidth
                        size="small"
                        value={
                          formData[label.toLowerCase() as "name" | "email"]
                        }
                        slotProps={{
                          input: { sx: { height: "2.5rem", padding: 0 } },
                        }}
                      ></TextField>
                    ) : (
                      <Typography margin={"0.5rem"}>
                        {profile &&
                          profile[label.toLowerCase() as "name" | "email"]}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
              <Box my={"1rem"}>
                <Typography paddingLeft={"0.3rem"}>Password</Typography>
                <Box
                  borderRadius={"0.5rem"}
                  border={"1px solid"}
                  borderColor={palette.grey[300]}
                  height={"2.5rem"}
                  padding={"0.5rem 0.5rem"}
                >
                  ************
                </Box>
                <SubLink text="Change Password →" />
              </Box>
              {isEditing ? (
                <BasicButton text="Done" clickEvent={handleSubmit} />
              ) : (
                <BasicButton text="Modify" clickEvent={handleOpenForm} />
              )}
              <Box display={"flex"} justifyContent={"end"} my={"0.5rem"}>
                <SubLink text="Delete Account →" color={palette.error.dark} />
              </Box>
            </Grid2>
            <Divider orientation="vertical" />
            <Grid2 size={3} mt={"3rem"}>
              <ThemeSelector />
            </Grid2>
          </Grid2>
        </>
      )}
    </MainFrame>
  );
}
