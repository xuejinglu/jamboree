var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var eventController = require('./events/eventController.js');
var morgan = require('morgan');
var yelp = require('./yelp.js');

const PORT = 8080;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost/jamboree');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public/'));

// skeleton for eventual API calls
// app.post('/api/acct/signin', acctController.signin);
// app.post('/api/acct/signup', acctController.signup);
// app.get('/api/acct/signedin', acctController.checkAuth);
// app.get('/api/acct/logout', acctController.checkAuth);
// app.post('/api/acct/addToList', acctController.addToList);
app.get('/api/events/getList', eventController.getEvents);
app.get('/getEats/:location', function(req, res){
	//console.log(req.params.location.slice(1));
	yelp(req.params.location, function(error, resp, body){
	    body = JSON.parse(body);
		res.send(200, body.businesses);
	});
});


console.log( 'listening on', PORT );
app.listen( PORT );


module.exports = app;
