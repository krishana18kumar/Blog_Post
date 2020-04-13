var mongoose = require("mongoose");


//MONGOOSE BLOG MODEL
var blogSchema = new mongoose.Schema({
    title: String,
    image: {
        type: String,
        default: "https://images.pexels.com/photos/3214958/pexels-photo-3214958.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    body: String,
    created: { type: Date, default: Date.now },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
module.exports = mongoose.model("Blog", blogSchema);