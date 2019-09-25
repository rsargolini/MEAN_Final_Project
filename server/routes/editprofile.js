const express = require('express');
const editProfileRouter = express.Router();
var editProfileController = require('../controllers/editProfileController');

/* GET Edit Profile Page. */
// http://localhost:3000/users/edituserprofile
editProfileRouter.get('/:id', editProfileController.getEditProfilePage);

module.exports = editProfileRouter;