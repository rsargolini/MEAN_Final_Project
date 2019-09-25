var express = require('express');
var filterTeamsRouter = express.Router();
var filterTeamsController = require('../controllers/filterTeamsController');

/* GET Filter Teams Page. */
// http://localhost:3000/filterteams
filterTeamsRouter.get('/', filterTeamsController.getFilterTeamsPage);

module.exports = filterTeamsRouter;