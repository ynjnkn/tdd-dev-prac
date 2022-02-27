const Product = require('../models/product');

const createProduct = async (req, res, next) => {
    try {
        const createdProduct = await Product.create(req.body);
        res
            .status(201)
            .json(createdProduct);
    } catch (error) {
        next(error);
    }

};

module.exports = { createProduct };