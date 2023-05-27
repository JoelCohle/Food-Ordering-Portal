import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";

const VendorOrders = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const name = JSON.parse(localStorage.getItem('User')).ShopName;
    const shopname = {
      shopname: name,
    };
    axios
      .post("/api/order/vendororders", shopname)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const HandleReject = (order, ind) => {
    const neworder = {
      buyeremail: order.buyeremail,
      foodname: order.foodname,
      quantity: order.quantity,
      placedtime: order.placedtime,
      vendorname: order.vendorname,
      cost: order.cost,
      status: "Rejected",
    };
    console.log(neworder);
    axios
      .post("/api/order/changestage", neworder)
      .then((response) => {
        alert("Status Updated");
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
        alert("Error " + error.response.status + error.response.data);
      })
  }

  const HandleStageChange = (order, ind) => {
    let ordercount = 0;
    for (let index = 0; orders[index] != undefined; index++) {
      if (orders[index].status == "Accepted" || orders[index].status == "Cooking")
        ordercount++;
        console.log(orders[index]);
      }
    console.log(ordercount);
    if (ordercount > 9 && order.status == "Placed") {
      alert("Max Orders placed! Complete Orders before continuing");
      return;
    }
    let status = "";
    if (order.status == "Placed") {
      ordercount++;
      status = "Accepted";
    }
    if (order.status == "Accepted") {
      // console.log(ordercount);
      status = "Cooking";
    }
    if (order.status == "Cooking") {
      ordercount--;
      status = "ReadyForPickup";
    }
    if (order.status == "ReadyForPickup") {
      status = "Completed";
    }
    const neworder = {
      buyeremail: order.buyeremail,
      foodname: order.foodname,
      quantity: order.quantity,
      placedtime: order.placedtime,
      vendorname: order.vendorname,
      cost: order.cost,
      status: status,
    };
    // console.log(order);
    axios
      .post("/api/order/changestage", neworder)
      .then((response) => {
        alert("Status Updated");
        // console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
        alert("Error " + error.response.status + error.response.data);
      })

  };

  return (
    <div>
      <Grid container justifyContent="center" align={"center"} spacing={1}>
        <Grid item xs={12}>
            <h1 align="center">ORDERS ISSUED</h1>
        </Grid>
        <Grid item xs={12} md={9} lg={9} mt={5}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }} > Sr No.</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} >Food Item</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} >Quantity</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} >Time Placed</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} >Status</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind + 1}</TableCell>
                    <TableCell>{order.foodname}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.placedtime}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                      {order.status == "Placed" && (<Button variant="contained" color="error" onClick={() => HandleReject(order, ind)}>REJECT</Button>)} </TableCell>
                    <TableCell> {(order.status != "Completed" && order.status != "Rejected" && order.status != "ReadyForPickup") && (<Button variant="contained" color="primary" onClick={() => HandleStageChange(order, ind)}>MOVE TO NEXT STAGE</Button>)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default VendorOrders;
