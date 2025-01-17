const express = require('express');
const router = express.Router();
const {makePayment, handlePaymentSuccess  } = require('../controllers/payment.controller');
const {OrderHistory } = require('../controllers/orders.controller');

router.post('/payment',makePayment );
router.get('/success', handlePaymentSuccess);
router.get('/history', OrderHistory);


module.exports = router;