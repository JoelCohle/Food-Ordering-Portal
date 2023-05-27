var express = require("express");
var router = express.Router();

// Load User model
const Vendor = require("../models/Vendors");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    Vendor.find(function(err, vendors) {
		if (err) {
			console.log(err);
		} else {
			res.json(vendors);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newVendor = new Vendor({
        name: req.body.name,
        ShopName: req.body.ShopName,
        email: req.body.email,
        contactnumber: req.body.contactnumber,
        OpeningTime: req.body.OpeningTime,
        ClosingTime: req.body.ClosingTime,
        password: req.body.password
    });

    newVendor.save()
        .then(vendor => {
            res.status(200).json(vendor);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login
router.post("/login", (req, res) => {
	const email = req.body.email;
	// Find user by email
	Vendor.findOne({ email }).then(vendor => {
		// Check if user email exists
		if (!vendor) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            if (req.body.password == vendor.password){
                return res.status(200).json(vendor);
            }
            else {
                return res.status(401).json({
                    error: "Password is incorrect",
                });
            }
        }
	});
});

router.post("/update", (req, res) => {
	const email = req.body.oldemail;
	// Find user by email
	Vendor.findOne({ email }).then(vendor => {
        vendor.name = req.body.name;
        vendor.ShopName = req.body.ShopName
        vendor.email = req.body.email;
        vendor.contactnumber = req.body.contactnumber;
        vendor.OpeningTime = req.body.OpeningTime;
        vendor.ClosingTime = req.body.ClosingTime;
        vendor.password = req.body.password;
        vendor.save();
        return res.status(200).json(vendor);
	});
});


module.exports = router;

