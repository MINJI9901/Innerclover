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

export default function ThemeSelector() {
  const { palette } = useTheme();

  const themeContext = useContext(ThemeContext);

  const [theme, setTheme] = useState("basicTheme");

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    themeContext?.setThemeName(e.target.value);
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
        />
        <FormControlLabel value="darkTheme" control={<Radio />} label="Dark" />
        <FormControlLabel
          value="lightPinkTheme"
          control={<Radio />}
          label="Light Pink"
        />
      </RadioGroup>
    </FormControl>
  );
}
