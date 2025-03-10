"use client";
import React, { createContext, useState } from "react";

const getRandomColor = (type: "light" | "normal" | "dark"): string => {
  let r, g, b;

  switch (type) {
    case "light":
      r = Math.floor(Math.random() * 128 + 128); // 128–255 (brighter)
      g = Math.floor(Math.random() * 128 + 128);
      b = Math.floor(Math.random() * 128 + 128);
      break;
    case "dark":
      r = Math.floor(Math.random() * 128); // 0–127 (darker)
      g = Math.floor(Math.random() * 128);
      b = Math.floor(Math.random() * 128);
      break;
    default: // "normal"
      r = Math.floor(Math.random() * 256); // 0–255 (full range)
      g = Math.floor(Math.random() * 256);
      b = Math.floor(Math.random() * 256);
  }

  return `rgb(${r}, ${g}, ${b})`;
};

const getColorPalette = () => ({
  light: Array.from({ length: 20 }, () => getRandomColor("light")),
  dark: Array.from({ length: 20 }, () => getRandomColor("dark")),
  normal: Array.from({ length: 20 }, () => getRandomColor("normal")),
});

interface ColorContextType {
  light: string[];
  normal: string[];
  dark: string[];
}

export const RandColorContext = createContext<Function>(getRandomColor);

interface providerProps {
  children: React.ReactNode;
}

export const RandColorProvider = ({ children }: providerProps) => {
  const [colors, setColors] = useState(getColorPalette());

  return (
    <RandColorContext.Provider value={getRandomColor}>
      {children}
    </RandColorContext.Provider>
  );
};
