'use strict';
var mongoose = require('mongoose');
var should = require('should');
var request = require('supertest');
var app  = require('../app');
var config = require('../config/config-test');
var User = require('../models/users');

var port = 3001;
mongoose.connect(config.db);
app.listen(config.port);
var url = 'http://localhost:' + config.port;

describe('CRUD /users', function() {
    describe("GET /users", function () {
        var user1 = new User({userName: 'theUserName1'});
        var user2 = new User({userName: 'theUserName2'});

        before(function (done) {
            User.collection.remove(function () {
                user1.save(function () {
                    user2.save(function () {
                        done();
                    });
                });
            });
        });

        it('GET /users will return all users', function (done) {
            //user1 and user2 are existing in database
            request(url)
                    .get('/users')
                    .end(function (err, res) {
                             res.status.should.eql(200);
                             res.body.should.have.length(2);
                             res.body[0].should.have.property('userName', user1.userName);
                             res.body[1].should.have.property('userName', user2.userName);
                             done();
                         });
        });

        it('GET /users:id with valid id will return status 200 and the user', function (done) {
            //user1 and user2 are existing in database
            request(url)
                    .get('/users/' + user1.id)
                    .end(function (err, res) {
                             res.status.should.eql(200);
                             res.body.should.have.property('userName', 'theUserName1');
                             done();
                         });
        });

        it('GET /users:id with invalid id will return status 500', function (done) {
            //user1 and user2 are existing in database
            request(url)
                    .get('/users/invalid_id')
                    .end(function (err, res) {
                             res.status.should.eql(500);
                             res.body.should.eql({});
                             done();
                         });
        });
    });

    describe('POST /users', function () {
        var existingUser = {userName: 'existingUserName'};

        beforeEach(function (done) {
            User.collection.remove(function () {
                var userToCreate = new User(existingUser);
                userToCreate.save(function () {
                    done();
                });
            });
        });

        it('POST /users with valid user will return status 200 and create that user', function (done) {
            var user = new User({userName: 'theUserName', givenName: 'theGivenName', surName: 'theSurName'});
            request(url)
                    .post('/users')
                    .send(user)
                    .end(function (err, res) {
                             res.status.should.eql(200);
                             res.body.should.have.property('userName', user.userName);
                             res.body.should.have.property('givenName', user.givenName);
                             res.body.should.have.property('surName', user.surName);
                             done();
                         });
        });

        it('POST /users with duplicated username will return status 500', function (done) {
            request(url)
                    .post('/users')
                    .send(new User({userName: 'existingUserName'}))
                    .end(function (err, res) {
                             res.status.should.eql(500);
                             done();
                         });
        });

        it('POST /users with required field missing will return status 500', function (done) {
            var user = {
                givenName: 'theGivenName',
                surName: 'theSurName'
            };
            request(url)
                    .post('/users')
                    .send(user)
                    .end(function(err, res){
                             res.status.should.eql(500);
                             done();
                         });
        });
    });

    describe("DELETE /users:id", function () {
        var user = new User({userName: 'theUserName'});

        before(function (done) {
            User.collection.remove(function () {
                user.save(function () {
                    done();
                });
            });
        });

        it("DELETE /users:id with valid id will return status 200 and delete that user", function (done) {
            request(url)
                    .delete('/users/' + user.id)
                    .end(function (err, res) {
                             res.status.should.eql(200);
                             res.body.should.eql(1);
                             User.findById(user.id, function (err, result) {
                                 should.not.exist(result);
                                 done();
                             });
                         });

        });

        it("DELETE /users:id with invalid id will return status 500", function (done) {
            request(url)
                    .delete('/users/invalid_id')
                    .end(function (err, res) {
                             res.status.should.eql(500);
                             done();
                         });

        });
    });

    describe("PUT /users:id", function () {
        var user = new User({userName: 'theUserName'});

        before(function (done) {
            User.collection.remove(function () {
                user.save(function () {
                    done();
                });
            });
        });

        it("PUT /users:id with different username will return status 200 and update the user", function (done) {
            user.userName = 'anotherUserName';
            request(url)
                    .put('/users/' + user.id)
                    .send(user)
                    .end(function (err, res) {
                             res.status.should.eql(200);
                             User.findById(user.id, function (err, result) {
                                 result.should.have.property('userName', 'anotherUserName');
                                 done();
                             });
                         });

        });

        it("PUT /users:id with invalid id will return status 500", function (done) {
            user.userName = 'anotherUserName';
            request(url)
                    .put('/users/invalid_id')
                    .send(user)
                    .end(function (err, res) {
                             res.status.should.eql(500);
                             done();
                         });
        });
    });

    after(function (done) {
        mongoose.connect(config.db, function () {
            mongoose.connection.db.dropDatabase();
        });
        done();
    });
});