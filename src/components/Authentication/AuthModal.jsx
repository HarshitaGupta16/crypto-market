import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SelectButton from "../common/SelectButton";
import { AppBar, Tab, Tabs } from "@mui/material";
import Login from "./Login";
import SignUp from "./SignUp";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../contexts/CryptoContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#242424",
  borderRadius: 5,
};

const tabsStyle = {
  bgcolor: "#242424",
  color: "white",
};

const tabStyle = {
  color: "white",
  "&.Mui-selected": {
    color: "white",
  },
};

const google = {
  display: "flex",
  padding: 24,
  paddingTop: 0,
  flexDirection: "column",
  textAlign: "center",
  gap: 20,
  fontSize: 20,
};

export default function AuthModal() {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);

  const { setAlert, open, setOpen } = CryptoState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up successfull. Welcome ${res.user.email}`,
          type: "success",
        });
        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      });
  };

  return (
    <div>
      <SelectButton
        onClick={handleOpen}
        style={{
          marginLeft: "30px",
          textTransform: "none",
          padding: "8px 30px",
        }}
        selected={open}
      >
        Login
      </SelectButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}> */}
          <AppBar
            position="static"
            style={{ backgroundColor: "transparent", color: "white" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="authentication tabs"
              variant="fullWidth"
              style={{ borderRadius: 10 }}
              sx={tabsStyle}
            >
              <Tab label="Login" sx={tabStyle} />
              <Tab label="Sign Up" sx={tabStyle} />
            </Tabs>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <SignUp handleClose={handleClose} />}
            <Box style={google}>
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
          </AppBar>
          {/* </Box> */}
        </Box>
      </Modal>
    </div>
  );
}
