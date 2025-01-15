require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Cart = require('../models/cart.model');
const Orders = require('../models/orders.model'); // Import the Orders model

const makePayment = async (req, res) => {
  try {
    const { order_data, email } = req.body;

    if (!order_data || !email) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    // Map cart data to Stripe line items
    const lineItems = order_data.map((item) => ({
      price_data: {
        currency: "inr", // Currency
        product_data: {
          name: item.name, // Product name
        },
        unit_amount: Math.round(item.price * 100), // Convert price to cents
      },
      quantity: item.qty, // Quantity
    }));

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Payment method
      line_items: lineItems,
      mode: "payment", // Payment mode
      success_url: `http://localhost:5177/order/success?session_id={CHECKOUT_SESSION_ID}&email=${email}`, // Success URL (with session ID)
      cancel_url: "http://localhost:5177/cart", // Cancel URL
    });

    // Send session ID to frontend for redirect
    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Error creating payment session:", error.message);
    res.status(500).json({ error: "Failed to create payment session" });
  }
};

// Webhook to handle payment success
const handlePaymentSuccess = async (req, res) => {
  const { session_id, email } = req.query; // Get session_id and email from query string

  if (!session_id || !email) {
    return res.status(400).json({ error: "Invalid request: missing session ID or email" });
  }

  try {
    // Retrieve the session to check payment status
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      // Parse order data from metadata (if stored during session creation)
      const order_data = JSON.parse(session.metadata.order_data); // Optional: Adjust if needed

      // Save order to the database
      const newOrder = new Orders({
        email,
        order_data,
      });
      await newOrder.save();

      // Clear the user's cart
      await Cart.deleteOne({ email });

      res.status(200).json({ message: "Payment successful and order saved!" });
    } else {
      res.status(400).json({ error: "Payment failed" });
    }
  } catch (error) {
    console.error("Error handling payment success:", error.message);
    res.status(500).json({ error: "Failed to process payment" });
  }
};


module.exports = {
  makePayment,
  handlePaymentSuccess,
};
