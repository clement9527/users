var express = require('express');
var auth = require('../handlers/auth');
var users = require('../handlers/users');
var router = express.Router();

router.get('/', auth.authorized, users.findAll);
router.get('/:id', auth.authorized, users.findOne);
router.post('/', auth.authorized, users.create);
router.put('/:id', auth.authorized, users.update);
router.delete('/:id', auth.authorized, users.delete);
module.exports = router;