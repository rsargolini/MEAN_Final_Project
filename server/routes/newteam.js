var express = require('express');
var newTeamRouter = express.Router();
var newTeamController = require('../controllers/newTeamController');

/* GET New Team Page. */
// http://localhost:3000/newteam
newTeamRouter.get('/', newTeamController.getNewTeamPage);

module.exports = newTeamRouter;