var express = require("express");
var router = express.Router();

// Load User model
const Buyer = require("../models/Buyers");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    Buyer.find(function(err, buyers) {
		if (err) {
			console.log(err);
		} else {
			res.json(buyers);
		}
	})
});

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newBuyer = new Buyer({
        name: req.body.name,
        email: req.body.email,
        contactnumber: req.body.contactnumber,
        age: req.body.age,
        Batchname: req.body.Batchname,
        password: req.body.password
    });

    newBuyer.save()
        .then(buyer => {
            res.status(200).json(buyer);
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
	Buyer.findOne({ email }).then(buyer => {
		// Check if user email exists
		if (!buyer) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            if (req.body.password == buyer.password){
                return res.status(200).json(buyer);
                
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
	Buyer.findOne({ email }).then(buyer => {
        buyer.name = req.body.name;
        buyer.email = req.body.email;
        buyer.contactnumber = req.body.contactnumber;
        buyer.age = req.body.age;
        buyer.Batchname = req.body.Batchname;
        buyer.password = req.body.password;
        buyer.save();
        return res.status(200).json(buyer);
	});

});

router.post("/updatewallet", (req, res) => {
	const email = req.body.buyeremail;
	// Find user by email
	Buyer.findOne({ buyeremail: email }).then(buyer => {
        buyer.wallet = req.body.balance;
        buyer.save();
        return res.status(200).json(buyer);
	});

});

module.exports = router;

