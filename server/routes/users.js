var express = require('express');
var usersRouter = express.Router();
var usersController = require('../controllers/usersController');

/* GET User Profile Data by User Name. */
// http://localhost:3000/users/:id
usersRouter.get('/data/:id', usersController.getUserData);

/* GET All Non-Admin User Profile Data. */
// http://localhost:3000/users/
usersRouter.get('/data', usersController.getAllUserData);

/* POST Login. */
// http://localhost:3000/users/login
usersRouter.post('/login', usersController.postUserLogin);

/* POST Register. */
// http://localhost:3000/users/register
usersRouter.post('/register', usersController.createUserProfile);

/* PUT User Profile Data. */
// http://localhost:3000/users/:id
usersRouter.put('/data/:id', usersController.updateUserProfile);

/* DELETE User Profile Data. */
// http://localhost:3000/users/:id
usersRouter.delete('/data/:id', usersController.deleteUserProfile);

module.exports = usersRouter;