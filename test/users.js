'use strict';
var mongoose = require('mongoose');
var should = require('should');
var request = require('supertest');
var app  = require('../app');
var config = require('../config/config-test');
var User = require('../models/users');

mongoose.connect(config.db);
app.listen(3000);

describe('CRUD /users', function() {
    var url = 'http://localhost:3000';

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

        it('find all users should return both users', function (done) {
            request(url)
                    .get('/users')
                    .end(function (err, res) {
                             res.status.should.eql(200);
                             res.body.should.have.length(2);
                             res.body[0].should.have.property('userName', 'theUserName1');
                             res.body[1].should.have.property('userName', 'theUserName2');
                             done();
                         });
        });

        it('find one user with id should return that user', function (done) {
            request(url)
                    .get('/users/' + user1._id)
                    .end(function (err, res) {
                             res.status.should.eql(200);
                             res.body.should.have.property('userName', 'theUserName1');
                             done();
                         });
        });

        it('find one user with non existing id should return empty', function (done) {
            request(url)
                    .get('/users/theIdThatNeverMatch')
                    .end(function (err, res) {
                             res.status.should.eql(500);
                             res.body.should.eql({});
                             done();
                         });
        });
    });

    describe('POST /users', function () {
        beforeEach(function (done) {
            User.collection.remove(function () {
                var userModel = new User({userName: 'existingUserName'});
                userModel.save(function () {
                    done();
                });
            });
        });

        it('add user with identified user name should pass', function (done) {
            var user = {
                userName: 'theUserName',
                givenName: 'theGivenName',
                surName: 'theSurName'
            };

            request(url)
                    .post('/users')
                    .send(user)
                    .end(function (err, res) {
                             res.status.should.eql(200);
                             res.body.should.have.property('userName', 'theUserName');
                             res.body.should.have.property('givenName', 'theGivenName');
                             res.body.should.have.property('surName', 'theSurName');
                             done();
                         });
        });

        it('add user with duplicated user name should fail', function (done) {
            var user = {
                userName: 'existingUserName'
            };

            request(url)
                    .post('/users')
                    .send(user)
                    .end(function (err, res) {
                             res.status.should.eql(500);
                             done();
                         });
        });

        it('add user without user name should fail', function (done) {
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

        it('add user with only user name should pass', function (done) {
            var user = {
                userName: 'theUserName'
            };
            request(url)
                    .post('/users')
                    .send(user)
                    .end(function (err, res) {
                             res.status.should.eql(200);
                             res.body.should.have.property('userName', 'theUserName');
                             res.body.should.not.have.property('givenName');
                             res.body.should.not.have.property('surName');
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

        it("delete user with id should delete the user", function (done) {
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

        it("update user with a different name should update the user", function (done) {
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
    });

    after(function (done) {
        mongoose.connect(config.db, function () {
            mongoose.connection.db.dropDatabase();
        });
        done();
    });
});