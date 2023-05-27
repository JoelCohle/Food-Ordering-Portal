import axios from "axios";
import { useState, useEffect } from "react";
import * as React from 'react';
import Divider from '@mui/material/Divider';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const BuyerProfile = (props) => {
    const navigate = useNavigate();

    const [readonly, setreadonly] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactnumber, setcontactnumber] = useState(null);
    const [Age, setAge] = useState(null);
    const [Batchname, setBatchname] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setName(JSON.parse(localStorage.getItem('User')).name);
        setEmail(JSON.parse(localStorage.getItem('User')).email);
        setcontactnumber(JSON.parse(localStorage.getItem('User')).contactnumber);
        setAge(JSON.parse(localStorage.getItem('User')).age);
        setBatchname(JSON.parse(localStorage.getItem('User')).batchname);
    }, []);

    const onChangeUsername = (event) => {
        if (!readonly)
            setName(event.target.value);
    };
    const onChangeEmail = (event) => {
        if (!readonly)
            setEmail(event.target.value);
    };
    const onChangecontactnumber = (event) => {
        if (!readonly)
            setcontactnumber(event.target.value);
    };
    const onChangeAge = (event) => {
        if (!readonly)
            setAge(event.target.value);
    };
    const onChangeBatchname = (event) => {
        if (!readonly)
            setBatchname(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmPassword = (event) => {
        event.preventDefault();

        const newUser = {
            email: email,
            password: password,
        };

        axios
            .post("/api/buyer/login", newUser)
            .then((response) => {
                setreadonly(false);
            })
            .catch((error) => {
                console.log(error.response);
                alert("Password Incorrect");
            })
    };

    const handleUpdate = (event) => {
        event.preventDefault();

        const updatedUser = {
            oldemail: JSON.parse(localStorage.getItem("User")).email,
            name: name,
            email: email,
            contactnumber: contactnumber,
            age: Age,
            Batchname: Batchname,
            password: password,
        };

        axios
            .post("/api/buyer/update", updatedUser)
            .then((response) => {
                setreadonly(true);
                setOpen(false);
                const User = {
                    usertype: "buyer",
                    name: name,
                    email: email,
                    contactnumber: contactnumber,
                    age: Age,
                    batchname: Batchname,
                };
                localStorage.setItem('User', JSON.stringify(User));
            });
    }

    return (
        <Grid container justifyContent="center" align={"center"} spacing={2}>
            <AccountCircleIcon sx={{ fontSize: 100 }}  color="primary" style={{ "margin-top": "5%" }}/>
            <Grid item xs={12} >
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={onChangeUsername}
                    style={{ width: 500 }}
                // InputProps={{ readOnly: { readonly }, }}
                />
            </Grid>
            <Divider />
            <Grid item xs={12}>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={onChangeEmail}
                    style={{ width: 500 }}
                // InputProps={{ readOnly: { readonly }, }}
                />
            </Grid>
            <Divider />
            <Grid item xs={12}>
                <TextField
                    label="ContactNumber"
                    variant="outlined"
                    value={contactnumber}
                    onChange={onChangecontactnumber}
                    type="number" 
                    InputProps={{ inputProps: { min: 1000000000, max: 9999999999 } }}
                    style={{ width: 500 }}
                // InputProps={{ readOnly: { readonly }, }}
                />
            </Grid>
            <Divider />
            <Grid item xs={12}>
                <TextField
                    label="Age"
                    variant="outlined"
                    value={Age}
                    type="number" 
                    InputProps={{ inputProps: { min: 1} }}
                    onChange={onChangeAge}
                    style={{ width: 500 }}
                // InputProps={{ readOnly: {readonly} }}
                />
            </Grid>
            <Divider />
            {readonly && (
                <Grid item xs={12}>
                    <TextField
                        label="Batch Name"
                        variant="outlined"
                        value={Batchname}
                        onChange={onChangeBatchname}
                        style={{ width: 500 }}
                    // InputProps={{ readOnly: {readonly} }}
                    />
                </Grid>
            )}
            {!readonly && (
                <Grid item xs={12}>
                    <FormControl sx={{ m: 1, minWidth: 230 }}>
                        <InputLabel id="BatchName">Batch Name</InputLabel>
                        <Select
                            labelId="BatchName"
                            defaultValue={Batchname}
                            id="BatchName"
                            value={Batchname}
                            label="BatchName"
                            // inputProps={{ readOnly: { readonly } }}
                            onChange={onChangeBatchname}
                            style={{ width: 500 }}
                        >
                            <MenuItem value={"UG1"}>UG1</MenuItem>
                            <MenuItem value={"UG2"}>UG2</MenuItem>
                            <MenuItem value={"UG3"}>UG3</MenuItem>
                            <MenuItem value={"UG4"}>UG4</MenuItem>
                            <MenuItem value={"UG5"}>UG5</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            )}
            <Divider />
            <Divider />
            {readonly && (
                <div>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleClickOpen} style={{ width: 200, height: 50, "margin-top": "20px" }}>
                        Edit
                        </Button>
                    </Grid>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Confirm Password</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Enter Password
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                onChange={onChangePassword}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleConfirmPassword}>Confirm</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )}
            {!readonly && (
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={onChangePassword}
                        style={{ width: 500 }}
                    // InputProps={{ readOnly: { readonly }, }}
                    />
                </Grid>
            )}
            {!readonly && (
                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleUpdate} style={{ width: 200, height: 50 }}>
                        Save
                    </Button>
                </Grid>
            )}

        </Grid>
    );
};

export default BuyerProfile;
