/* 
 * NHTSAController.js - Controller for handling all NHTSA related calls
 * Author: Ojas Kale
 * Date: 12th May 2018
 * Version: 1
 */

var webRequests = require('../utils/webRequests');
var utils = require('../utils/utils');

const NHTSAApi = 'https://one.nhtsa.gov/webapi/api/SafetyRatings';

const validParams = ["modelyear", "make", "model"];

var zeroResult = { "Count": 0, "Results": [] };

var getVehicleData = function(requestParams, callback) {
    var jsonObject = utils.modifyJsonKeys(utils.keysToLowerCase(requestParams), "manufacturer", "make");
    var queryString = createNHTSAQueryString(jsonObject);
    webRequests.sendRequest(NHTSAApi, queryString, function(err, result) {
        if(err) {
            console.log(" !!! ERROR received from NHTSA request");
        }
        else {
            var jsonResult = sanitizeResult(result);
            jsonResult = modifyJson(jsonResult);
            callback(null, jsonResult);
        }        
    });

};

var getVehicleRatingData = function(vehicle, callback) {
    var queryString = '';
    queryString += '/VehicleId/' + vehicle.VehicleId + "?format=json";
    webRequests.sendRequest(NHTSAApi, queryString, function(err, result) {
        if(err) {
            console.log(" !!! ERROR received from NHTSA request");
        }
        else {
            var jsonResult = JSON.parse(result);
            callback(null, jsonResult);
        }        
    });    
};

function modifyJson(jsonObject) {
    var jsonResult = utils.modifyJsonKeys(jsonObject, "Message", null);
    if(jsonResult.Results) {
        var modifiedArray = jsonResult.Results.map(function(result) {
            var newResult = {};
            for(var key in result) {
                if (key === "VehicleDescription") 
                    newResult.Description = result[key];
                else
                    newResult[key] = result[key];
                }
                return newResult;
            });
        jsonResult.Results = modifiedArray;
    }
    
    return jsonResult;
}
    

var createNHTSAQueryString = function(params) {
    var queryString = '';
    for(i = 0; i < validParams.length; i++ ) {
        var currentParam = validParams[i];
        var value = params[currentParam];
        queryString += '/';
        queryString += currentParam;
        queryString += '/';
        queryString += value;
    }
    return queryString;
};

function sanitizeResult(result) {
    
    try {
        var jsonResult = JSON.parse(result);
        return jsonResult;
    }
    catch(err) {
        return zeroResult;
    }
    
}

module.exports.getVehicleData = getVehicleData;
module.exports.getVehicleRatingData = getVehicleRatingData;