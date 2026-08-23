const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters']
    },
    slug: {
      type: String,
      lowercase: true
    },
    description: {
      type: String,
      required: [true, 'Please enter product description']
    },
    brand: {
      type: String,
      required: [true, 'Please enter product brand']
    },
    category: {
      type: String,
      required: [true, 'Please select category for this product'],
      enum: [
        'Electronics',
        'Fashion',
        'Home & Kitchen',
        'Beauty & Personal Care',
        'Books',
        'Sports & Fitness',
        'Appliances',
        'Grocery'
      ]
    },
    subcategory: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
      min: [0, 'Price must be positive']
    },
    originalPrice: {
      type: Number,
      default: function () {
        return this.price;
      }
    },
    discountPercentage: {
      type: Number,
      default: 0
    },
    countInStock: {
      type: Number,
      required: [true, 'Please enter stock count'],
      min: [0, 'Stock cannot be negative'],
      default: 10
    },
    mainImage: {
      type: String,
      required: [true, 'Please provide a primary image']
    },
    images: {
      type: [String],
      default: []
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5
    },
    numReviews: {
      type: Number,
      default: 0
    },
    ratingBreakdown: {
      fiveStar: { type: Number, default: 70 },
      fourStar: { type: Number, default: 20 },
      threeStar: { type: Number, default: 5 },
      twoStar: { type: Number, default: 3 },
      oneStar: { type: Number, default: 2 }
    },
    features: {
      type: [String],
      default: []
    },
    specs: {
      type: Map,
      of: String,
      default: {}
    },
    isPrimeEligible: {
      type: Boolean,
      default: true
    },
    isDealOfTheDay: {
      type: Boolean,
      default: false
    },
    badge: {
      type: String,
      default: '' // e.g. "Best Seller", "Amazon's Choice", "Limited time deal"
    },
    freeDelivery: {
      type: Boolean,
      default: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

// Auto-calculate discount percentage before saving
productSchema.pre('save', function (next) {
  if (this.originalPrice > this.price) {
    this.discountPercentage = Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  } else {
    this.discountPercentage = 0;
    this.originalPrice = this.price;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
