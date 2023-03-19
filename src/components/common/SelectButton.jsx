import { Button } from "@mui/material";
import React from "react";
import { ThemeState } from "../../contexts/ThemeContext";
import classes from "./SelectButton.module.css";
import cn from "classnames";

const SelectButton = ({ children, onClick, selected, style, btnClass }) => {
  const { theme } = ThemeState();
  return (
    <Button
      variant="outlined"
      className={cn(
        btnClass,
        { [classes.selectedDarkBtn]: selected && theme === "dark-theme" },
        { [classes.selectedLightBtn]: selected && theme === "light-theme" },
        { [classes.lightThemeBtn]: theme === "light-theme" },
        { [classes.darkThemeBtn]: theme === "dark-theme" }
      )}
      onClick={onClick}
      style={style}
    >
      {children}
    </Button>
  );
};

export default SelectButton;
