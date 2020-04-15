var express = require("express");
var router = express.Router();
var Blog = require("../models/blogs");


//================
// BLOG  ROUTES 
//================

//INDEX ROUTE (SHOW ALL BLOG POSTS)

router.get("/", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log("ERROR");
        } else {
            res.render("blogs/index", { blogs: blogs });
        }
    });
});


// CREATE ROUTE (ADD NEW POST TO DATABASE )

router.post("/", isLoggedIn, function (req, res) {
    var title = req.body.title;
    var image = req.body.image;
    var body = req.body.body;
    author = {
        id: req.user._id,
        username: req.user.username
    }
    var newBlog = {
        title: title, image: image, body: body, author: author

    };
    Blog.create(newBlog, function (err, newlyblog) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    });
});


// NEW ROUTE (SHOW FORM TO ADD NEW BLOG POST)

router.get("/new", isLoggedIn, function (req, res) {
    res.render("blogs/new");
});


// SHOW ROUTE (SHOW MORE INFO ABOUT ONE BLOG POST)

router.get("/:id", function (req, res) {
    Blog.findById(req.params.id).populate("comments").exec(function (err, foundBlog) {
        if (err) {
            console.log(err);
        } else {
            res.render("blogs/show", { blog: foundBlog });
        }
    });
});


//EDIT ROUTE (SHOW FORM TO EDIT A PARTICULAR BLOG POST)

router.get("/:id/edit", isLoggedIn, function (req, res) {
    Blog.findById(req.params.id, function (err, editBlog) {
        if (err) {
            console.log(err);
        } else {
            res.render("blogs/edit", { blog: editBlog });
        }
    });
});


// UPDATE ROUTE (UPDATES A PARTICULAR BLOG)

router.put("/:id", isLoggedIn, function (req, res) {
    var id = req.params.id;
    Blog.findByIdAndUpdate(id, req.body.blog, function (err, foundBlog) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});


// DELETE ROUTE (DELETES A PARTICULAAR BLOG)

router.delete("/:id", isLoggedIn, function (req, res) {
    Blog.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Post Delete");
            res.redirect("/blogs");
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