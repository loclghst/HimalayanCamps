const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp',{useNewUrlParser: true});


app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

//Schema setup

const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

const Campground = mongoose.model('Campground', campgroundSchema);


app.get('/', (req,res) =>{
	res.render('landing');
});

app.get("/campgrounds", (req, res)=>{
	//Get all campgrounds
	Campground.find({}, (err,allcampgrounds)=>{
		if(err)
			console.error(err);
		else{
			res.render("campgrounds",{campgrounds:allcampgrounds});
		}

	});
		
});

app.get('/campgrounds/new', (req,res) =>{
	res.render('new.ejs');
});

app.post('/campgrounds', (req,res) =>{
	let name = req.body.name;
	let image = req.body.image;
	const newCampground = {
		name,
		image
	};
	Campground.create(newCampground, (err,newCampground) =>{
		if(err)
			console.error(err);
		else
			res.redirect('/campgrounds');
	});

});

app.listen(9999, process.env.IP, function(){
	console.log('Server has started');
})