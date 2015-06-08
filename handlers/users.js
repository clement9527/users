var User = require('../models/users');

function callback(res, next) {
    return function(err, data) {
        if (err) {
            return next(err);
        }
        res.json(data);
    }
}

var users = {
    create: function(req, res, next) {
        User.create(req.body, callback(res, next));
    },

    findAll: function(req, res, next) {
        User.find(callback(res, next));
    },

    findOne: function(req, res, next) {
        User.findById(req.params.id, callback(res, next));
    },

    update: function(req, res, next) {
        User.findByIdAndUpdate(req.params.id, req.body, callback(res, next));
    },

    delete: function(req, res, next) {
        User.delete(req.params.id, callback(res, next));
    }
};

module.exports = users;

