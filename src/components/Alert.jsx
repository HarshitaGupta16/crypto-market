import { Snackbar } from "@mui/material";
import React from "react";
import { CryptoState } from "../contexts/CryptoContext";
import MuiAlert from "@mui/material/Alert";

const alertStyle = {
  "&.MuiSnackbar-root": {
    display: "flex",
    justifyContent: "center",
  },
};

const Alert = () => {
  const { alert, setAlert } = CryptoState();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false });
  };
  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleClose}
      style={alertStyle}
    >
      <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
