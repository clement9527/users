'use strict';
var mongoose = require('mongoose');
var app  = require('../../app');
var config = require('../../configs/config-test');

var port = 3001;
mongoose.connect(config.db);
app.listen(config.port);
var url = 'http://localhost:' + config.port;

