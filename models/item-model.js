const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemName: String,
    headline: String,
    description: String,
    category: String,
    postcode: String,
    firstName: String,
    lastName: String,
    phone: Number,
    address: String,
    email: String,
    privacy: String,
    image: String,
    delivery: Boolean,
    published: Boolean
},
{
    timestamps: true
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;