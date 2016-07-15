var express = require ('express');
var app = express();
var bodyParser = require('body-parser');
var mongoSetup = require('./config/model.js');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/fische', function(req,res){
	mongoSetup.fische.find({}, function(err,docs){
		res.json(docs);
		console.log("Alle Fische wurden versendet!");
	})
});

app.get('/*', function(req, res){
	res.send("hallo!");
	console.log("I received a get request from the Browser!");
});




app.listen(3000);
console.log("Server is running on port 3000");