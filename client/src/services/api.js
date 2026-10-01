import axios from 'axios';

// Initial Indian Catalog Mock Dataset
const initialProducts = [
  {
    _id: "prod_1",
    name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones (Silver & Black)',
    description: 'Industry-standard noise cancellation headphones with 2 processors, 8 microphones, and Auto NC Optimizer. High-Resolution audio certified with LDAC support, 30-hour battery life.',
    brand: 'Sony',
    category: 'Electronics',
    subcategory: 'Audio',
    price: 28990,
    originalPrice: 34990,
    countInStock: 25,
    mainImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    numReviews: 3420,
    ratingBreakdown: { fiveStar: 82, fourStar: 12, threeStar: 3, twoStar: 2, oneStar: 1 },
    features: [
      'Industry-leading active noise cancellation with Integrated Processor V1',
      'High-Resolution Audio wireless support via LDAC & 30mm precision drivers',
      'Multipoint connection to switch seamlessly between phone and laptop',
      'Up to 30-hour battery life with 3-min quick charge for 3 hours'
    ],
    specs: { 'Brand': 'Sony', 'Color': 'Platinum Silver', 'Warranty': '1 Year Brand Warranty', 'Battery Life': '30 Hours' },
    isPrimeEligible: true,
    isDealOfTheDay: true,
    badge: 'Trending Deal',
    freeDelivery: true
  },
  {
    _id: "prod_2",
    name: 'Apple MacBook Air 15-inch M3 Chip (16GB Unified Memory, 512GB SSD)',
    description: 'Blazing fast Apple M3 chip in an ultra-slim unibody aluminum design. Brilliant 15.3-inch Liquid Retina display, 1080p FaceTime HD camera, and up to 18 hours of battery life.',
    brand: 'Apple',
    category: 'Electronics',
    subcategory: 'Laptops',
    price: 124900,
    originalPrice: 134900,
    countInStock: 15,
    mainImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'],
    rating: 4.9,
    numReviews: 1890,
    ratingBreakdown: { fiveStar: 91, fourStar: 6, threeStar: 2, twoStar: 1, oneStar: 0 },
    features: [
      'Apple M3 chip with 8-core CPU and 10-core GPU',
      '15.3-inch Liquid Retina display with 500 nits brightness',
      '16GB unified memory for ultra-smooth multitasking',
      'Fanless, completely silent operational architecture'
    ],
    specs: { 'Brand': 'Apple', 'Screen Size': '15.3 Inches', 'RAM': '16 GB', 'Storage': '512 GB SSD' },
    isPrimeEligible: true,
    isDealOfTheDay: false,
    badge: 'Super Saver',
    freeDelivery: true
  },
  {
    _id: "prod_3",
    name: 'OnePlus 12 5G (Flowy Emerald, 16GB RAM + 512GB Storage, Snapdragon 8 Gen 3)',
    description: 'Flagship performer powered by Snapdragon 8 Gen 3 with 4th Gen Hasselblad Camera system for mobile. 5400 mAh battery with 100W SUPERVOOC charging.',
    brand: 'OnePlus',
    category: 'Electronics',
    subcategory: 'Mobiles',
    price: 64999,
    originalPrice: 69999,
    countInStock: 30,
    mainImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'],
    rating: 4.7,
    numReviews: 2450,
    ratingBreakdown: { fiveStar: 80, fourStar: 13, threeStar: 4, twoStar: 2, oneStar: 1 },
    features: [
      'Snapdragon 8 Gen 3 mobile platform with Dual Cryo-velocity VC cooling',
      '50MP Sony LYT-808 main camera + 64MP periscope telephoto',
      '100W SUPERVOOC fast charging — 1% to 100% in only 26 minutes'
    ],
    specs: { 'Brand': 'OnePlus', 'RAM': '16 GB', 'Storage': '512 GB', 'Battery': '5400 mAh' },
    isPrimeEligible: true,
    isDealOfTheDay: true,
    badge: 'Bestseller',
    freeDelivery: true
  },
  {
    _id: "prod_4",
    name: 'Samsung 55-inch Crystal 4K Vivid Pro Ultra HD Smart TV with Dynamic Crystal Color',
    description: 'True 4K UHD resolution powered by Crystal Processor 4K with HDR 10+ support, Object Tracking Sound Lite, and voice assistant integration.',
    brand: 'Samsung',
    category: 'Electronics',
    subcategory: 'Television',
    price: 42990,
    originalPrice: 64990,
    countInStock: 20,
    mainImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'],
    rating: 4.6,
    numReviews: 4120,
    ratingBreakdown: { fiveStar: 74, fourStar: 16, threeStar: 6, twoStar: 2, oneStar: 2 },
    features: [
      'Crystal Processor 4K for realistic color expressions and sharp 4K upscaling',
      'Dynamic Crystal Color with 1 billion true-to-life shades',
      'SolarCell Remote and Smart Hub for streaming apps'
    ],
    specs: { 'Brand': 'Samsung', 'Screen Size': '55 Inches', 'Resolution': '4K UHD' },
    isPrimeEligible: true,
    isDealOfTheDay: true,
    badge: '34% OFF',
    freeDelivery: true
  },
  {
    _id: "prod_5",
    name: 'boAt Airdopes 141 Bluetooth Truly Wireless in-Ear Earbuds (42H Playtime)',
    description: 'India\'s favorite TWS with 42 hours total playback, ENx environmental noise cancellation for crystal calls, ASAP charge (5 min = 75 min play).',
    brand: 'boAt',
    category: 'Electronics',
    subcategory: 'Audio',
    price: 1299,
    originalPrice: 4490,
    countInStock: 120,
    mainImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'],
    rating: 4.5,
    numReviews: 18500,
    ratingBreakdown: { fiveStar: 72, fourStar: 18, threeStar: 5, twoStar: 3, oneStar: 2 },
    features: ['Up to 42 hours playback time', 'ENx Environmental Noise Cancellation', '8mm dynamic bass drivers'],
    specs: { 'Brand': 'boAt', 'Color': 'Bold Black', 'Playback': '42 Hours' },
    isPrimeEligible: true,
    isDealOfTheDay: true,
    badge: 'Mega Deal (71% OFF)',
    freeDelivery: true
  },
  {
    _id: "prod_6",
    name: 'Philips Digital Air Fryer HD9252/90 with Rapid Air Technology (4.1 Liter)',
    description: 'Cook delicious meals with up to 90% less fat. Features 7 preset touch menus for fries, chicken, fish, cake, and grilled vegetables.',
    brand: 'Philips',
    category: 'Home & Kitchen',
    subcategory: 'Appliances',
    price: 7499,
    originalPrice: 11995,
    countInStock: 35,
    mainImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'],
    rating: 4.6,
    numReviews: 5400,
    ratingBreakdown: { fiveStar: 78, fourStar: 14, threeStar: 5, twoStar: 2, oneStar: 1 },
    features: ['Patented Rapid Air Technology', 'Digital touch screen with 7 presets', 'QuickClean non-stick basket'],
    specs: { 'Brand': 'Philips', 'Capacity': '4.1 Liters', 'Power': '1400 Watts' },
    isPrimeEligible: true,
    isDealOfTheDay: true,
    badge: 'Top Pick',
    freeDelivery: true
  },
  {
    _id: "prod_7",
    name: 'Ergonomic High-Back Mesh Executive Office & Work Chair',
    description: 'Designed for all-day comfort during long desk hours. Molded foam seat, 2D adjustable lumbar support, and 135° tilt recline with lock mechanism.',
    brand: 'Green Soul',
    category: 'Home & Kitchen',
    subcategory: 'Furniture',
    price: 11499,
    originalPrice: 18990,
    countInStock: 18,
    mainImage: 'https://images.unsplash.com/photo-1580481077195-c3a9a3229831?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1580481077195-c3a9a3229831?auto=format&fit=crop&w=800&q=80'],
    rating: 4.7,
    numReviews: 2900,
    ratingBreakdown: { fiveStar: 80, fourStar: 13, threeStar: 4, twoStar: 2, oneStar: 1 },
    features: ['Breathable Korean mesh backrest', 'Class 4 hydraulic gas lift with 130 kg capacity', 'Synchro-tilt recline'],
    specs: { 'Brand': 'Green Soul', 'Color': 'Smart Black', 'Max Weight': '130 kg' },
    isPrimeEligible: true,
    isDealOfTheDay: false,
    badge: '39% OFF',
    freeDelivery: true
  },
  {
    _id: "prod_8",
    name: 'Nike Air Zoom Pegasus 40 Road Running & Sports Shoes',
    description: 'Engineered for road grip and responsiveness on Indian surfaces. Dual Nike Zoom Air units and React foam midsole deliver springy strides.',
    brand: 'Nike',
    category: 'Fashion',
    subcategory: 'Footwear',
    price: 8495,
    originalPrice: 11995,
    countInStock: 35,
    mainImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'],
    rating: 4.6,
    numReviews: 2900,
    ratingBreakdown: { fiveStar: 76, fourStar: 15, threeStar: 5, twoStar: 2, oneStar: 2 },
    features: ['Single-layer mesh upper for breathability', 'Nike React foam cushioning', 'Waffle-pattern rubber outsole'],
    specs: { 'Brand': 'Nike', 'Color': 'Gym Red / White', 'Closure': 'Lace-Up' },
    isPrimeEligible: true,
    isDealOfTheDay: true,
    badge: 'Hot Seller',
    freeDelivery: true
  },
  {
    _id: "prod_9",
    name: 'Atomic Habits: An Easy & Proven Way to Build Good Habits (Hardcover)',
    description: 'The international #1 bestseller with over 15 million copies sold. James Clear reveals practical strategies on habit formation and decision making.',
    brand: 'Penguin',
    category: 'Books',
    subcategory: 'Self-Help',
    price: 549,
    originalPrice: 899,
    countInStock: 150,
    mainImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'],
    rating: 4.9,
    numReviews: 24500,
    ratingBreakdown: { fiveStar: 93, fourStar: 5, threeStar: 1, twoStar: 1, oneStar: 0 },
    features: ['Premium Hardcover collector edition', 'Actionable four-step habit framework', 'Includes printable weekly templates'],
    specs: { 'Author': 'James Clear', 'Format': 'Hardcover', 'Pages': '320' },
    isPrimeEligible: true,
    isDealOfTheDay: false,
    badge: '#1 Bestseller',
    freeDelivery: true
  },
  {
    _id: "prod_10",
    name: 'Minimalist 10% Vitamin C + Hyaluronic Acid Brightening Face Serum (30ml)',
    description: 'Dermatologist-tested face serum formulated with pure Ethyl Ascorbic Acid and Centella Asiatica. Fades dark spots and boosts natural radiance.',
    brand: 'Minimalist',
    category: 'Beauty & Personal Care',
    subcategory: 'Skin Care',
    price: 664,
    originalPrice: 699,
    countInStock: 90,
    mainImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'],
    rating: 4.7,
    numReviews: 8400,
    ratingBreakdown: { fiveStar: 78, fourStar: 14, threeStar: 5, twoStar: 2, oneStar: 1 },
    features: ['10% stable Vitamin C serum for glowing skin', 'Infused with Hyaluronic acid', 'Fragrance-free & non-comedogenic'],
    specs: { 'Brand': 'Minimalist', 'Volume': '30 ml', 'Skin Type': 'All Skin Types' },
    isPrimeEligible: true,
    isDealOfTheDay: false,
    badge: 'Dermat Approved',
    freeDelivery: true
  }
];

