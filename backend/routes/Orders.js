var express = require("express");
var router = express.Router();

// Load User model
const Order = require("../models/Orders");

// GET request 
// Getting all the users
router.post("/vendororders", (req, res) => {
    const name = req.body.shopname;
    
    Order.find({ vendorname:name }).then(orders => {
        res.status(200).json(orders);
    })
});

router.post("/", (req, res) => {
    const email = req.body.buyeremail;
    
    Order.find({ buyeremail:email }).then(orders => {
        res.status(200).json(orders);
    })
});

// POST request 
// Add a ORDER to db
router.post("/placeorder", (req, res) => {
    const newOrder = new Order({
		buyeremail: req.body.buyeremail,
        foodname: req.body.foodname,
        quantity: req.body.quantity,
        addons: req.body.addons,
        placedtime: req.body.placedtime,
		vendorname: req.body.vendorname,
		cost: req.body.cost,
		status: req.body.status,
    });

    console.log(newOrder);
    newOrder.save()
        .then(order => {
            res.status(200).json(order);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/changestage", (req, res) => {
	const email = req.body.buyeremail;
	const time = req.body.placedtime;
	// Find user by email
	Order.findOne({ buyeremail: email, placedtime: time }).then(order => {
        order.status = req.body.status;
        order.save();
        return res.status(200).json(order);
	})
	.catch(error => {
		return res.send("error");
	});

});

router.post("/submitrating", (req, res) => {
	const email = req.body.buyeremail;
	const time = req.body.placedtime;
	// Find user by email
	Order.findOne({ buyeremail: email, placedtime: time }).then(order => {
        order.rating = req.body.rating;
        order.save();
        return res.status(200).json(order);
	})
	.catch(error => {
		return res.send("error");
	});

});


module.exports = router;
