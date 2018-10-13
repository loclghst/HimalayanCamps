const express= require('express');
const router = express.Router();
const Campground = require('../models/campgrounds');

 // middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//Show all campgrounds
router.get("/", (req, res)=>{
	//Get all campgrounds
	Campground.find({}, (err,allcampgrounds)=>{
		if(err)
			console.error(err);
		else{
			res.render("campgrounds/index",{campgrounds:allcampgrounds});
		}

	});
		
});


router.post('/',isLoggedIn, (req,res) =>{
	let name = req.body.name;
	let image = req.body.image;
	let desc = req.body.description;
	let author ={
		id: req.user._id,
		username: req.user.username
	};
	const newCampground = {
		name,
		image,
		description: desc,
		author
	};
	Campground.create(newCampground, (err,newCampground) =>{
		if(err)
			console.error(err);
		else
			res.redirect('/campgrounds');
	});

});

//Show form to create a new campground
router.get('/new',isLoggedIn, (req,res) =>{
	res.render('campgrounds/new');
});

//this route shoud be after '/campgrounds/new'

//Shows more info about one campground
router.get('/:id', (req,res) =>{
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

//Edit campground route

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//Update campground route



module.exports = router;
