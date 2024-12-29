const mongoose = require('mongoose');
const dbURl = "mongodb://127.0.0.1:27017/Tastebite";

// Connect to MongoDB
const mongoDB = async () => {
    try {
        await mongoose.connect(dbURl);
        console.log("Connected to database!!");
    } catch (err) {
        console.error("Failed to connect to database:", err);
    }
};
module.exports = { mongoDB };


