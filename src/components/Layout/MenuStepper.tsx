"use client";
import { usePathname } from "next/navigation";
import {
  Box,
  Stepper,
  Step,
  MenuItem,
  Menu,
  MenuList,
  Typography,
  useTheme,
} from "@mui/material";
// COMPONENTS
import CloverLogo from "../Common/CloverLogo";
import path from "node:path/win32";

const menuSteps = [
  { label: "Words of Today", subMenu: [], path: "/today" },
  { label: "Getting inspiration", subMenu: [], path: "/inspiration" },
  {
    label: "My Logs",
    subMenu: [
      { label: "My Words", path: "/logs/my" },
      { label: "Liked Words", path: "/logs/liked" },
    ],
    path: "/logs",
  },
  { label: "My Account", subMenu: [], path: "/" },
];

export default function MenuStepper({ activeStep }: { activeStep: number }) {
  const { palette } = useTheme();

  const pathname = usePathname();

  return (
    <>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{
          display: { xs: "none", md: "block" },
          position: "sticky",
          top: "10%",
          left: "5%",
          width: "fit-content",
          height: "fit-content",
          // ALL THE STEPS
          "& .MuiStepConnector-root": {
            display: "flex",
            justifyContent: "center", // Centers horizontally
            alignItems: "center", // Centers vertically
            ml: 0,
          },
          // ACTIVE STEP FONT ANIMATION
          "& .Mui-active + .MuiStep-root a": {
            animation: "textWave 1s ease-in",
            animationDelay: "0.5s",
            "--start-font-size": "1rem",
            "--start-color": "inherit",
            "--mid-font-size": "1.2rem",
            "--mid-color": "#98b085",
            "--end-font-size": "1rem",
            "--end-color": "inherit",
          },
          // STEP CONNECTOR LINES
          "& .MuiStepConnector-line": {
            height: "4rem",
            opacity: 0.3,
            borderLeftWidth: "2px",
          },
          // ACTIVE CONNECTOR LINE ANIMATION
          "& .Mui-active .MuiStepConnector-line": {
            animation: "borderWave 1s ease-in",
            animationTimingFunction: "linear",
          },
          // NO PADDING IN CONNTECTOR LINES
          "& .MuiList-padding": { padding: 0 },
        }}
      >
        <Step>
          <Box width={"4rem"} mx={"auto"}>
            <CloverLogo />
          </Box>
        </Step>

        {menuSteps.map((menu, index) => (
          <Step
            key={menu.label}
            active={index === activeStep}
            sx={{ cursor: "pointer" }}
          >
            {
              <>
                <Typography
                  component={"a"}
                  href={menu.path}
                  color={index === activeStep ? palette.primary.dark : ""}
                  fontWeight={index === activeStep ? 700 : 400}
                  textAlign={"center"}
                  display={"block"}
                  my={"0.5rem"}
                >
                  {menu.label}
                </Typography>
                {menu.subMenu ? (
                  <MenuList
                    sx={{
                      ml: "2rem",
                      "& .MuiMenuItem-root": {
                        fontSize: "0.9rem",
                        color: "gray",
                      },
                    }}
                  >
                    {menu.subMenu.map((sub, index) => (
                      <MenuItem key={sub.label}>
                        <Typography
                          component={"a"}
                          href={sub.path}
                          color={
                            pathname === sub.path ? palette.primary.main : ""
                          }
                        >
                          {sub.label}
                        </Typography>
                      </MenuItem>
                    ))}
                  </MenuList>
                ) : (
                  ""
                )}
              </>
            }
          </Step>
        ))}
      </Stepper>
    </>
  );
}
