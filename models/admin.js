var mongoose = require('mongoose');
var validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');

var email = {
    type: String,
    unique: true,
    required: true
};

var password = {
    type: String,
    require: true
};

var token = {
    type: String
};

var schema = new mongoose.Schema({
    email: email,
    password: password,
    token: token
});

schema.plugin(uniqueValidator);

var Admin = mongoose.model('schema', schema);

Admin.schema.path('email').validate(function(value) {
   return validator.isEmail(value);
}, "Invalid email address");

module.exports = Admin;