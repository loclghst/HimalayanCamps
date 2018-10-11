var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', (req,res) =>{
	res.render('landing');
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
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
    
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post('/campgrounds', (req,res) =>{
	res.send('You hit the POST route');

});

app.listen(9999, process.env.IP, function(){
	console.log('Server has started');
})