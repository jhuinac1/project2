const express = require('express');
const Product = require("../models/product");
const productsRt = express.Router();
const seed = require("../models/seed");


////seed....
productsRt.get("/seed", (req, res) => {
    //drop database and changes.
    Product.deleteMany({}, () => { });
    //see the database.
    Product.create(seed, (error, data) => {
        res.redirect("/products");
    })
})


///show....
productsRt.get("/:id", (req, res) => {
    console.log(req.params.id);
    Product.findById(req.params.id, (error, foundProduct) => {
        console.log(foundProduct);
        res.render("show.ejs", {
            product: foundProduct,
        });
    });
});

////index......
productsRt.get("/", (req, res) => {
    Product.find({}, (eror, data) => {
        res.render("index.ejs",
            {
                products: data,
            })
    })
}
);



module.exports = productsRt;

