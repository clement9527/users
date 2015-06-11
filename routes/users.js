var express = require('express');
var auth = require('../handlers/auth');
var users = require('../handlers/users');
var router = express.Router();

router.get('/users', auth.authorized, users.findAll);
router.get('/users/:id', auth.authorized, users.findOne);
router.post('/users', auth.authorized, users.create);
router.put('/users/:id', auth.authorized, users.update);
router.delete('/users/:id', auth.authorized, users.delete);
module.exports = router;