const express = require('express');
const router = express.Router();
const {addOrder, myOrderData} = require('../controllers/orders.controller');
const {makePayment} = require('../controllers/payment.controller');

router.post('/addorder', addOrder);
router.post('/myorderdata', myOrderData);
router.post('/payment',makePayment )


module.exports = router;