import { Typography } from "@mui/material";
import React from "react";
import { ThemeState } from "../../contexts/ThemeContext";
import classes from "./Banner.module.css";
import Carousel from "./Carousel";

const Banner = () => {
  const { theme } = ThemeState();
  return (
    <div
      className={classes.banner}
      style={{
        background:
          theme === "dark-theme"
            ? "url('/dark-banner.jpg')"
            : "url('/light-banner.jpg')",
      }}
    >
      <Typography
        component={"h1"}
        style={{ fontWeight: 600, fontSize: "2.5rem" }}
      >
        Crypto Market
      </Typography>
      <Typography component={"p"}>
        Get all the crypto currencies real time update
      </Typography>
      <Carousel />
    </div>
  );
};

export default Banner;
