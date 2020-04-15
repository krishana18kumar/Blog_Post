var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var seedDB = require("./seeds.js");

// MONGOOSE MODELS
var Blog = require("./models/blogs");
var Comment = require('./models/comment');
var User = require("./models/user");


// REQUIRING ROUTES FILES
var blogRoutes = require("./routes/blogs");
var commentRoutes = require("./routes/comments");
var authRoutes = require("./routes/auths");

//SEED THE DATABASE
// seedDB();

//app CONFIG
mongoose.connect("mongodb://localhost:27017/blog_post_v1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(require("express-session")({
  secret: "This is Krishan here",
  resave: false,
  saveUninitialized: false
}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});


// USING ROUTES
app.use("/blogs", blogRoutes);
app.use("/blogs/:id/comments", commentRoutes);
app.use("/", authRoutes);


app.listen(3000, function () {
  console.log("blog_post_Git_version server has started");
  console.log("Port:3000");

});
