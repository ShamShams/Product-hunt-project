const mongoose = require('mongoose');

const product = mongoose.Schema({
  name: String,
  tagline: String,
  url: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', product);
