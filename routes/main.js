//routes
module.exports = function(app){
	var url = require('url'),
		express = require('express'),
		rootRouter = express.Router();

//var mongoSetup = require('../config/model')({'collection':'svd2'});

	// Any generic logic can go here
	rootRouter.use(function(req, res, next) {
			mongoSetup.fishes.find({}, function(err,docs){
		res.json(docs);
		console.log("Alle Fische wurden versendet!");
	});
		//next();
	});

	app.use('/test',rootRouter);
};