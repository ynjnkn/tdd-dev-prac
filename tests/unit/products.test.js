const productController = require('../../controllers/products');
const Products = require('../../models/products');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product');

Products.create = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});

describe("Product Controller Create Tests", () => {
    beforeEach(() => {
        req.body = newProduct;
    });
    test("Function createProduct exists", () => {
        expect(typeof (productController.createProduct)).toBe("function");
    });
    test("Product.create is called by productController.createProduct", () => {
        productController.createProduct(req, res, next);
        expect(Products.create).toHaveBeenCalledWith(newProduct);
    });
    test("Returns 201 response code", () => {
        productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    test("Returns JSON body in the response", () => {
        Products.create.mockReturnValue(newProduct);
        productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    });
});