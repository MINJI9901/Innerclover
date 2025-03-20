"use client";

import { Box } from "@mui/material";

export default function CloverLogo() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="10 20 80 80"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <!-- Top-Left-Right-Bottom Leaf --> */}
        <circle cx="60" cy="38" r="13" fill="#7AC74F" />
        <circle cx="38" cy="40" r="13" fill="#7AC74F" />
        <circle cx="62" cy="60" r="13" fill="#7AC74F" />
        <circle cx="40" cy="62" r="13" fill="#7AC74F" />

        {/* <!-- Top-Left-Right-Bottom Leaf --> */}
        <circle cx="55" cy="43" r="7" fill="#6CAF3F" />
        <circle cx="43" cy="45" r="7" fill="#6CAF3F" />
        <circle cx="57" cy="55" r="7" fill="#6CAF3F" />
        <circle cx="45" cy="57" r="7" fill="#6CAF3F" />

        {/* <!-- Top-Left-Right-Bottom Leaf --> */}
        {/* <circle cx="50" cy="38" r="13" fill="#7AC74F" />
        <circle cx="38" cy="50" r="13" fill="#7AC74F" />
        <circle cx="62" cy="50" r="13" fill="#7AC74F" />
        <circle cx="50" cy="62" r="13" fill="#7AC74F" /> */}

        {/* <!-- Top-Left-Right-Bottom Leaf --> */}
        {/* <circle cx="50" cy="38" r="7" fill="#6CAF3F" />
        <circle cx="38" cy="50" r="7" fill="#6CAF3F" />
        <circle cx="62" cy="50" r="7" fill="#6CAF3F" />
        <circle cx="50" cy="62" r="7" fill="#6CAF3F" /> */}

        {/* <!-- Small Center Circle to Fill the Gap --> */}
        <circle cx="50" cy="50" r="8" fill="#6CAF3F" />

        {/* <!-- Even Shorter Stem --> */}
        <path
          d="M50 62 C52 75, 48 82, 47 90"
          stroke="#4D8C32"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M50 15C42.5 15 36.25 21.25 36.25 28.75C36.25 33.75 38.75 38.125 42.5 40.625C38.75 43.125 36.25 47.5 36.25 52.5C36.25 57.5 38.75 61.875 42.5 64.375C38.75 66.875 36.25 71.25 36.25 76.25C36.25 83.75 42.5 90 50 90C57.5 90 63.75 83.75 63.75 76.25C63.75 71.25 61.25 66.875 57.5 64.375C61.25 61.875 63.75 57.5 63.75 52.5C63.75 47.5 61.25 43.125 57.5 40.625C61.25 38.125 63.75 33.75 63.75 28.75C63.75 21.25 57.5 15 50 15Z"
          fill="#7AC74F"
        />
        <path
          d="M28.75 36.25C21.25 36.25 15 42.5 15 50C15 57.5 21.25 63.75 28.75 63.75C33.75 63.75 38.125 61.25 40.625 57.5C43.125 61.25 47.5 63.75 52.5 63.75C57.5 63.75 61.875 61.25 64.375 57.5C66.875 61.25 71.25 63.75 76.25 63.75C83.75 63.75 90 57.5 90 50C90 42.5 83.75 36.25 76.25 36.25C71.25 36.25 66.875 38.75 64.375 42.5C61.875 38.75 57.5 36.25 52.5 36.25C47.5 36.25 43.125 38.75 40.625 42.5C38.125 38.75 33.75 36.25 28.75 36.25Z"
          fill="#8FD158"
        />
        <path
          d="M50 50L63.75 63.75"
          stroke="#4D8C32"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg> */}
    </Box>
  );
}
