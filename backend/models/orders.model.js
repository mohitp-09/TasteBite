const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  order_data: {
    type: Array,
    required: true,
  },
  payment_status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',  // Status defaults to 'pending' before payment
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;
