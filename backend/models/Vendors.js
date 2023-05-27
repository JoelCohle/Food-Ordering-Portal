const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	ShopName: {
		type: String,
		required: true,
        unique: true
	},
	email:{
		type: String,
		required: true,
        unique: true
	},
    contactnumber:{
		type: Number,
		required: true
	},
    OpeningTime: {
		type: String,
		required: true
	},
    ClosingTime: {
		type: String,
		required: true
	},
    password: {
        type: String,
        required: true
    }
});

module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
