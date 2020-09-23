const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const User = require("../models/users");


////get the new user form 
users.get("/new", (req, res) => {
    res.render("sessions/newUser.ejs", {
        currentUser: req.session.currentUser,
    });
}
);

///creating a new user
users.post("/", (req, res) => {
    ///overwrite the password that the user entered
    //with the encrypted bcrypt password
    if (!req.body.username || !req.body.password) {
        res.send("<h1><a href='users/new'>You are missing a Field</a></h1>")
    }
    else {
        User.findOne({ username: req.body.username }, (error, foundUser) => {
            if (foundUser) {
                res.send("<h1><a href='users/new'>This username already exists</a></h1>")
            } else {
                req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                User.create(req.body, (err, createdUser) => {
                    console.log("user is created", createdUser);
                    res.redirect("/");
                });
            }
        })
    }
});



module.exports = users;