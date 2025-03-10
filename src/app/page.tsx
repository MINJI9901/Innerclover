import { Box } from "@mui/material";
// COMPONENTS
import PrimaryPage from "../components/PrimaryPage";

export default function Home() {
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
      <PrimaryPage />
    </Box>
  );
}
