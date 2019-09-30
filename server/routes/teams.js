const express = require('express');
const teamsRouter = express.Router();
var teamsController = require('../controllers/teamsController');

/* Get One Teams Data by ID. */
// http://localhost:3000/teams/data/:id
teamsRouter.get('/data/:id', teamsController.getTeamData);

/* GET All Teams Data. */
// http://localhost:3000/teams/data
teamsRouter.get('/data', teamsController.getTeamsData);

/* DELETE Team Data. */
// http://localhost:3000/teams/data/:id
teamsRouter.delete('/data/:id', teamsController.deleteTeamData);

module.exports = teamsRouter;