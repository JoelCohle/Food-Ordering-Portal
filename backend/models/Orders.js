const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
	buyeremail: {
		type: String,
		required: true,
	},
	foodname: {
		type: String,
		required: true
	},
	vendorname: {
		type: String,
		required: true
	},
	cost: {
		type: Number,
		required: true
	},
	quantity:{
		type: Number,
		required: false,
		default: 1,
	},
    placedtime: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: false,
		default: 0,
	},
	addons: {
		type: [Object],
		required: false,
		default: [],
	},
});

OrderSchema.index({buyeremail: 1, placedtime: 1}, {unique: true});
module.exports = Order = mongoose.model("Orders", OrderSchema);
