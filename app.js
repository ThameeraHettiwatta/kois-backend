/**
 * Backend Implementation of the KOIS AI
 * This is page handles the configuration of the project 
 * Main application file to set up and start the server
 */
//TODO: Add various packages to implement web security best practices
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const connectDB = require('./config/database');
const passportConfig = require('./config/passport');
require('dotenv').config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
connectDB();

// Session Configuration
//TODO: Implement cookies end time in session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));

// Passport Configuration
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes'));


// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
