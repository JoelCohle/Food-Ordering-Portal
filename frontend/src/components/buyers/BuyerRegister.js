import * as React from 'react';
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { useNavigate } from 'react-router-dom';

const BuyerRegister = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactnumber, setcontactnumber] = useState(null);
    const [Age, setAge] = useState(null);
    const [Batchname, setBatchname] = useState("");
    const [password, setPassword] = useState("");
      

    const onChangeUsername = (event) => {
      setName(event.target.value);
    };
    const onChangeEmail = (event) => {
      setEmail(event.target.value);
    };
    const onChangecontactnumber = (event) => {
        setcontactnumber(event.target.value);
    };
    const onChangeAge = (event) => {
        setAge(event.target.value);
    };
    const onChangeBatchname = (event) => {
        setBatchname(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const resetInputs = () => {
      setName("");
      setEmail("");
      setcontactnumber(null);
      setAge(null);
      setBatchname("");
      setPassword("");
    };
  
    const onSubmit = (event) => {
      event.preventDefault();
  
      const newUser = {
        name: name,
        email: email,
        contactnumber: contactnumber,
        age: Age,
        Batchname: Batchname,
        password: password,
      };
  
      axios
        .post("/api/buyer/register", newUser)
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
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
            style={{width: 500}}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="ContactNumber"
            variant="outlined"
            value={contactnumber}
            type="number" 
            InputProps={{ inputProps: { min: 1000000000, max: 9999999999 } }}
            onChange={onChangecontactnumber}
            style={{width: 500}}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Age"
            variant="outlined"
            type="number" 
            InputProps={{ inputProps: { min: 1 } }}
            value={Age}
            onChange={onChangeAge}
            style={{width: 500}}
          />
        </Grid>

        <Grid item xs={12}>
            <FormControl sx={{m:1, minWidth:230}}>
                <InputLabel id="BatchName">Batch Name</InputLabel>
                    <Select
                    labelId="BatchName"
                    id="BatchName"
                    value={Batchname}
                    label="BatchName"
                    onChange={onChangeBatchname}
                    style={{width: 500}}
                    >
                    <MenuItem value={"UG1"}>UG1</MenuItem>
                    <MenuItem value={"UG2"}>UG2</MenuItem>
                    <MenuItem value={"UG3"}>UG3</MenuItem>
                    <MenuItem value={"UG4"}>UG4</MenuItem>
                    <MenuItem value={"UG5"}>UG5</MenuItem>
                    </Select>
            </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
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
  
export default BuyerRegister;