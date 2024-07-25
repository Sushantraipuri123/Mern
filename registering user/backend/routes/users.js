var express = require('express');
var router = express.Router();

var authControler = require('../controllers/authController')
/* GET users listing. */
router.post('/createUser',authControler.createUser);

router.get('/getUser',authControler.getUser);


module.exports = router;
