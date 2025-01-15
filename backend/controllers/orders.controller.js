const Orders = require('../models/orders.model');
const Cart = require('../models/cart.model');

// This will be triggered after the payment is successful (when redirected to success_url)
const createOrder = async (req, res) => {
  try {
    const { email, paymentStatus } = req.body; // paymentStatus is passed from the payment success response

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Get the cart data based on the email
    const cartData = await Cart.findOne({ email });
    if (!cartData) {
      return res.status(404).json({ error: "Cart not found for this email" });
    }

    // Create an order from the cart data
    const newOrder = new Orders({
      email: email,
      order_data: cartData.order_data, // Use cart data as order data
      payment_status: paymentStatus || 'pending', // Set payment status
    });

    // Save the new order
    await newOrder.save();

    // Only clear the cart if payment is successful
    if (paymentStatus === 'paid') {
      await Cart.deleteOne({ email }); // Clear cart if payment was successful
    }

    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ error: "Failed to create order" });
  }
};

module.exports = {
  createOrder
};