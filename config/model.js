//config/model.js
module.exports = function mongoSetup (collection){

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//connect to Database
var db = mongoose.createConnection('mongodb://localhost/fishdb');
	db.on('error', console.error);
	db.once('open', function(){
		console.log("Connection to fischDB established");
	});

//create fisch-Schema
var fish = new Schema (
	{ 
		Anzahl: Number,
		Art: String,
		Gewicht: Number,
		Strecken_ID: Number,
	}, collection);

var model = {fishes: db.model('fishes', fish)}

return model;

}

