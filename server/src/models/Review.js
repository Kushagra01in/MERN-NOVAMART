const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating between 1 and 5'],
      min: 1,
      max: 5
    },
    title: {
      type: String,
      trim: true,
      default: ''
    },
    comment: {
      type: String,
      required: [true, 'Please add review text']
    },
    verifiedPurchase: {
      type: Boolean,
      default: true
    },
    helpfulCount: {
      type: Number,
      default: 0
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Review', reviewSchema);
