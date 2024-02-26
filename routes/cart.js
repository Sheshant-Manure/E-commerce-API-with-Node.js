const express = require('express');
const router = express.Router();
const cart_controller = require('../controllers/cartController.js')
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
router.post('/add-item', cart_controller.addItemToCart);
// View the user's cart
router.get('/view-cart/:userId', cart_controller.viewCart);
// Update the quantity of a product in the user's cart
router.put('/update-cart-item/:cartItemId', cart_controller.updateQuantity);
// Remove a product from the user's cart
router.delete('/remove-cart-item/:cartItemId', cart_controller.removeItemFromCart);

module.exports = router;
