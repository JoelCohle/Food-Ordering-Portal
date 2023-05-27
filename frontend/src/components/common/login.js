import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangeUser = (event) => {
        setUser(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const resetInputs = () => {
        setUser("");
        setEmail("");
        setPassword("");
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            email: email,
            password: password,
        };

        if (user == "Buyer"){
            axios
            .post("/api/buyer/login", newUser)
            .then((response) => {
                alert("Logged in as " + response.data.name);
                console.log(response.data);
                const User = {
                    usertype: "buyer",
                    name: response.data.name,
                    email: response.data.email,
                    contactnumber: response.data.contactnumber,
                    age: response.data.age,
                    batchname: response.data.Batchname,
                    wallet: response.data.wallet
                };
                localStorage.setItem('User', JSON.stringify(User));
                navigate("../dashboard");
            })
            .catch((error) => {
                console.log(error.response);
                alert("Error " + error.response.status + error.response.data);
            })
        }
        else{
            axios
            .post("/api/vendor/login", newUser)
            .then((response) => {
                alert("Logged in as " + response.data.name);
                console.log(response.data);
                const User = {
                    usertype: "vendor",
                    name: response.data.name,
                    ShopName: response.data.ShopName,
                    email: response.data.email,
                    contactnumber: response.data.contactnumber,
                    OpeningTime: response.data.OpeningTime,
                    ClosingTime: response.data.ClosingTime
                };
                localStorage.setItem('User', JSON.stringify(User));
                navigate("../dashboard");

            })
            .catch((error) => {
                alert("Error " + error.response.status + error.response.data);
            })
        }
        

        resetInputs();
    };

    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <FormControl sx={{ m: 1, minWidth: 230 }}>
                    <InputLabel id="user-label">User</InputLabel>
                    <Select
                        labelId="User"
                        id="User"
                        value={user}
                        label="User"
                        onChange={onChangeUser}
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
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={onChangeEmail}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit}>
                    Login
                </Button>
            </Grid>
        </Grid>
    );
};

export default Login;