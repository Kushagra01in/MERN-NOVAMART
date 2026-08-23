const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  updateUserRole,
  deleteUser
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

// All routes here require protect + admin
router.use(protect, admin);

router.get('/stats', getDashboardStats);
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

module.exports = router;
