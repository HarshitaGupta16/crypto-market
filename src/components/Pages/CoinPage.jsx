import { LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../../config/api";
import { CryptoState } from "../../contexts/CryptoContext";
import { ThemeState } from "../../contexts/ThemeContext";
import { NumberWithCommas } from "../Banner/Carousel";
import CoinInfo from "../CoinInfo";
import classes from "./CoinPage.module.css";
import HTMLReactParser from "html-react-parser";

const CoinPage = () => {
  const { theme } = ThemeState();
  const [coinDetail, setCoinDetail] = useState();
  const { currency, symbol } = CryptoState();

  const id = useParams();

  const fetchSingleCoin = async () => {
    const { data } = await axios.get(SingleCoin(id.id));
    setCoinDetail(data);
  };

  useEffect(() => {
    fetchSingleCoin();
  }, []);

  if (!coinDetail) {
    return <LinearProgress style={{ backgroundColor: "turquoise" }} />;
  }

  return (
    <div className={classes.container}>
      <div
        style={{
          color:
            theme === "dark-theme" ? "rgba(255, 255, 255, 0.87)" : "#242424",
        }}
        className={classes.sidebar}
      >
        <img
          src={coinDetail?.image.large}
          alt={coinDetail?.name}
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coinDetail?.name}
        </Typography>
        <Typography variant="p" className={classes.description}>
          {HTMLReactParser(coinDetail?.description?.en.split(". ")[0])}
        </Typography>
        <div className={classes.marketData}>
          <span
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ marginBottom: 20 }}>
              {coinDetail.market_cap_rank}
            </Typography>
          </span>
          <span
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}
              {NumberWithCommas(
                coinDetail.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex", width: "100%" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}
              {NumberWithCommas(
                coinDetail.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coinDetail} />
    </div>
  );
};

export default CoinPage;
