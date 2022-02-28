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
        if (product) {
            return res
                .status(200)
                .json(product);
        } else {
            return res
                .status(404)
                .send();
        }
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            req.body,
            { new: true }
        )
        if (updatedProduct) {

            res
                .status(200)
                .json(updatedProduct);
        } else {
            res
                .status(404)
                .send();
        }

    } catch (error) {
        next(error);
    }
}

module.exports = { createProduct, getProducts, getProductById, updateProduct };