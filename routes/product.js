const express = require('express');
const router = express.Router();
const product_controller = require('../controllers/productController.js')

router.post('/add-product', product_controller.addNewProduct);
router.get('/list-all-products-by-category/:categoryId', product_controller.listAllProdsByCategory);
router.get('/product-details/:productId', product_controller.productDetails);

module.exports = router;
