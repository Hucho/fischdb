//routes
module.exports = function(app, mongoSetup){
	var url = require('url'),
		express = require('express'),
		rootRouter = express.Router();

	// Any generic logic can go here
	rootRouter.use(function(req, res, next) {
			mongoSetup.fishes.find({}, function(err,docs){
		res.json(docs);
		console.log("Alle Fische wurden versendet!");
	});
		//next();
	});

	app.use('/',rootRouter);
};