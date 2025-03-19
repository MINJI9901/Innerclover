"use client";

import { useState, createContext, useMemo, useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { bricolageGrotesque } from "./fonts";
import { bigShouldersInline } from "./fonts";
import { ReactNode } from "react";
import { basicTheme, darkTheme, lightPinkTheme } from "./themes";

interface ThemeContextType {
  themeName: string;
  setThemeName: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState("basicTheme");
  const [loading, setLoading] = useState(true);

  const theme = useMemo(() => {
    switch (themeName) {
      case "darkTheme":
        return darkTheme;
      case "lightPinkTheme":
        return lightPinkTheme;
      default:
        return basicTheme;
    }
  }, [themeName]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    setThemeName(storedTheme || "basicTheme");
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
