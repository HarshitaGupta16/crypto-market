import { IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const ToggleTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

    useEffect(() => {
        isDarkTheme ? document.body.className = "dark-theme" : document.body.className = "light-theme"
        console.log("theem", document.body.className)
    }, [isDarkTheme])

  return (
    <>
      {isDarkTheme ? (
        <Tooltip title="Switch to light mode ">
        <IconButton onClick={() => setIsDarkTheme(false)} aria-label="Switch to light mode">
          <LightModeIcon />
        </IconButton>
        </Tooltip>
      ) : (
        <IconButton onClick={() => setIsDarkTheme(true)} aria-label="Switch to dark mode">
          <DarkModeIcon />
        </IconButton>
      )}
    </>
  );
};

export default ToggleTheme;
