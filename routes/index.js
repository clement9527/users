//var express = require('express');
//var router = express.Router();
//
///* GET home page. */
//router.get('/', function (req, res) {
//    res.render('index', { title: 'Express' });
//});
//
//module.exports = router;

var mongoose = require('mongoose');
var config = require('../config/config-dev');
var app = require('../app');
mongoose.connect(config.db);
console.log("Successfully connected to mongoDB. Starting web server...");
app.start();
console.log("Successfully started web server. Waiting for incoming connections...");