import { Button, LinearProgress, Typography } from "@mui/material";
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
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const CoinPage = () => {
  const { theme } = ThemeState();
  const [coinDetail, setCoinDetail] = useState();
  const { currency, symbol, user, setOpen, setAlert, watchlist } =
    CryptoState();

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

  const handleAddToWatchlist = async () => {
    if (!user) {
      setOpen(true);
      setAlert({
        open: true,
        message: "Login or register to add coins to watchlist",
        type: "error",
      });
    } else {
      // coinref will be the reference to our database to that particular table
      const coinRef = doc(db, "watchlist", user.uid);

      try {
        await setDoc(coinRef, {
          coins: watchlist ? [...watchlist, coinDetail?.id] : [coinDetail?.id],
        });
        setAlert({
          open: true,
          message: `${coinDetail.name} added to the watchlist !`,
          type: "success",
        });
      } catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      }
    }
  };

  const inWatchlist = watchlist.includes(coinDetail?.id);

  const handleRemoveFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coinDetail?.id),
        },
        {
          merge: "true",
        }
      );
      setAlert({
        open: true,
        message: `${coinDetail.name} removed from the watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

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
        <Button
          onClick={
            inWatchlist ? handleRemoveFromWatchlist : handleAddToWatchlist
          }
          style={{
            backgroundColor: inWatchlist
              ? "#EF4444"
              : theme === "dark-theme"
              ? "turquoise"
              : "#1a237e",
            width: "100%",
            height: 40,
            color:
              theme === "dark-theme" ? "#242424" : "rgba(255, 255, 255, 0.87)",
            textTransform: "none",
            marginRight: 25,
          }}
          variant="outlined"
        >
          {inWatchlist ? "Remove from watchlist" : "Add to Watchlist"}
        </Button>
      </div>
      <CoinInfo coin={coinDetail} />
    </div>
  );
};

export default CoinPage;
