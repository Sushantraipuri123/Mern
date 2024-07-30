var express = require('express');
var router = express.Router();
const signUpSchema = require('../validstor/auth-validator')
const valiidate = require('../middleware/validator-middleware')

var authControler = require('../controllers/authController')
/* GET users listing. */

router.post('/createUser',valiidate(signUpSchema), authControler.createUser);

router.get('/getUser',authControler.getUser);

router.post('/loginUser',authControler.loginUser);


module.exports = router;
