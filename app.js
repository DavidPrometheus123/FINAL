const express               = require("express"),
      app                   = express(),
      mongoose              = require("mongoose"),
      bodyParser            = require("body-parser"),
      ejs                   = require("ejs"),
      passport              = require("passport"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      User                  = require("./models/user.js"),
      Comment               = require("./models/comment.js"),
      Post                  = require("./models/post.js");

//Configuring our basic applicaation      
mongoose.connect("mongodb://localhost/hope");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


//Configuring Passport
app.use(require("express-session")({
    secret: "IVAN IVAN IVAN",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Landing Page 
app.get("/", function(req, res) {
   res.render("landing");     
});

//Main Post Page
app.get("/index", function(req, res) {
   Post.find({}, function(err, posts) {
      if(err) {
          console.log(err);
          return res.redirect("back");
      } 
      res.render("posts/index", {posts: posts});
   });
});

//Submit new Post
app.get("/index/new", function(req, res) {
   res.render("posts/new"); 
});

//Show Page
app.get("/index/:id", function(req, res) {
   Post.findById(req.params.id, function(err, post) {
      if(err) {
          console.log(err);
          return res.redirect("back");
      } 
      res.render("posts/show", {post: post});
   });
});

app.post("/index", function(req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var image = req.body.image;
    var post = {
      content: content,
      title: title,
      image: image
    };
    Post.create(post, function(err, newPost) {
       if(err) {
           console.log(err);
           return res.redirect("back");
       } 
       res.redirect("/index");
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Everything is working fine!"); 
});