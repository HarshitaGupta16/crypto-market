import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CoinsList } from "../config/api";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coinsList, setCoinsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (currency === "INR") {
      setSymbol("₹");
    } else {
      setSymbol("$");
    }
  }, [currency]);

  const fetchCoinsList = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinsList(currency));
    setCoinsList(data);
    setLoading(false);
  };

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        coinsList,
        loading,
        fetchCoinsList,
        alert,
        setAlert,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
