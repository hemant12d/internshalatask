const router = require('express').Router();
const productController = require('../App/Controllers/productController');


router.route('/').get(productController.allProducts).post(productController.addProduct);


// router.route('/:id').get(productController.getUser);


module.exports = router;