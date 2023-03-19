import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { HistoricalData } from "../config/api";
import { CryptoState } from "../contexts/CryptoContext";
import classes from "./CoinInfo.module.css";
import { Button, CircularProgress } from "@mui/material";
import { ThemeState } from "../contexts/ThemeContext";
import { ChartDays } from "../config/data";
import SelectButton from "./common/SelectButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const { currency } = CryptoState();
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  //   const [selected, setSelected] = useState(false);
  const { theme } = ThemeState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(
      HistoricalData(coin.id, days, currency.toLowerCase())
    );
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);
  //   console.log(selected);

  return (
    <div className={classes.container}>
      {!historicalData ? (
        <CircularProgress
          style={{ color: theme === "dark-theme" ? "turquoise" : "#1a237e" }}
          size={250}
          thickness={1}
        />
      ) : (
        <>
          <Line
            data={{
              labels: historicalData?.map((coin) => {
                let date = new Date(coin[0]);
                let minutes =
                  date.getMinutes() < 10
                    ? `0${date.getMinutes()}`
                    : date.getMinutes();
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${minutes}PM`
                    : `${date.getHours()}:${minutes}AM`;

                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price (Past ${days} Days ) in ${currency}`,
                  borderColor: theme === "dark-theme" ? "turquoise" : "#1a237e",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 20,
              width: "100%",
            }}
          >
            {ChartDays().map((button) => (
              <SelectButton
                onClick={() => setDays(button.days)}
                selected={button.days === days}
                btnClass={classes.chartDaysBtn}
              >
                {button.label}
              </SelectButton>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinInfo;
