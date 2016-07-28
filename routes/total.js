//total route
module.exports = function(app){
	var url = require('url'),
		express = require('express'),
		rootRouter = express.Router();
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;



// Any generic logic can go here
rootRouter.use(function(req, res, next) {

//connect to Database
var db = mongoose.createConnection('mongodb://localhost/fishdb');
	db.on('error', console.error);
	db.once('open', function(){
		console.log("Connection to fischDB established");
	});

var totalfish = new Schema(
	{ 
		Anzahl: Number,
		Art: String,
		Gewicht: Number,
		Strecken_ID: Number,
	}, {collection:'kkg'});

var totalfishSchema = db.model('totalfishSchema', totalfish);	

		totalfishSchema.aggregate([{$group: { 
			_id: "$Fischart",
			Anzahl: {$sum: "$Anzahl"},
			Laenge_Avg: {$avg: "$Laenge"},
			Laenge_Max: {$max: "$Laenge"},
			Gewicht:{$sum: "$Gewicht"}
		}
		}],	function(err,docs){
		if(err){console.log(err);}
		else {res.json(docs);
			console.log(docs);
			}	
	});
		//next();
	});

app.use('/total',rootRouter);
};