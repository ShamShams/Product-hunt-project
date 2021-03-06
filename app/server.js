const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes/index');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/products', () => {
  // console.log('Connecté à mongo');
});

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(router);

app.listen(3002, () => {
  console.log('Server connected!');
});
