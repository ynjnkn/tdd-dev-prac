const express = require('express');
const router = express.Router();
const productController = require('./controllers/products');


// [API] 상품 생성
router.get('/', productController.createProduct, (req, res) => {
    res.send();
});

module.exports = router;