const express = require('express');
const path = require('path');
const multer = require('multer');

const router = express.Router();
const Product = require('../models/product');

// const storage = multer.diskStorage({
//   destination: (request, file, callback) => {
//     callback(null, path.resolve(__dirname, 'public', 'upload')),
//   },
//   filename: (request, file, callback) => {
//     callback(null, `${request.body.name}.${file.originalname.split('.')[1]}`); // Va séparer le nom de l'extension et on ne garde que l'extension.
//   },
// });
//
// const upload = multer({
//   storage
// });

// Afficher la liste des produits
router.get('/products', (request, response) => {
  Product.find({}, (error, products) => {
    if (error) response.send(error);
    response.render('products', { products });
  });
});

// Afficher la page d'un produit
router.get('/products/:id', (request, response) => {
  Product.findById(request.params.id, (error, product) => {
    if (error) response.send(error);
    response.render('product', { product });
  });
});

// Ajouter un produit -> Afficher le formulaire d'ajout
router.get('/add', (request, response) => {
  response.render('add_product');
});
// -> Enregistrer le nouveau produit et rediriger vers la liste des produits
router.post('/add', (request, response) => {
  // upload.single('photo') -> après '/add',
  const product = new Product(request.body);
  // product.photo
  product.save((error) => {
    if (error) response.send(error);
    response.redirect('/products');
  });
});

// Editer un produit -> Enregistrer les modifications et rediriger vers la page produit
router.post('/edit/:id', (request, response) => {
  Product.findByIdAndUpdate(request.params.id, request.body, (error) => {
    if (error) response.send(error);
    response.redirect(`/products/${request.params.id}`);
  });
});
// -> Afficher la vue edit_product (formulaire d'édition du produit)
router.get('/edit/:id', (request, response) => {
  Product.findById(request.params.id, (error, product) => {
    if (error) response.send(error);
    response.render('edit_product', { product });
  });
});

// Supprimer un produit et rediriger vers la liste des produits.
router.get('/remove/:id', (request, response) => {
  Product.findByIdAndRemove(request.params.id, (error) => {
    if (error) response.send(error);
    response.redirect('/products');
  });
});

module.exports = router;
