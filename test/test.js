/* 
 * test.js - Main test file for the Vehicle ratings API
 * Author: Ojas Kale
 * Date: 12th May 2018
 * Version: 1
 */

var supertest = require('supertest');
var should = require('should');
var assert = require('assert');

var server = supertest.agent("http://localhost:8888");


describe("Base Route Tests", function () {
    this.timeout(2000);
    
    it("should return home page", function (done) {
        server.get('/')
        .expect(200)
        .end(function(err, res) {
            if(err) { done(err); }
            res.status.should.equal(200);
            done();
        });
    }); 

    it("should return vehicle home page", function (done) {
        server.get('/vehicles')
        .expect(200)
        .end(function(err, res) {
            if(err) { done(err); }
            res.status.should.equal(200);
            done();
        });
    }); 
    
});

/*************************
 * 
 * TESTS FOR REQUIREMENT 1
 * 
 *************************/

describe("Tests for Requirement 1 - vehicles list with Ids and Description", function () {
    this.timeout(5000);

/*    
* Can we visit the following Requirement 1 URLs and get meaningful JSON output from them:
* `GET http://localhost:8888/vehicles/2015/Audi/A3`
*/        
    it("should return more than 0 vehicles", function(done) {
        server.get('/vehicles/2015/Audi/A3')
        .end(function(err, response) {
            if(err) { done(err); }
            response.status.should.equal(200);
            assert.ok(response.body.Results.length > 0);
            assert.ok(response.body.Results.length === response.body.Count);
            response.body.should.not.have.property('Message');
            response.body.Results[0].should.have.property('Description');
            response.body.Results[0].should.not.have.property('VehicleDescription');            
            done();
        });
    });
    
/*    
* Can we visit the following Requirement 1 URLs and get meaningful JSON output from them:
* `GET http://localhost:8888/vehicles/2015/Toyota/Yaris`
*/    
    it("should return more than 0 vehicles", function(done) {
        server.get('/vehicles/2015/Toyota/Yaris')
        .end(function(err, response) {
            if(err) { done(err); }
            response.status.should.equal(200);
            assert.ok(response.body.Results.length > 0);
            assert.ok(response.body.Results.length === response.body.Count);
            response.body.should.not.have.property('Message');
            response.body.Results[0].should.have.property('Description');
            response.body.Results[0].should.not.have.property('VehicleDescription');                        
            done();
        });
    });

/*    
* Can we visit the following Requirement 1 URLs and get meaningful JSON output from them:
* `GET http://localhost:8888/vehicles/2015/Ford/Crown Victoria`
*/    
    it("should return 0 vehicles", function(done) {
        server.get('/vehicles/2015/Ford/Crown Victoria')
        .end(function(err, response) {
            if(err) { done(err); }
            response.status.should.equal(200);
            assert.ok(response.body.Results.length === 0);
            assert.ok(response.body.Results.length === response.body.Count);
            response.body.should.not.have.property('Message');
            done();
        });
    });

/*    
* Can we visit the following Requirement 1 URLs and get meaningful JSON output from them:
* `GET http://localhost:8888/vehicles/undefined/Ford/Fusion`
*/    
    it("should return 0 vehicles", function(done) {
        server.get('/vehicles/undefined/Ford/Fusion')
        .end(function(err, response) {
            if(err) { done(err); }
            response.status.should.equal(200);
            assert.ok(response.body.Results.length === 0);
            assert.ok(response.body.Results.length === response.body.Count);
            response.body.should.not.have.property('Message');
            done();
        });
    });
    
});

/*************************
 * 
 * TESTS FOR REQUIREMENT 2
 * 
 *************************/

