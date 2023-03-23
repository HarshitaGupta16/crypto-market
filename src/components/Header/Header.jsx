import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import ToggleTheme from "./ToggleTheme";
import "./Header.css";
import { CryptoState } from "../../contexts/CryptoContext";
import { ThemeState } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import AuthModal from "../Authentication/AuthModal";
import UserSidebar from "../Authentication/UserSidebar";

const Header = () => {
  const { currency, setCurrency, user } = CryptoState();
  const { theme } = ThemeState();

  return (
    <AppBar color="transparent" position="static">
      <Toolbar>
        <Container
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant={"h6"}
            className="--main-heading"
            sx={{ cursor: "pointer" }}
          >
            <Link to={"/"}>Crypto Market</Link>
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Select
              style={{
                width: 100,
                height: 40,
                marginRight: 35,
                border:
                  theme === "dark-theme"
                    ? "1px solid turquoise"
                    : "1px solid #1a237e",
              }}
              className={
                theme === "dark-theme" ? "dark-theme-icon" : "light-theme-icon"
              }
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              sx={{
                color: theme === "dark-theme" ? "turquoise" : "#1a237e",
                fill: "red",
              }}
            >
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </Select>
            <ToggleTheme />
            {user ? <UserSidebar /> : <AuthModal />}
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
