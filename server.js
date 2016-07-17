var express = require ('express');
var app = express();
var bodyParser = require('body-parser');
var mongoSetup = require('./app/config/model.js');

app.use(express.static(__dirname + "/app"));
app.use(bodyParser.json());

app.get('/fische', function(req,res){
	mongoSetup.fishes.find({}, function(err,docs){
		res.json(docs);
		console.log("Alle Fische wurden versendet!");
	})
});

app.get('/total', function(req,res){

	mongoSetup.fishes.aggregate([{$group: { 

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

app.get('/*', function(req, res){
	res.send("hallo!");
	console.log("I received a get request from the Browser!");
});

app.listen(3000);
console.log("Server is running on port 3000");