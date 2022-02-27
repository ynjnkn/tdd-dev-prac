const express = require('express');
const router = express.Router();
const productController = require('./controllers/product');


// [API] 상품 생성
router.post('/', productController.createProduct);

module.exports = router;