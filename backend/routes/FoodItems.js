var express = require("express");
var router = express.Router();

const FoodItem = require("../models/FoodItems");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    FoodItem.find(function(err, fooditems) {
		if (err) {
			console.log(err);
		} else {
			res.json(fooditems);
		}
	})
});

router.post("/updaterating", (req,res) => {
    const name = req.body.name;
    const canteen = req.body.canteen;
    const rating = req.body.rating;
    
    FoodItem.findOne({ name: name, canteen: canteen })
    .then(fooditem => {
        if(fooditem.rating == undefined)
            fooditem.rating = 0;

        if(fooditem.ordercount == undefined)
            fooditem.ordercount = 0;
        
        fooditem.rating = ((fooditem.rating * fooditem.ordercount) + parseInt(rating)) / (parseInt(fooditem.ordercount) + 1);
        fooditem.ordercount = parseInt(fooditem.ordercount) + 1;
        fooditem.save();
        return res.status(200).send(fooditem);
    })
    .catch(err => {
        res.status(400).send(err);
    });

});

router.post("/", function(req, res) {
    const canteen = req.body.canteen;
    
    FoodItem.find({ canteen }).then(fooditems => {
        res.status(200).json(fooditems);
    })
});

router.post("/additem", (req, res) => {
    const newFoodItem = new FoodItem({
        name: req.body.name,
        canteen: req.body.canteen,
        price: req.body.price,
        rating: req.body.rating,
        type: req.body.type,
        tags: req.body.tags,
        addons: req.body.addons
    });

    newFoodItem.save()
        .then(fooditem => {
            res.status(200).json(fooditem);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/updateitem", (req,res) => {
    const name = req.body.oldname;
    const canteen = req.body.canteen;

    FoodItem.findOne({ name, canteen }).then(fooditem => {
        fooditem.name = req.body.name;
        fooditem.type = req.body.type;
        fooditem.price = req.body.price;
        fooditem.tags = req.body.tags;
        fooditem.addons = req.body.addons;
        fooditem.save();
        return res.status(200).json({
            message: "Successfully updated food item"    
        })
        .catch(err => {
            res.status(400).send(err);
        })
    });
});

router.post("/deleteitem", (req,res) => {
    const name = req.body.name;
    const canteen = req.body.canteen;

    FoodItem.findOneAndDelete({ name, canteen }, function(err, docs){
        return res.status(200).json({
            message: "Successfully deleted"
        })
    });
});

module.exports = router;