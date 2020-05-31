var express = require("express");
var app= express();
var bodyParser = require("body-parser");
var axios = require("axios");
var port =  process.env.PORT || 3000;
const mongoose= require("mongoose");
const passport= require("passport");
const methodOverride = require("method-override");
const localStrategy= require("passport-local");
const Campground = require("./models/campground");
const Comment= require("./models/comment");
const flash = require("connect-flash");
const User = require("./models/user");
const str = "mongodb+srv://Ekagrata:promila12@myfirstcluster-wb5wt.mongodb.net/YelpCamp?retryWrites=true&w=majority";
const seedDB = require("./seeds");

const commentRoutes = require("./routes/comments");
const campgoundRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index");

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

//middleware called before every route calling


mongoose.connect(str,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("connected");
}).catch((error)=>{
    console.log(error);
});

//seed the db
//seedDB();

app.use(express.static(__dirname+"/public"));
app.use(require("express-session")({
    secret: "Rusty is the cutest dog",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use("/campgrounds/:id/comments",commentRoutes);
app.use(indexRoutes);
app.use("/campgrounds", campgoundRoutes);


app.listen(port,()=>{
    console.log("Yelp Camp Server started!!!! ");
})