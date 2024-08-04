var express = require('express');
var router = express.Router();
const signUpSchema = require('../validstor/auth-validator')
const valiidate = require('../middleware/validator-middleware')
const authMiddleware = require('../middleware/auth-middleware')

var authControler = require('../controllers/authController')
/* GET users listing. */

router.post('/createUser',valiidate(signUpSchema), authControler.createUser);

router.get('/getUser',authControler.getUser);

router.post('/loginUser',authControler.loginUser);

router.get('/user',authMiddleware,authControler.user);



module.exports = router;
