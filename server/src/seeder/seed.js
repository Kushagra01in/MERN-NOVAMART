const dotenv = require('dotenv');
dotenv.config();

const { connectDB, disconnectDB } = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const Review = require('../models/Review');
const { products, categories } = require('./data');

const seedData = async () => {
  try {
    await connectDB();

    console.log('🧹 Clearing previous collections...');
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await Order.deleteMany();
    await Review.deleteMany();

    console.log('👤 Creating users...');
    const adminUser = await User.create({
      name: 'NovaMart Admin',
      email: process.env.ADMIN_EMAIL || 'admin@novamart.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      phone: '+91 9876543210',
      addresses: [
        {
          fullName: 'NovaMart Corporate HQ',
          street: '100 Outer Ring Road, Bellandur',
          city: 'Bengaluru',
          state: 'Karnataka',
          postalCode: '560103',
          country: 'India',
          phone: '+91 9876543210',
          isDefault: true
        }
      ]
    });

    const customer1 = await User.create({
      name: 'Kushagra Jha',
      email: 'john@example.com',
      password: 'user123',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      phone: '+91 9876543210',
      addresses: [
        {
          fullName: 'Kushagra Jha',
          street: '402 Sunrise Heights, Linking Road, Bandra West',
          city: 'Mumbai',
          state: 'Maharashtra',
          postalCode: '400050',
          country: 'India',
          phone: '+91 9876543210',
          isDefault: true
        }
      ]
    });

    const customer2 = await User.create({
      name: 'Pooja Sharma',
      email: 'sarah@example.com',
      password: 'user123',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      phone: '+91 9988776655',
      addresses: [
        {
          fullName: 'Pooja Sharma',
          street: '18 Lotus Boulevard, Sector 100',
          city: 'Noida',
          state: 'Uttar Pradesh',
          postalCode: '201304',
          country: 'India',
          phone: '+91 9988776655',
          isDefault: true
        }
      ]
    });

    console.log('🏷️ Creating categories...');
    await Category.insertMany(categories);

    console.log('📦 Creating INR catalog products...');
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser._id };
    });
    const createdProducts = await Product.insertMany(sampleProducts);

    console.log('⭐ Creating verified reviews...');
    await Review.create({
      user: customer1._id,
      name: customer1.name,
      rating: 5,
      title: 'Supreme Active Noise Cancellation & LDAC Sound!',
      comment: 'Best ANC headphones on the Indian market. Delivered in 24 hours via NovaExpress with original brand warranty card.',
      verifiedPurchase: true,
      helpfulCount: 42,
      product: createdProducts[0]._id
    });

    await Review.create({
      user: customer2._id,
      name: customer2.name,
      rating: 5,
      title: 'Unbelievable M3 performance and battery life!',
      comment: 'Handles 4K video rendering and full stack development without breaking a sweat and zero fan noise. Truly exceptional.',
      verifiedPurchase: true,
      helpfulCount: 28,
      product: createdProducts[1]._id
    });

    console.log('🛒 Creating sample INR orders...');
    // Delivered Order
    await Order.create({
      user: customer1._id,
      orderItems: [
        {
          product: createdProducts[0]._id,
          name: createdProducts[0].name,
          qty: 1,
          image: createdProducts[0].mainImage,
          price: createdProducts[0].price,
          originalPrice: createdProducts[0].originalPrice
        },
        {
          product: createdProducts[5]._id,
          name: createdProducts[5].name,
          qty: 1,
          image: createdProducts[5].mainImage,
          price: createdProducts[5].price,
          originalPrice: createdProducts[5].originalPrice
        }
      ],
      shippingAddress: customer1.addresses[0],
      paymentMethod: 'UPI (GPAY)',
      paymentResult: {
        id: 'UPI-TXN-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        status: 'SUCCESS',
        update_time: new Date().toISOString(),
        email_address: customer1.email
      },
      itemsPrice: createdProducts[0].price + createdProducts[5].price,
      shippingPrice: 0,
      taxPrice: Math.round((createdProducts[0].price + createdProducts[5].price) * 0.18),
      totalPrice: createdProducts[0].price + createdProducts[5].price,
      isPaid: true,
      paidAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      status: 'Delivered',
      deliveredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      trackingNumber: 'NVM-IND-8921',
      statusHistory: [
        { status: 'Processing', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), note: 'Order placed via UPI' },
        { status: 'Confirmed', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), note: 'Dispatched from Mumbai Logistics Hub' },
        { status: 'Delivered', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), note: 'Delivered to recipient' }
      ]
    });

    // In-transit Shipped Order
    await Order.create({
      user: customer2._id,
      orderItems: [
        {
          product: createdProducts[2]._id,
          name: createdProducts[2].name,
          qty: 1,
          image: createdProducts[2].mainImage,
          price: createdProducts[2].price,
          originalPrice: createdProducts[2].originalPrice
        }
      ],
      shippingAddress: customer2.addresses[0],
      paymentMethod: 'Credit Card (HDFC 10% Discount Applied)',
      itemsPrice: createdProducts[2].price,
      shippingPrice: 0,
      taxPrice: Math.round(createdProducts[2].price * 0.18),
      totalPrice: createdProducts[2].price,
      isPaid: true,
      paidAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'Shipped',
      trackingNumber: 'NVM-IND-4419',
      statusHistory: [
        { status: 'Processing', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), note: 'Payment verified' },
        { status: 'Shipped', timestamp: new Date(), note: 'In transit with BlueDart Express' }
      ]
    });

    console.log('✅ Seed with Indian Rupee products & accounts completed successfully!');
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error in Seeder:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}

module.exports = seedData;