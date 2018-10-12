const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Campground = require('./models/campgrounds');


mongoose.connect('mongodb://localhost/yelp_camp',{useNewUrlParser: true});


app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

//Schema setup



app.get('/', (req,res) =>{
	res.render('landing');
});

app.get("/campgrounds", (req, res)=>{
	//Get all campgrounds
	Campground.find({}, (err,allcampgrounds)=>{
		if(err)
			console.error(err);
		else{
			res.render("index",{campgrounds:allcampgrounds});
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
	res.render('new.ejs');
});

//this route shoud be after '/campgrounds/new'

//Shows more info about one campground
app.get('/campgrounds/:id', (req,res) =>{
	//find the campground with provided id
	Campground.findById(req.params.id, (err,foundCampground) =>{
		if(err)
			console.error(err);
		else{
			//render show template with that campground
			res.render('show',{campground: foundCampground} );
		}
	});


});



app.listen(9999, process.env.IP, function(){
	console.log('Server has started');
});