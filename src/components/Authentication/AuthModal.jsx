import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SelectButton from "../common/SelectButton";
import { AppBar, Tab, Tabs } from "@mui/material";
import Login from "./Login";
import SignUp from "./SignUp";

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

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          </AppBar>
          {/* </Box> */}
        </Box>
      </Modal>
    </div>
  );
}
