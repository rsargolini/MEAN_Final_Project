const express = require('express');
const detailsTeamRouter = express.Router();
var detailsTeamController = require('../controllers/detailsTeamController');

/* GET Team Details Page. */
// http://localhost:3000/detailsteam
detailsTeamRouter.get('/:id', detailsTeamController.getDetailsTeamPage); 

module.exports = detailsTeamRouter;