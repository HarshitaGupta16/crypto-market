import React, { createContext, useContext, useEffect, useState } from "react";

export const themeContext = createContext();

const ThemeContext = ({ children }) => {
  const [theme, setTheme] = useState("dark-theme");

  useEffect(() => {
    theme === "dark-theme"
      ? (document.body.className = "dark-theme")
      : (document.body.className = "light-theme");
  }, [theme]);
  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export default ThemeContext;

export const ThemeState = () => {
  return useContext(themeContext);
};
