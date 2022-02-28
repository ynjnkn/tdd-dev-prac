const productController = require('../../controllers/product');
const Product = require('../../models/product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product');
const allProducts = require("../data/all-products");
const product = require('../../models/product');
const { request } = require('../../server');

Product.create = jest.fn();
Product.find = jest.fn();
Product.findById = jest.fn();
Product.findByIdAndUpdate = jest.fn();

const productId = "621b7d196a1a25ce35411712";
const updatedProduct = { name: "UPDATED NAME", description: "UPDATED DESCRIPTION" };
let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe("Product Controller Create", () => {
    beforeEach(() => {
        req.body = newProduct;
    });
    test("should have a createProduct function", () => {
        expect(typeof (productController.createProduct)).toBe("function");
    });
    test("should call Product.create", async () => {
        await productController.createProduct(req, res, next);
        expect(Product.create).toHaveBeenCalledWith(newProduct);
    });
    test("should return 201 response code", async () => {
        await productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    test("should return json body in response", async () => {
        Product.create.mockReturnValue(newProduct);
        await productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    });
    test("should handle errors", async () => {
        // MongoDB의 의존성을 없애기 위한 구문 - 시작
        const errorMessage = { message: "description property missing" };
        const rejectedPromise = Promise.reject(errorMessage);
        Product.create.mockReturnValue(rejectedPromise);
        // MongoDB의 의존성을 없애기 위한 구문 - 끝
        await productController.createProduct(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

describe("Product Controller Get", () => {
    test("should have a getProducts function", () => {
        expect(typeof (productController.getProducts)).toBe("function");
    });
    test("should call Product.find({})", async () => {
        await productController.getProducts(req, res, next);
        expect(Product.find).toHaveBeenCalledWith({});
    });
    test("should return 200 response code", async () => {
        await productController.getProducts(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
    });
    test("should return json body in response", async () => {
        Product.find.mockReturnValue(allProducts);
        await productController.getProducts(req, res, next);
        expect(res._getJSONData()).toStrictEqual(allProducts);
    });
    test("should handle errors", async () => {
        const errorMessage = { message: "error loading product list" };
        const rejectedPromise = Promise.reject(errorMessage);
        Product.find.mockReturnValue(rejectedPromise);
        await productController.getProducts(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

describe("Product Controller GetById", () => {
    test("should have a getProductById", () => {
        expect(typeof (productController.getProductById)).toBe("function");
    });
    test("should call Product.findById", async () => {
        req.params.productId = productId;
        await productController.getProductById(req, res, next);
        expect(Product.findById).toHaveBeenCalledWith(productId);
    });
    test("should return json body and status code 200", async () => {
        Product.findById.mockReturnValue(newProduct);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newProduct);
        expect(res._isEndCalled()).toBeTruthy();
    });
    test("should return status code 404 when item does not exist", async () => {
        Product.findById.mockReturnValue(null);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled).toBeTruthy();
    });
    test("should handle errors", async () => {
        const errorMessage = { message: "error" };
        const rejectedPromise = Promise.reject(errorMessage);
        Product.findById.mockReturnValue(rejectedPromise);
        await productController.getProductById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

describe("Product Controller Update", () => {
    test("should have an updateProduct", () => {
        expect(typeof (productController.updateProduct)).toBe("function");
    });
    test("should call Product.findByIdAndUpdate", async () => {
        req.params.productId = productId;
        req.body = updatedProduct;
        await productController.updateProduct(req, res, next);
        expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
            productId,
            updatedProduct,
            { new: true },
        )
    });
    test("should return json body and status code 200", async () => {
        req.params.productId = productId;
        req.body = updatedProduct;
        Product.findByIdAndUpdate.mockReturnValue(updatedProduct);
        await productController.updateProduct(req, res, next);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(updatedProduct);
    });
    test("should return status code 404 when item does not exist", async () => {
        Product.findByIdAndUpdate.mockReturnValue(null);
        await productController.updateProduct(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
    test("should handle errors", async () => {
        const errorMessage = { message: "error" };
        const rejectedPromise = Promise.reject(errorMessage);
        Product.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await productController.updateProduct(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});