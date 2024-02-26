const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const CartItem = require('../model/CartItem.js');
const Order = require('../model/Order.js');

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
router.post('/place-order', async (req, res) => {
  const userId = req.userId;

  try {
    // Retrieve the user's cart with product details
    const cart = await CartItem.findAll({
      where: { userId },
      include: [{ model: Product, attributes: ['id', 'title', 'price'] }],
    });

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty. Cannot place an order.' });
    }

    // Calculate total order amount based on products in the cart
    const totalAmount = cart.reduce((total, cartItem) => {
      return total + cartItem.Product.price * cartItem.quantity;
    }, 0);

    // Create a new order
    const order = await Order.create({
      userId,
      totalAmount,
    });

    // Associate products from the cart with the order
    await Promise.all(
      cart.map(async (cartItem) => {
        await order.addProduct(cartItem.Product, { through: { quantity: cartItem.quantity } });
      })
    );

    // Clear the user's cart after placing the order
    await CartItem.destroy({ where: { userId } });

    return res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
  } catch (error) {
    console.error('Error placing order:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Fetch order history for the authenticated user
router.get('/order-history', async (req, res) => {
    const userId = req.userId;
  
    try {
      // Retrieve the order history for the authenticated user
      const orderHistory = await Order.findAll({
        where: { userId },
        // You can include additional fields or associations based on your model relationships
      });
  
      return res.status(200).json(orderHistory);
    } catch (error) {
      console.error('Error fetching order history:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Fetch detailed information of a specific order by its ID
router.get('/order-details/:orderId', async (req, res) => {
    const userId = req.userId;
    const orderId = req.params.orderId;
  
    try {
      // Retrieve the specific order by ID and associated user
      const order = await Order.findOne({
        where: { id: orderId, userId },
        // You can include additional fields or associations based on your model relationships
      });
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      return res.status(200).json(order);
    } catch (error) {
      console.error('Error fetching order details:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
module.exports = router;