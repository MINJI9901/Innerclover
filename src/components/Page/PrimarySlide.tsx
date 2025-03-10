import React, { useContext } from "react";
import { Box, Divider, Typography, useTheme } from "@mui/material";
// CONTEXTS
import { RandColorContext } from "@/src/context/RandColorContext";
// COMPONENTS
import CloverLogo from "../Common/CloverLogo";
import PrimaryButton from "../Common/PrimaryButton";

const text = "Want to connect yourself from past to future?";

const descriptiveTexts = [
  <>
    <img
      src="/writing.png"
      width={"80rem"}
      style={{ display: "inline-block", marginRight: "1rem" }}
    ></img>
    Messages for future yourself
  </>,
  <>
    <circle cx={0} cy={0} r={"7"} fill="red"></circle>
    {/* <img
      src="/sms.png"
      width={"80rem"}
      style={{ display: "inline-block", marginRight: "1rem" }}
    ></img> */}
    &#8226; A message to tomorrow of you everyday
  </>,
  <>
    &#8226; Inspire Yourself
    <img
      src="/paperPlane.png"
      width={"80rem"}
      style={{ display: "inline-block", marginLeft: "1rem" }}
    ></img>
  </>,
  <>
    <img
      src="/chat.png"
      width={"80rem"}
      style={{ display: "inline-block", marginRight: "1rem" }}
    ></img>
    You can also inspire other people
  </>,
  <>&#8226; Don't forget your enlightenment anymore</>,
];

interface SlideProps {
  setPageStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function PrimarySlide({ setPageStep }: SlideProps) {
  const { palette, typography } = useTheme();
  const colors = useContext(RandColorContext);

  return (
    <Box
      sx={{
        animation: { md: "divideSection 1s forwards" },
        animationDelay: { md: `${(5 + text.length / 2) * 0.1}s` },
      }}
    >
      <Box
        sx={{
          animation: { md: "shrinkBox 1s forwards" },
          animationDelay: { md: `${(5 + text.length / 2) * 0.1}s` },
        }}
      >
        <Box
          sx={{
            width: 300,
            height: 300,
            position: "relative",
            mx: "auto",
            opacity: 0,
            animation: "rotateEl 2s ease-out forwards",
          }}
        >
          <CloverLogo />
        </Box>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            //   fontSize: "2rem",
            fontWeight: 300,
            color: "text.secondary",
            textAlign: "center",
            lineHeight: 1.4,
            my: "2rem",
          }}
        >
          {text.split("").map((char, index) => (
            <span
              key={index}
              style={{
                opacity: 0,
                animation: "displayDelay forwards",
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {char}
            </span>
          ))}
          <br />
          {"...".split("").map((dot, index) => (
            <span
              key={index}
              style={{
                opacity: 0,
                animation: "displayDelay forwards",
                animationDelay: `${(index + text.length / 2) * 0.1}s`,
              }}
            >
              {dot}
            </span>
          ))}
        </Typography>
        <Box
          component={"form"}
          textAlign={"center"}
          sx={{
            opacity: 0,
            animation: "displayDelay 1s ease-out forwards",
            animationDelay: `${(3 + text.length / 2) * 0.1}s`,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            setPageStep(1);
          }}
        >
          <PrimaryButton text="Go to connect each of you" />
        </Box>
      </Box>
      <Box
        sx={{
          opacity: 0,
          visibility: "hidden",
          maxHeight: 0,
          overflow: "hidden",
          //   border: "1px solid",
          borderRadius: "1rem",
          //   borderColor: palette.primary.light,
          bgcolor: "rgb(255,255,255,0.4)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          animation: "appear 2s forwards",
          justifyContent: "center",
          px: "3rem",
          my: { xs: "20%", md: 0 },
          //   my: "auto",
          animationDelay: `${(5 + text.length / 2) * 0.1 + 1}s`,
        }}
      >
        <img
          src="/clip.png"
          alt=""
          style={{
            width: "2rem",
            position: "absolute",
            top: "-1rem",
            left: "47%",
          }}
        />
        <Typography
          component={"h2"}
          variant="h4"
          textAlign={"center"}
          my={"2rem"}
          fontFamily={"bigShouldersInline"}
          color={palette.primary.dark}
          fontWeight={500}
        >
          {/* {"Hello".split("").map((char, index) => (
            <span
              key={index}
              style={{ color: colors ? colors.normal[index] : "black" }}
            >
              {char}
            </span>
          ))} */}
          Hello,
          <br />
          Innerclover here
          {/* <span style={{ color: palette.primary.dark, fontWeight: 700 }}>
            Innerclover
          </span>
          {" here,".split("").map((char, index) => (
            <span
              key={index}
              style={{ color: colors ? colors.normal[index] : "black" }}
            >
              {char}
            </span>
          ))} */}
        </Typography>
        <Divider />
        {descriptiveTexts.map((text, index) => (
          <Typography
            key={index}
            sx={{
              color: "text.secondary",
              fontSize: "1.1rem",
              fontWeight: 500,
              my: "1rem",
            }}
          >
            {text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
