const express = require('express');
const cors = require('cors');
const { mongoDB } = require('./db');  
require('dotenv').config();
const nodemailer = require('nodemailer');

// Initialize Database
mongoDB();

const app = express();

// Middleware for CORS (Recommended)
app.use(cors({
  origin: "https://taste-bite-pi.vercel.app",  // Allow only this frontend
  methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"],  // Allowed headers
}));

// Optionally, handle preflight requests for all routes
app.options("*", cors({
  origin: "https://taste-bite-pi.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


// Middleware for parsing JSON requests
app.use(express.json());

// Import routes
const itemsRoute = require('./routes/items.router');
const userRoute = require('./routes/user.router');
const orderDataRoute = require('./routes/OrdersData.router');
const cartRoute = require('./routes/cart.router')

// Test Route
app.get('/', (req, res) => {
  res.send("working");
});

// Use routes with prefixes
app.use(cors({
  origin: "https://taste-bite-pi.vercel.app",  // Restrict to frontend's domain
}));
app.use("/api", itemsRoute); // Items routes
app.use("/user", userRoute); // User routes
app.use("/order", orderDataRoute); 
app.use("/cart", cartRoute);




// Start the server
app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
