const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: { type: String, required: true },
  qty: { type: Number, required: true, min: 1 },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number }
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
      fullName: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true, default: 'India' },
      phone: { type: String, required: true }
    },
    paymentMethod: {
      type: String,
      required: true,
      default: 'Card' // 'Card', 'COD', 'UPI', 'NetBanking'
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String }
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    discountPrice: {
      type: Number,
      default: 0.0
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false
    },
    paidAt: {
      type: Date
    },
    status: {
      type: String,
      enum: ['Processing', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Processing'
    },
    statusHistory: [
      {
        status: { type: String },
        timestamp: { type: Date, default: Date.now },
        note: { type: String }
      }
    ],
    trackingNumber: {
      type: String,
      default: function () {
        return 'NVM-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      }
    },
    estimatedDelivery: {
      type: Date,
      default: function () {
        const d = new Date();
        d.setDate(d.getDate() + 3);
        return d;
      }
    },
    deliveredAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);
