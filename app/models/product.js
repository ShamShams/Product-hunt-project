const mongoose = require('mongoose');

const product = mongoose.Schema({
  name: { type: String },
  tagline: { type: String },
  url: { type: String },
  createdAt: { type: Date, default: Date.now },
  photo: { type: String },
});

module.exports = mongoose.model('Product', product);
