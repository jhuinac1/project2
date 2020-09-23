const bcrypt = require("bcrypt");
const express = require('express');
const sessions = express.Router();
const User = require("../models/users");

sessions.get("/new", (req, res) => {
    res.render("sessions/logInUser.ejs", {
        currentUser: req.session.currentUser,
    });
});

sessions.post("/", (req, res) => {
    User.findOne(
        { username: req.body.username },
        (error, foundUser) => {
            //check for matching login and password
            if (error) {
                console.log(error);
                res.send("there is a problem in the db");
            } else if (!foundUser) {
                res.send("<a href='/sessions/new'>Sorry! no user found </a>");
            } else {
                if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                    req.session.currentUser = foundUser;
                    res.redirect("/");
                } else {
                    res.send("<a href='/sessions/new'> Sorry! password did not match </a>");
                }
            }
        },
    );
});

sessions.delete("/", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    })
}
)

module.exports = sessions;


