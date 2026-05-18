const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Barber = require('../models/barber');

const protect = async (req, res, next) => {
  let token;

  // Check for token in authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token, return error
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required. Please provide a valid token.',
      message: 'No token provided in Authorization header'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Try to find user first
    let user = await User.findById(decoded.id);
    
    if (user) {
      req.user = user;
      req.userType = 'customer';
    } else {
      // If not user, try to find barber
      let barber = await Barber.findById(decoded.id);
      if (barber) {
        req.user = barber;
        req.userType = 'barber';
      } else {
        return res.status(401).json({
          success: false,
          error: 'Invalid token. User not found.',
          message: 'Token is valid but user/barber does not exist'
        });
      }
    }

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    let errorMessage = 'Invalid or expired token. Please login again.';
    if (error.name === 'JsonWebTokenError') {
      errorMessage = 'Invalid token format. Please provide a valid token.';
    } else if (error.name === 'TokenExpiredError') {
      errorMessage = 'Token has expired. Please login again.';
    }
    
    return res.status(401).json({
      success: false,
      error: errorMessage,
      message: error.message || 'Authentication failed'
    });
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }

    if (req.userType === 'barber' && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`
      });
    }

    next();
  };
};

// Check if user is barber
const isBarber = (req, res, next) => {
  if (req.userType !== 'barber') {
    return res.status(403).json({
      success: false,
      error: 'Access denied. Barber account required.'
    });
  }
  next();
};

// Check if user is customer
const isCustomer = (req, res, next) => {
  if (req.userType !== 'customer') {
    return res.status(403).json({
      success: false,
      error: 'Access denied. Customer account required.'
    });
  }
  next();
};

module.exports = { protect, authorize, isBarber, isCustomer };
