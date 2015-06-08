var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../config/config');
var user = require('../models/users');
var app = require('../app');

describe('routes', function() {
    //before(function(done) {
    //    mongoose.connect(config.db.test);
    //    done();
    //});

    var url = 'http://localhost:3000';
    describe('users', function() {
        it('add user with identified user name should succeed', function(done) {
            var user = {
                userName: 'theUserName',
                givenName: 'theGivenName',
                surName: 'theSurName'
            };

            request(url)
                .post('/users')
                .send(user)
                .end(function(err, res) {
                    if (err) {
                        //console.log(err.response.error);
                        throw err;
                    }
                    //should.not.exist(err);
                    //res.status.should.eql(200);
                    //res.body.should.have.property('_id');
                    //res.body.should.have.property('userName');
                    //res.body.should.have.property('givenName');
                    //res.body.should.have.property('surName');
                    done();
                });
        });

        //it('add user with duplicated user name should fail', function(done) {
        //    var user = {
        //        userName: 'theUserName',
        //        givenName: 'theGivenName',
        //        surName: 'theSurName'
        //    };
        //
        //    request(url)
        //        .post('/users')
        //        .send(user)
        //        .end(function(err, res) {
        //            should.not.exist(err);
        //            res.status.should.eql(200);
        //            request(url)
        //                .post('/users')
        //                .send(user)
        //                .end(function(err, res) {
        //                    should.not.exist(err);
        //                    res.status.should.eql(200);
        //                    done();
        //                });
        //        });
        //});
    });

    afterEach(function(done) {
        mongoose.connect(config.db.test, function() {
            mongoose.connection.db.dropDatabase();
        });
        done();
    });
});