const productController = require('../../controllers/product');
const Product = require('../../models/product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product');

Product.create = jest.fn();
Product.find = jest.fn();

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
    })
});

describe("Product Controller Get", () => {
    test("should have a getProducts function", () => {
        expect(typeof (productController.getProducts)).toBe("function");
    });
    test("should call Product.find({})", async () => {
        await productController.getProducts(req, res, next);
        expect(Product.find).toHaveBeenCalledWith({});
    });
});