var Blog = require("../models/blogs");
var Comment = require("../models/comment");

var middlewareObj = {};


// MIDDLEWARE TO CHECK DOES THE BLOG BELONG TO THE USER OR NOT 

middlewareObj.checkBlogAuthorization = function (req, res, next) {
    if (req.isAuthenticated()) {
        Blog.findById(req.params.id, function (err, foundBlog) {
            if (err) {
                req.flash("error", "Blog not found");
                res.redirect("back");
            } else {
                if (foundBlog.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You Don't Have Permission To Do That");
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "you need to be logged in first !");
        res.redirect("back");
    }
}

// MIDDLEWARE TO CHECK DOES THE COMMENT BELONG TO THE USER OR NOT 

middlewareObj.checkCommnentAuthorization = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                req.flash("error", "Comment Not Found")
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You Don't Have Permission To Do That");
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "Please Login/SignUp First !");
        res.redirect("back");
    }
}


// MIDDLEWARE  TO CHECK IS USER LOGGED IN


middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login/SignUp First !");
    res.redirect("/login");
}

module.exports = middlewareObj;