const express = require('express');
const router = express.Router();
const productController = require('./controllers/product');
const product = require('./models/product');


// [API] 상품 생성
router.post('/', productController.createProduct);

// [API] 상품 목록 조회
router.get('/', productController.getProducts);

// [API] 상품 조회
router.get('/:productId', productController.getProductById);

// [API] 상품 업데이트
router.put('/:productId', productController.updateProduct);

module.exports = router;