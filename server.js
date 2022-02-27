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

app.use(express.json());
app.use('/api/products', productRoutes);
app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message })
});

app.listen(port, () => {
    console.log(`Running on http://${host}:${port}`);
});

module.exports = app;