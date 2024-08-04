var express = require('express');
var router = express.Router();

var employeController = require('../controllers/employeController')

router.post('/createEmploye',employeController.createEmploye);

module.exports = router;