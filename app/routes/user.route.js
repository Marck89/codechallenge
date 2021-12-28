module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new user
    app.post('/createusers', users.create);

    // Retrieve all user
    app.get('/getusers', users.findAll);

    // Retrieve a single user with userId
    app.get('/getusersById/:userId', users.findOne);

    // Update a user with userId
    app.put('/updateUsersById/:userId', users.update);

    // Delete a user with userId
    app.delete('/deleteUsersById/:userId', users.delete);
	
}