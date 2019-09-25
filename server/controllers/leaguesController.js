var JSONService = require('../services/JSONService');

var Controller = {};

// GET: http://localhost:3000/leagues/data
Controller.getLeaguesData = (req, res) =>
{
    JSONService.readLeaguesFile(res)
};

module.exports = Controller;