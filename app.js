const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Campground = require('./models/campgrounds');
const seedDB = require('./seeds');
const Comment = require('./models/comment');

seedDB();

mongoose.connect('mongodb://localhost/yelp_camp',{useNewUrlParser: true});


app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');


app.get('/', (req,res) =>{
	res.render('landing');
});

app.get("/campgrounds", (req, res)=>{
	//Get all campgrounds
	Campground.find({}, (err,allcampgrounds)=>{
		if(err)
			console.error(err);
		else{
			res.render("campgrounds/index",{campgrounds:allcampgrounds});
		}

	});
		
});


app.post('/campgrounds', (req,res) =>{
	let name = req.body.name;
	let image = req.body.image;
	let desc = req.body.description;
	const newCampground = {
		name,
		image,
		description: desc
	};
	Campground.create(newCampground, (err,newCampground) =>{
		if(err)
			console.error(err);
		else
			res.redirect('/campgrounds');
	});

});

//Show form to create a new campground
app.get('/campgrounds/new', (req,res) =>{
	res.render('campgrounds/new');
});

//this route shoud be after '/campgrounds/new'

//Shows more info about one campground
app.get('/campgrounds/:id', (req,res) =>{
	//find the campground with provided id
	Campground.findById(req.params.id).populate("comments").exec((err,foundCampground) =>{
		if(err)
			console.error(err);
		else{
			//render show template with that campground
			res.render('campgrounds/show',{campground: foundCampground} );
		}
	});


});

//Comments routes

app.get("/campgrounds/:id/comments/new", (req, res) =>{
    // find campground by id
    Campground.findById(req.params.id,(err, campground) =>{
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

//POST Route for adding comments to the db
app.post("/campgrounds/:id/comments", function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});







app.listen(9999, process.env.IP, function(){
	console.log('Server has started');
});