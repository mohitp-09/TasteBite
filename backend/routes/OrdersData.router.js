const express = require('express');
const router = express.Router();
const {makePayment, handlePaymentSuccess } = require('../controllers/payment.controller');
const {createOrder } = require('../controllers/orders.controller');

router.post('/payment',makePayment );
router.get('/success', handlePaymentSuccess);
router.post('/create', createOrder); 


module.exports = router;