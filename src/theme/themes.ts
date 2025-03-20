import { createTheme } from "@mui/material";
import { bricolageGrotesque } from "./fonts";
import { bigShouldersInline } from "./fonts";

export const basicTheme = createTheme({
  palette: {
    primary: {
      main: "#7AC74F",
      // light: "#8FD158",
      light: "#F7FAEF",
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
      default: "#F6FCFA",
      paper: "#F7FAEF",
      // paper: "#f5f9f5",
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

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#27391C",
      light: "#255F38",
      dark: "#FDFAF6",
      contrastText: "#fff",
    },
    secondary: {
      main: "#B03052",
      light: "#E4EFE7",
      dark: "#8AB2A6",
      contrastText: "#4D8C32",
    },
    background: {
      default: "#18230F",
      paper: "#3F4F44",
    },
    text: {
      primary: "#18230F",
      secondary: "#F6F0F0",
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

export const lightPinkTheme = createTheme({
  palette: {
    primary: {
      main: "#C75B7A",
      light: "#D9ABAB",
      dark: "#921A40",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFEBD4",
      light: "#FFF7F3",
      dark: "#F7B5CA",
      contrastText: "#4D8C32",
    },
    background: {
      default: "#F4D9D0",
      paper: "#FFF7F3",
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
