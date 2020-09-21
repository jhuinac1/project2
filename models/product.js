const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        winery: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, min: 0, required: true, default: 0 },
        quantity: { type: Number, required: true, default: 0 },
        description: { type: String, },
        img: { type: String, },
        grapes: { type: String },
        region: String,
        country: String,
        ratings: Number,
        numberOfRatings: Number,
        type: String,
    },
    {
        timestamps: true,
    });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

