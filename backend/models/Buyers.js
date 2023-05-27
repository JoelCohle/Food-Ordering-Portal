const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
        unique: true
	},
	contactnumber:{
		type: Number,
		required: true
	},
    age: {
		type: Number,
		required: true
	},
	Batchname:{
		type: String,
		required: true
	},
	wallet:{
		type: Number,
		required: false,
		default: 0
	},
    password: {
        type: String,
        required: true
    }
});

module.exports = Buyer = mongoose.model("Buyers", BuyerSchema);
