//config/model.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function mongoSetup (mongoose, Schema){

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
	}, 	{collection: 'kkr'});

var model = {fishes: db.model('fishes', fish)}

return model;

}

module.exports = mongoSetup(mongoose, Schema);