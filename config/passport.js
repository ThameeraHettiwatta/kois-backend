/**
 * Passport.js configuration for local strategy authentication
 */

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

/**
 * Configures Passport.js
 * @param {Object} passport - Passport object
 */
module.exports = (passport) => {
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!user || !isMatch) {
          return done(null, false, { message: 'Incorrect Email ID or Password' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
