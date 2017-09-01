const express = require('express');

const router = express.Router();
const products = require('./products');

// all products
router.get('/', (request, response) => {
  response.redirect('/products');
});

router.use(products);

module.exports = router;
