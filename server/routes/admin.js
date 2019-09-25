const express = require('express');
const adminRouter = express.Router();
var adminController = require('../controllers/adminController');

/* GET Admin Page. */
// http://localhost:3000/admin
adminRouter.get('/', adminController.getAdminPage);

module.exports = adminRouter;