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
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/blogs");
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
});


// LOGOUT ROUTE
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/blogs");
});

// MIDDLEWARE  TO CHECK IS USER LOGGED IN 

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
