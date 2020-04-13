var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");


//app CONFIG
mongoose.connect("mongodb://localhost:27017/blog_post", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));




//MONGOOSE MODEL
var blogSchema = new mongoose.Schema({
  title: String,
  image: {
    type: String,
    default: "https://images.pexels.com/photos/3214958/pexels-photo-3214958.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  },
  body: String,
  created: { type: Date, default: Date.now },
});

var Blog = mongoose.model("Blog", blogSchema);


//ROUTES

// ROOT ROUTE (NOT REQUIRED)
app.get("/", function (req, res) {
  res.render("landing page");
});


//INDEX ROUTE
app.get("/blogs", function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log("ERROR");
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

app.post("/blogs", function (req, res) {
  // var title = req.body.title;
  // var body = req.body.body;
  // var image = req.body.image;
  // var newblog = { title: title, body: body, image: image }
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
  res.render("newblog");
});


// SHOW ROUTE
app.get("/blogs/:id", function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});


//EDIT ROUTE
app.get("/blogs/:id/edit", function (req, res) {
  Blog.findById(req.params.id, function (err, editBlog) {
    if (err) {
      console.log(err);
    } else {
      res.render("edit", { blog: editBlog });
    }
  });
});


// UPDATE ROUTE
app.put("/blogs/:id", function (req, res) {
  var id = req.params.id;
  // var title = req.body.title;
  // var body = req.body.body;
  // var image = req.body.image;
  // // var date = { type: Date, default: Date.now };
  // var newData = {
  //   title: title,
  //   image: image,
  //   body: body,
  // };
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


app.listen(3000, function () {
  console.log("blog_post server has started");
});
