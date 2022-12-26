//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = []; //All individual posts

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("home", {homeContent: homeStartingContent, newPostItems: posts}); //This will render the home.ejs file and pass over data in homeStartingContent to homeContent tag in home.ejs
});

app.get("/about", function (req, res) {
    res.render("about", {aboutContent: aboutContent});  //This will render the about.ejs file and pass over data in aboutContent to aboutContent tag in about.ejs
});

app.get("/contact", function (req, res) {
    res.render("contact", {contactContent: contactContent});    //This will render the contact.ejs file and pass over data in contactContent to contactContent tag in contact.ejs
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.get("/posts/:postName", function (req, res) {
    let postName = lodash.lowerCase(req.params.postName);   //Convert search param to lower case for string comparison

    posts.forEach(function (post) {
        let actualPostTitle = lodash.lowerCase(post.postTitle);

        if (actualPostTitle === postName){ //Convert individual post name to lower case for string comparison
            res.render("post", {postTitle: post.postTitle, postText: post.postText})    //Passing post title and text to post.ejs to display individual post on its own page if url route parameter and post title match
        }
    });
});

app.post("/compose", function (req, res) {
    const post = {
        postTitle: req.body.titleText,
        postText: req.body.postBody
    };
    posts.push(post);   //Add new post with title and content to posts array

    res.redirect("/");  //This will redirect us back to home route after submitting post and trigger the Get method above again but with a new post in the posts array


});













app.listen(3000, function() {
  console.log("Server started on port 3000");
});
