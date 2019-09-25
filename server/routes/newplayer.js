var express = require('express');
var newPlayerRouter = express.Router();
var newPlayerController = require('../controllers/newPlayerController');

/* GET New Team Page. */
// http://localhost:3000/newplayer
newPlayerRouter.get('/:id', newPlayerController.getNewPlayerPage);

module.exports = newPlayerRouter;