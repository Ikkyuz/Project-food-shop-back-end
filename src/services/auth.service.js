// services/auth.service.js
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key';

const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };