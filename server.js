var express = require ('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Deleted

//connect to db
var db = mongoose.createConnection('localhost','fische');
db.on('error', console.error.bind(console,'connection error:'));
db.on('connected',function(){
	console.log("Connection to mongodb successfully established!");
});

//disconnect from mongodb when node stops

process.on('SIGINT', function(){
	mongoose.connection.close(function(){
		console.log("Mongoose default connection terminated by app termination!");
		process.exit(0);
	});

});

//create a schema
var userSchema = new Schema (
	{ 
		anzahl: Number,
		art: String,
		gewicht: Number,
		strecken_id: Number,
	}, 	{collection: 'kkr'});

//model
var User = db.model('User', userSchema);


//alle Fische
app.get('/fische', function(req,res){

User.find({}, function(err,docs){
	res.json(docs)
	console.log("Alle Fische wurden versendet");

});

});

//test gruppieren
app.get('/gesamt', function(req,res){

	User.find({}, function(err,docs){

			docs.forEach(function(docs){

				res.json(docs);
			});

	});

});



app.use(express.static(__dirname + "/public"));

app.listen(3000);
console.log("Server is running on port 3000");
