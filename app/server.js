const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes/index');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view-engine', 'pug');

app.use(router);

app.listen(3002, () => {
  console.log('Server connected!');
});
