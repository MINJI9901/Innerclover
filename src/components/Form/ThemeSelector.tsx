import { useContext, useEffect, useState } from "react";

import {
  useTheme,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
// CONTEXTS
import { UserContext } from "@/src/context/UserContext";
import { ThemeContext } from "@/src/theme/ThemeProvider";

const theme = localStorage.getItem("theme");

export default function ThemeSelector() {
  const { palette } = useTheme();

  const themeContext = useContext(ThemeContext);

  const [value, setValue] = useState(theme);

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.value;
    themeContext?.setThemeName(newTheme);
    localStorage.setItem("theme", newTheme);
    setValue(newTheme);
  };

  return (
    <FormControl>
      <FormLabel id="theme-radio-buttons-group-label">Theme</FormLabel>
      <RadioGroup
        aria-labelledby="theme-radio-buttons-group-label"
        defaultValue="basic"
        name="radio-buttons-group"
        onChange={handleThemeChange}
      >
        <FormControlLabel
          value="basicTheme"
          control={<Radio />}
          label="Basic"
          checked={value === "basicTheme"}
        />
        <FormControlLabel
          value="darkTheme"
          control={<Radio />}
          label="Dark"
          checked={value === "darkTheme"}
        />
        <FormControlLabel
          value="lightPinkTheme"
          control={<Radio />}
          label="Light Pink"
          checked={value === "lightPinkTheme"}
        />
      </RadioGroup>
    </FormControl>
  );
}
