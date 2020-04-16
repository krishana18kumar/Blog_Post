var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


// ROOT ROUTE (Landing Route)
router.get("/", function (req, res) {
    res.render("landing page");
});


//=========================
// AUTHENTICATION ROUTES
//=========================

// REGISTER ROUTE (SHOW THE REGISTER FORM)

router.get("/register", function (req, res) {
    res.render("register");
});

// HANDLE SIGNUP/REGISTER LOGIC 

router.post("/register", function (req, res) {
    User.register(new User({ email: req.body.email, username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", " Welcome" + user.username + "Successfully Registered!");
            res.redirect("back");
        });
    });
});

//LOGIN ROUTES(SHOW FORM TO LOGIN)

router.get("/login", function (req, res) {
    res.render("login");
});

//HANDLE LOGIN LOGIC 

//app.post("/login", middleware, callback_function)
router.post("/login", passport.authenticate("local", {
    successRedirect: "/blogs",
    failureRedirect: "/login"
}), function (req, res) {
    req.flash("error", "Invalid Username Or Wrong Password Try Again!");
    req.flash("success", " Welcome Back " + user.username);

});


// LOGOUT ROUTE
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Successfully Logged Out, See You Soon!");
    res.redirect("/blogs");
});


module.exports = router;
