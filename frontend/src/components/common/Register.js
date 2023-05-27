import { useState } from 'react';
import * as React from 'react';
import Grid from "@mui/material/Grid";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BuyerRegister from '../buyers/BuyerRegister';
import VendorRegister from "../vendors/VendorRegister";
import { useNavigate } from 'react-router-dom';

const Register = (props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");

  const onChangeUser = (event) => {
    setUser(event.target.value);
  };

  return (
    <Grid container justifyContent="center" align={"center"} spacing={1}>
      <Grid item xs={12}>
      <FormControl sx={{m:1, minWidth:230}}>
      <InputLabel id="user-label">User</InputLabel>
        <Select
          labelId="User"
          id="User"
          value={user}
          label="User"
          onChange={onChangeUser}
          style={{width: 500}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Buyer"}>Buyer</MenuItem>
          <MenuItem value={"Vendor"}>Vendor</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      
      <Grid item xs={12}>
      {user == "Buyer" &&(
        <BuyerRegister />
        )}
      </Grid>
      <Grid item xs={12}>
      {user == "Vendor" &&(
        <VendorRegister />
      )}
      </Grid>
    </Grid>
  );
};

export default Register;
