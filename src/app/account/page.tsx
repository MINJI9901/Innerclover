"use client";
import { useContext, useEffect, useState } from "react";

import { Box, Grid2, useTheme, Divider, Typography } from "@mui/material";
// CONTEXTS
import { UserContext } from "@/src/context/UserContext";
import { ThemeContext } from "@/src/theme/ThemeProvider";
// COMPONENTS
import MainFrame from "@/src/components/Layout/MainFrame";
import Title from "@/src/components/Common/Title";
import Loading from "@/src/components/Common/Loading";
import ThemeSelector from "@/src/components/Form/ThemeSelector";
import ProfileDisplayForm from "@/src/components/Form/ProfileDisplayForm";
import LoginForm from "@/src/components/Form/LoginForm";
import SignupForm from "@/src/components/Form/SignupForm";
import SendPassResetForm from "@/src/components/Form/SendPassResetForm";

export default function AccountPage() {
  const { palette } = useTheme();

  const { user, isLoading, profile } = useContext(UserContext);

  const [currentView, setCurrentView] = useState("login");

  const isLogin = currentView === "login";
  const isSignup = currentView === "signup";

  return (
    <MainFrame step={3}>
      {isLoading ? (
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
            spacing={{ xs: 0, md: 7 }}
            padding={{ xs: "1rem 0", sm: "2rem" }}
            border={"1px solid"}
            borderRadius={"1rem"}
            borderColor={palette.grey[300]}
            bgcolor={"primary.light"}
          >
            <Grid2 size={{ xs: 12, md: 7 }}>
              {user ? (
                <ProfileDisplayForm />
              ) : (
                <Box padding={"1rem 2rem 3rem"}>
                  <Title
                    text={
                      isLogin
                        ? "Login"
                        : isSignup
                        ? "Sign Up"
                        : "Forget Password?"
                    }
                    mb="3rem"
                  />
                  {isLogin ? (
                    <LoginForm setCurrentView={setCurrentView} />
                  ) : isSignup ? (
                    <SignupForm setCurrentView={setCurrentView} />
                  ) : (
                    <SendPassResetForm setCurrentView={setCurrentView} />
                  )}
                </Box>
              )}
            </Grid2>
            <Divider orientation="vertical" />
            <Grid2
              size={{ xs: 12, md: 3 }}
              mx={{ xs: "2rem", sm: 0 }}
              mt={"3rem"}
            >
              <ThemeSelector />
            </Grid2>
          </Grid2>
        </>
      )}
    </MainFrame>
  );
}
