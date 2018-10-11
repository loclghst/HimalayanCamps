var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', (req,res) =>{
	res.render('landing');
});

app.listen(9999, process.env.IP, function(){
	console.log('Server has started');
})