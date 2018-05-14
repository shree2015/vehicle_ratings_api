
/* 
 * webRequests.js - File containing API calls to the the endpoint mentioned in the endpoint parameter
 * Author: Ojas Kale
 * Date: 12th May 2018
 * Version: 1
 */


var request = require('request');

var sendRequest = function (endpoint, queryString, callback) {
    var url = endpoint + queryString;
    var stream = request( url);
    var responseStream = '';
    
    stream.on('data', function(chunk) {
        responseStream += chunk;
    });

    stream.on('end', function() {
        callback(null, responseStream);
    });

    stream.on('err', function() {
       console.log("!!!! ERROR !!!!"); 
    });

};

module.exports.sendRequest = sendRequest;

