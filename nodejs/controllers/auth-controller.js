const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const Barber = require('../models/barber');
const Shop = require('../models/shop');
const { sendOTP, verifyOTP } = require('../config/auth-service');

// Generate JWT Token without expiration
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '100y'
  });
};

// @desc    Send OTP to phone number
// @route   POST /api/auth/send-otp
// @access  Public
const sendOTPHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    const { phone } = req.body;

    if (process.env.NODE_ENV === 'production' && phone !== process.env.TEST_PHONE_NUMBER) {
      const response = await sendOTP(phone);

      if (!response.success) {
        throw new Error(response.error);
      }
    }

    res.json({
      success: true,
      message: 'OTP sent successfully',
      phone: phone
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send OTP, please try again later'
    });
  }
};

// @desc    Verify OTP and return JWT token
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTPHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    const { phone, otp, isCustomer } = req.body;
    
    let userData = null;

    if (process.env.NODE_ENV === 'production' && phone !== process.env.TEST_PHONE_NUMBER) {
      const response = await verifyOTP(phone, otp);

      if (!response.success) {
        throw new Error(response.error);
      } else if (response.success && !response.valid) {
        return res.status(400).json({
          success: false,
          error: 'Invalid OTP'
        });
      }
    }
    if (isCustomer) {
      // Check if user exists as customer
      const user = await User.findOne({ phone: phone });
      
      if (user) {
        userData = {
          _id: user._id,
          phone: user.phone,
          name: user.name,
          email: user.email,
          type: 'customer',
          token: generateToken(user._id)
        };
      }
    } else {
      // Check if user exists as barber
      const barber = await Barber.findOne({ phone: phone });
      
      if (barber) {
        const populatedBarber = await Barber.findById(barber._id)
          .populate('shopId', 'name_en name_ar');
        
        userData = {
          _id: barber._id,
          phone: barber.phone,
          name: barber.name,
          email: barber.email,
          type: barber.type,
          role: barber.role,
          shop: populatedBarber.shopId,
          token: generateToken(barber._id)
        };
      }
    }
    
    res.json({
      success: true,
      message: 'OTP verified successfully',
      data: userData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Register new barber
// @route   POST /api/auth/barber/register
// @access  Public
const registerBarber = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    const { 
      name, 
      phone, 
      email, 
      profileImageUrl, 
      experience, 
      nationality, 
      type,
      shopName_en,
      shopName_ar,
      shopDescription,
      shopAddress,
      commercialRegNumber
    } = req.body;

    // Check if barber already exists
    const existingBarber = await Barber.findOne({ phone });
    if (existingBarber) {
      return res.status(400).json({
        success: false,
        error: 'Barber with this phone number already exists'
      });
    }

    let shopId = null;
    
    // If registering as shop owner, create shop first
    if (type === 'shop' && shopName_en && shopName_ar) {
      const shop = await Shop.create({
        name_en: shopName_en,
        name_ar: shopName_ar,
        description: shopDescription,
        address: shopAddress,
        commercialRegNumber
      });
      shopId = shop._id;
    }

    // Create barber
    const barber = await Barber.create({
      name,
      phone,
      email,
      profileImageUrl,
      experience,
      nationality,
      type,
      shopId,
      role: type === 'shop' ? 'admin' : 'staff'
    });

    const populatedBarber = await Barber.findById(barber._id)
      .populate('shopId', 'name_en name_ar');

    res.status(201).json({
      success: true,
      data: {
        _id: barber._id,
        name: barber.name,
        phone: barber.phone,
        type: barber.type,
        role: barber.role,
        shop: populatedBarber.shopId,
        averageRating: barber.averageRating || 0,
        totalReviews: barber.totalReviews || 0,
        token: generateToken(barber._id)
      }
    });
  } catch (error) {
    console.error('Register barber error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Barber login with phone and shop code
// @route   POST /api/auth/barber/login
// @access  Public
const loginBarber = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    const { phone, shopCode } = req.body;

    // Find barber by phone
    const barber = await Barber.findOne({ phone });
    if (!barber) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Find shop by commercial registration number
    const shop = await Shop.findOne({ commercialRegNumber: shopCode });
    if (!shop) {
      return res.status(401).json({
        success: false,
        error: 'Invalid shop code'
      });
    }

    // Check if barber is associated with this shop
    if (barber.shopId && barber.shopId.toString() !== shop._id.toString()) {
      return res.status(401).json({
        success: false,
        error: 'Barber is not associated with this shop'
      });
    }

    // If barber is not associated with any shop, associate them
    if (!barber.shopId) {
      barber.shopId = shop._id;
      barber.role = 'staff';
      await barber.save();
    }

    const populatedBarber = await Barber.findById(barber._id)
      .populate('shopId', 'name_en name_ar');

    res.json({
      success: true,
      data: {
        _id: barber._id,
        name: barber.name,
        phone: barber.phone,
        type: barber.type,
        role: barber.role,
        shop: populatedBarber.shopId,
        averageRating: barber.averageRating || 0,
        totalReviews: barber.totalReviews || 0,
        token: generateToken(barber._id)
      }
    });
  } catch (error) {
    console.error('Login barber error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

module.exports = {
  sendOTPHandler,
  verifyOTPHandler,
  registerBarber,
  loginBarber,
};
