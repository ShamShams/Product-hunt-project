const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.get('/', (request, response) => {
  Product.find((error, products) => {
    if (error) response.send(error);
    response.render('products', { products });
  });
});

module.exports = router;
