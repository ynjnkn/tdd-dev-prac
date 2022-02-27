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

const getProducts = async (req, res, next) => {
    try {
        const allProducts = await Product.find({});
        res.
            status(200)
            .json(allProducts);
    } catch (error) {
        next(error);
    }
}

const getProductById = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        res.send(product);
    } catch (error) {
        next(error);
    }
}

module.exports = { createProduct, getProducts, getProductById };