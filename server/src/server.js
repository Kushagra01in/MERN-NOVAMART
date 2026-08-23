const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const { connectDB } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Auto-seed check
const Product = require('./models/Product');
const seedData = require('./seeder/seed');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    app: 'NovaMart India E-Commerce API',
    currency: 'INR',
    version: '2.0.0'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    // Auto-seed database if empty or needs fresh catalog
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('🌱 Fresh database detected. Seeding Indian Rupee catalog & demo accounts...');
      try {
        const { products, categories } = require('./seeder/data');
        const User = require('./models/User');
        const Category = require('./models/Category');

        const adminUser = await User.create({
          name: 'NovaMart Admin',
          email: process.env.ADMIN_EMAIL || 'admin@novamart.com',
          password: process.env.ADMIN_PASSWORD || 'admin123',
          role: 'admin',
          addresses: [
            {
              fullName: 'NovaMart Corporate HQ',
              street: '100 Outer Ring Road',
              city: 'Bengaluru',
              state: 'Karnataka',
              postalCode: '560103',
              country: 'India',
              phone: '+91 9876543210',
              isDefault: true
            }
          ]
        });

        await User.create({
          name: 'Kushagra Jha',
          email: 'john@example.com',
          password: 'user123',
          role: 'user',
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

        await Category.insertMany(categories);
        const sampleProducts = products.map(p => ({ ...p, user: adminUser._id }));
        await Product.insertMany(sampleProducts);

        console.log('✨ Seed completed with Indian Rupee (₹) catalog & demo accounts!');
      } catch (seedErr) {
        console.warn('⚠️ Auto-seed note:', seedErr.message);
      }
    }

    app.listen(PORT, () => {
      console.log(`🚀 NovaMart India API running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
      console.log(`📡 API Health Check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();