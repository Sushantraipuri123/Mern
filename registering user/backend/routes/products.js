var express = require('express');
var router = express.Router();

var productController = require('../controllers/productController')

router.post('/createProduct',productController.createProduct);

router.get('/myProducts/:userId', productController.myProducts);


module.exports = router;
