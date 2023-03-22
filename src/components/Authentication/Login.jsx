import { Box, Button, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { CryptoState } from "../../contexts/CryptoContext";
import { ThemeState } from "../../contexts/ThemeContext";
import { auth } from "../../firebase";
import "./SignUp.css";

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },

    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "yellow",
    },
  },
};

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { theme } = ThemeState();
  const { alert, setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
        type: "error",
      });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      setAlert({
        open: true,
        message: `Login successful ${result.user.email}`,
        type: "success",
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <Box
      p={4}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        variant="outlined"
        label="Enter Email"
        fullWidth
        value={email}
        type="email"
        required
        sx={textFieldStyle}
        inputProps={{ style: { color: "white" } }}
        className="textfieldStyle"
        InputLabelProps={{
          style: { color: "#fff" },
        }}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        variant="outlined"
        label="Password"
        fullWidth
        value={password}
        type="password"
        required
        sx={textFieldStyle}
        inputProps={{ style: { color: "white" } }}
        className="textfieldStyle"
        InputLabelProps={{
          style: { color: "#fff" },
        }}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button
        variant="contained"
        style={{
          backgroundColor: theme === "dark-theme" ? "turquoise" : "#1a237e",
          padding: "10px",
        }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
