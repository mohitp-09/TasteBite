const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const { mongoDB } = require('./db');  

// Initialize Database
mongoDB();

const app = express();

// Middleware for CORS (Recommended)
app.use(
  cors({
    origin: "http://localhost:5177", // Allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Middleware for parsing JSON requests
app.use(express.json());

// Import routes
const itemsRoute = require('./routes/items.router');
const userRoute = require('./routes/user.router');

// Test Route
app.get('/', (req, res) => {
  res.send("working");
});

// Use routes with prefixes
app.use("/api", itemsRoute); // Items routes
app.use("/user", userRoute); // User routes

// Start the server
app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
