const Products = require('../models/products');

const createProduct = (req, res, next) => {
    const newProduct = Products.create(req.body);
    res
        .status(201)
        .json(newProduct);
};

module.exports = { createProduct };