const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get Admin Dashboard Stats & Metrics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    // Calculate total revenue from paid or confirmed orders
    const orders = await Order.find({ status: { $ne: 'Cancelled' } });
    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

    // Count low stock items (<= 5)
    const lowStockCount = await Product.countDocuments({ countInStock: { $lte: 5 } });
    const lowStockProducts = await Product.find({ countInStock: { $lte: 5 } })
      .select('name countInStock price mainImage category')
      .limit(6);

    // Orders status distribution
    const processingOrders = await Order.countDocuments({ status: 'Processing' });
    const confirmedOrders = await Order.countDocuments({ status: 'Confirmed' });
    const shippedOrders = await Order.countDocuments({ status: 'Shipped' });
    const deliveredOrders = await Order.countDocuments({ status: 'Delivered' });
    const cancelledOrders = await Order.countDocuments({ status: 'Cancelled' });

    // Recent 6 orders
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(6);

    // Sales by Category
    const categoryStats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' }
        }
      }
    ]);

    return res.json({
      success: true,
      stats: {
        totalRevenue: Math.round(totalRevenue),
        totalOrders,
        totalProducts,
        totalUsers,
        lowStockCount,
        orderStatusCounts: {
          processing: processingOrders,
          confirmed: confirmedOrders,
          shipped: shippedOrders,
          delivered: deliveredOrders,
          cancelled: cancelledOrders
        },
        categoryStats,
        lowStockProducts,
        recentOrders
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && status !== 'All') {
      filter.status = status;
    }

    let orders = await Order.find(filter)
      .populate('user', 'name email avatar')
      .sort({ createdAt: -1 });

    if (search) {
      const s = search.toLowerCase();
      orders = orders.filter(
        o =>
          (o.trackingNumber && o.trackingNumber.toLowerCase().includes(s)) ||
          (o.user && o.user.name && o.user.name.toLowerCase().includes(s)) ||
          (o.user && o.user.email && o.user.email.toLowerCase().includes(s)) ||
          o._id.toString().includes(s)
      );
    }

    return res.json({ success: true, orders, totalOrders: orders.length });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status;
    if (status === 'Delivered') {
      order.deliveredAt = Date.now();
      order.isPaid = true;
      if (!order.paidAt) order.paidAt = Date.now();
    }

    order.statusHistory.push({
      status,
      timestamp: new Date(),
      note: note || `Status updated to ${status} by admin.`
    });

    const updatedOrder = await order.save();
    return res.json({ success: true, order: updatedOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users (Admin)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    return res.json({ success: true, users, totalUsers: users.length });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user role (Admin)
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.role = role;
    await user.save();

    return res.json({ success: true, message: `User role updated to ${role}`, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete user (Admin)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot delete your own admin account' });
    }

    await User.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  updateUserRole,
  deleteUser
};
