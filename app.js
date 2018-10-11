const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

let campgrounds = [
        {name: "Magic Meera, Rasol", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Shangarh", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Chalal, Kasol", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Magic Meera, Rasol", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Shangarh", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Chalal, Kasol", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Magic Meera, Rasol", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Shangarh", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Chalal, Kasol", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
];

app.get('/', (req,res) =>{
	res.render('landing');
});

app.get("/campgrounds", (req, res)=>{
    res.render("campgrounds",{campgrounds:campgrounds});
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
	campgrounds.push(newCampground);

	res.redirect('/campgrounds');

});

app.listen(9999, process.env.IP, function(){
	console.log('Server has started');
})