module.exports.setup = function(app, handlers) {
    app.get('/', handlers.users.getUsers);
    app.get('/users', handlers.users.getUsers);
    app.get('/users:id', handlers.users.getUserById);
    app.post('/users', handlers.users.createUser);
    app.delete('/users:id', handlers.users.deleteUser);
    app.put('/users:id', handlers.users.updateUser);
};
