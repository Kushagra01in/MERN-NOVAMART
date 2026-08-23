const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      discountPrice,
      totalPrice
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items provided' });
    }

    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city) {
      return res.status(400).json({ success: false, message: 'Shipping address is required' });
    }

    // Verify stock availability & decrement
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product ${item.name} not found` });
      }
      if (product.countInStock < item.qty) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.countInStock}`
        });
      }
      product.countInStock -= item.qty;
      await product.save();
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'Card',
      itemsPrice,
      taxPrice: taxPrice || 0,
      shippingPrice: shippingPrice || 0,
      discountPrice: discountPrice || 0,
      totalPrice,
      isPaid: paymentMethod !== 'COD',
      paidAt: paymentMethod !== 'COD' ? Date.now() : null,
      status: 'Processing',
      statusHistory: [
        {
          status: 'Processing',
          timestamp: new Date(),
          note: 'Order placed successfully and received by warehouse.'
        }
      ]
    });

    const createdOrder = await order.save();
    return res.status(201).json({ success: true, order: createdOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Check ownership or admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
    }

    return res.json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel order (if processing)
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (order.status === 'Delivered') {
      return res.status(400).json({ success: false, message: 'Delivered orders cannot be cancelled directly' });
    }

    // Restore stock
    for (const item of order.orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.countInStock += item.qty;
        await product.save();
      }
    }

    order.status = 'Cancelled';
    order.statusHistory.push({
      status: 'Cancelled',
      timestamp: new Date(),
      note: 'Order cancelled by user/admin.'
    });

    const updatedOrder = await order.save();
    return res.json({ success: true, order: updatedOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder
};
