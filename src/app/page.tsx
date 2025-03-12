"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
// CONTEXTS
import { UserContext } from "../context/UserContext";
// COMPONENTS
import PrimaryPage from "../components/PrimaryPage";
import Loading from "../components/Common/Loading";

export default function Home() {
  const router = useRouter();

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
        // background: "linear-gradient(to bottom, #f0f8f0, #e0f0e0)",
        background: "linear-gradient(90deg, #f0fae7, #bef6a6)",
        padding: 2,
      }}
    >
      {isLoading || user ? <Loading /> : <PrimaryPage />}
    </Box>
  );
}
