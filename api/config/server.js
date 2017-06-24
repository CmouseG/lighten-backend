module.exports = {
    port: 80,
    routes: [
        {
            path: '/api/user/create',
            method: 'POST',
            handler: 'UserController.create'
        }
    ]
};