describe("Tests for Requirement 2 - vehicles list with Ids and Description - Post requests", function () {
    this.timeout(5000);

/*
 * Can we visit the Requirement 2 URL when sending each of the following JSON request bodies 
 * and get meaninful JSON output from each:
 * POST http://localhost:8888/vehicles
 * {"modelYear": 2015, "manufacturer": "Audi", "model": "A3"}
 */
    
    it("should return more than 0 vehicles", function(done) {
        server.post('/vehicles')
        .send({"modelYear": 2015, "manufacturer": "Audi", "model": "A3"})
        .end(function(err, response) {
            if(err) { done(err); }
            response.status.should.equal(200);
            assert.ok(response.body.Results.length > 0);
            assert.ok(response.body.Results.length === response.body.Count);
            response.body.should.not.have.property('Message');
            response.body.Results[0].should.have.property('Description');
            response.body.Results[0].should.not.have.property('VehicleDescription');                        
            done();
        });
    });
    
/*
 * Can we visit the Requirement 2 URL when sending each of the following JSON request bodies 
 * and get meaninful JSON output from each:
 * POST http://localhost:8888/vehicles
 * {"modelYear": 2015, "manufacturer": "Toyota", "model": "Yaris"}
 */
    it("should return more than 0 vehicles", function(done) {
        server.post('/vehicles')
        .send({"modelYear": 2015, "manufacturer": "Toyota", "model": "Yaris"})
        .end(function(err, response) {
            if(err) { done(err); }
            response.status.should.equal(200);
            assert.ok(response.body.Results.length > 0);
            assert.ok(response.body.Results.length === response.body.Count);
            response.body.should.not.have.property('Message');
            response.body.Results[0].should.have.property('Description');
            response.body.Results[0].should.not.have.property('VehicleDescription');                        
            done();
        });
    });
    
/*
 * Note - the JSON body below is erroneous, and should not crash your application 
 * but should return an empty `Results` object and set `Count` to `0` in your response.
 * POST http://localhost:8888/vehicles
 * {"manufacturer": "Honda","model": "Accord"}
 */
    it("should return 0 vehicles", function(done) {
        server.post('/vehicles')
        .send({"manufacturer": "Honda","model": "Accord"})
        .end(function(err, response) {
            if(err) { done(err); }
            response.status.should.equal(200);
            assert.ok(response.body.Results.length === 0);
            assert.ok(response.body.Results.length === response.body.Count);
            response.body.should.not.have.property('Message');
            done();
        });
    });

});

/*************************
 * 
 * TESTS FOR REQUIREMENT 3
 * 
 *************************/

describe("Tests for Requirement 3 - vehicles list with Ids, Description and CrashRating ", function () {
    this.timeout(5000);

/*    
* Can we visit the following Requirement 1 URLs and get meaningful JSON output from them:
* `GET http://localhost:8888/vehicles/2015/Audi/A3?withRating=true`
*/        
    it("should return more than 0 vehicles", function(done) {
        server.get('/vehicles/2015/Audi/A3?withRating=true')
        .end(function(err, response) {
            if(err) { done(err); }
            response.status.should.equal(200);
            assert.ok(response.body.Results.length > 0);
            assert.ok(response.body.Results.length === response.body.Count);
            response.body.should.not.have.property('Message');
            response.body.Results[0].should.have.property('Description');
            response.body.Results[0].should.not.have.property('VehicleDescription');                        
            response.body.Results[0].should.have.property('CrashRating');
            done();
        });
    });
    
/*    
* Can we visit the following Requirement 1 URLs and get meaningful JSON output from them:
* `GET http://localhost:8888/vehicles/2015/Audi/A3?withRating=false`
*/        
    it("should return more than 0 vehicles", function(done) {
        server.get('/vehicles/2015/Audi/A3?withRating=false')
        .end(function(err, response) {
            if(err) { done(err); }
            response.status.should.equal(200);
            assert.ok(response.body.Results.length > 0);
            assert.ok(response.body.Results.length === response.body.Count);
            response.body.should.not.have.property('Message');
            response.body.Results[0].should.have.property('Description');
            response.body.Results[0].should.not.have.property('VehicleDescription');                        
            response.body.Results[0].should.not.have.property('CrashRating');
            done();
        });
    });
        
/*    
* Can we visit the following Requirement 1 URLs and get meaningful JSON output from them:
* `GET http://localhost:8888/vehicles/2015/Audi/A3?withRating=bananas`
*/        
    it("should return more than 0 vehicles", function(done) {
        server.get('/vehicles/2015/Audi/A3?withRating=bananas')
        .end(function(err, response) {
            if(err) { done(err); }
            response.status.should.equal(200);
            assert.ok(response.body.Results.length > 0);
            assert.ok(response.body.Results.length === response.body.Count);
            response.body.should.not.have.property('Message');
            response.body.Results[0].should.have.property('Description');
            response.body.Results[0].should.not.have.property('VehicleDescription');                        
            response.body.Results[0].should.not.have.property('CrashRating');
            done();
        });
    });
    
/*    
* Can we visit the following Requirement 1 URLs and get meaningful JSON output from them:
* `GET http://localhost:8888/vehicles/2015/Audi/A3`
*/        
    it("should return more than 0 vehicles", function(done) {
        server.get('/vehicles/2015/Audi/A3')
        .end(function(err, response) {
            if(err) { done(err); }
            response.status.should.equal(200);
            assert.ok(response.body.Results.length > 0);
            assert.ok(response.body.Results.length === response.body.Count);
            response.body.should.not.have.property('Message');
            response.body.Results[0].should.have.property('Description');
            response.body.Results[0].should.not.have.property('VehicleDescription');                        
            response.body.Results[0].should.not.have.property('CrashRating');
            done();
        });
    });
    
});

