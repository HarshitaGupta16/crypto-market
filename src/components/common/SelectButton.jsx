import { Button } from "@mui/material";
import React from "react";
import { ThemeState } from "../../contexts/ThemeContext";
import classes from "./SelectButton.module.css";

const SelectButton = ({ children, onClick, selected }) => {
  const { theme } = ThemeState();
  return (
    <Button
      variant="outlined"
      className={
        selected
          ? theme === "dark-theme"
            ? classes.selectedDarkBtn
            : classes.selectedLightBtn
          : theme === "light-theme"
          ? classes.lightThemeBtn
          : classes.darkThemeBtn
      }
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default SelectButton;
