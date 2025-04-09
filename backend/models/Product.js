const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  category: String,
  price: {
    type: Number,
    required: true
  },
  rating: Number,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
