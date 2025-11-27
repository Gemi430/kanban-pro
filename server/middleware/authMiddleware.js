// server/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;

  // 1. Check if the token exists in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (removes 'Bearer ')
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify token and decode it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Attach user data to the request (Excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Move to the next middleware or controller
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default  protect  ;