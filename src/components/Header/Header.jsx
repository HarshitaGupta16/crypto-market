import { AppBar, Container, MenuItem, Select } from "@mui/material";
import React from "react";
import ToggleTheme from "./ToggleTheme";
import "./Header.css";
import { CryptoState } from "../../contexts/CryptoContext";

const Header = () => {
  const { currency, setCurrency } = CryptoState();

  return (
    <AppBar color="transparent">
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 className="--main-heading">Crypto Market</h1>
        <Select
          style={{
            width: 100,
            height: 40,
            marginRight: 35,
            border: "1px solid turquoise",
          }}
          value={currency}
          onChange={(event) => setCurrency(event.target.value)}
          sx={{ color: "turquoise" }}
        >
          <MenuItem value="INR">INR</MenuItem>
          <MenuItem value="USD">USD</MenuItem>
        </Select>
      </Container>
      <ToggleTheme />
    </AppBar>
  );
};

export default Header;
