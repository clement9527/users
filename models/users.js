var mongoose = require('mongoose');
var user = new mongoose.Schema({
    id: ObjectId,
    userName: String,
    givenName: String,
    surName: String,
    DOB: Date
});
module.exports = mongoose.model('user', user);
