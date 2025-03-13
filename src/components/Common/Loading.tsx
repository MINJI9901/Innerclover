import { Box, Typography } from "@mui/material";
import CloverLogo from "./CloverLogo";

const textArray = ["Innerclover", "Loading..."];

export default function Loading() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
      sx={{ height: "calc(100vh - 200px)" }}
    >
      <Box my={"auto"} fontSize={"1.5rem"} color={"text.secondary"}>
        <Box width={"5rem"} mx={"auto"}>
          <CloverLogo />
        </Box>
        {textArray.map((text, index) => (
          <Typography
            key={text}
            color={"text.secondary"}
            fontSize={"1.5rem"}
            textAlign={"center"}
          >
            {text.split("").map((char, index) => (
              <span
                key={index}
                style={{
                  animation: "textWave 1s infinite",
                  animationDelay: `${index * 0.07}s`,
                }}
              >
                {char}
              </span>
            ))}
            <br />
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
