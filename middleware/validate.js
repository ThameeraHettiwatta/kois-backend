/**
 * Custom validation middleware for user registration and login.
 * @param {Array} validations - Array of validation functions.
 * @returns {Function} Middleware function.
 */
const validate = (validations) => {
    return (req, res, next) => {
      const errors = validations
        .map(validation => validation(req))
        .filter(error => error !== null);
  
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      next();
    };
  };
  
/**
 * Validates username
 * @param {Object} req - Request object
 * @returns {Object|null} Error object or null if valid
 */
  const checkEmail = (req) => {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { username } = req.body;
    if(!regex.test(username)){
      return { msg: 'Username is not a valid email Id. Please enter a valid Email Id' };
    }
    return null;
  };
  
/**
 * Validates password
 * @param {Object} req - Request object
 * @returns {Object|null} Error object or null if valid
 */
  const checkPassword = (req) => {
    const { password } = req.body;
    if (!password || typeof password !== 'string' || password.length < 8) {
      return { msg: 'Password must be at least 8 characters long' };
    }
    if (!/\d/.test(password)) {
      return { msg: 'Password must contain a number' };
    }
    return null;
  };
  
  module.exports = {
    validate,
    checkEmail,
    checkPassword,
  };
  