const express = require('express');

const router = express.Router();
const Product = require('../models/product');

// all products
router.get('/', (request, response) => {
  Product.find((error, products) => {
    if (error) response.send(error);
    response.render('products', { products });
  });
});

router.get('/products/:id', (request, response) => {
  Product.findById(request.params.id, (error, product) => {
    if (error) response.send(error);
    response.render('product', { product });
  });
});

router.get('/add', (request, response) => {
  response.render('add_product');
});

router.post('/add', (request, response) => {
  const product = new Product(request.body);
  console.log('in');
  product.save((error) => {
    console.log('out');
    if (error) {
      console.log(error);
      response.send(error);
    }
    response.redirect('/');
  });
});

// edit a product
router.post('/edit/:id', (request, response) => {
  Product.findByIdAndUpdate(request.params.id, request.body, (error) => {
    if (error) {
      response.send(error);
    }
    response.redirect('/');
  });
});
router.get('/edit/:id', (request, response) => {
  Product.findById(request.params.id, (error, product) => {
    if (error) {
      response.send(error);
    }
    response.render('edit_product', { product });
  });
});

// delete a product
router.get('/remove/:id', (request, response ) => {
  Product.findByIdAndRemove(request.params.id, (error) => {
    if (error) {
      response.send(error);
    }
    response.redirect('/');
  });
});

module.exports = router;
