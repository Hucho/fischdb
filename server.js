var express = require ('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Deleted

//connect to db
db = mongoose.createConnection('localhost','fische');
db.on('error', console.error.bind(console,'connection error:'));

//create a schema
var userSchema = new Schema ({ name: String}, {collection: 'fische'});

//model
var User = db.model('User', userSchema);

app.get('/fische', function(req,res){

User.find({}, function(err,docs){
	res.json(docs)
	console.log(docs);

});

});


app.use(express.static(__dirname + "/public"));

app.listen(3000);
console.log("Server is running on port 3000");
