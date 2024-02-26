const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const order_controller = require('../controllers/orderController.js')

// Middleware to verify JWT token
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

router.use(verifyToken);

// Place an order using products from the user's cart
router.post('/place-order', order_controller.placeOrder);
// Fetch order history for the authenticated user
router.get('/order-history', order_controller.fetchOrderHistory);
// Fetch detailed information of a specific order by its ID
router.get('/order-details/:orderId', order_controller.fetchOrderDetails);
  
module.exports = router;