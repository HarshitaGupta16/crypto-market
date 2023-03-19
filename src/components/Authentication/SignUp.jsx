import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { ThemeState } from "../../contexts/ThemeContext";
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

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const { theme } = ThemeState();

  const handleSubmit = () => {};

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
      <TextField
        variant="outlined"
        label="Confirm Password"
        fullWidth
        value={confirmPassword}
        type="password"
        required
        sx={textFieldStyle}
        inputProps={{ style: { color: "white" } }}
        className="textfieldStyle"
        InputLabelProps={{
          style: { color: "#fff" },
        }}
        onChange={(event) => setConfirmPassword(event.target.value)}
      />
      <Button
        variant="contained"
        style={{
          backgroundColor: theme === "dark-theme" ? "turquoise" : "#1a237e",
          padding: "10px",
        }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
