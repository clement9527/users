var express = require('express');
var users = require('../handlers/users');
var router = express.Router();
router.get('/', users.findAll);
router.get('/:id', users.findOne);
router.post('/', users.create);
router.put('/:id', users.update);
router.delete('/:id', users.delete);
module.exports = router;