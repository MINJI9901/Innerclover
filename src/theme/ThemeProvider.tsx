"use client";

import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { bricolageGrotesque } from "./fonts";
import { bigShouldersInline } from "./fonts";
import { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7AC74F",
      light: "#8FD158",
      dark: "#4D8C32",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f5f9f5",
      light: "#ffffff",
      dark: "#e0e8e0",
      contrastText: "#4D8C32",
    },
    background: {
      default: "#f5f9f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: `${bricolageGrotesque.style.fontFamily}, "Inter", "Roboto", ${bigShouldersInline.style.fontFamily}, "Helvetica", "Arial", sans-serif`,
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          padding: "10px 16px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        },
      },
    },
  },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
