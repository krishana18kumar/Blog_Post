var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var Comment = require('./models/comment');
var Blog = require("./models/blogs");
var User = require("./models/user");
var seedDB = require("./seeds.js");


seedDB();

//app CONFIG
mongoose.connect("mongodb://localhost:27017/blog_post_v1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));



//ROUTES

//================
// BLOG  ROUTES 
//================


// ROOT ROUTE (Landing Route)

app.get("/", function (req, res) {
  res.render("landing page");
});


//INDEX ROUTE

app.get("/blogs", function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log("ERROR");
    } else {
      res.render("blogs/index", { blogs: blogs });
    }
  });
});

app.post("/blogs", function (req, res) {
  Blog.create(req.body.blog, function (err, newlyblog) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/blogs");
    }
  });
});


// NEW BLOG OR CREATE ROUTE

app.get("/blogs/new", function (req, res) {
  res.render("blogs/new");
});


// SHOW ROUTE

app.get("/blogs/:id", function (req, res) {
  Blog.findById(req.params.id).populate("comments").exec(function (err, foundBlog) {
    if (err) {
      console.log(err);
    } else {
      res.render("blogs/show", { blog: foundBlog });
    }
  });
});


//EDIT ROUTE

app.get("/blogs/:id/edit", function (req, res) {
  Blog.findById(req.params.id, function (err, editBlog) {
    if (err) {
      console.log(err);
    } else {
      res.render("blogs/edit", { blog: editBlog });
    }
  });
});


// UPDATE ROUTE

app.put("/blogs/:id", function (req, res) {
  var id = req.params.id;
  Blog.findByIdAndUpdate(id, req.body.blog, function (err, foundBlog) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});


// DELETE ROUTE

app.delete("/blogs/:id/", function (req, res) {
  Blog.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Post Delete");
      res.redirect("/blogs");
    }
  });
});

// =======================
// COMMENT ROUTES
// =======================


app.get("/blogs/:id/comments/new", function (req, res) {
  res.render("comments/new", { id: req.params.id });
});


app.post("/blogs/:id/comments", function (req, res) {
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

app.listen(3000, function () {
  console.log("blog_post server has started");
});
