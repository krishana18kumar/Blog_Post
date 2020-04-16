var express = require("express");
var router = express.Router({ mergeParams: true });
var Blog = require("../models/blogs");
var Comment = require('../models/comment');
var middleware = require("../middleware/index");


// =======================
// COMMENT ROUTES
// =======================

// NEW COMMENTS ROUTE (SHOWS FORM TO ADD NEW COMMENT)
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("comments/new", { id: req.params.id });
});

// CREATE COMMENTS ROUTE (ADD NEW COMMENT TO A PARTICULAR POST)
router.post("/", middleware.isLoggedIn, function (req, res) {
    Blog.findById(req.params.id, function (err, blog) {
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    //add username d to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    blog.comments.push(comment);
                    blog.save();
                    res.redirect("/blogs/" + req.params.id);
                }
            });
        }
    });
});


// EDIT ROUTE (SHOW FORM TO EDIT A PARTICULAR COMMENT)
router.get("/:comment_id/edit", middleware.checkCommnentAuthorization, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/edit", { blog_id: req.params.id, comment: foundComment });
        }
    });
});

// UPDATE COMMENT (UPDATES A PARTICULAR COMMENT)
router.put("/:comment_id", middleware.checkCommnentAuthorization, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DELETE  ROUTE (DELTES A PARTICULAR COMMENT)
router.delete("/:comment_id", middleware.checkCommnentAuthorization, function (req, res) {
    Comment.findByIdAndDelete(req.params.comment_id, function (err) {
        if (err) {
            console.log("cannot delete" + err);
        } else {
            console.log("comment Deleted");
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

module.exports = router;