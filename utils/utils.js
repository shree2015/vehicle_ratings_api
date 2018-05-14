/* 
 * utils.js - utility functions
 * Author: Ojas Kale
 * Date: 12th May 2018
 * Version: 1
 */

var isRatingQueryPresent = function(query) {
    if(! isEmpty(query)) {
        if(query.hasOwnProperty("withRating")) {
            if(query.withRating === "true") {
                return true;
            }
        }
    }
    return false;
};



function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}



var modifyJsonKeys = function (jsonObject, fromKey, toKey) {
    var modifiedJson = {};
    for(var key in jsonObject) {
        if(key === fromKey) {
            if(toKey !== null) {
                modifiedJson[toKey] = jsonObject[key];
            }
        }
        else {
            modifiedJson[key] = jsonObject[key];            
        }
    }

    return modifiedJson;
};

function addVehicleRating(jsonResult, vehicleDetails) {
    var i, len;
    len = jsonResult.Results.length;
    for(i = 0; i < len; i++) {
        var vehicle = jsonResult.Results[i];
        if(vehicle.VehicleId === vehicleDetails.VehicleId) {
            vehicle.CrashRating = vehicleDetails.OverallRating;
        }
    }
}

var keysToLowerCase = function (jsonObject) {
    var modifiedJson = {};
    for(var key in jsonObject) {
        modifiedJson[key.toLowerCase()] = jsonObject[key];
    }
    return modifiedJson;
};


module.exports.modifyJsonKeys = modifyJsonKeys; 
module.exports.isRatingQueryPresent = isRatingQueryPresent;
module.exports.addVehicleRating = addVehicleRating;
module.exports.keysToLowerCase = keysToLowerCase;