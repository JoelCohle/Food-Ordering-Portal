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


const VendorProfile = (props) => {
    const navigate = useNavigate();

    const [readonly, setreadonly] = useState(true);
    const [name, setName] = useState("");
    const [ShopName, setShopName] = useState("");
    const [email, setEmail] = useState("");
    const [contactnumber, setcontactnumber] = useState(null);
    const [OpeningTime, setOpeningTime] = useState("");
    const [ClosingTime, setClosingTime] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setName(JSON.parse(localStorage.getItem('User')).name);
        setShopName(JSON.parse(localStorage.getItem('User')).ShopName)
        setEmail(JSON.parse(localStorage.getItem('User')).email);
        setcontactnumber(JSON.parse(localStorage.getItem('User')).contactnumber);
        setOpeningTime(JSON.parse(localStorage.getItem('User')).OpeningTime);
        setClosingTime(JSON.parse(localStorage.getItem('User')).ClosingTime);
    }, []);

    const onChangeUsername = (event) => {
        if (!readonly)
            setName(event.target.value);
    };
    const onChangeShopName = (event) => {
        if (!readonly)
            setShopName(event.target.value);
    };
    const onChangeEmail = (event) => {
        if (!readonly)
            setEmail(event.target.value);
    };
    const onChangecontactnumber = (event) => {
        if (!readonly)
            setcontactnumber(event.target.value);
    };
    const onChangeOpeningTime = (event) => {
        if (!readonly)
            setOpeningTime(event.target.value);
    };
    const onChangeClosingTime = (event) => {
        if (!readonly)
            setClosingTime(event.target.value);
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
            .post("/api/vendor/login", newUser)
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
            name: name,
            ShopName: ShopName,
            email: email,
            oldemail: JSON.parse(localStorage.getItem("User")).email,
            contactnumber: contactnumber,
            OpeningTime: OpeningTime,
            ClosingTime: ClosingTime,
            password: password,
        };

        axios
            .post("/api/vendor/update", updatedUser)
            .then((response) => {
                setreadonly(true);
                setOpen(false);
                const User = {
                    usertype: "vendor",
                    name: name,
                    ShopName: ShopName,
                    email: email,
                    contactnumber: contactnumber,
                    OpeningTime: OpeningTime,
                    ClosingTime: ClosingTime,
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
                    label="Shop Name"
                    variant="outlined"
                    value={ShopName}
                    onChange={onChangeShopName}
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
                    label="Contact Number"
                    variant="outlined"
                    value={contactnumber}
                    type="number" 
                    InputProps={{ inputProps: { min: 1000000000, max: 9999999999 } }}
                    onChange={onChangecontactnumber}
                    style={{ width: 500 }}
                // InputProps={{ readOnly: { readonly }, }}
                />
            </Grid>
            <Divider />
            <Grid item xs={12}>
                <TextField
                    label="Opening Time"
                    variant="outlined"
                    value={OpeningTime}
                    onChange={onChangeOpeningTime}
                    style={{ width: 500 }}
                // InputProps={{ readOnly: {readonly} }}
                />
            </Grid>
            <Divider />
                <Grid item xs={12}>
                    <TextField
                        label="Closing Time"
                        variant="outlined"
                        value={ClosingTime}
                        onChange={onChangeClosingTime}
                        style={{ width: 500 }}
                    // InputProps={{ readOnly: {readonly} }}
                    />
                </Grid>
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

export default VendorProfile;
