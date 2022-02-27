const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product');

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

    // console.log('response.body', response.body);

    expect(response.body).toStrictEqual({ message: "Product validation failed: price: Path `price` is required., description: Path `description` is required." })
});