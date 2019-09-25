const express = require('express');
const leaguesRouter = express.Router();
var leaguesController = require('../controllers/leaguesController');

/* GET Leagues Data. */
// http://localhost:3000/leagues/data
leaguesRouter.get('/data', leaguesController.getLeaguesData);

module.exports = leaguesRouter;