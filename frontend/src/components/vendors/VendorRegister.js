import { useState } from "react";
import * as React from 'react';
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { useNavigate } from 'react-router-dom';

const VendorRegister = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [ShopName, setShopName] = useState("");
    const [email, setEmail] = useState("");
    const [contactnumber, setcontactnumber] = useState(null);
    const [OpeningTime, setOpeningTime] = useState("");
    const [ClosingTime, setClosingTime] = useState("");
    const [password, setPassword] = useState("");
      
    const onChangeUsername = (event) => {
        setName(event.target.value);
    };
    const onChangeShopName = (event) => {
      setShopName(event.target.value);
    };
    const onChangeEmail = (event) => {
      setEmail(event.target.value);
    };
    const onChangecontactnumber = (event) => {
        setcontactnumber(event.target.value);
    };
    const onChangeOpeningTime = (event) => {
        setOpeningTime(event.target.value);
    };
    const onChangeClosingTime = (event) => {
        setClosingTime(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };
  
    const resetInputs = () => {
      setName("");
      setShopName("")
      setEmail("");
      setcontactnumber(null);
      setOpeningTime("");
      setClosingTime("");
      setPassword("");
    };
  
    const onSubmit = (event) => {
      event.preventDefault();
  
      const newUser = {
        name: name,
        ShopName: ShopName,
        email: email,
        contactnumber: contactnumber,
        OpeningTime: OpeningTime,
        ClosingTime: ClosingTime,
        password: password,
      };
  
      axios
        .post("/api/vendor/register", newUser)
        .then((response) => {
            navigate("../login");
          alert("Created\t" + response.data.name);
          console.log(response.data);
        });
  
      resetInputs();
    };
  
    return (
      <Grid container justifyContent="center" align={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={onChangeUsername}
            style={{width: 500}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Shop Name"
            variant="outlined"
            value={ShopName}
            onChange={onChangeShopName}
            style={{width: 500}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
            style={{width: 500}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contact Number"
            variant="outlined"
            value={contactnumber}
            type="number" 
            InputProps={{ inputProps: { min: 1000000000, max: 9999999999} }}
            onChange={onChangecontactnumber}
            style={{width: 500}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Opening Time"
            variant="outlined"
            value={OpeningTime}
            onChange={onChangeOpeningTime}
            style={{width: 500}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Closing Time"
            variant="outlined"
            value={ClosingTime}
            onChange={onChangeClosingTime}
            style={{width: 500}}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Password"
            variant="outlined"
            value={password}
            type="password"
            onChange={onChangePassword}
            style={{width: 500}}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmit} style={{width: 200, height: 50}}>
            Register
          </Button>
        </Grid>
      </Grid>
    );
  };
  
  export default VendorRegister;