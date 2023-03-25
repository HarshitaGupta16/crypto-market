import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { CryptoState } from "../../contexts/CryptoContext";
import { Avatar, IconButton } from "@mui/material";
import { ThemeState } from "../../contexts/ThemeContext";
import classes from "./UserSidebar.module.css";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import CloseIcon from "@mui/icons-material/Close";
import { NumberWithCommas } from "../Banner/Carousel";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setAlert, watchlist, coinsList, symbol } = CryptoState();
  const { theme } = ThemeState();
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);

    setAlert({
      open: true,
      message: "You have been logged out successfully",
      type: "success",
    });

    toggleDrawer();
  };

  const handleRemoveCoinFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        {
          merge: "true",
        }
      );
      setAlert({
        open: true,
        message: `${coin.name} removed from the watchlist !`,
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
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            src={user.photoURL}
            alt={user.displayName || user.email}
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: theme === "dark-theme" ? "turquoise" : "#1a237e",
            }}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div
              className={classes.container}
              style={{
                backgroundColor:
                  theme === "dark-theme"
                    ? "#242424"
                    : "rgba(255, 255, 255, 0.87)",
                color:
                  theme === "dark-theme"
                    ? "rgba(255, 255, 255, 0.87)"
                    : "#242424",
              }}
            >
              <IconButton
                onClick={toggleDrawer(anchor, false)}
                style={{
                  marginLeft: "380px",
                  marginTop: "-23px",
                  padding: 0,
                  color:
                    theme === "dark-theme"
                      ? "rgba(255, 255, 255, 0.87)"
                      : "#242424",
                }}
              >
                <CloseIcon />
              </IconButton>
              <div className={classes.profile}>
                <Avatar
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                  className={classes.picture}
                  style={{
                    backgroundColor:
                      theme === "dark-theme" ? "turquoise" : "#1a237e",
                  }}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchlist}>
                  <span
                    style={{
                      fontSize: 15,
                      textShadow: "0 0 5px black",
                      color:
                        theme === "dark-theme"
                          ? "#242424"
                          : "rgba(255, 255, 255, 0.87)",
                    }}
                  >
                    Watchlist
                  </span>
                  {coinsList?.map((coin) => {
                    if (watchlist.includes(coin.id)) {
                      return (
                        <div
                          className={classes.coin}
                          style={{
                            backgroundColor:
                              theme === "dark-theme" ? "turquoise" : "#1a237e",
                            color:
                              theme === "dark-theme"
                                ? "#242424"
                                : "rgba(255, 255, 255, 0.87)",
                          }}
                        >
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}
                            {NumberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer", marginTop: "4px" }}
                              fontSize="16"
                              onClick={() =>
                                handleRemoveCoinFromWatchlist(coin)
                              }
                            />
                          </span>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={logOut}
                style={{
                  backgroundColor:
                    theme === "dark-theme" ? "turquoise" : "#1a237e",
                  color:
                    theme === "dark-theme"
                      ? "#242424"
                      : "rgba(255, 255, 255, 0.87)",
                }}
              >
                Logout
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
