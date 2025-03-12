"use client";
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

const menuSteps = [
  { label: "Words of Today", subMenu: [] },
  { label: "Getting inspiration", subMenu: [] },
  { label: "My Logs", subMenu: ["My Words", "Saved Words"] },
  { label: "My Account", subMenu: [] },
];

export default function MenuStepper({ activeStep }: { activeStep: number }) {
  const { palette } = useTheme();
  return (
    <>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{
          position: "sticky",
          top: "10%",
          left: "5%",
          width: "fit-content",
          height: "fit-content",
          "& .MuiStepConnector-root": {
            display: "flex",
            justifyContent: "center", // Centers horizontally
            alignItems: "center", // Centers vertically
            ml: 0,
          },
          "& .MuiStepConnector-line": {
            height: "4rem",
          },
        }}
      >
        <Step>
          <Box width={"4rem"} mx={"auto"}>
            <CloverLogo />
          </Box>
        </Step>

        {menuSteps.map((menu, index) => (
          <Step key={menu.label} sx={{ cursor: "pointer" }}>
            {
              <>
                <Typography
                  color={index === activeStep ? palette.primary.dark : ""}
                  fontWeight={index === activeStep ? 700 : 400}
                  textAlign={"center"}
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
                      <MenuItem key={sub}>{sub}</MenuItem>
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
