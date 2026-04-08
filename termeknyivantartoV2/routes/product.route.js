const express = require('express');
const ProductRoutes = express.Router();
let Product = require('../models/Product');

// get all products
ProductRoutes.route('/getProducts').get(function (req, res) {
  Product.find()
    .then(products => res.json(products))
    .catch(err => {
      console.log(err);
      res.status(500).send('Error fetching products');
    });
});

// add a new product
ProductRoutes.route('/addProduct').post(function (req, res) {
  let product = new Product(req.body);
  product.save()
    .then(() => {
      res.status(200).json({ message: 'Product added successfully' });
    })
    .catch(err => {
      res.status(400).send('Could not save to database');
    });
});

// delete a product by id
ProductRoutes.route('/deleteProduct/:id').get(function (req, res) {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json('Deleted successfully'))
    .catch(err => res.status(500).json(err));
});

module.exports = ProductRoutes;
