import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../contexts/CryptoContext";

export const NumberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Carousel = () => {
  const { currency, symbol } = CryptoState();
  const [trendingCoins, setTrendingCoins] = useState([]);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrendingCoins(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trendingCoins?.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link to={`/coins/${coin.id}`}>
        <img src={coin?.image} height="80" style={{ marginBottom: 10 }} />
        <div style={{ display: "flex" }}>
          <div style={{ fontWeight: "bold", marginRight: "15px" }}>
            {coin.symbol.toUpperCase()}
          </div>
          <span style={{ color: profit ? "green" : "red", fontWeight: "bold" }}>
            {profit && "+"}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
        <span style={{ fontWeight: "bold" }}>
          {symbol}
          {NumberWithCommas(coin.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      responsive={responsive}
      autoPlay
      items={items}
      disableButtonsControls
    />
  );
};

export default Carousel;
