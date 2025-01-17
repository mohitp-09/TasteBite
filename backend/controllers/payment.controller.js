require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Orders = require('../models/orders.model');
const Cart = require('../models/cart.model'); 

const makePayment = async (req, res) => {
  try {
    const { order_data, email } = req.body;
    console.log('Received order data:', order_data);
    if (!order_data || !email) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    // Validate that each order item has a valid price and quantity
    const lineItems = order_data.map((item) => {
      if (!item.name || !item.price || !item.qty) {
        throw new Error("Missing required fields in order item");
      }

      return {
        price_data: {
          currency: "inr", // Currency
          product_data: {
            name: item.name, // Product name
          },
          unit_amount: Math.round(item.price * 100), // Convert price to cents
        },
        quantity: item.qty, // Quantity
      };
    });

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/order/success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(email)}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });

    // Send session ID to frontend for redirect
    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Error creating payment session:", error.message);
    res.status(500).json({ error: "Failed to create payment session" });
  }
};


const handlePaymentSuccess = async (req, res) => {
  console.log('Payment success endpoint hit!');
  try {
    const { session_id, email } = req.query; // Extract session ID and email from the query string

    if (!session_id || !email) {
      return res.status(400).json({ error: 'Invalid request parameters' });
    }

    // Verify Stripe session
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (!session) {
      console.error('Stripe session not found or invalid session ID');
      return res.status(400).json({ error: 'Payment session not found' });
    }

    // Check if the payment was successful
    if (session.payment_status !== 'paid') {
      console.error('Payment status is not "paid"');
      return res.status(400).json({ error: 'Payment not verified' });
    }

    // Fetch cart items for the user
    const cartData = await Cart.findOne({ email });
    if (!cartData) {
      console.error('Cart not found for this email:', email);
      return res.status(404).json({ error: 'Cart not found for this email' });
    }

    // Find the existing order for the user
    let existingOrder = await Orders.findOne({ email });

    if (existingOrder) {
      // Append new order data to the existing order
      existingOrder.order_data.push(...cartData.order_data);
      existingOrder.payment_status = 'paid'; // Update payment status
      await existingOrder.save();
      console.log('Order updated:', existingOrder);
    } else {
      // Create a new order
      const newOrder = new Orders({
        email,
        order_data: cartData.order_data,
        payment_status: 'paid',
      });
      await newOrder.save();
      console.log('New order created:', newOrder);
    }

    // Clear the cart after order processing
    await Cart.deleteOne({ email });
    console.log('Cart cleared for email:', email);

    // Send success response
    res.status(201).json({
      message: 'Order created/updated successfully, and cart cleared.',
    });
  } catch (error) {
    console.error('Error handling payment success:', error.message);
    res.status(500).json({ error: 'Failed to handle payment success' });
  }
};






module.exports = {
  makePayment,
  handlePaymentSuccess 
};
