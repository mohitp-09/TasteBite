
const createUser = require("../models/user.model");
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_secret = process.env.JWT_SECRET

const bcrypt = require("bcryptjs");

// create user
const addUser = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      const user = await createUser.create({...req.body, password:secPassword});
      res.status(200).json({ user, success: true });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// sign in user
const userLogin = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      // Find user by email
      const userData = await createUser.findOne({ email });
      if (!userData) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Check password
      const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
      if (!pwdCompare) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const data = {
        user:{
          id:userData.id
        }
      }
      const authToken = jwt.sign(data, JWT_secret);
      res.status(200).json({ success: true, authToken: authToken});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

module.exports = {
  addUser,
  userLogin,
};
