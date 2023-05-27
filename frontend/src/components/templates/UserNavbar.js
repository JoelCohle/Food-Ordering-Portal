import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { TextField } from "@mui/material";
import axios from "axios";
import { Grid } from "@mui/material";

const UserNavbar = () => {
  const usertype = JSON.parse(localStorage.getItem('User')).usertype;
  const [wallet, setWallet] = useState(0);
  const [walletrefill, setWalletrefill] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setWallet(JSON.parse(localStorage.getItem('User')).wallet);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMoneyaddition = () => {
    const Wallet = {
      buyeremail: JSON.parse(localStorage.getItem("User")).buyeremail,
      balance: parseInt(wallet) + parseInt(walletrefill)
    }
    axios
      .post("/api/buyer/updatewallet", Wallet)
      .then((response) => {
        let user = JSON.parse(localStorage.getItem("User"));
        user.wallet = parseInt(user.wallet)+ parseInt(walletrefill);
        localStorage.setItem("User", JSON.stringify(user));
        alert("Successfully added money!")
        setOpen(false);
        window.location.reload();
      })
  };

  const onChangeWalletAmount = (event) => {
    setWalletrefill(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
          >
            Canteen Portal
          </Typography>
          <Box sx={{ marginLeft: "40%" }}>
            {usertype == "buyer" && (
              <div>
                <Button color="inherit" onClick={handleClickOpen}>
                  Wallet : Rs {wallet}
                </Button>
                <Dialog open={open} onClose={handleClose} fullWidth>
                  <DialogTitle align="center">
                    <h3>Wallet Details</h3>
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText align="center"> Wallet Balance: </DialogContentText>
                    <DialogContentText align="center"> <TextField margin="dense" InputProps={{ readOnly: true }} defaultValue={wallet} style={{ width: 200 }} /> </DialogContentText>
                    <DialogContentText align="center"> Add Money: </DialogContentText>
                    <DialogContentText align="center"> <TextField margin="dense" InputProps={{ inputProps: { min: 0 } }}style={{ width: 200 }} type="number" onChange={onChangeWalletAmount} /> </DialogContentText>
                  </DialogContent>
                  <DialogActions align="center">
                    <Grid container justifyContent="center" align={"center"} spacing={1}>
                      <Grid item> <Button variant="contained" onClick={handleMoneyaddition} autoFocus> Add Money </Button> </Grid>
                    </Grid>
                  </DialogActions>
                </Dialog>
              </div>
            )}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {usertype == "vendor" && (
            <Button color="inherit" onClick={() => navigate("/statistics")}>
              Statistics
            </Button>
          )}
          <Button color="inherit" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            My Profile
          </Button>
          <Button variant="contained" color="error" onClick={handleLogout} endIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default UserNavbar;
