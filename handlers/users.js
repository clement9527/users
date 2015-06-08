var user = require('../models/users');

function callback(res, next) {
    return function(err, data) {
        if (err) {
            return next(err);
        }
        res.json(data);
    }
}

module.exports.createUser = function(req, res, next) {
    user.create(req.body, callback(res, next));
};

module.exports.getUsers = function(req, res, next) {
    user.find(callback(res, next));
};

module.exports.getUserById = function (req, res, next) {
    user.findById(req.params.id, callback(res, next));
};

module.exports.updateUser = function (req, res, next) {
    user.findByIdAndUpdate(req.params.id, req.body, callback(res, next));
};

module.exports.deleteUser = function (req, res, next) {
    user.delete(req.params.id, callback(res, next));
};


