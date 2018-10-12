const mongoose = require('mongoose');
const Campground = require('./models/campgrounds');
const Comment   = require("./models/comment");

const data = [
    {
        name: "Magic Meera , Rasol", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "blah blah blah"
    },
    {
        name: "Shangarh, Kullu", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "blah blah blah"
    },
    {
        name: "Katagla, Parvati Valley", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah blah blah"
    }
]

function seedDB(){

	//Remove all campgrounds

	Campground.remove({}, (err) =>{
		if(err)
			console.error(err);
		console.log('Remoevd Campgrounds');

		//Add a few campgrounds
	    data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                   }

	});


	//Add a few comments
}

module.exports = seedDB;