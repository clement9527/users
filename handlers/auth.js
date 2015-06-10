var Admin = require('../models/admin');
var jwt = require('jsonwebtoken');
var debug = require('debug')('authenticationHandler');

var failed = function(err, res, next) {
    debug(err);
    return next(err);
};

var auth = {
    authorized: function (req, res, next) {
        var secret = require('../app').get('secret');
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, secret, function (err) {
                if (err) {
                    return res.status(403).json({status: 403, error: 'Error: invalid authentication token.'});
                } else {
                    next();
                }
            });
            next();
        } else {
            res.sendStatus(403);
        }
    },

    authenticate: function (req, res) {
        var secret = require('../app').get('secret');
        var target = new Admin({email: req.body.email, password: req.body.password});
        Admin.findOne({email: target.email}, function (err, found) {
            if (err) {
                failed(res, err);
            }

            if (found) {
                if (found.password === target.password) {
                    var token = jwt.sign(found, secret, {expiresInMinutes: 10});
                    res.status(200).json({status: 200, token: token});
                } else {
                    res.status(403).json({status: 403, error: 'invalid email/password'});
                }
            } else {
                // if not found, register using the given credential.
                target.save(function (err, created) {
                    token = jwt.sign(created, secret, {expiresInMinutes: 10});
                    res.status(200).json({status: 200, token: token});
                });
            }
        });
    }
};
module.exports = auth;