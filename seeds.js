const mongoose = require('mongoose');
const Campground = require('./models/campground');

function seedDB(){
	Campground.remove({}, (err) =>{
		if(err)
			console.error(err);
		console.log('Remoevd Campgrounds');
	});
}

module.exports = seedDB;