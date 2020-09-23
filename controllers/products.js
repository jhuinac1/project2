const express = require('express');
const Product = require("../models/product");
const productsRt = express.Router();
const seed = require("../models/seed");

const isAuthenticated = (req, res, next) => {
    let isAdmin;
    if (req.session.currentUser) {
        isAdmin = req.session.currentUser.isAdmin || false;
    };
    if (isAdmin) {
        return next();
    } else {
        res.redirect('/')
    }
}
////seed....
productsRt.get("/seed", (req, res) => {
    //drop database and changes.
    Product.deleteMany({}, () => { });
    //see the database.
    Product.create(seed, (error, data) => {
        res.redirect("/products");
    })
})
//////Deleting Data
productsRt.delete("/:id", isAuthenticated, (req, res) => {
    Product.findByIdAndRemove(req.params.id, (error, wineData) => {
        res.redirect("/products");
    });
});
////passing the item to edit and open
///in edit page
productsRt.get("/:id/edit", isAuthenticated, (req, res) => {
    Product.findById(req.params.id, (error, wineData) => {
        let isAdmin;
        if (req.session.currentUser) {
            isAdmin = req.session.currentUser.isAdmin || false;
        };

        res.render("edit.ejs", {
            editWine: wineData,
            user: req.session.currentUser,
            isAdmin: isAdmin,
        });
    });
});


// Buying Items
productsRt.get("/:id/buy", (req, res) => {
    console.log(req.params.id);
    if (req.session.currentUser) {
        Product.findByIdAndUpdate(req.params.id, { $inc: { quantity: -1 } }, (error, data) => {
            res.redirect("/products/" + req.params.id);
        });
    } else {
        res.render("sessions/loginUser.ejs");
    }
});
//////Now making changes to after edit
productsRt.put("/:id", (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, data) => {
        res.redirect("/products/" + req.params.id);
    });
});



////to the new page==========
productsRt.get("/new", isAuthenticated, (req, res) => {
    let isAdmin;
    if (req.session.currentUser) {
        isAdmin = req.session.currentUser.isAdmin || false;
    };
    res.render("new.ejs",
        {
            user: req.session.currentUser,
            isAdmin: isAdmin,
        });
});

///show....
productsRt.get("/:id", (req, res) => {
    console.log(req.params.id);
    Product.findById(req.params.id, (error, foundProduct) => {
        console.log(foundProduct);
        let isAdmin;
        if (req.session.currentUser) {
            isAdmin = req.session.currentUser.isAdmin || false;
        };
        res.render("show.ejs", {
            product: foundProduct,
            user: req.session.currentUser,
            isAdmin: isAdmin,
        });
    });
});

////index......
productsRt.get("/", (req, res) => {
    Product.find({}, (eror, data) => {
        let isAdmin;
        if (req.session.currentUser) {
            isAdmin = req.session.currentUser.isAdmin || false;
        }
        res.render("index.ejs",
            {
                products: data,
                user: req.session.currentUser,
                isAdmin: isAdmin,
            })
    })
}
);

///Creating the new item and
//redirecting it to home page
productsRt.post("/", (req, res) => {
    // res.send(req.body);
    Product.create(req.body, (error, newWine) => {
        res.redirect("/products");
    });
});



module.exports = productsRt;