const getStored = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStored = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {}
};

// Ensure localStorage always has the initial demo data
if (typeof window !== 'undefined') {
  if (!localStorage.getItem('novamart_demo_products')) {
    setStored('novamart_demo_products', initialProducts);
  }
  if (!localStorage.getItem('novamart_demo_orders')) {
    setStored('novamart_demo_orders', [
      {
        _id: 'ord_101',
        trackingNumber: 'NVM-IND-8921',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        orderItems: [
          { product: 'prod_1', name: initialProducts[0].name, qty: 1, image: initialProducts[0].mainImage, price: initialProducts[0].price },
          { product: 'prod_5', name: initialProducts[4].name, qty: 1, image: initialProducts[4].mainImage, price: initialProducts[4].price }
        ],
        shippingAddress: { fullName: 'Kushagra Jha', street: '402 Sunrise Heights, Bandra West', city: 'Mumbai', state: 'Maharashtra', postalCode: '400050', phone: '+91 9876543210' },
        paymentMethod: 'UPI (GPay)',
        totalPrice: initialProducts[0].price + initialProducts[4].price,
        isPaid: true,
        status: 'Delivered',
        estimatedDelivery: new Date().toISOString()
      },
      {
        _id: 'ord_102',
        trackingNumber: 'NVM-IND-4419',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        orderItems: [
          { product: 'prod_3', name: initialProducts[2].name, qty: 1, image: initialProducts[2].mainImage, price: initialProducts[2].price }
        ],
        shippingAddress: { fullName: 'Pooja Sharma', street: '18 Lotus Boulevard, Sector 100', city: 'Noida', state: 'Uttar Pradesh', postalCode: '201304', phone: '+91 9988776655' },
        paymentMethod: 'Credit Card (HDFC 10% Discount)',
        totalPrice: initialProducts[2].price,
        isPaid: true,
        status: 'Shipped',
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]);
  }
}

// Client-Side Standalone Mock Handler
const mockHandle = async (url, method = 'get', data = null) => {
  const products = getStored('novamart_demo_products', initialProducts);
  const orders = getStored('novamart_demo_orders', []);

  // Normalize URL
  const cleanUrl = url.startsWith('/') ? url : '/' + url;

  // 1. Health
  if (cleanUrl.includes('/health')) {
    return { data: { success: true, status: 'online', app: 'NovaMart India API', version: '2.0.0' } };
  }

  // 2. Auth Login
  if (cleanUrl.includes('/auth/login') && method.toLowerCase() === 'post') {
    const { email } = data || {};
    const isAdmin = email?.toLowerCase().includes('admin');
    const user = {
      _id: isAdmin ? 'usr_admin' : 'usr_customer_1',
      name: isAdmin ? 'NovaMart Admin' : 'Kushagra Jha',
      email: email || (isAdmin ? 'admin@novamart.com' : 'john@example.com'),
      role: isAdmin ? 'admin' : 'user',
      phone: '+91 9876543210',
      addresses: [
        {
          _id: 'addr_1',
          fullName: isAdmin ? 'NovaMart HQ' : 'Kushagra Jha',
          street: isAdmin ? '100 Outer Ring Road' : '402 Sunrise Heights, Bandra West',
          city: isAdmin ? 'Bengaluru' : 'Mumbai',
          state: isAdmin ? 'Karnataka' : 'Maharashtra',
          postalCode: isAdmin ? '560103' : '400050',
          phone: '+91 9876543210',
          isDefault: true
        }
      ]
    };
    return { data: { success: true, token: 'demo_jwt_token_' + Date.now(), user } };
  }

  // 3. Auth Register
  if (cleanUrl.includes('/auth/register') && method.toLowerCase() === 'post') {
    const user = {
      _id: 'usr_' + Date.now(),
      name: data?.name || 'Customer',
      email: data?.email || 'user@example.com',
      role: 'user',
      phone: '+91 9876543210',
      addresses: []
    };
    return { data: { success: true, token: 'demo_jwt_token_' + Date.now(), user } };
  }

  // 4. Auth Me
  if (cleanUrl.includes('/auth/me')) {
    return {
      data: {
        success: true,
        user: {
          _id: 'usr_customer_1',
          name: 'Kushagra Jha',
          email: 'john@example.com',
          role: 'user',
          phone: '+91 9876543210',
          addresses: [
            {
              _id: 'addr_1',
              fullName: 'Kushagra Jha',
              street: '402 Sunrise Heights, Bandra West',
              city: 'Mumbai',
              state: 'Maharashtra',
              postalCode: '400050',
              phone: '+91 9876543210',
              isDefault: true
            }
          ]
        }
      }
    };
  }

  // 5. Featured Deals
  if (cleanUrl.includes('/products/featured/deals')) {
    const deals = products.filter(p => p.isDealOfTheDay);
    const bestSellers = products.filter(p => p.badge?.includes('Bestseller') || p.rating >= 4.8);
    const topRated = products.filter(p => p.rating >= 4.6);
    return {
      data: {
        success: true,
        deals: deals.length > 0 ? deals : products.slice(0, 6),
        bestSellers: bestSellers.length > 0 ? bestSellers : products.slice(0, 4),
        topRated: topRated.length > 0 ? topRated : products.slice(0, 4),
        categoriesSpotlight: {
          electronics: products.filter(p => p.category === 'Electronics'),
          fashion: products.filter(p => p.category === 'Fashion'),
          homeKitchen: products.filter(p => p.category === 'Home & Kitchen')
        }
      }
    };
  }

  // 6. Single Product by ID
  const prodMatch = cleanUrl.match(/\/products\/([a-zA-Z0-9_-]+)$/);
  if (prodMatch && method.toLowerCase() === 'get') {
    const id = prodMatch[1];
    const product = products.find(p => p._id === id) || products[0];
    const related = products.filter(p => p.category === product.category && p._id !== product._id);
    return {
      data: {
        success: true,
        product,
        reviews: [
          { _id: 'rev_1', name: 'Kushagra Jha', rating: 5, title: 'Supreme Quality & Fast Delivery!', comment: 'Delivered in 24 hours via NovaExpress with original brand warranty.', createdAt: new Date().toISOString() }
        ],
        relatedProducts: related
      }
    };
  }

  // 7. Product List / Search / Filter
  if (cleanUrl.startsWith('/products') && method.toLowerCase() === 'get') {
    // Check keyword search
    let filtered = [...products];
    const urlObj = new URL('http://localhost' + cleanUrl);
    const keyword = urlObj.searchParams.get('keyword');
    const category = urlObj.searchParams.get('category');
    const minPrice = urlObj.searchParams.get('minPrice');
    const maxPrice = urlObj.searchParams.get('maxPrice');
    const dealsOnly = urlObj.searchParams.get('deals') === 'true';

    if (keyword) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()) || p.brand.toLowerCase().includes(keyword.toLowerCase()));
    }
    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.category === category);
    }
    if (minPrice) {
      filtered = filtered.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(maxPrice));
    }
    if (dealsOnly) {
      filtered = filtered.filter(p => p.isDealOfTheDay);
    }

    return {
      data: {
        success: true,
        products: filtered,
        totalProducts: filtered.length,
        pages: 1,
        categories: ['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty & Personal Care', 'Books']
      }
    };
  }

  // 8. Orders Create
  if (cleanUrl === '/orders' && method.toLowerCase() === 'post') {
    const newOrder = {
      _id: 'ord_' + Date.now(),
      trackingNumber: 'NVM-IND-' + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
      orderItems: data?.orderItems || [],
      shippingAddress: data?.shippingAddress || {},
      paymentMethod: data?.paymentMethod || 'UPI (GPay)',
      totalPrice: data?.totalPrice || 0,
      isPaid: true,
      status: 'Processing',
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
    };
    orders.unshift(newOrder);
    setStored('novamart_demo_orders', orders);
    return { data: { success: true, order: newOrder } };
  }

  // 9. Orders User MyOrders
  if (cleanUrl.includes('/orders/myorders')) {
    return { data: { success: true, orders } };
  }

  // 10. Single Order by ID
  const ordMatch = cleanUrl.match(/\/orders\/([a-zA-Z0-9_-]+)$/);
  if (ordMatch && method.toLowerCase() === 'get') {
    const id = ordMatch[1];
    const order = orders.find(o => o._id === id || o.trackingNumber === id) || orders[0];
    return { data: { success: true, order } };
  }

  // 11. Cancel Order
  if (cleanUrl.includes('/cancel') && method.toLowerCase() === 'put') {
    const id = cleanUrl.split('/orders/')[1].split('/cancel')[0];
    const order = orders.find(o => o._id === id);
    if (order) order.status = 'Cancelled';
    setStored('novamart_demo_orders', orders);
    return { data: { success: true, order } };
  }

  // 12. Admin Stats
  if (cleanUrl.includes('/admin/stats')) {
    const totalRevenue = orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0);
    return {
      data: {
        success: true,
        stats: {
          totalRevenue,
          totalOrders: orders.length,
          totalProducts: products.length,
          totalUsers: 142,
          lowStockCount: products.filter(p => p.countInStock <= 15).length,
          orderStatusCounts: {
            processing: orders.filter(o => o.status === 'Processing').length,
            confirmed: orders.filter(o => o.status === 'Confirmed').length,
            shipped: orders.filter(o => o.status === 'Shipped').length,
            delivered: orders.filter(o => o.status === 'Delivered').length,
            cancelled: orders.filter(o => o.status === 'Cancelled').length
          },
          recentOrders: orders.slice(0, 5),
          lowStockProducts: products.filter(p => p.countInStock <= 15)
        }
      }
    };
  }

  // 13. Admin Orders
  if (cleanUrl.includes('/admin/orders')) {
    return { data: { success: true, orders, totalOrders: orders.length } };
  }

  // 14. Admin Order Status Update
  if (cleanUrl.includes('/admin/orders') && cleanUrl.includes('/status') && method.toLowerCase() === 'put') {
    const id = cleanUrl.split('/admin/orders/')[1].split('/status')[0];
    const order = orders.find(o => o._id === id);
    if (order) {
      order.status = data?.status || 'Shipped';
      setStored('novamart_demo_orders', orders);
    }
    return { data: { success: true, order } };
  }

  // 15. Admin Users
  if (cleanUrl.includes('/admin/users')) {
    return {
      data: {
        success: true,
        users: [
          { _id: 'usr_1', name: 'NovaMart Admin', email: 'admin@novamart.com', role: 'admin', createdAt: '2026-01-10' },
          { _id: 'usr_2', name: 'Kushagra Jha', email: 'john@example.com', role: 'user', createdAt: '2026-02-14' },
          { _id: 'usr_3', name: 'Pooja Sharma', email: 'sarah@example.com', role: 'user', createdAt: '2026-03-01' }
        ]
      }
    };
  }

  return { data: { success: true } };
};

// Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('novamart_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Check if response is valid JSON from backend or just Netlify index.html fallback
const isValidJsonResponse = (res) => {
  if (!res || !res.data) return false;
  if (typeof res.data === 'string') {
    const str = res.data.trim();
    if (str.startsWith('<!') || str.startsWith('<html') || str.includes('<div id="root">')) {
      return false;
    }
  }
  return typeof res.data === 'object' && res.data.success !== undefined;
};

// Check if running on localhost with active backend server
const isLocalhost = typeof window !== 'undefined' && (
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1'
);

const hasCustomBackend = Boolean(import.meta.env.VITE_API_URL);

// Reliable Hybrid API Client
const wrapApi = {
  get: async (url, config) => {
    if (!isLocalhost && !hasCustomBackend) {
      return await mockHandle(url, 'get');
    }
    try {
      const res = await api.get(url, config);
      if (isValidJsonResponse(res)) return res;
      return await mockHandle(url, 'get');
    } catch (err) {
      return await mockHandle(url, 'get');
    }
  },
  post: async (url, data, config) => {
    if (!isLocalhost && !hasCustomBackend) {
      return await mockHandle(url, 'post', data);
    }
    try {
      const res = await api.post(url, data, config);
      if (isValidJsonResponse(res)) return res;
      return await mockHandle(url, 'post', data);
    } catch (err) {
      return await mockHandle(url, 'post', data);
    }
  },
  put: async (url, data, config) => {
    if (!isLocalhost && !hasCustomBackend) {
      return await mockHandle(url, 'put', data);
    }
    try {
      const res = await api.put(url, data, config);
      if (isValidJsonResponse(res)) return res;
      return await mockHandle(url, 'put', data);
    } catch (err) {
      return await mockHandle(url, 'put', data);
    }
  },
  delete: async (url, config) => {
    if (!isLocalhost && !hasCustomBackend) {
      return await mockHandle(url, 'delete');
    }
    try {
      const res = await api.delete(url, config);
      if (isValidJsonResponse(res)) return res;
      return await mockHandle(url, 'delete');
    } catch (err) {
      return await mockHandle(url, 'delete');
    }
  }
};

export default wrapApi;