const express = require('express');
const router = express.Router();
const {addItems, fetchData} = require('../controllers/foodItems.controller');

router.post('/data', fetchData);
router.post('/additems', addItems);

module.exports = router;