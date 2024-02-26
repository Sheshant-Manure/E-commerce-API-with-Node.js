const express = require('express');
const router = express.Router();
const CartItem = require('../model/CartItem.js');
const Product = require('../model/Product.js');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token (Only authenticated users can access this route)
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
  
      req.userId = decoded.id;
      next();
    });
  };
  
// Add the middleware to verify token for cart routes
router.use(verifyToken);

// Add a product to the user's cart
router.post('/add-item', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const token = req.headers.authorization;

  try {
    // Check if the product exists
    const product = await Product.findOne({ where: { id: productId } });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Add the product to the user's cart or update quantity if already in the cart
    let cartItem = await CartItem.findOne({
      where: { userId, productId },
    });

    if (cartItem) {
      // Update quantity if the product is already in the cart
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Add the product to the cart if it's not already present
      cartItem = await CartItem.create({
        userId,
        productId,
        quantity,
      });
    }

    return res.status(201).json(cartItem);
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// View the user's cart
router.get('/view-cart/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Retrieve the user's cart with product details
    const cart = await CartItem.findAll({
      where: { userId },
      include: [{ model: Product, attributes: ['id', 'title', 'price'] }],
    });

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching user cart:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update the quantity of a product in the user's cart
router.put('/update-cart-item/:cartItemId', async (req, res) => {
  const cartItemId = req.params.cartItemId;
  const { quantity } = req.body;

  try {
    // Update the quantity of the product in the cart
    const cartItem = await CartItem.findByPk(cartItemId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    return res.status(200).json(cartItem);
  } catch (error) {
    console.error('Error updating cart item:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Remove a product from the user's cart
router.delete('/remove-cart-item/:cartItemId', async (req, res) => {
  const cartItemId = req.params.cartItemId;

  try {
    // Remove the product from the cart
    const cartItem = await CartItem.findByPk(cartItemId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartItem.destroy();

    return res.status(204).json(); // No content
  } catch (error) {
    console.error('Error removing product from cart:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
