// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const auth = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
    
//     if (!token) {
//       return res.status(401).json({ error: 'Access denied. No token provided.' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId).select('-password');
    
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid token.' });
//     }

//     if (user.isBanned) {
//       return res.status(403).json({ error: 'Account has been banned.' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token.' });
//   }
// };

// const adminAuth = async (req, res, next) => {
//   try {
//     await auth(req, res, () => {});
    
//     if (!req.user.isAdmin) {
//       return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
//     }
    
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Authentication failed.' });
//   }
// };

// const generateToken = (userId) => {
//   return jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN || '7d'
//   });
// };

// module.exports = { auth, adminAuth, generateToken }; 

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware: Protect routes with token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ error: 'Invalid token. User not found.' });
    }

    if (user.isBanned) {
      return res.status(403).json({ error: 'Account has been banned.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

// Middleware: Admin-only access
const adminAuth = async (req, res, next) => {
  try {
    // Token must have been verified by 'auth' earlier in middleware chain
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed.' });
  }
};

// Utility: Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

module.exports = { auth, adminAuth, generateToken };
