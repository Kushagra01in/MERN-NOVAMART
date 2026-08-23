const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getFeaturedAndDeals,
  createProductReview,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getProducts);
router.get('/featured/deals', getFeaturedAndDeals);
router.get('/:id', getProductById);
router.post('/:id/reviews', protect, createProductReview);

// Admin product endpoints
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
