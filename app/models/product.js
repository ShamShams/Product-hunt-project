const mongoose = require('mongoose');

const product = mongoose.Schema({
  name: { type: String, required: true },
  tagline: { type: String },
  url: { type: String, required: true },
  createdAt: { type: Date }
});

module.exports = mongoose.model('Product', product);
