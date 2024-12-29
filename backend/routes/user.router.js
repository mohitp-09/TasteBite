const express = require('express');
const router = express.Router();
const {addUser,userLogin} = require('../controllers/user.controller');

router.post('/signup', addUser);
router.post('/signin', userLogin);

module.exports = router;