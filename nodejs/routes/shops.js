const express = require('express');
const router = express.Router();
const { protect, isBarber } = require('../middleware/auth');

// Import all shop controller functions
const {
  // Customer routes
  getAllShops,
  getShopById,
  getShopWithBarbers,
  getNearbyShops,
  getHomeServiceBarbers,
  getShopServices,
  createShop,
  updateShop,
  deleteShop,
  
  // Barber routes
  getShopDetails,
  getBarberShops,
  updateShopBarber,
  updateShopGallery,
  updateShopPreviewImage,
  removeShopGalleryImage,
  createService,
  updateService,
  deleteService
} = require('../controllers/shopController');

// Import validation
const { shopValidation } = require('../middleware/validation');

// ===== CUSTOMER ROUTES (Public) =====

// @route   GET /api/shops
// @desc    Get all shops (shallow list for customer)
// @access  Public
router.get('/', getAllShops);

// @route   GET /api/shops/nearby
// @desc    Get nearby shops with pagination
// @access  Public
router.get('/nearby', getNearbyShops);

// @route   GET /api/shops/home-service-barbers
// @desc    Get home service barbers
// @access  Public
router.get('/home-service-barbers', getHomeServiceBarbers);

// @route   GET /api/shops/:id
// @desc    Get single shop with full details (customer view)
// @access  Public
router.get('/:id', getShopById);

// @route   GET /api/shops/:id/barbers
// @desc    Get shop with barbers
// @access  Public
router.get('/:id/barbers', getShopWithBarbers);

// @route   GET /api/shops/:id/services
// @desc    Get shop services
// @access  Public
router.get('/:id/services', getShopServices);

// ===== BARBER ROUTES (Private) =====

// @route   GET /api/shops/barber/:barberId
// @desc    Get all shops for a barber
// @access  Private (Barber only)
router.get('/barber/:barberId', protect, isBarber, getBarberShops);

// @route   POST /api/shops
// @desc    Create new shop
// @access  Private (Barber only)
router.post('/', protect, isBarber, shopValidation.createShop, createShop);

// @route   PUT /api/shops/:id
// @desc    Update shop details
// @access  Private (Barber admin only)
router.put('/:id', protect, isBarber, shopValidation.updateShop, updateShopBarber);

// @route   DELETE /api/shops/:id
// @desc    Delete shop
// @access  Private (Barber admin only)
router.delete('/:id', protect, isBarber, deleteShop);

// @route   PUT /api/shops/:id/gallery
// @desc    Update shop gallery images
// @access  Private (Barber admin only)
router.put('/:id/gallery', protect, isBarber, updateShopGallery);

// @route   PUT /api/shops/:id/preview-image
// @desc    Update shop preview image
// @access  Private (Barber admin only)
router.put('/:id/preview-image', protect, isBarber, updateShopPreviewImage);

// @route   DELETE /api/shops/:id/gallery/:imageUrl
// @desc    Remove image from shop gallery
// @access  Private (Barber admin only)
router.delete('/:id/gallery/:imageUrl', protect, isBarber, removeShopGalleryImage);

// @route   POST /api/shops/:shopId/services
// @desc    Create a new service
// @access  Private (Barber admin only)
router.post('/:shopId/services', protect, isBarber, createService);

// @route   PUT /api/shops/:shopId/services/:serviceId
// @desc    Update a service
// @access  Private (Barber admin only)
router.put('/:shopId/services/:serviceId', protect, isBarber, updateService);

// @route   DELETE /api/shops/:shopId/services/:serviceId
// @desc    Delete a service
// @access  Private (Barber admin only)
router.delete('/:shopId/services/:serviceId', protect, isBarber, deleteService);

module.exports = router;
