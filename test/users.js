'use strict';
var mongoose = require('mongoose');
var should = require('should');
var request = require('supertest');
var app  = require('../app');
var config = require('../config/config-test');
var User = require('../models/users');

mongoose.connect(config.db);
app.start();

describe('routes', function() {
    var url = 'http://localhost:3000';
    describe('POST /users', function() {
        it('add user with identified user name should pass', function(done) {
            var user = {
                userName: 'theUserName',
                givenName: 'theGivenName',
                surName: 'theSurName'
            };

            request(url)
                .post('/users')
                .send(user)
                .expect(200)
                .end(function(err, res) {
                    res.body.should.have.property('userName', 'theUserName');
                    res.body.should.have.property('givenName', 'theGivenName');
                    res.body.should.have.property('surName', 'theSurName');
                    done();
                });
        });

        it('add user with duplicated user name should fail', function(done) {
            var user = {
                userName: 'theUserName',
                givenName: 'theGivenName',
                surName: 'theSurName'
            };

            request(url)
                .post('/users')
                .send(user)
                .expect(200)
                .end(function(err, res) {
                    request(url)
                        .post('/users')
                        .send(user)
                        .end(function(err, res) {
                            should.exist(err);
                            res.status.should.eql(500);
                            done();
                        });
                });
        });

        it ('add user without user name should fail', function(done) {
            var user = {
                givenName: 'theGivenName',
                surName: 'theSurName'
            };
            request(url)
                .post('/users')
                .send(user)
                .expect(500);
            done();
        });

        it('add user with only user name should pass', function(done) {
            var user = {
                userName: 'theUserName'
            };
            request(url)
                .post('/users')
                .send(user)
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.should.have.property('userName', 'theUserName');
                    res.body.should.not.have.property('givenName');
                    res.body.should.not.have.property('surName');
                    done();
                });
        });
    });

    describe("GET /users", function() {
        var user1 = new User({userName: 'theUserName1'});
        var user2 = new User({userName: 'theUserName2'});

        before(function(done){
            user1.save();
            user2.save();
            done();
        });

        it ('find all should return all users', function(done) {
            request(url)
                .get('/users')
                .expect(200)
                .end(function(err, res){
                    console.log(res.body);
                });
            done();
        });
    });


    //describe("DELETE /users:id", function(){
    //    it ("delete user does not exist", function(done) {
    //        request(url)
    //            .del('/users?id=someId')
    //            .end(function(err, res){
    //                should.exist(err);
    //                res.status.should.eql(500);
    //            });
    //    });
    //});

    afterEach(function(done) {
        mongoose.connect(config.db, function() {
            mongoose.connection.db.dropDatabase();
        });
        done();
    });
});