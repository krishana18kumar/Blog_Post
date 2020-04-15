var express = require("express");
var router = express.Router({ mergeParams: true });
var Blog = require("../models/blogs");
var Comment = require('../models/comment');


// =======================
// COMMENT ROUTES
// =======================

// NEW COMMENTS ROUTE (SHOWS FORM TO ADD NEW COMMENT)
router.get("/new", isLoggedIn, function (req, res) {
    res.render("comments/new", { id: req.params.id });
});

// CREATE COMMENTS ROUTE (ADD NEW COMMENT TO A PARTICULAR POST)
router.post("/", isLoggedIn, function (req, res) {
    Blog.findById(req.params.id, function (err, blog) {
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    blog.comments.push(comment);
                    blog.save();
                    res.redirect("/blogs/" + req.params.id);
                }
            });
        }
    });
});


// MIDDLEWARE  TO CHECK IS USER LOGGED IN 

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;