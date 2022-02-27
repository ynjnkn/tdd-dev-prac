const express = require('express');
const router = express.Router();
const productController = require('./controllers/product');


// [API] 상품 생성
router.post('/', productController.createProduct);

// [API] 상품 목록 조회
router.get('/', productController.getProducts);

// [API] 상품 조회
router.get('/:productId', productController.getProductById);

module.exports = router;