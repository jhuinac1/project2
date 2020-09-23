const bcrypt = require('bcrypt');
const express = require('express');
const Admin = require("../models/admin");
const adminSessionRouter = express.Router();


// const admin = {
//     password: "extremo77",
//     username: "Johnny_1",
// }

// adminSessionRouter.get("/add-admin", (req, res) => {
//     admin.password = bcrypt.hashSync(admin.password, bcrypt.genSaltSync(10));
//     // res.send(admin);
//     Admin.create(admin, (error, data) => {
//         console.log(data);
//         res.redirect("/products");
//     }
//     )
// }
// )

adminSessionRouter.post("/", (req, res) => {


    Admin.findOne({ username: req.body.username }, (error, foundAdmin) => {
        if (error) {
            console.log(error);
        } else if (!foundAdmin) {
            res.send("<h1><a href='admin/log-in'> Accessed denied - No Match Found</a></h1>")
        } else {
            if (bcrypt.compareSync(req.body.password, foundAdmin.password)) {
                req.session.currentUser = foundAdmin;
                res.redirect("/products");
            } else {
                res.send("<h1><a href='admin/log-in'> Accessed denied - No Match Found </a></h1>")
            }
        }

    });
}
)
adminSessionRouter.get("/log-in", (req, res) => {
    res.render("sessions/admin1.ejs");
});

adminSessionRouter.delete("/", (req, res) => {
    req.session.destroy(
        () => {
            res.redirect("/");
        });
});



module.exports = adminSessionRouter;