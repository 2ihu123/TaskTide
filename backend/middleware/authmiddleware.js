// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretkey = process.env.SECRET_KEY;


const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ message: 'Authentication required', success: false });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, secretkey);
    req.user = decoded; 
    next(); 
  } catch (error) {
    return res.status(401).send({ message: 'Invalid token', success: false });
  }
};

module.exports = authenticate;
