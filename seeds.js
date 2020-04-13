var mongoode = require("mongoose");
var Blog = require("./models/blogs");
var Comment = require("./models/comment");

data = [
    {
        image: "https://images.pexels.com/photos/3214958/pexels-photo-3214958.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        title: "Camp light !!!!!",
        body: "An awesome scenario of lights. Light up your camping adventure! Our large range of outdoor and campsite lighting solutions includes gas lanterns, dual fuel lanterns, battery."
    },
    {
        image: "https://images.unsplash.com/photo-1586161659865-2ce93be6b95c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        title: "A Bunch of Beautiful Flowers!!",
        body: "A flower, sometimes known as a bloom or blossom, is the reproductive structure found in flowering plants (plants of the division Magnoliophyta, also called angiosperms)."
    },
    {
        image: "https://images.unsplash.com/photo-1558981001-792f6c0d5068?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        title: "Harley Davidson !!!",
        body: "Harley-Davidson, Inc., H-D, or Harley, is an American motorcycle manufacturer founded in 1903 in Milwaukee, Wisconsin. It was one of two major American motorcycle manufacturers to survive the Great Depression, along with Indian."
    },
    {
        image: "https://images.pexels.com/photos/1123972/pexels-photo-1123972.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        title: "The Devloped Nation Or The Degrading Earth???",
        body: "Developed countries have the resources and technologies to combat pollution. ... This may lead to environmental pollution and degradation. More so, energy access, and at a lower price, is necessary to make the industries in developing countries competitive and contribute to economic growth, job creation and development."
    },
    {
        image: "https://images.pexels.com/photos/3793316/pexels-photo-3793316.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        title: "Now It Is!!!",
        body: "If you say 'It's now or never', you mean that something must be done immediately, because if it is not done immediately there will not be another chance to do it. [spoken] It's now or never, so make up your mind. Much as I hate to go, it's now or never."
    }

];
function seedDB() {
    Blog.remove({}, function (err) {
        if (err) {
            console.log(err);
        };
        console.log("Removed All Blogs");
        //add blogs
        data.forEach(function (seed) {
            Blog.create(seed, function (err, blog) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Blog Added");
                    //create comment
                    Comment.create({
                        text: "this blog post is awesome",
                        author: "Colt"
                    }, function (err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Added Comment");
                            blog.comments.push(comment);
                            blog.save();
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;