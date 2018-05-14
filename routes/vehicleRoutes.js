/* 
 * vehicleRoutes.js - API routes for the accessing this site
 * Author: Ojas Kale
 * Date: 12th May 2018
 * Version: 1
 */

var express = require('express');
var NHTSAController = require('../controllers/NHTSAController');
var utils = require('../utils/utils');

// Vehicle Routes
var routes = function() {
    var vehicleRouter = express.Router();

    vehicleRouter.route('/:modelyear/:manufacturer/:model/')
    .get(getVehicleDetails);
    
    vehicleRouter.route('/')    
    .get(sendBaseResponseString)
    .post(vehiclePostResponse); 
   
    return vehicleRouter;
};




var sendBaseResponseString = function(request, response) {
    var responseString = "This is the base API for fetching vehicle details . \n\
    Please provide <MODEL YEAR>, <MANUFACTURER>, and <MODEL> parameters in your query";
    response.status(200);
    response.end(responseString);    
};

var getVehicleDetails = function(request, response) {
    
    NHTSAController.getVehicleData(request.params, function (err, result) {
        if(err) {
            console.log('Error !!!');
        }
        else {
            var responseJson = result;
            if(utils.isRatingQueryPresent(request.query)) {
                vehiclesArray = responseJson.Results;
                if(vehiclesArray.length > 0) {
                    for(var i = 0; i < vehiclesArray.length; i++) {
                        var vehicle = vehiclesArray[i];
                        var itemsReturned = 0;
                        NHTSAController.getVehicleRatingData(vehicle, function(err, ratingResult) {
                            if(err) {
                                console.log("Error returned from sendRequest : " + err);
                            }
                            else {
                                utils.addVehicleRating(responseJson, ratingResult.Results[0]);
                                itemsReturned++;
                                if(itemsReturned === vehiclesArray.length) {
                                    response.json(responseJson);
                                }
                            }
                        });
                    }
                }
                else {
                    response.json(responseJson);        
                }
            }
            else {
                response.json(responseJson);        
            }
        }
    });
};

var vehiclePostResponse = function (request, response) {
    // requirement 2 - post request with params
    //var responseJson = {requestType: "Post Request"};
    NHTSAController.getVehicleData(request.body, function (err, result) {
        if(err) {
            console.log('Error !!!');
        }
        else {
            response.json(result);        
        }
    });
    
};

module.exports = routes;
