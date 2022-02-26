const productModel = require('../models/proudcts');

const createProduct = async (req, res) => {
    await productModel.create();
};

module.exports = { createProduct };