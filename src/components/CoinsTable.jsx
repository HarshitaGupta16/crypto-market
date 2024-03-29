import {
  Container,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinsList } from "../config/api";
import { CryptoState } from "../contexts/CryptoContext";
import { ThemeState } from "../contexts/ThemeContext";
import "./CoinsTable.css";
import { NumberWithCommas } from "./Banner/Carousel";
import { useNavigate } from "react-router-dom";

const CoinsTable = () => {
  const { theme } = ThemeState();
  const [searchText, setSearchText] = useState("");
  const [coinsList, setCoinsList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { currency, symbol } = CryptoState();

  const navigate = useNavigate();

  const fetchCoinsList = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinsList(currency));
    setCoinsList(data);
    setLoading(false);
  };

  const handleSearch = () => {
    return coinsList.filter(
      (coin) =>
        coin?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        coin?.symbol?.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  useEffect(() => {
    fetchCoinsList();
  }, [currency]);

  const handlePagination = (event, value) => {
    setPage(value);
    window.scroll(0, 450);
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
      className={theme === "dark-theme" ? "darkTheme" : "lightTheme"}
    >
      <Typography
        component={"h2"}
        style={{
          color:
            theme === "dark-theme" ? "rgba(255, 255, 255, 0.87)" : "#242424",
          display: "flex",
          justifyContent: "center",
          padding: "1rem",
          fontSize: "1.2rem",
        }}
      >
        Crypto Currency prices by Market Caps
      </Typography>
      <TextField
        label="Search for a Crypto Currency"
        fullWidth
        sx={{
          input: {
            color: theme === "dark-theme" ? "white" : "#1a237e",
          },
        }}
        className={
          theme === "dark-theme" ? `darkThemeTextbox` : "lightThemeTextbox"
        }
        InputLabelProps={{
          style: { color: theme === "dark-theme" ? "#fff" : "#1a237e" },
        }}
        onChange={(event) => setSearchText(event.target.value)}
      />
      {loading ? (
        <LinearProgress
          style={{
            backgroundColor: theme === "dark-theme" ? "turquoise" : "#1ae237",
            marginTop: 20,
          }}
        />
      ) : (
        <TableContainer>
          <Table
            sx={{ minWidth: "750", marginTop: "20px" }}
            aria-label="crypto currency details table"
          >
            <TableHead>
              <TableRow
                style={{
                  backgroundColor:
                    theme === "dark-theme" ? "turquoise" : "#1a237e",
                }}
              >
                {["Coin", "Price", "24th Change", "Market Cap"].map(
                  (heading) => (
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: theme === "dark-theme" ? "black" : "white",
                      }}
                      align={heading === "Coin" ? "left" : "right"}
                      key={heading}
                    >
                      {heading}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch()
                ?.slice((page - 1) * 10, page * 10)
                .map((coin) => {
                  const profit = coin.price_change_percentage_24h >= 0;
                  return (
                    <TableRow
                      key={coin.name}
                      onClick={() => navigate(`/coins/${coin.id}`)}
                      className={
                        theme === "dark-theme"
                          ? "darkThemeRow"
                          : "lightThemeRow"
                      }
                    >
                      <TableCell
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                          color: theme === "dark-theme" ? "white" : "black",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {
                            <img
                              src={coin.image}
                              alt={coin.name}
                              height="50"
                              style={{ marginRight: 10 }}
                            />
                          }
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "left",
                            }}
                          >
                            <span style={{ fontSize: 22 }}>
                              {coin.symbol.toUpperCase()}
                            </span>
                            <span>{coin.name}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: theme === "dark-theme" ? "white" : "black",
                        }}
                      >
                        {symbol}
                        {NumberWithCommas(coin.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit ? "green" : "red",
                        }}
                      >
                        {profit && "+"}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: theme === "dark-theme" ? "white" : "black",
                        }}
                      >
                        {symbol}
                        {NumberWithCommas(coin.market_cap).slice(0, -6)}M
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Pagination
        count={handleSearch()?.length / 10}
        onChange={handlePagination}
      />
    </Container>
  );
};

export default CoinsTable;
