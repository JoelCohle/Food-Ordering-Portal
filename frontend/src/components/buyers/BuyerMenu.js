import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import { Dialog, DialogContentText, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { InputAdornment, IconButton } from "@material-ui/core";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Fuse from 'fuse.js';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ListItem, List, ListSubheader } from "@mui/material";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Checkbox } from "@mui/material";
import { typography } from "@mui/system";


const VendorMenu = (props) => {
  const [wallet, setWallet] = useState(0);
  const [fooditems, setFoodItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [addons, setAddons] = useState([]);
  const [tagslist, setTaglist] = useState([]);
  const [shoplist, setShoplist] = useState([]);

  const [foodtype, setFoodtype] = useState("");
  const [filtertag, setFiltertag] = useState("");
  const [filtercanteen, setFiltercanteen] = useState("");
  const [slidervalue, setSliderValue] = useState([0, 100]);

  const [query, updateQuery] = useState('');
  const [foodresults, setFoodresults] = useState([]);
  const [sortprice, setSortprice] = useState(true);
  const [sortrating, setSortrating] = useState(true);
  const [open, setOpen] = useState(false);
  const [orderaddons, setOrderaddons] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalprice, setTotalprice] = useState(0);
  const [orderedfood, setOrderedfood] = useState("");
  const [ordercanteen, setOrdercanteen] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    setWallet(JSON.parse(localStorage.getItem("User")).wallet);
    axios
      .get("/api/fooditem")
      .then((response) => {
        setFoodItems(response.data);
        const fuse = new Fuse(response.data, {
          keys: ['name']
        });

        const results = fuse.search(query);
        let List = query ? results.map(fooditem => fooditem.item) : response.data;

        let temptags = [];
        for (let i = 0; i < response.data.length; i++) {
          for (let j = 0; j < response.data[i].tags.length; j++) {
            let flag = false;
            for (let k = 0; k < temptags.length; k++) {
              if (temptags[k] === response.data[i].tags[j]) {
                flag = true;
                break;
              }
            }
            if (flag === false && response.data[i].tags[j] != "")
              temptags.push(response.data[i].tags[j]);
          }
        }

        let tempcanteens = []
        for (let i = 0; i < response.data.length; i++) {
          let flag = false;
          for (let k = 0; k < tempcanteens.length; k++) {
            if (tempcanteens[k] === response.data[i].canteen) {
              flag = true;
              break;
            }
          }
          if (flag === false)
            tempcanteens.push(response.data[i].canteen);
        }
        console.log(tempcanteens);
        setShoplist(tempcanteens);
        setTaglist(temptags);

        if (foodtype !== "") {
          let tempfooditems = [];
          for (let i = 0; i < List.length; i++) {
            if (foodtype === List[i].type) {
              tempfooditems.push(List[i]);
            }
          }
          List = tempfooditems;
        }
        if (filtertag !== "") {
          let tempfooditems = [];
          for (let i = 0; i < List.length; i++) {
            for (let j = 0; j < List.length; j++) {
              if (filtertag !== "" && filtertag === List[i].tags[j]) {
                tempfooditems.push(List[i]);
              }
            }
          }
          List = tempfooditems;
        }
        if (filtercanteen !== "") {
          let tempfooditems = [];
          for (let i = 0; i < List.length; i++) {
            if (filtercanteen !== "" && filtercanteen === List[i].canteen) {
              tempfooditems.push(List[i]);
            }
          }
          List = tempfooditems;
        }
        let tempfooditems = [];
        for (let i = 0; i < List.length; i++) {
          if (slidervalue[0] < List[i].price && slidervalue[1] > List[i].price) {
            tempfooditems.push(List[i]);
          }
        }
        console.log(List);
        console.log(tempfooditems);
        setFoodresults(tempfooditems);

      })
      .catch((error) => {
        console.log(error);
      });

  }, [query, foodtype, slidervalue, filtertag, filtercanteen]);

  const onChangefoodtype = (event) => {
    setFoodtype(event.target.value);
  }

  const onChangetag = (event) => {
    setFiltertag(event.target.value);
  }

  const onChangecanteen = (event) => {
    setFiltercanteen(event.target.value);
  }

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const handleClickOpen = (itemname, itemcanteen, itemaddons, itemprice) => {
    setOrderaddons(itemaddons);
    setTotalprice(itemprice);
    setOrdercanteen(itemcanteen);
    setOrderedfood(itemname);
    setOpen(true);
  };

  const onChangequantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setOrderaddons([]);
    setAddons([]);
  };

  const handleOrder = () => {
    if (wallet < quantity * parseInt(totalprice)) {
      alert("Insufficient funds for purchase");
    }
    else {
      let now = new Date();
      const Order = {
        buyeremail: JSON.parse(localStorage.getItem("User")).email,
        foodname: orderedfood,
        quantity: quantity,
        addons: addons,
        placedtime: now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(),
        vendorname: ordercanteen,
        cost: quantity * parseInt(totalprice),
        status: "Placed"
      };
      console.log(Order);

      const Wallet = {
        buyeremail: JSON.parse(localStorage.getItem("User")).buyeremail,
        balance: parseInt(wallet) - parseInt(totalprice) * quantity
      }
      axios
        .post("/api/order/placeorder", Order)
        .then((response) => {
          console.log(response);
          axios
            .post("/api/buyer/updatewallet", Wallet)
            .then((response) => {
              let user = JSON.parse(localStorage.getItem("User"));
              user.wallet = parseInt(user.wallet) - parseInt(totalprice) * quantity;
              localStorage.setItem("User", JSON.stringify(user));
            })
            .catch((error) => {
              console.log(error);
            });
          alert("Order successfully placed!");
          setOpen(false);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
      
      }

  };

  const addAddon = (event, addon) => {
    if (event.target.checked) {
      setTotalprice(totalprice + parseInt(addon.price));
      let temp = addons;
      temp.push(addon);
      setAddons(temp);
    }
    else {
      setTotalprice(totalprice - parseInt(addon.price));
      let temp = addons;
      let index = 0;
      for (; temp[index] != undefined; index++)
        if (temp[index].name == addon.name && temp[index].price == addon.price)
          break;
      setAddons(temp.splice(index, 1));
    }
    console.log(addons);
  }


  const sortpriceChange = () => {
    let foodTemp = foodresults;
    const flag = sortprice;
    foodTemp.sort((a, b) => (1 - flag * 2) * (b.price - a.price));
    setFoodresults(foodTemp);
    setSortprice(!sortprice);
  };

  const sortratingChange = () => {
    let foodTemp = foodresults;
    const flag = sortrating;
    foodTemp.sort((a, b) => (1 - flag * 2) * (b.rating - a.rating));
    setFoodresults(foodTemp);
    setSortrating(!sortrating);
  };

  function onSearch({ currentTarget }) {
    updateQuery(currentTarget.value);
  }

  function valuetext(value) {
    return `${value}°C`;
  }


  return (
    <div>
      <Grid container justifyContent="center" align={"center"} spacing={1}>
        <Grid item xs={12}>
          <h1 align="center">Food Menu</h1>
        </Grid>
        <Grid item xs={12} sx={{ mb: 5 }}>
          <TextField variant="outlined" style={{ width: "75%" }} label="Search" value={query} onChange={onSearch} InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }} />
        </Grid>

        <Grid item xs={2}>
          <List style={{ width: 200 }}>
            <ListSubheader style={{ fontWeight: "bold", backgroundColor: "#E5E5E5", color: "#252525" }}>
              FILTERS
            </ListSubheader>
            <ListItem style={{ color: "#252525" }} disablePadding>
              <FormControl sx={{ m: 1, minWidth: 230 }}>
                <InputLabel id="foodtype">type</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  value={foodtype}
                  label="type"
                  onChange={onChangefoodtype}
                  style={{ width: 180 }}
                >
                  <MenuItem value={"Veg"}>Veg</MenuItem>
                  <MenuItem value={"Non-Veg"}>Non-Veg</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
            <ListItem style={{ color: "#252525" }} disablePadding>
              <FormControl sx={{ m: 1, minWidth: 230 }}>
                <InputLabel id="tag">Tags</InputLabel>
                <Select
                  labelId="tag"
                  id="tag"
                  value={filtertag}
                  label="Tag"
                  onChange={onChangetag}
                  style={{ width: 180 }}
                >
                  {tagslist.map((tag) => (
                    <MenuItem value={tag}>{tag}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
            <ListItem style={{ color: "#252525" }} disablePadding>
              <FormControl sx={{ m: 1, minWidth: 230 }}>
                <InputLabel id="Canteen">Canteen</InputLabel>
                <Select
                  labelId="canteen"
                  id="canteen"
                  value={filtercanteen}
                  label="canteen"
                  onChange={onChangecanteen}
                  style={{ width: 180 }}
                >
                  {shoplist.map((shop) => (
                    <MenuItem value={shop}>{shop}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
            <ListItem style={{ color: "#252525" }} disablePadding>
              Min & Max Price
            </ListItem>
            <ListItem style={{ color: "#252525" }} disablePadding>
              <Box sx={{ width: 200 }}>
                <Slider
                  getAriaLabel={() => 'Temperature range'}
                  value={slidervalue}
                  onChange={handleSliderChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                />
              </Box>
            </ListItem>
          </List>
        </Grid>


        <Grid item xs={8}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center" width={50} style={{ fontWeight: "bold" }}>Sr No</TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>Canteen</TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>Type</TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold", width: 110 }}>Price <Button onClick={sortpriceChange}> {sortprice ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />} </Button></TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold", width: 120 }}>Rating  <Button onClick={sortratingChange}> {sortrating ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />} </Button></TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>Tags</TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>Add-ons</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {foodresults.map((item, ind) => (
                  <TableRow key={ind}>
                    <TableCell align="center">{ind + 1}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.canteen}</TableCell>
                    <TableCell align="center">{item.type}</TableCell>
                    <TableCell align="center">Rs. {item.price}</TableCell>
                    <TableCell align="center">{item.rating}</TableCell>
                    <TableCell align="center">
                      {item.tags.map((tag) => (
                        <Grid>{tag}</Grid>
                      ))}
                    </TableCell>
                    <TableCell align="center">
                      {item.addons.map((addon) => (
                        <Grid>{addon.name}</Grid>
                      ))}
                    </TableCell>
                    <TableCell align="right" width={200}>
                      <Button variant="contained" style={{ "margin-right": "10px", backgroundColor: "yellowgreen" }} onClick={() => handleClickOpen(item.name, item.canteen, item.addons, item.price)}>
                        Place Order
                      </Button>
                      <Dialog open={open} onClose={handleClose} maxWidth="md">
                        <DialogTitle align="center"><h3>Place Order</h3></DialogTitle>
                        <DialogContent>
                          <DialogContentText align="center">
                            Select Quantity
                          </DialogContentText>
                          <DialogContentText align="center">
                            <TextField margin="dense" label="Quantity" type="number" InputProps={{inputProps: { min: 1}}} style={{ width: 200 }} onChange={onChangequantity} />
                          </DialogContentText>
                          <DialogContentText align="center">
                            Select Addons
                            {orderaddons.map((addon) => (
                              <Grid container justifyContent="center" align={"center"} spacing={1}>
                                {addon.name !== "" && (<Grid item xs={2}> <TextField InputProps={{ readOnly: true, }} defaultValue={"Rs. " + addon.price} /> </Grid>)}
                                {addon.name !== "" && (<Grid item xs={6}> <TextField InputProps={{ readOnly: true, }} defaultValue={addon.name} /> </Grid>)}
                                {addon.name !== "" && (<Grid item xs={2}> <Checkbox aria-label="controlled" onChange={(event) => addAddon(event, addon)} /></Grid>)}
                              </Grid>
                            ))}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Grid container justifyContent="center" align={"center"}>
                            <Grid><Button variant="contained" color="success" size="large" onClick={handleOrder}>Place Order</Button></Grid>
                          </Grid>
                        </DialogActions>
                      </Dialog>
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

export default VendorMenu;