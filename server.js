var express = require ('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

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
		Anzahl: Number,
		Art: String,
		Gewicht: Number,
		Strecken_ID: Number,
	}, 	{collection: 'kkr'});

//model
var User = db.model('User', userSchema);

app.get('/totals', function(req,res){

	User.aggregate([{$group: { 

			_id: "$Art",
			Anzahl: {$sum: "$Anzahl"},
			Laenge_Avg: {$avg: "$Laenge"},
			Laenge_Max: {$max: "$Laenge"},
			Gewicht:{$sum: "$Gewicht"}

		}

		}],	function(err,docs){

		if(err){console.log(err);}
		else {res.json(docs);
			console.log(docs);}	

	});

});




//alle Fische
// app.get('/fische', function(req,res){

// User.find({}, function(err,docs){
// 	res.json(docs)
// 	console.log("Alle Fische wurden versendet");

//test gruppieren

// });

// });

//test nach Art filtern
// app.get('/Aale', function(req,res){

// 	User.aggregate([{"$match": {Art: "Aal"}}], function(err, docs){

// 			if(err){console.log(err);}
// 			else {res.json(docs);}
// 	});

// });

// //test gruppieren
// app.get('/gesamtergebnis', function(req,res){

// 	User.aggregate([{$group: { 
// 			_id: "$Art",
// 			Anzahl: {$sum: "$Anzahl"}
// 		}

// 		}],	function(err,docs){

// 		if(err){console.log(err);}
// 		else {res.json(docs);}	

// 	});

// });




//neuen Fisch speichern

// var neuerFisch = new User ({

// 	Anzahl: 1,
// 	Art: "Wahoo",
// 	Gewicht: 25000,
// 	Strecken_ID: 10,
// });

// neuerFisch.save(function(err){

// 	if(err) {console.log(err);}
// 	else {console.log(neuerFisch);}

// });





app.listen(3000);
console.log("Server is running on port 3000");
