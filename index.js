/* 
 * app.js - Main Execution file for the Modus Assignment 
 * Author: Ojas Kale
 * Date: 12th May 2018
 * Version: 1
 */

var express = require('express');
var bodyParser = require('body-parser');
var timeout = require('connect-timeout');

var app = express();

var port = process.env.PORT || 8888;

app.use(timeout(5000));
app.use(bodyParser.urlencoded({extended: true}));
app.use(halt);
app.use(bodyParser.json());
app.use(halt);

// Vehicle routes 
vehicleRouter = require('./routes/vehicleRoutes')();
app.use('/vehicles', vehicleRouter);

// Base route
baseRouter = require('./routes/baseRoutes')();
app.use('/', baseRouter);

app.listen(port, function() {
   console.log('Server started on port ' + port); 
});

function halt(request, response, next) {
    if (!request.timedout) next();
}

