/**
 * Main routes for the application
 */
const express = require('express');
const authRoutes = require('./auth');
const isAuthenticated = require('../middleware/auth');

const router = express.Router();

router.use('/', authRoutes);

/**
 * Profile API
 * Protected API - accessable only with apt login 
 */
router.get('/profile', isAuthenticated, (req, res) => {
  res.status(200).json({ message: 'This is a protected route' });
});

module.exports = router;

