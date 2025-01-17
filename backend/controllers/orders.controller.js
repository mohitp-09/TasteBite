const Orders = require('../models/orders.model');

// Fetch order history for a user
const OrderHistory = async (req, res) => {
  try {
    const { email } = req.query; // Get email from the query parameters

    if (!email) {
      return res.status(400).json({ error: 'Email is required to fetch order history' });
    }

    // Find orders for the given email
    const orders = await Orders.findOne({ email });

    if (!orders) {
      return res.status(404).json({ error: 'No orders found for this email' });
    }

    // Respond with the order data
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching order history:', error.message);
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
};

module.exports = { OrderHistory };
