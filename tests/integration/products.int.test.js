const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product.json');
const allProducts = require('../data/all-products.json');

test("POST /api/products", async () => {
    const response = await request(app)
        .post('/api/products')
        .send(newProduct);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.description).toBe(newProduct.description);
});

test('should return 500 on POST /api/products', async () => {
    const response = await request(app)
        .post('/api/products')
        .send({
            name: 'phone',
        })
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({ message: "Product validation failed: price: Path `price` is required., description: Path `description` is required." })
});

test('GET /api/products', async () => {
    const response = await request(app)
        .get('/api/products')
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();
    expect(response.body[0].description).toBeDefined();
    firstProduct = response.body[0]
});

test("GET /api/products/:productId", async () => {
    const response = await request(app)
        .get(`/api/products/${firstProduct._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(firstProduct.name);
    expect(response.body.description).toBe(firstProduct.description);
});

test("should return status code 404 in case queried item does not exist in GET id does not exist /api/products/:productId", async () => {
    const response = await request(app)
        .get('/api/products/621bb2d73fda721a2c60480d');
    expect(response.statusCode).toBe(404);
});

test("PUT /api/products", async () => {
    const response = await request(app)
        .put(`/api/products/${firstProduct._id}`)
        .send({ name: "UPDATED NAME", description: "UPDATED DESCRIPTION" });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("UPDATED NAME");
    expect(response.body.description).toBe("UPDATED DESCRIPTION");
});

test("should return status code 404 in case queried item does not exist in PUT /api/products/:productId", async () => {
    const response = await request(app)
        .put('/api/products/621bb2d73fda721a2c60480d')
        .send({ name: "UPDATED NAME", description: "UPDATED DESCRIPTION" })
    expect(response.statusCode).toBe(404);
});