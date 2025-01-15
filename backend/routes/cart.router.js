const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeItem } = require('../controllers/cart.controller');


router.post('/addcart', addToCart);
router.get('/getcart/:email', getCart);
router.delete("/removeitem", removeItem);

module.exports = router;
