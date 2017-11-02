const express = require('express');
const path = require('path');
const multer = require('multer');

const Product = require('../models/product');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, path.resolve('app', 'public', 'uploads'));
  },
  filename: (request, file, callback) => {
    callback(null, `${request.body.name.toLowerCase()}.${file.originalname.split('.')[1]}`); // nom du fichier image. split va séparer le nom de l'extension et on ne garde que l'extension ([1])
  },
});

const upload = multer({ storage });

// Afficher la liste des produits
router.get('/products', (request, response) => {
  Product.find({}, (error, products) => {
    if (error) response.send(error);
    response.render('products', { products });
    // response.json(products);
  });
});

// Afficher la page d'un produit
router.get('/products/:id', (request, response) => {
  Product.findById(request.params.id, (error, product) => {
    if (error) response.send(error);
    response.render('product', { product });
    // response.json(product);
  });
});

// Ajouter un produit -> Afficher le formulaire d'ajout
router.get('/add', (request, response) => {
  response.render('add_product');
});
// -> Enregistrer le nouveau produit et rediriger vers la liste des produits
router.post('/add', upload.single('photo'), (request, response) => {
  const product = new Product(request.body);
  product.photo = `/${request.file.destination.split('/').pop()}/${request.file.filename}`; // le nom que le fichier aura dans la db pour pouvoir la display.
  product.save((error) => {
    if (error) response.send(error);
    response.redirect('/products'); // TODO: Faire apparaitre la page du produit au lieu de la liste.
    // response.json(product);
  });
  console.log(product.photo);
});

// Editer un produit* -> Enregistrer les modifications et rediriger vers la page produit
router.post('/edit/:id', upload.single('photo'), (request, response) => {
  Product.findByIdAndUpdate(request.params.id, request.body, (error) => {
    // request.body.photo = `/${request.file.destination.split('/').pop()}/${request.file.filename}`;
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

// *À cause de la mauvaise implémentation des méthodes HTTP (pour Ajax) par certains navigateurs (et la norme HTML qui ne supporte que les méthodes GET et POST pour les formulaires), cette méthode est souvent utilisée en remplacement de la requête PUT, qui devrait être utilisée pour la mise à jour de ressources.
