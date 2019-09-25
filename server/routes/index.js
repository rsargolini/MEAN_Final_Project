var express = require('express');
var indexRouter = express.Router();
var indexController = require('../controllers/indexController');

/* GET Home Page. */
// http://localhost:3000
indexRouter.get('/', indexController.getIndexPage);

module.exports = indexRouter;
