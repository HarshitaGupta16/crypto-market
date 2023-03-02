import { AppBar, Container, Toolbar } from "@mui/material";
import React from "react";
import ToggleTheme from "./ToggleTheme";

const Header = () => {
  return (
    <AppBar color="transparent" position="static">
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        
          <h1 className="--main-heading">Crypto Market</h1>
          <ToggleTheme />
        
      </Container>
    </AppBar>
  );
};

export default Header;
