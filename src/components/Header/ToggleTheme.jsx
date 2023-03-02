import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeState } from "../../contexts/ThemeContext";

const ToggleTheme = () => {
  const {theme, setTheme} = ThemeState()

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      {theme === "dark-theme" ? (
        <Tooltip title="Switch to light mode">
          <IconButton
            onClick={() => setTheme("light-theme")}
            aria-label="Switch to light mode"
            style={{ height: 30, width: "30px", marginRight: 20, top: "-60px" }}
          >
            <LightModeIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Switch to dark mode">
          <IconButton
            onClick={() => setTheme("dark-theme")}
            aria-label="Switch to dark mode"
            style={{ height: 30, width: "30px", marginRight: 20, top: "-60px" }}
          >
            <DarkModeIcon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default ToggleTheme;
