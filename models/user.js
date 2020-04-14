var mongoose = require("mongoose");

// MONGOOSE USER MODEL
var userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
});



module.exports = mongoose.model("User", userSchema);
