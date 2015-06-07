var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    userName: String,
    givenName: String,
    surName: String,
    DOB: Date
});
module.exports = mongoose.model('user', userSchema);