var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var userName = {
    type: String,
    required: true,
    unique: true
};

var givenName = {
    type: String,
    required: false
};

var surName = {
    type: String,
    required: false
};

var birthday = {
    type: Date,
    required: false
};

var schema = new mongoose.Schema({
        userName: userName,
        givenName: givenName,
        surName: surName,
        DOB: birthday
    }
);
schema.plugin(uniqueValidator, { message: "Error: user with specified user name already exists" });
var User = mongoose.model('user', schema);
module.exports = User;
