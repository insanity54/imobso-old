var curl = require('./curl');
var api = require('./api');
var express = require('express');
var bodyParser = require('body-parser');


//
// Globals
//
var port = process.env.PORT || 5000;


//
// Init
//
var app = express();
app.use(bodyParser.urlencoded({ extended: false })); // Required for parsing POST
app.use(bodyParser.json()); // parse application/json


//
// Script
//


app.listen(port);
console.log('Listening on port ' + port);


module.exports = app;
