'use strict';
var mongoose = require('mongoose');
var request = require('supertest');
var should = require('should');
var app  = require('../../app');
var Admin = require('../../models/admin');
var config = require('../../configs/config-test');

mongoose.connect(config.db);
app.listen(config.port);
app.set('secret', config.secret);
app.set('timeoutInMin', config.timeoutInMin);

var url = 'http://localhost:' + config.port;
describe('Authenticate', function () {
    describe('POST /auth', function() {
        var existingAdmin = new Admin({email: 'another@email.com', password: 'password'});

        before(function(done){
            existingAdmin.save(function() {
                done();
            });
        });

        it('POST /auth with unregistered email and password will register the email, returning status 200 and authentication token', function(done) {
            request(url)
                    .post('/auth')
                    .send({email: 'test@email.com', password: 'password'})
                    .end(function(err, res) {
                             res.status.should.eql(200);
                             res.body.should.have.property('token');
                             Admin.findOne({email: 'test@email.com'}, function(err, result){
                                 result.password.should.eql('password');
                                 done();
                             });
                         });
        });

        it('POST /auth with registered email but invalid password will return status 403', function(done) {
            request(url)
                    .post('/auth')
                    .send({email: existingAdmin.email, password: 'invalid_password'})
                    .end(function(err, res) {
                             res.status.should.eql(403);
                             done();
                         });

        });

        it('POST /auth with registered email and valid password will return status 200 and authentication token', function(done) {
            request(url)
                    .post('/auth')
                    .send({email: existingAdmin.email, password: existingAdmin.password})
                    .end(function(err, res) {
                             res.status.should.eql(200);
                             done();
                         });

        });
    });
});

