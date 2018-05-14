/* 
 * baseRoutes.js - API routes for the accessing this site
 * Author: Ojas Kale
 * Date: 12th May 2018
 * Version: 1
 */

var express = require('express');

// Vehicle Routes
var routes = function() {
    var baseRouter = express.Router();

    baseRouter.route('/')    
    .get(function(request, response) {
        var responseString = "Welcome to the Vehicle Ratings API. Please use /vehicles in your HTTP requests";
        response.status(200);
        response.end(responseString);
    });
   
    return baseRouter;
};

module.exports = routes;

