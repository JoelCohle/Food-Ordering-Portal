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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/Cancel";
import { InputAdornment, IconButton } from "@material-ui/core";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const VendorMenu = (props) => {
  const [fooditems, setFoodItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [addons, setAddons] = useState([]);
  const [OpenEdit, setOpenEdit] = useState(false);
  const [OpenAddItem, setOpenAddItem] = useState(false);
  const [edittags, setEdittags] = useState([]);
  const [editaddons, setEditaddons] = useState([]);

  const [name, setName] = useState("");
  const [oldname, setOldName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(null);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const Canteen = {
      canteen: JSON.parse(localStorage.getItem("User")).ShopName
    }

    axios
      .post("/api/fooditem", Canteen)
      .then((response) => {
        setFoodItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleItemUpdate = (item) => {
    const foodItem = {
      name: name,
      oldname: oldname,
      canteen: item.canteen,
      price: price,
      type: type,
      tags: edittags,
      addons: editaddons,
    }

    axios
      .post("/api/fooditem/updateitem", foodItem)
      .then((response) => {
        alert("Successfully updated food item");
        handleCloseEdit();
      })
      .catch((error) => {
        console.log(error)
        alert(error.response);
      })
  }

  const handleCloseDelete = (item) => {
    window.location.reload();
  }

  const handleItemDelete = (item) => {
    const foodItem = {
      name: item.name,
      canteen: item.canteen
    }

    axios
      .post("/api/fooditem/deleteitem", foodItem)
      .then((response) => {
        alert("Successfully deleted food item");
        handleCloseDelete();
      })
      .catch((error) => {
        console.log(error)
        alert(error.response);
      })
  }

  const onAddItem = () => {
    setOpenAddItem(true);
    setName("");
    setType("");
    setPrice("");
  }

  const handleAddItem = () => {
    const foodItem = {
      name: name,
      canteen: JSON.parse(localStorage.getItem("User")).ShopName,
      type: type,
      price: price,
      rating: 0,
      tags: tags,
      addons: addons,
    }

    console.log(foodItem);

    axios
      .post("/api/fooditem/additem", foodItem)
      .then((response) => {
        alert("Successfully added food item");
        handleCloseAdd();
      })
      .catch((error) => {
        console.log(error)
        alert(error.response);
      })
  }

  const onEdit = (item) => {
    setName(item.name);
    setOldName(item.name);
    setType(item.type);
    setPrice(item.price);
    setEdittags(item.tags);
    setEditaddons(item.addons);
    setOpenEdit(true);
  }

  const handleCloseAdd = () => {
    setOpenAddItem(false);
    window.location.reload();
  }

  const handleCloseEdit = () => {
    setOpenEdit(false);
    window.location.reload();
  }

  const onChangeName = (event) => {
    setName(event.target.value);
  }

  const onChangeType = (event) => {
    setType(event.target.value);
  }

  const onChangePrice = (event) => {
    setPrice(event.target.value);
  }

  const onChangeRating = (event) => {
    setRating(event.target.value);
  }

  const deleteTag = (i) => {
    const temptags = [...tags];
    temptags.splice(i, 1);
    setTags(temptags);
  }

  const resetTags = () => {
    setEdittags([]);
  }

  const onChangeTag = (event, i) => {
    if (i == tags.length - 1) {
      const temptags = [...tags];
      temptags[i] = event.target.value;
      setTags(temptags);
    }
  }

  const onChangeEdittag = (event, i) => {
    if (i == edittags.length - 1) {
      const temptags = [...edittags];
      temptags[i] = event.target.value;
      setEdittags(temptags);
    }
  }

  const addTag = () => {
    const temptags = [...tags];
    temptags.push("");
    setTags(temptags);
  }

  const addEdittag = () => {
    if (edittags[edittags.length - 1] != "") {
      const temptags = [...edittags];
      temptags.push("");
      setEdittags(temptags);
    }
  }

  const onChangeAddonName = (event, i) => {
    if (i == addons.length - 1) {
      const tempaddons = [...addons];
      tempaddons[i].name = event.target.value;
      setAddons(tempaddons);
    }
  }

  const onChangeAddonPrice = (event, i) => {
    if (i == addons.length - 1) {
      const tempaddons = [...addons];
      tempaddons[i].price = event.target.value;
      setAddons(tempaddons);
    }
  }

  const onChangeEditAddonName = (event, i) => {
    if (i == editaddons.length - 1) {
      const tempaddons = [...editaddons];
      tempaddons[i].name = event.target.value;
      setEditaddons(tempaddons);
    }
  }

  const onChangeEditAddonPrice = (event, i) => {
    if (i == editaddons.length - 1) {
      const tempaddons = [...editaddons];
      tempaddons[i].price = event.target.value;
      setEditaddons(tempaddons);
    }
  }

  const deleteAddon = (i) => {
    const tempaddons = [...addons];
    tempaddons.splice(i, 1);
    setAddons(tempaddons);
  }

  const resetAddons = () => {
    setEditaddons([]);
  }

  const addAddon = () => {
    const tempaddons = [...addons];
    tempaddons.push({
      name: "",
      price: ""
    });
    setAddons(tempaddons);
  }

  const addEditaddon = () => {
    if (editaddons[editaddons.length - 1].name != "") {
      const tempaddons = [...editaddons];
      tempaddons.push({
        name: "",
        price: ""
      });
      setEditaddons(tempaddons);
    }
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <h1 align="center">Menu</h1>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="success" size="large" style={{ "margin-bottom": "10px", backgroundColor: "yellowgreen" }} onClick={onAddItem}>
            Add Item
          </Button>
        </Grid>
        <Dialog open={OpenAddItem} onClose={handleCloseAdd} maxWidth="md">
          <Grid container justifyContent="center" align={"center"} spacing={1}>
            <Grid item xs={6}>
              <DialogTitle><h3>Add Food Item</h3></DialogTitle>
              <DialogContent>
                <Grid container justifyContent="center" align={"center"} spacing={1}>
                  <Grid xs={12}>
                    <TextField id="name" label="Name" variant="outlined" style={{ "margin-top": "10px" }} value={name} onChange={onChangeName} />
                  </Grid>
                  <Grid xs={12}>
                    <FormControl style={{ width: 230, "margin-top": "10px" }}>
                      <InputLabel>Type</InputLabel>
                      <Select value={type} onChange={onChangeType} autoWidth label="Type" >
                        <MenuItem value={"Veg"}>Veg</MenuItem>
                        <MenuItem value={"Non-Veg"}>Non-Veg</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={12}>
                    <TextField id="name" label="Price" type="number" InputProps={{ inputProps: { min: 0, max:100 } }} variant="outlined" style={{ "margin-top": "10px" }} value={price} onChange={onChangePrice} />
                  </Grid>
                  <Grid xs={12}><h3>Add Tags</h3></Grid>
                  {tags.map((tag, i) => (
                    <Grid container justifyContent="center" align={"center"} spacing={0}>
                      <Grid xs={6}>
                        <TextField
                          autoFocus
                          margin="dense"
                          label={"Tag " + (i + 1)}
                          fullWidth
                          variant="outlined"
                          value={tags[i]}
                          onChange={(event) => onChangeTag(event, i)}
                        />
                      </Grid>
                      <Grid xs={6} sx={{ mt: "15px" }}>
                        {i != tags.length - 1 && (<Button variant="outlined" color="error" onClick={() => deleteTag(i)}>Remove</Button>)}
                        {(i == tags.length - 1 && tags[tags.length - 1] != "") && (<Button variant="outlined" onClick={addTag}>Add Tag</Button>)}
                      </Grid>
                    </Grid>
                  ))}
                  <Grid xs={12}>
                    {tags.length == 0 && (<Button variant="contained" onClick={addTag}>Add Tag</Button>)}
                  </Grid>
                  <Grid xs={12} sx={{ mb: "0" }}><h3>Add Add-ons</h3></Grid>
                  {addons.map((addon, i) => (
                    <Grid container justifyContent="center" align={"center"}>
                      <Grid item xs={12} style={{ height: 50 }}>
                        <h5>Add-on {i + 1}</h5>
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          autoFocus
                          margin="dense"
                          label={"Name"}
                          fullWidth
                          variant="outlined"
                          value={addons[i].name}
                          style={{ width: 160 }}
                          onChange={(event) => onChangeAddonName(event, i)}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          autoFocus
                          margin="dense"
                          label={"Price (in Rs)"}
                          type="number"
                          InputProps={{ inputProps: { min: 0, max: 100 } }}
                          fullWidth
                          variant="outlined"
                          value={addons[i].price}
                          style={{ width: 160 }}
                          onChange={(event) => onChangeAddonPrice(event, i)}
                        />
                      </Grid>
                      <Grid xs={2} sx={{ mt: "5px" }}>
                        {i != addons.length - 1 && (<Button variant="outlined" color="error" onClick={() => deleteAddon(i)}>Remove</Button>)}
                        {i == addons.length - 1 && addons[addons.length - 1].name != "" && (<Button variant="outlined" onClick={addAddon}>Add Item</Button>)}
                      </Grid>

                    </Grid>
                  ))}
                </Grid>
                <Grid>
                  {addons.length == 0 && (<Button variant="contained" onClick={addAddon}>Add Item</Button>)}
                </Grid>
              </DialogContent>
              <DialogActions>
                <Grid container justifyContent="center" align={"center"}>
                  <Grid item xs={6}><Button variant="contained" color="error" size="large" align="left" onClick={handleCloseAdd}>Cancel</Button></Grid>
                  <Grid item xs={6}><Button variant="contained" color="success" size="large" onClick={handleAddItem}>Add</Button></Grid>
                </ Grid>
              </DialogActions>
            </ Grid>
          </ Grid>
        </Dialog>




        <Grid item xs={12}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center" width={50} style={{ fontWeight: "bold" }}>Sr No</TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>Type</TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>Price</TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>Rating</TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>Tags</TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>Add-ons</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fooditems.map((item, ind) => (
                  <TableRow key={ind}>
                    <TableCell align="center">{ind + 1}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
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
                      <Button variant="contained" style={{ "margin-right": "10px", backgroundColor: "yellowgreen" }} onClick={() => onEdit(item)}>
                        Edit
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleItemDelete(item)}>
                        Delete
                      </Button>
                    </TableCell>
                    <Dialog open={OpenEdit} onClose={handleCloseEdit} maxWidth="sm">
                      <DialogTitle><h2 align="center">Edit Food Item</h2></DialogTitle>
                      <DialogContent>
                        <Grid container justifyContent="center" align={"center"} spacing={1}>
                          <Grid xs={12}>
                            <TextField id="name" label="Name" variant="outlined" style={{ "margin-top": "10px" }} value={name} onChange={onChangeName} />
                          </Grid>
                          <Grid xs={12}>
                            <FormControl style={{ width: 230, "margin-top": "10px" }}>
                              <InputLabel>Type</InputLabel>
                              <Select value={type} onChange={onChangeType} autoWidth label="Type" >
                                <MenuItem value={"Veg"}>Veg</MenuItem>
                                <MenuItem value={"Non-Veg"}>Non-Veg</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid xs={12}>
                            <TextField id="name" type="number" InputProps={{ inputProps: { min: 0, max:100 } }} label="Price" variant="outlined" style={{ "margin-top": "10px" }} value={price} onChange={onChangePrice} />
                          </Grid>
                          <Grid xs={12}><h3>Edit Tags</h3></Grid>
                          {edittags.map((tag, i) => (
                            <Grid container justifyContent="center" align={"center"} spacing={0}>
                              <Grid xs={12}><TextField
                                autoFocus
                                margin="dense"
                                label={"Tag " + (i + 1)}
                                fullWidth
                                variant="outlined"
                                value={edittags[i]}
                                onChange={(event) => onChangeEdittag(event, i)}
                              />
                              </Grid>
                            </Grid>
                          ))}
                          <Grid xs={6} sx={{ mt: "15px" }}>
                            <Button variant="outlined" color="error" onClick={resetTags}>Reset</Button>
                          </Grid>
                          <Grid xs={6} sx={{ mt: "15px" }}>
                            {(edittags.length == 0 || edittags[edittags.length - 1].name != "") && (<Button variant="contained" onClick={addEdittag}>Add Tag</Button>)}
                          </Grid>
                          <Grid xs={12} sx={{ mb: "0" }}><h3>Edit Add-ons</h3></Grid>
                          {editaddons.map((addon, i) => (
                            <Grid container justifyContent="center" align={"center"}>
                              <Grid item xs={12} style={{ height: 50 }}>
                                <h5>Add-on {i + 1}</h5>
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  label={"Name"}
                                  fullWidth
                                  variant="outlined"
                                  value={editaddons[i].name}
                                  style={{ width: 190 }}
                                  onChange={(event) => onChangeEditAddonName(event, i)}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  label={"Price (in Rs)"}
                                  fullWidth
                                  variant="outlined"
                                  value={editaddons[i].price}
                                  style={{ width: 190 }}
                                  onChange={(event) => onChangeEditAddonPrice(event, i)}
                                />
                              </Grid>
                            </Grid>
                          ))}
                          <Grid xs={6} sx={{ mt: "5px" }}>
                            <Button variant="outlined" color="error" onClick={resetAddons}>Reset Addons</Button>
                          </Grid>
                          <Grid xs={6} sx={{ mt: "5px" }}>
                            {(<Button variant="outlined" onClick={addEditaddon}>Add Item</Button>)}
                          </Grid>
                        </Grid>



                      </DialogContent>
                      <DialogActions>
                        <Grid container justifyContent="center" align={"center"} spacing={1}>
                        <Grid item xs="2"></Grid>
                          <Grid item xs="4">
                        <Button variant="contained" color="error" size="large" onClick={handleCloseEdit}>Cancel</Button>
                        </Grid> 
                        <Grid item xs="4">
                        <Button variant="contained" color="success" size="large" onClick={() => handleItemUpdate(item)}>Update</Button>
                        </Grid>
                        <Grid item xs="2"></Grid>
                        </Grid>
                      </DialogActions>
                    </Dialog>
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