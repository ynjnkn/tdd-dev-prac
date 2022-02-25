// [Dependencies]
const express = require('express');
const mongoose = require('mongoose');

// [DB]
const db = require('./db');
db();

const port = 5000;
const host = '0.0.0.0';

const app = express();
const productRoutes = require('./routes');

app.use('/api/products', productRoutes);

app.listen(port, () => {
    console.log(`Running on http://${host}:${port}`);
});