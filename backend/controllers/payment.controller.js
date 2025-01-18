require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Orders = require('../models/orders.model');
const Cart = require('../models/cart.model');

const generateOrderId = () => {
  return Math.floor(1000000 + Math.random() * 9000000);  
};

const makePayment = async (req, res) => {
  try {
    const { order_data, email } = req.body;
    console.log('Received order data:', order_data);

    if (!order_data || !email) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    // Add date, time, and order ID to each item in the order_data array
    const currentDateTime = new Date().toISOString(); // Get current date and time
    const orderId = generateOrderId(); // Generate a 7-digit order ID

    // Add details to each order item
    const updatedOrderData = order_data.map((item) => ({
      ...item,
      total_price: item.price * item.qty,
      order_id: orderId,
      date: currentDateTime,
    }));

    const lineItems = updatedOrderData.map((item) => {
      if (!item.name || !item.price || !item.qty) {
        throw new Error("Missing required fields in order item");
      }

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Convert price to cents
        },
        quantity: item.qty,
      };
    });

    // Serialize and encode order data for the URL
    const encodedOrderData = encodeURIComponent(JSON.stringify(updatedOrderData));

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/order/success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(email)}&order_data=${encodedOrderData}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });

    console.log('Stripe session created:', session);

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

    // Log the session data to debug if payment is successful
    console.log('Stripe session details:', session);

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

    // Add date, time, and order ID to each order item in cartData
    const currentDateTime = new Date().toISOString();
    const orderId = generateOrderId();

    const orderDataWithDetails = cartData.order_data.map((item) => {
      const totalPrice = item.price * item.qty;  // Calculate total price
      return {
        ...item,
        total_price: totalPrice,
        order_id: orderId,  // Add 7-digit order ID to item
        date: currentDateTime,  // Add date and time to item
      };
    });

    // Log the updated order data
    console.log('Order data with details:', orderDataWithDetails);

    // Find the existing order for the user
    let existingOrder = await Orders.findOne({ email });

    if (existingOrder) {
      // Append new order data to the existing order
      existingOrder.order_data.push(...orderDataWithDetails);
      existingOrder.payment_status = 'paid'; // Update payment status
      await existingOrder.save();
      console.log('Order updated:', existingOrder);
    } else {
      // Create a new order with the date, time, and 7-digit order ID
      const newOrder = new Orders({
        email,
        order_data: orderDataWithDetails,
        payment_status: 'paid',
        order_id: orderId,  // Store the 7-digit order ID for the whole order
        order_date: currentDateTime,  // Store the order date and time
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
