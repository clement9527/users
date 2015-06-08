//module.exports.setup = function(app, handlers) {
//    app.get('/', handlers.users.getUsers);
//    app.get('/users', handlers.users.getUsers);
//    app.get('/users:id', handlers.users.getUserById);
//    app.post('/users', handlers.users.createUser);
//    app.delete('/users:id', handlers.users.deleteUser);
//    app.put('/users:id', handlers.users.updateUser);
//};

var express = require('express');
var users = require('../handlers/users');
var router = express.Router();
router.get('/', users.findAll);
router.get('/:id', users.findOne);
router.post('/', users.create);
router.put('/:id', users.update);
router.delete('/:id', users.delete);
module.exports = router;