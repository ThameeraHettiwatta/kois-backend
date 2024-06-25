/**
 * Authentication routes for user registration and login
 */
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');
const { validate, checkEmail, checkPassword } = require('../middleware/validate');

const router = express.Router();

/**
 * Registration API
 * @bodyparameter username
 * @bodyparameter password
 * @returns Valid Response
 */
router.post('/register', validate([checkEmail, checkPassword]), async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    if (err.code === 11000) { // Duplicate key error
      res.status(409).json({ message: 'Email Id already exists' });
    } else {
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  }
});

/**
 * Login API
 * @bodyparameter username
 * @bodyparameter password
 */
router.post('/login',(req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: info.message || 'Login failed' });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
      }
      res.redirect('/profile');
    });
  })(req, res, next);
});



module.exports = router;
