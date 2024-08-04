var express = require('express');
var router = express.Router();

var authControler = require('../controllers/authController')
/* GET users listing. */
router.post('/createUser',authControler.createUser);

router.post('/loginUser',authControler.loginUser);

module.exports = router;
