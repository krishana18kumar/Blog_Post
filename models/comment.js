var mongoose = require("mongoose");


// MONGOOSE COMMENT MODEL
var commentSchema = new mongoose.Schema({
    text: String,
    author: String
});
module.exports = mongoose.model("Comment", commentSchema);
