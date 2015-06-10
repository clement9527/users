var auth = require('../handlers/auth');
var express = require('express');
var router = express.Router();

router.post('/auth', auth.authenticate);
module.exports = router;
