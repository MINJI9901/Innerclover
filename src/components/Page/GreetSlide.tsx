import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Link } from "@mui/material";
// CONTEXTS
import { UserContext } from "@/src/context/UserContext";
import { RandColorContext } from "@/src/context/RandColorContext";
// COMPONENTs
import CloverLogo from "../Common/CloverLogo";
import PrimaryButton from "../Common/PrimaryButton";
import SubLink from "../Common/SubLink";
import { ToastMsg } from "../Notification/ToastMsg";
// TOAST
import { toast } from "react-toastify";

interface SlideProps {
  setPageStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function GreetSlide({ setPageStep }: SlideProps) {
  const { user, profile, fetchUser } = useContext(UserContext);
  const getRandomColor = useContext(RandColorContext);
  // console.log("profile: ", profile);

  const [textArray, setTextArray] = useState([
    "Wow, Hello!",
    "Welcome to the journey to build yourself!",
    `${profile?.name || ""}`,
  ]);

  const getUser = async () => {
    if (fetchUser) {
      await fetchUser();

      setTextArray([
        "Wow, Hello!",
        "Welcome to the journey to build yourself!",
        `${profile?.name || ""}`,
      ]);
    }
  };

  useEffect(() => {
    setTextArray([
      "Wow, Hello!",
      "Welcome to the journey to build yourself!",
      `${profile?.name || ""}`,
    ]);
  }, [profile]);

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <img
        src="https://cdn.pixabay.com/animation/2024/07/16/16/50/16-50-52-689_512.gif"
        alt="firecracker"
        style={{ width: "13rem", margin: "0 auto" }}
      />
      <Typography
        variant="h4"
        component="h1"
        sx={{
          //   fontSize: "2rem",
          fontWeight: 500,
          color: "text.secondary",
          textAlign: "center",
          lineHeight: 1.8,
          mb: "1rem",
        }}
      >
        {textArray.map((text, index) => (
          <span
            key={index}
            style={{
              margin: "1rem 0",
              opacity: 0,
              animation: "displayDelay 1s ease-out forwards",
              animationDelay: `${index * 0.3}s`,
              color: index === 2 ? getRandomColor("dark") : "",
            }}
          >
            {text}
            <br />
          </span>
        ))}
      </Typography>
      {/* <Box display={"flex"}> */}

      <SubLink
        text="Go to stack messages for future myself →"
        my="1rem"
        clickEvent={() => {
          if (user) {
            setPageStep((prev) => prev + 1);
          } else {
            return toast(
              <ToastMsg
                title="Please login!"
                message="You need to login to push the messages!"
              />,
              { hideProgressBar: true, autoClose: 1000 }
            );
          }
        }}
      />
      <SubLink
        text="Go to search anonymous messages →"
        my="1rem"
        href="/inspiration"
      />
      <Box
        sx={{
          width: 100,
          height: 100,
          position: "relative",
          mx: "auto",
          opacity: 0,
          animation: "rotateEl 1s ease-in forwards",
        }}
      >
        <CloverLogo />
      </Box>
      {/* </Box> */}
    </Box>
  );
}
