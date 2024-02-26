const express = require('express');
const router = express.Router();
const Product = require('../model/Product.js');

router.post('/add-product', async (req, res) => {
  try {
    const { title, price, description, availability, categoryId } = req.body;

    if (!title || !price || !categoryId) {
      return res.status(400).json({ error: 'title, price, and categoryId are required fields.' });
    }

    // Create the product in the database
    const product = await Product.create({
      title,
      price,
      description,
      availability: availability || true, // Default to true if not provided
      CategoryId: categoryId, 
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/list-all-products-by-category/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
  
    try {
      // Retrieve products based on the provided category ID
      const products = await Product.findAll({
        where: { CategoryId: categoryId },
        attributes: ['id', 'title', 'price', 'description', 'availability'],
      });
  
      return res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products by category ID:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });

router.get('/product-details/:productId', async (req, res) => {
    const productId = req.params.productId;
  
    try {
      // Retrieve product details based on the provided product ID
      const product = await Product.findOne({
        where: { id: productId },
        attributes: ['id', 'title', 'price', 'description', 'availability'],
      });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      return res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product details by product ID:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router;
