const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  order_data: {
    type: Array,
    required: true,
  },
});

const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;
