const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Campground = require('./models/campgrounds');
const seedDB = require('./seeds');
const Comment = require('./models/comment');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

//requiring routes

const commentRoutes = require('./routes/comments');
const campgroundRoutes = require('./routes/campgrounds');
const indexRoutes = require('./routes/index');


mongoose.connect('mongodb://localhost/yelp_camp',{useNewUrlParser: true});


app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
seedDB();


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


app.use('/',indexRoutes);
app.use('/campgrounds' ,campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);




app.listen(9999, process.env.IP, function(){
	console.log('Server has started');
});