const express = require('express');
const router = express.Router();
const productController = require('./controllers/products');


router.get('/', productController.createProduct, (req, res) => {
    res.send();
});

module.exports = router;