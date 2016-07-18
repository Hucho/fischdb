//total route
module.exports = function(app, mongoSetup){
	var url = require('url'),
		express = require('express'),
		rootRouter = express.Router();

	// Any generic logic can go here
	rootRouter.use(function(req, res, next) {
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
		//next();
	});
	app.use('/total',rootRouter);
};