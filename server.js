var express = require ('express');
var app = express();
bodyParser = require('body-parser');
http = require('http');
var mongoose = require('mongoose');
//var mongoSetup = require('../config/model')({'collection':'svd2'});

//environments
app.set('port', process.env.port || 3000);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
routes = require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});