var express = require('express');
var User = require('../models/user.js');

var router = express.Router();

/* GET users listing. */
var crudErrorHandler = function (err, data) {
    if (err) {
        return next(err);
    }
    res.json(data);
};

var getUserCallback = function (req, res, next) {
    User.find(crudErrorHandler);
};

var createUserCallback = function (req, res, next) {
    User.create(req.body, crudErrorHandler);
};

var getUserByIdCallback = function (req, res, next) {
    User.findById(req.params.id, crudErrorHandler);
};

var updateUserCallback = function (req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, crudErrorHandler);
};

var deleteUserCallback = function (req, res, next) {
    User.delete(req.params.id, crudErrorHandler);
};

router.get('/', getUserCallback);
router.get('/:id', getUserByIdCallback);

router.post('/', createUserCallback);
router.post('/:id', updateUserCallback);

router.delete('/:id', deleteUserCallback);

module.exports = router;
