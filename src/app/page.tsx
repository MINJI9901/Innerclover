"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
// CONTEXTS
import { UserContext } from "../context/UserContext";
// COMPONENTS
import PrimaryPage from "../components/PrimaryPage";
import Loading from "../components/Common/Loading";

export default function Home() {
  const router = useRouter();

  const { palette } = useTheme();

  const { user, isLoading } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      router.push("/today");
    }
  }, [isLoading]);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // background: "linear-gradient(90deg, #f0fae7, #bef6a6)",
        background: `linear-gradient(90deg, #f0fae7, ${palette.primary.main})`,
        padding: 2,
      }}
    >
      {isLoading ? <Loading /> : <PrimaryPage />}
    </Box>
  );
}
