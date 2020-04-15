var mongoose = require("mongoose");


// MONGOOSE COMMENT MODEL
var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});
module.exports = mongoose.model("Comment", commentSchema);
