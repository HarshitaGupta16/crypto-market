import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CoinsList } from "../config/api";
import { auth, db } from "../firebase";

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
  const [open, setOpen] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (currency === "INR") {
      setSymbol("₹");
    } else {
      setSymbol("$");
    }
  }, [currency]);

  useEffect(() => {
    // It is gonna monitor the state of our authentication of our firebase app
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
      // onSnapshot checks if our database is updated or not, here checking for coinRef database
      const unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data());
          // data() has all all of the data inside of user.uid
          setWatchlist(coin.data().coins);
        } else {
          console.log("No items in the watchlist");
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const fetchCoinsList = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinsList(currency));
    setCoinsList(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoinsList();
  }, [currency]);

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
        user,
        open,
        setOpen,
        watchlist,
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
