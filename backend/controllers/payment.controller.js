const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const makePayment = async (req, res) => {
  try {
    const { order_data } = req.body;

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
      success_url: "http://localhost:3000/success", // Success URL
      cancel_url: "http://localhost:3000/cancel", // Cancel URL
    });

    res.status(200).json({ id: session.id }); // Send session ID to frontend
  } catch (error) {
    console.error("Error creating payment session:", error.message);
    res.status(500).json({ error: "Failed to create payment session" });
  }
};

module.exports = {
  makePayment,
};
