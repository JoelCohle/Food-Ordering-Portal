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
import Rating from '@mui/material/Rating';
import { Dialog, DialogContentText, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const VendorOrders = (props) => {
  const [orders, setOrders] = useState([]);
  const [rating, setRating] = useState(0);
  const [israting, setIsrating] = useState(false);
  const [orderplacedtime, setOrderplacedtime] = useState("");
  const [orderbuyeremail, setOrderbuyeremail] = useState("");
  const [orderfoodname, setOrderfoodname] = useState("");
  const [ordervendorname, setOrdervendorname] = useState("");

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('User')).email;
    const pickup = {
      buyeremail: email,
    };
    axios
      .post("/api/order", pickup)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onChangeRating = (event) => {
    setRating(event.target.value);
  }

  const HandleRating = () => {
    const orderdetails = {
      buyeremail: orderbuyeremail,
      placedtime: orderplacedtime,
      canteen: ordervendorname,
      rating: rating,
      name: orderfoodname,
    };
    console.log(orderdetails);
    axios
      .post("/api/order/submitrating", orderdetails)
      .then((response) => {
        alert("Order Rating updated");
        // console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
        alert("Error " + error.response.status + error.response.data);
      })

    axios
      .post("/api/fooditem/updaterating", orderdetails)
      .then((response) => {
        alert("Average Rating Updated");
        // console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
        alert("Error " + error.response.status + error.response.data);
      })

  };

  const HandleStageChange = (order, ind) => {
    const pickup = {
      buyeremail: order.buyeremail,
      foodname: order.foodname,
      quantity: order.quantity,
      placedtime: order.placedtime,
      status: "Completed",
    };
    // console.log(order);
    axios
      .post("/api/order/changestage", pickup)
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

  const HandleClickOpen = (order, ind) => {
    setOrderbuyeremail(order.buyeremail);
    setOrderplacedtime(order.placedtime);
    setOrderfoodname(order.foodname);
    setOrdervendorname(order.vendorname);
    setIsrating(true);
  };

  const handleClose = () => {
    setIsrating(false);
  };

  return (
    <div>
      <Grid container justifyContent="center" align={"center"} spacing={1}>
        <Grid item xs={12}>
          <h1 align="center">MY ORDERS</h1>
        </Grid>
        <Grid item xs={12} md={9} lg={9} mt={5}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }} > Sr No.</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} >Food Item</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} >Vendor Name</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} >Quantity</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} >Time Placed</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} >Status</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} >Cost</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} >Rating</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind + 1}</TableCell>
                    <TableCell>{order.foodname}</TableCell>
                    <TableCell>{order.vendorname}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.placedtime}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.cost}</TableCell>
                    <TableCell>
                      {(order.status == "ReadyForPickup") && (<Button variant="contained" color="primary" onClick={() => HandleStageChange(order, ind)}>PICKED UP</Button>)}
                      {(order.status == "Completed") && (<Button variant="contained" color="primary" onClick={() => HandleClickOpen(order, ind)}>RATE ORDER</Button>)}
                    </TableCell>
                  </TableRow>
                ))}
                <Dialog open={israting} onClose={handleClose} maxWidth="md">
                  <DialogTitle align="center"><h3>Rate Order</h3></DialogTitle>
                  <DialogContent>
                    <DialogContentText align="center">
                      <Rating name="Rating" value={rating} onChange={(event) => onChangeRating(event)} />
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button variant="contained" color="success" size="large" onClick={HandleRating}>SUBMIT RATING</Button>
                  </DialogActions>
                </Dialog>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default VendorOrders;
