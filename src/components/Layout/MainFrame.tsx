"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Box, useTheme } from "@mui/material";
// CONTEXTS
import { UserContext } from "@/src/context/UserContext";
// COMPONENTS
import MenuStepper from "./MenuStepper";
import MobileNav from "./MobileNav";
// HOOKS
import { logout } from "@/src/app/signup/actions";

interface FrameProps {
  step: number;
  children?: React.ReactNode;
  alignItems?: string;
}

export default function MainFrame({
  step,
  children,
  alignItems = "center",
}: FrameProps) {
  const router = useRouter();

  const { palette } = useTheme();

  const { user, profile, fetchUser } = useContext(UserContext);

  const handleUserAuth = async () => {
    if (user) {
      await logout();

      if (fetchUser) {
        await fetchUser();
      }
    }

    router.replace("/account");
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: { xs: "block", md: "flex" },
          alignItems: alignItems,
          justifyContent: "center",
          // background: "linear-gradient(to bottom, #f0f8f0, #e0f0e0)",
          bgcolor: "background.default",
          padding: { xs: 0, sm: 2 },
        }}
      >
        <Box
          position={"absolute"}
          top={"3%"}
          right={"3%"}
          borderRadius={"2rem"}
          bgcolor={"rgb(255,255,255,0.5)"}
          color={palette.primary.dark}
          padding={"0.3rem 0.8rem"}
          sx={{ cursor: "pointer" }}
          onClick={handleUserAuth}
        >
          {user ? "Logout" : "Login"}
        </Box>
        <MenuStepper activeStep={step} />
        <Box width={{ xs: "100%", md: "80%" }} padding={"3rem"}>
          {children}
        </Box>
      </Box>
      <MobileNav />
    </>
  );
}
