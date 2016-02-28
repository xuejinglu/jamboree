var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

// skeleton for eventual API calls
// app.post('/api/acct/signin', acctController.signin);
// app.post('/api/acct/signup', acctController.signup);
// app.get('/api/acct/signedin', acctController.checkAuth);
// app.get('/api/acct/logout', acctController.checkAuth);
// app.post('/api/acct/addToList', acctController.addToList);
// app.get('/api/acct/getLists', acctController.getLists);


app.listen(8080);


module.exports = app;
