const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Cart = require('../models/cart.model');
const Order = require('../models/orders.model');

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Ensure the payment was successful
      if (session.payment_status === 'paid') {
        const order = new Order({
          email: session.customer_email,
          order_data: JSON.parse(session.metadata.order_data), // You would store order data when creating the session
          status: 'paid',
        });

        // Save the order to the database
        await order.save();

        // Clear the user's cart
        await Cart.deleteOne({ email: session.customer_email });

        res.status(200).send('Payment successful, order saved, and cart cleared.');
      }
    } else {
      res.status(400).send('Unexpected event type');
    }
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Internal server error');
  }
};

module.exports = { handleStripeWebhook };
