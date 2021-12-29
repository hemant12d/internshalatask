const router = require('express').Router();
const productController = require('../App/Controllers/productController');
const authController = require('../App/Controllers/authController')

router.use(authController.protect);
router.route('/')
.get(productController.allProducts)
.post(productController.addProduct);

router.route('/:id').get(productController.getProduct);


module.exports = router;