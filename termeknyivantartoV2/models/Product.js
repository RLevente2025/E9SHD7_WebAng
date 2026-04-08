const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Product = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    default: ''
  }
}, {
  collection: 'products'
});

module.exports = mongoose.model('Product', Product);
