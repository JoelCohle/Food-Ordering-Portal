import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { Grid, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";

const Statistics = (props) => {

    const [orders, setOrders] = useState([]);
    const [items, setFoodItems] = useState([]);
    const [topfiveitems, setTopfiveitems] = useState([]);
    const [placedorders, setPlacedorders] = useState(0);
    const [pendingorders, setPendingorders] = useState(0);
    const [completedorders, setCompletedorders] = useState(0);
    const [Temp, setTemp] = useState(false);

    useEffect(() => {
        const Canteen = {
            shopname: JSON.parse(localStorage.getItem("User")).ShopName,
        }

        axios
            .post("/api/order/vendororders", Canteen)
            .then((response) => {
                setOrders(response.data);

                let arr = [];
                let CompletedCount = 0;
                let PendingCount = 0;
                response.data.map(order => {
                    if (order.status === "Completed") {
                        CompletedCount++;
                        if (!arr.some(food => food.name === order.foodname))
                            arr.push({ name: order.foodname, quantity: order.quantity })
                        else
                            arr.map(food => {
                                if (food.name === order.foodname)
                                    food.quantity += order.quantity
                            })
                    }
                    else if (orders.status != "Rejected")
                        PendingCount++;
                })

                arr.sort((a, b) => b.quantity - a.quantity)
                setTopfiveitems(arr.splice(0, 5))
                setPlacedorders(orders.length);
                setCompletedorders(CompletedCount);
                setPendingorders(PendingCount);
            })
            .catch((error) => {
                console.log(error);
            })


    }, [orders]);

    return (

        <Grid container justifyContent="center" align={"center"} spacing={1}>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
                <h1 align="center">Statistics</h1>
            </Grid>
            <Grid item xs={4} align="center">
                <List style={{ width: 200 }}>
                    <ListSubheader style={{ fontWeight:"bold", backgroundColor: "#E5E5E5", color: "#252525" }}>
                        Top five sold items
                    </ListSubheader>
                    {topfiveitems.map((item, i) => (
                        <ListItem style={{ color: "#252525" }} disablePadding>
                            <ListItemText>
                                <Typography variant="body3" color="textSecondary">{(i + 1) + ". " + item.name} </Typography>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item xs={4} align="center">
                <Paper>
                    <Table size="large">
                        <TableBody>
                            <TableRow>
                                <TableCell style={{fontWeight:"bold"}}>
                                    Orders Placed
                                </TableCell>
                                <TableCell>
                                    {placedorders}
                                </TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell style={{fontWeight:"bold"}}>
                                    Orders Pending
                                </TableCell>
                                <TableCell>
                                    {pendingorders}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{fontWeight:"bold"}}>
                                    Orders Completed
                                </TableCell>
                                <TableCell>
                                    {completedorders}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Grid >
        </Grid >
    );
}

export default Statistics;