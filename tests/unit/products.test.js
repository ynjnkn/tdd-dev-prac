const productController = require('../../controllers/products');
const productModel = require('../../models/proudcts');

productModel.create = jest.fn();

describe("Product Controller Create", () => {
    test("Function createProduct exists", () => {
        expect(typeof (productController.createProduct)).toBe("function");
    });

    test("Product.create is called by productController.createProduct", () => {
        productController.createProduct();
        expect(productModel.create).toBeCalled();
    });
});