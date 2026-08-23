const Product = require('../models/Product');
const Review = require('../models/Review');

// @desc    Fetch all products with filtering, search, sorting & pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.limit) || 12;
    const page = Number(req.query.page) || 1;

    // Search query
    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: 'i' } },
            { description: { $regex: req.query.keyword, $options: 'i' } },
            { brand: { $regex: req.query.keyword, $options: 'i' } },
            { category: { $regex: req.query.keyword, $options: 'i' } }
          ]
        }
      : {};

    // Filter by Category
    const category = req.query.category && req.query.category !== 'All'
      ? { category: req.query.category }
      : {};

    // Filter by Brand
    const brand = req.query.brand
      ? { brand: { $regex: req.query.brand, $options: 'i' } }
      : {};

    // Filter by Price range
    const minPrice = req.query.minPrice ? Number(req.query.minPrice) : 0;
    const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : Number.MAX_SAFE_INTEGER;
    const priceFilter = { price: { $gte: minPrice, $lte: maxPrice } };

    // Filter by Rating
    const minRating = req.query.rating ? { rating: { $gte: Number(req.query.rating) } } : {};

    // Filter by Prime / Deals
    const primeFilter = req.query.prime === 'true' ? { isPrimeEligible: true } : {};
    const dealFilter = req.query.deals === 'true' ? { isDealOfTheDay: true } : {};
    const badgeFilter = req.query.badge ? { badge: req.query.badge } : {};
    const inStockFilter = req.query.inStock === 'true' ? { countInStock: { $gt: 0 } } : {};

    const filterQuery = {
      ...keyword,
      ...category,
      ...brand,
      ...priceFilter,
      ...minRating,
      ...primeFilter,
      ...dealFilter,
      ...badgeFilter,
      ...inStockFilter
    };

    // Sorting
    let sortQuery = { createdAt: -1 }; // default newest
    if (req.query.sort === 'price-asc') {
      sortQuery = { price: 1 };
    } else if (req.query.sort === 'price-desc') {
      sortQuery = { price: -1 };
    } else if (req.query.sort === 'rating') {
      sortQuery = { rating: -1, numReviews: -1 };
    } else if (req.query.sort === 'discount') {
      sortQuery = { discountPercentage: -1 };
    } else if (req.query.sort === 'featured') {
      sortQuery = { isDealOfTheDay: -1, rating: -1 };
    }

    const count = await Product.countDocuments(filterQuery);
    const products = await Product.find(filterQuery)
      .sort(sortQuery)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    // Also get distinct categories and brands for filter UI
    const categories = await Product.distinct('category');
    const brands = await Product.distinct('brand');

    return res.json({
      success: true,
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalProducts: count,
      categories,
      brands
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Fetch single product by ID with reviews
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Fetch reviews for this product
    const reviews = await Review.find({ product: product._id }).sort({ createdAt: -1 });

    // Fetch related products in same category
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    }).limit(6);

    return res.json({
      success: true,
      product,
      reviews,
      relatedProducts
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get featured products & Deals of the day for Homepage
// @route   GET /api/products/featured/deals
// @access  Public
const getFeaturedAndDeals = async (req, res) => {
  try {
    const deals = await Product.find({ isDealOfTheDay: true }).limit(8);
    const bestSellers = await Product.find({ badge: 'Best Seller' }).limit(8);
    const topRated = await Product.find({ rating: { $gte: 4.5 } }).sort({ rating: -1 }).limit(8);
    const electronics = await Product.find({ category: 'Electronics' }).limit(6);
    const fashion = await Product.find({ category: 'Fashion' }).limit(6);
    const homeKitchen = await Product.find({ category: 'Home & Kitchen' }).limit(6);

    return res.json({
      success: true,
      deals,
      bestSellers,
      topRated,
      categoriesSpotlight: {
        electronics,
        fashion,
        homeKitchen
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new review for a product
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
  try {
    const { rating, comment, title } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const alreadyReviewed = await Review.findOne({
      product: req.params.id,
      user: req.user._id
    });

    if (alreadyReviewed) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this product' });
    }

    const review = await Review.create({
      name: req.user.name,
      rating: Number(rating),
      title: title || 'Great product!',
      comment,
      user: req.user._id,
      product: product._id
    });

    // Update product average rating & review count
    const allReviews = await Review.find({ product: product._id });
    product.numReviews = allReviews.length;
    product.rating = Number(
      (allReviews.reduce((acc, item) => item.rating + acc, 0) / allReviews.length).toFixed(1)
    );

    // Calculate rating breakdown
    const fiveStar = allReviews.filter(r => r.rating === 5).length;
    const fourStar = allReviews.filter(r => r.rating === 4).length;
    const threeStar = allReviews.filter(r => r.rating === 3).length;
    const twoStar = allReviews.filter(r => r.rating === 2).length;
    const oneStar = allReviews.filter(r => r.rating === 1).length;

    product.ratingBreakdown = {
      fiveStar: Math.round((fiveStar / allReviews.length) * 100),
      fourStar: Math.round((fourStar / allReviews.length) * 100),
      threeStar: Math.round((threeStar / allReviews.length) * 100),
      twoStar: Math.round((twoStar / allReviews.length) * 100),
      oneStar: Math.round((oneStar / allReviews.length) * 100)
    };

    await product.save();

    return res.status(201).json({
      success: true,
      message: 'Review added successfully',
      review
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a product (Admin)
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      originalPrice,
      description,
      brand,
      category,
      subcategory,
      countInStock,
      mainImage,
      images,
      features,
      specs,
      isPrimeEligible,
      isDealOfTheDay,
      badge
    } = req.body;

    if (!name || !price || !category || !mainImage) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, category, and main image are required'
      });
    }

    const product = new Product({
      name,
      price: Number(price),
      originalPrice: Number(originalPrice) || Number(price),
      description: description || 'High quality product on NovaMart.',
      brand: brand || 'NovaMart Exclusive',
      category,
      subcategory: subcategory || '',
      countInStock: Number(countInStock) >= 0 ? Number(countInStock) : 10,
      mainImage,
      images: Array.isArray(images) && images.length > 0 ? images : [mainImage],
      features: Array.isArray(features) ? features : [],
      specs: specs || {},
      isPrimeEligible: isPrimeEligible !== undefined ? isPrimeEligible : true,
      isDealOfTheDay: isDealOfTheDay || false,
      badge: badge || '',
      user: req.user._id
    });

    const createdProduct = await product.save();
    return res.status(201).json({ success: true, product: createdProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a product (Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const {
      name,
      price,
      originalPrice,
      description,
      brand,
      category,
      subcategory,
      countInStock,
      mainImage,
      images,
      features,
      specs,
      isPrimeEligible,
      isDealOfTheDay,
      badge
    } = req.body;

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = Number(price);
    if (originalPrice !== undefined) product.originalPrice = Number(originalPrice);
    if (description !== undefined) product.description = description;
    if (brand !== undefined) product.brand = brand;
    if (category !== undefined) product.category = category;
    if (subcategory !== undefined) product.subcategory = subcategory;
    if (countInStock !== undefined) product.countInStock = Number(countInStock);
    if (mainImage !== undefined) product.mainImage = mainImage;
    if (images !== undefined) product.images = images;
    if (features !== undefined) product.features = features;
    if (specs !== undefined) product.specs = specs;
    if (isPrimeEligible !== undefined) product.isPrimeEligible = isPrimeEligible;
    if (isDealOfTheDay !== undefined) product.isDealOfTheDay = isDealOfTheDay;
    if (badge !== undefined) product.badge = badge;

    const updatedProduct = await product.save();
    return res.json({ success: true, product: updatedProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a product (Admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    await Review.deleteMany({ product: req.params.id });

    return res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getFeaturedAndDeals,
  createProductReview,
  createProduct,
  updateProduct,
  deleteProduct
};
