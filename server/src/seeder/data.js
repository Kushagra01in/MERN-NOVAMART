const products = [
  {
    name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones (Silver & Black)',
    description: 'The industry-standard noise cancellation headphones with 2 processors, 8 microphones, and Auto NC Optimizer. High-Resolution audio certified with LDAC support, 30-hour battery life, and 3-minute quick charge for 3 hours of playback.',
    brand: 'Sony',
    category: 'Electronics',
    subcategory: 'Audio',
    price: 28990,
    originalPrice: 34990,
    countInStock: 25,
    mainImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    numReviews: 3420,
    ratingBreakdown: { fiveStar: 82, fourStar: 12, threeStar: 3, twoStar: 2, oneStar: 1 },
    features: [
      'Industry-leading active noise cancellation with Integrated Processor V1 & QN1',
      'High-Resolution Audio wireless support via LDAC & 30mm precision drivers',
      'Multipoint connection to switch seamlessly between phone and laptop',
      'Speak-to-chat technology automatically pauses music when you speak',
      'Up to 30-hour battery life with quick charge capability'
    ],
    specs: {
      'Brand': 'Sony',
      'Color': 'Platinum Silver',
      'Warranty': '1 Year Brand Warranty',
      'Battery Life': '30 Hours',
      'Connectivity': 'Bluetooth 5.2, 3.5mm'
    },
    isPrimeEligible: true,
    isDealOfTheDay: true,
    badge: 'Trending Deal',
    freeDelivery: true
  },
  {
    name: 'Apple MacBook Air 15-inch M3 Chip (16GB Unified Memory, 512GB SSD)',
    description: 'Blazing fast Apple M3 chip in an ultra-slim 1.15 cm unibody aluminum design. Brilliant 15.3-inch Liquid Retina display, 1080p FaceTime HD camera, 6-speaker sound system with Spatial Audio, and up to 18 hours of battery life.',
    brand: 'Apple',
    category: 'Electronics',
    subcategory: 'Laptops',
    price: 124900,
    originalPrice: 134900,
    countInStock: 15,
    mainImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    numReviews: 1890,
    ratingBreakdown: { fiveStar: 91, fourStar: 6, threeStar: 2, twoStar: 1, oneStar: 0 },
    features: [
      'Apple M3 chip with 8-core CPU and 10-core GPU',
      '15.3-inch Liquid Retina display with 500 nits brightness and True Tone',
      '16GB unified memory for ultra-smooth heavy multitasking and creative editing',
      'MagSafe 3 charging port with two Thunderbolt 4 ports',
      'Fanless, completely silent operational architecture'
    ],
    specs: {
      'Brand': 'Apple',
      'Screen Size': '15.3 Inches',
      'RAM': '16 GB Unified Memory',
      'Storage': '512 GB NVMe SSD',
      'Processor': 'Apple M3'
    },
    isPrimeEligible: true,
    isDealOfTheDay: false,
    badge: 'Super Saver',
    freeDelivery: true
  },
  {
    name: 'OnePlus 12 5G (Flowy Emerald, 16GB RAM + 512GB Storage, Snapdragon 8 Gen 3)',
    description: 'Flagship performer powered by Snapdragon 8 Gen 3 with 4th Gen Hasselblad Camera system for mobile. 5400 mAh battery with 100W SUPERVOOC charging and 2K 120 Hz ProXDR display.',
    brand: 'OnePlus',
    category: 'Electronics',
    subcategory: 'Mobiles',
    price: 64999,
    originalPrice: 69999,
    countInStock: 30,
    mainImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    numReviews: 2450,
    ratingBreakdown: { fiveStar: 80, fourStar: 13, threeStar: 4, twoStar: 2, oneStar: 1 },
    features: [
      'Snapdragon 8 Gen 3 mobile platform with Dual Cryo-velocity VC cooling',
      '50MP Sony LYT-808 main camera + 64MP periscope telephoto + 48MP ultra-wide',
      '100W SUPERVOOC fast charging — 1% to 100% in only 26 minutes',
      '2K 120Hz ProXDR display with Dolby Vision and Aqua Touch'
    ],
    specs: {
      'Brand': 'OnePlus',
      'RAM': '16 GB LPDDR5X',
      'Storage': '512 GB UFS 4.0',
      'Battery': '5400 mAh',
      'Display': '6.82" 2K 120Hz AMOLED'
    },
    isPrimeEligible: true,
    isDealOfTheDay: true,
    badge: 'Bestseller',
    freeDelivery: true
  },
  {
    name: 'Samsung 55-inch Crystal 4K Vivid Pro Ultra HD Smart TV with Dynamic Crystal Color',
    description: 'True 4K UHD resolution powered by Crystal Processor 4K with HDR 10+ support, Object Tracking Sound Lite, and seamless voice assistant integration with Bixby & Alexa.',
    brand: 'Samsung',
    category: 'Electronics',
    subcategory: 'Television',
    price: 42990,
    originalPrice: 64990,
    countInStock: 20,
    mainImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    numReviews: 4120,
    ratingBreakdown: { fiveStar: 74, fourStar: 16, threeStar: 6, twoStar: 2, oneStar: 2 },
    features: [
      'Crystal Processor 4K for realistic color expressions and sharp 4K upscaling',
      'Dynamic Crystal Color with 1 billion true-to-life shades',
      'Q-Symphony technology for synchronized TV & soundbar acoustics',
      'SolarCell Remote and Smart Hub for all streaming apps in one place'
    ],
    specs: {
      'Brand': 'Samsung',
      'Screen Size': '55 Inches',
      'Resolution': '4K UHD (3840 x 2160)',
      'Sound Output': '20W Dolby Digital Plus'
    },
    isPrimeEligible: true,
    isDealOfTheDay: true,
    badge: '34% OFF',
    freeDelivery: true
  },
  {
    name: 'Logitech MX Master 3S Performance Wireless Ergonomic Mouse (8K DPI)',
    description: 'The premier productivity mouse with quiet clicks, 8,000 DPI sensor tracking even on glass surfaces, and ultra-fast MagSpeed electromagnetic scrolling.',
    brand: 'Logitech',
    category: 'Electronics',
    subcategory: 'Accessories',
    price: 8995,
    originalPrice: 10995,
    countInStock: 45,
    mainImage: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    numReviews: 3200,
    ratingBreakdown: { fiveStar: 85, fourStar: 10, threeStar: 3, twoStar: 1, oneStar: 1 },
    features: [
      'Quiet clicks with 90% reduced click noise',
      'Track-on-glass 8,000 DPI sensor for effortless multi-monitor precision',
      'MagSpeed scrolling speeds through 1,000 lines per second',
      'Easy-Switch between 3 devices across Windows and macOS'
    ],
    specs: {
      'Brand': 'Logitech',
      'DPI': '8000',
      'Battery': 'Rechargeable USB-C (70 days full charge)',
      'Connectivity': 'Bluetooth Low Energy & Logi Bolt'
    },
    isPrimeEligible: true,
    isDealOfTheDay: false,
    badge: 'Editor\'s Choice',
    freeDelivery: true
  },
  {
    name: 'boAt Airdopes 141 Bluetooth Truly Wireless in-Ear Earbuds (42H Playtime)',
    description: 'India\'s favorite TWS with 42 hours total playback, ENx environmental noise cancellation for crystal calls, ASAP charge (5 min = 75 min play), and Beast Mode for low-latency gaming.',
    brand: 'boAt',
    category: 'Electronics',
    subcategory: 'Audio',
    price: 1299,
    originalPrice: 4490,
    countInStock: 120,
    mainImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.5,
    numReviews: 18500,
    ratingBreakdown: { fiveStar: 72, fourStar: 18, threeStar: 5, twoStar: 3, oneStar: 2 },
    features: [
      'Up to 42 hours playback time with compact charging capsule',
      'ENx Environmental Noise Cancellation technology for clear voice calls',
      '8mm dynamic bass drivers for signature boat sound',
      'IPX4 water & sweat resistance for workouts'
    ],
    specs: {
      'Brand': 'boAt',
      'Color': 'Bold Black',
      'Playback': '42 Hours',
      'Driver Size': '8mm'
    },
    isPrimeEligible: true,
    isDealOfTheDay: true,
    badge: 'Mega Deal (71% OFF)',
    freeDelivery: true
  },
  {
    name: 'Philips Digital Air Fryer HD9252/90 with Rapid Air Technology (4.1 Liter)',
    description: 'Cook delicious meals with up to 90% less fat. Features 7 preset touch menus for frozen snacks, fresh fries, meat, fish, chicken drumsticks, cake, and grilled veggies.',
    brand: 'Philips',
    category: 'Home & Kitchen',
    subcategory: 'Appliances',
    price: 7499,
    originalPrice: 11995,
    countInStock: 35,
    mainImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    numReviews: 5400,
    ratingBreakdown: { fiveStar: 78, fourStar: 14, threeStar: 5, twoStar: 2, oneStar: 1 },
    features: [
      'Patented Rapid Air Technology fries, bakes, grills, roasts and reheats',
      'Digital touch screen with 7 presets and Keep Warm function',
      'Dishwasher-safe non-stick QuickClean basket for easy cleanup',
      'NutriU app with 500+ Indian healthy recipes curated by chefs'
    ],
    specs: {
      'Brand': 'Philips',
      'Capacity': '4.1 Liters',
      'Power': '1400 Watts',
      'Warranty': '2 Years Manufacturer Warranty'
    },
    isPrimeEligible: true,
    isDealOfTheDay: true,
    badge: 'Top Pick',
    freeDelivery: true
  },
  {
    name: 'Ergonomic High-Back Mesh Executive Office & Work-from-Home Chair',
    description: 'Designed specifically for all-day comfort during long desk hours. High-density molded foam seat, 2D adjustable lumbar support, 3D armrests, and 135° tilt recline with lock mechanism.',
    brand: 'Green Soul',
    category: 'Home & Kitchen',
    subcategory: 'Furniture',
    price: 11499,
    originalPrice: 18990,
    countInStock: 18,
    mainImage: 'https://images.unsplash.com/photo-1580481077195-c3a9a3229831?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1580481077195-c3a9a3229831?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    numReviews: 2900,
    ratingBreakdown: { fiveStar: 80, fourStar: 13, threeStar: 4, twoStar: 2, oneStar: 1 },
    features: [
      'Breathable Korean mesh backrest keeps spine cool throughout the day',
      'Heavy-duty certified Class 4 hydraulic gas lift with 130 kg weight capacity',
      'Smooth 60mm nylon dual castor wheels for effortless silent mobility',
      'Adjustable headrest and multi-angle synchro-tilt recline mechanism'
    ],
    specs: {
      'Brand': 'Green Soul',
      'Color': 'Smart Black',
      'Max Weight': '130 kg',
      'Material': 'Breathable Mesh & Heavy Metal Base'
    },
    isPrimeEligible: true,
    isDealOfTheDay: false,
    badge: '39% OFF',
    freeDelivery: true
  },
  {
    name: 'Prestige Multi-Cooker Electric Kettle (1.5 Liter, Stainless Steel)',
    description: 'Multi-utility electric cooker kettle for boiling water, preparing instant noodles, cooking eggs, tea, and porridge in minutes with concealed heating element.',
    brand: 'Prestige',
    category: 'Home & Kitchen',
    subcategory: 'Appliances',
    price: 1499,
    originalPrice: 2495,
    countInStock: 80,
    mainImage: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.5,
    numReviews: 7800,
    ratingBreakdown: { fiveStar: 71, fourStar: 18, threeStar: 6, twoStar: 3, oneStar: 2 },
    features: [
      'Variable temperature control knob for precise cooking',
      'Durable food-grade stainless steel body with glass lid',
      '360-degree swivel power base with automatic shut-off safety',
      'Includes stainless steel egg boiler rack'
    ],
    specs: {
      'Brand': 'Prestige',
      'Capacity': '1.5 Litres',
      'Power': '600 Watts',
      'Material': 'Stainless Steel'
    },
    isPrimeEligible: true,
    isDealOfTheDay: true,
    badge: 'Festival Essential',
    freeDelivery: true
  },
  {
    name: 'Levi\'s Men\'s Regular Fit Pure Cotton Casual Washed Denim Jacket',
    description: 'The iconic trucker denim jacket from Levi\'s. Crafted from 100% premium cotton denim with shank button closure, chest flap pockets, and timeless point collar styling.',
    brand: 'Levi\'s',
    category: 'Fashion',
    subcategory: 'Men\'s Fashion',
    price: 3499,
    originalPrice: 5999,
    countInStock: 40,
    mainImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    numReviews: 1980,
    ratingBreakdown: { fiveStar: 77, fourStar: 14, threeStar: 5, twoStar: 2, oneStar: 2 },
    features: [
      '100% Breathable rugged pure cotton denim weave',
      'Classic Levi\'s red tab on chest patch pocket',
      'Reinforced seams and copper rivet accents',
      'Versatile styling for casual, outdoor, and evening wear'
    ],
    specs: {
      'Brand': 'Levi\'s',
      'Fabric': '100% Cotton Denim',
      'Fit': 'Regular Fit',
      'Care': 'Machine Wash Mild'
    },
    isPrimeEligible: true,
    isDealOfTheDay: false,
    badge: 'Popular Choice',
    freeDelivery: true
  },
  {
    name: 'Ray-Ban Classic Polarized Green Aviator Sunglasses (Gold Frame)',
    description: 'Timeless style with high-optical clarity. Features polarized G-15 crystal lenses that eliminate 99% of reflected glare and block 100% harmful UV rays.',
    brand: 'Ray-Ban',
    category: 'Fashion',
    subcategory: 'Accessories',
    price: 7490,
    originalPrice: 9990,
    countInStock: 28,
    mainImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    numReviews: 3800,
    ratingBreakdown: { fiveStar: 83, fourStar: 11, threeStar: 3, twoStar: 2, oneStar: 1 },
    features: [
      '100% UV400 polarized crystal lenses for enhanced visual contrast',
      'Ultra-lightweight aerospace grade metal alloy frame',
      'Adjustable soft silicone nose pads for custom non-slip fit',
      'Includes authentic Ray-Ban leather protective case and cleaning microfiber'
    ],
    specs: {
      'Brand': 'Ray-Ban',
      'Frame Material': 'Gold Metal',
      'Lens Color': 'G-15 Polarized Green',
      'Size': 'Standard 58mm'
    },
    isPrimeEligible: true,
    isDealOfTheDay: true,
    badge: '25% OFF',
    freeDelivery: true
  },
  {
    name: 'Nike Air Zoom Pegasus 40 Road Running & Sports Shoes',
    description: 'Engineered for exceptional road grip and responsiveness on Indian surfaces. Dual Nike Zoom Air units and React foam midsole deliver springy, energized strides.',
    brand: 'Nike',
    category: 'Fashion',
    subcategory: 'Footwear',
    price: 8495,
    originalPrice: 11995,
    countInStock: 35,
    mainImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    numReviews: 2900,
    ratingBreakdown: { fiveStar: 76, fourStar: 15, threeStar: 5, twoStar: 2, oneStar: 2 },
    features: [
      'Engineered single-layer mesh upper for optimum breathability in humid weather',
      'Nike React foam cushioning absorbs impact and propels you forward',
      'Waffle-inspired rubber outsole delivers multi-surface traction and long wear',
      'Midfoot band offers a secure, locked-in personalized feel'
    ],
    specs: {
      'Brand': 'Nike',
      'Color': 'Gym Red / White / Black',
      'Closure': 'Lace-Up',
      'Sole': 'Durable Waffle Rubber'
    },
    isPrimeEligible: true,
    isDealOfTheDay: true,
    badge: 'Hot Seller',
    freeDelivery: true
  },
  {
    name: 'Atomic Habits: An Easy & Proven Way to Build Good Habits (Hardcover)',
    description: 'The international #1 bestseller with over 15 million copies sold. James Clear reveals practical strategies on habit formation, decision making, and cognitive systems.',
    brand: 'Penguin Random House',
    category: 'Books',
    subcategory: 'Self-Help',
    price: 549,
    originalPrice: 899,
    countInStock: 150,
    mainImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    numReviews: 24500,
    ratingBreakdown: { fiveStar: 93, fourStar: 5, threeStar: 1, twoStar: 1, oneStar: 0 },
    features: [
      'Premium Hardcover collector edition with silk bookmark ribbon',
      'Actionable four-step habit framework: Cue, Craving, Response, Reward',
      'Includes habit tracker cheat sheets and printable weekly templates'
    ],
    specs: {
      'Author': 'James Clear',
      'Format': 'Hardcover',
      'Language': 'English',
      'Pages': '320'
    },
    isPrimeEligible: true,
    isDealOfTheDay: false,
    badge: '#1 Bestseller',
    freeDelivery: true
  },
  {
    name: 'Designing Data-Intensive Applications: Reliable, Scalable & Maintainable Systems',
    description: 'The bible for modern software engineers, backend developers, and systems architects by Martin Kleppmann. Comprehensive examination of storage engines, distributed consensus, partitioning, and replication.',
    brand: 'O\'Reilly Media',
    category: 'Books',
    subcategory: 'Technology',
    price: 1850,
    originalPrice: 2599,
    countInStock: 40,
    mainImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    numReviews: 6200,
    ratingBreakdown: { fiveStar: 94, fourStar: 4, threeStar: 1, twoStar: 1, oneStar: 0 },
    features: [
      'Examines fundamental algorithms behind databases and stream processing systems',
      'Deep dive into CAP theorem, ACID vs BASE, Raft/Paxos consensus, and batch workflows',
      'Indispensable handbook for high-scale backend engineering'
    ],
    specs: {
      'Author': 'Martin Kleppmann',
      'Format': 'Paperback',
      'Publisher': 'O\'Reilly Media',
      'Pages': '616'
    },
    isPrimeEligible: true,
    isDealOfTheDay: false,
    badge: 'Must Read',
    freeDelivery: true
  },
  {
    name: 'Minimalist 10% Vitamin C + Hyaluronic Acid Brightening Face Serum (30ml)',
    description: 'Dermatologist-tested daily face serum formulated with pure Ethyl Ascorbic Acid, Centella Asiatica water, and Hyaluronic acid. Fades dark spots and boosts natural radiance.',
    brand: 'Minimalist',
    category: 'Beauty & Personal Care',
    subcategory: 'Skin Care',
    price: 664,
    originalPrice: 699,
    countInStock: 90,
    mainImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    numReviews: 8400,
    ratingBreakdown: { fiveStar: 78, fourStar: 14, threeStar: 5, twoStar: 2, oneStar: 1 },
    features: [
      '10% stable Vitamin C serum for glowing, even skin tone',
      'Infused with 1% Acetyl Glucosamine and Hyaluronic acid for deep hydration',
      'Fragrance-free, sulfate-free, non-comedogenic formula safe for sensitive skin'
    ],
    specs: {
      'Brand': 'Minimalist',
      'Volume': '30 ml',
      'Skin Type': 'All Skin Types',
      'Key Ingredients': 'Vitamin C, Hyaluronic Acid, Centella'
    },
    isPrimeEligible: true,
    isDealOfTheDay: false,
    badge: 'Dermat Approved',
    freeDelivery: true
  },
  {
    name: 'Dyson Supersonic Hair Dryer with 5 Intelligent Styling Attachments',
    description: 'Engineered for fast drying with no extreme heat damage. Intelligent heat control measures air temperature over 40 times a second to protect hair\'s natural shine.',
    brand: 'Dyson',
    category: 'Beauty & Personal Care',
    subcategory: 'Hair Care',
    price: 34900,
    originalPrice: 39900,
    countInStock: 12,
    mainImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    numReviews: 2100,
    ratingBreakdown: { fiveStar: 86, fourStar: 9, threeStar: 3, twoStar: 1, oneStar: 1 },
    features: [
      'Powerful Dyson digital motor V9 combined with Air Multiplier technology',
      '5 Styling attachments including Flyaway attachment, Concentrator, and Diffuser',
      'Acoustically tuned motor produces an inaudible frequency'
    ],
    specs: {
      'Brand': 'Dyson',
      'Color': 'Iron / Fuchsia',
      'Power': '1600 Watts',
      'Warranty': '2 Years Official Warranty'
    },
    isPrimeEligible: true,
    isDealOfTheDay: true,
    badge: 'Luxury Beauty',
    freeDelivery: true
  }
];

const categories = [
  {
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80',
    description: 'Smartphones, Laptops, Audio, Smart TVs & Wearables',
    subcategories: ['Mobiles', 'Audio', 'Laptops', 'Television', 'Accessories']
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80',
    description: 'Men\'s, Women\'s, Footwear, Watches & Sunglasses',
    subcategories: ['Men\'s Fashion', 'Footwear', 'Accessories', 'Watches']
  },
  {
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    description: 'Smart Appliances, Ergonomic Furniture & Cookware',
    subcategories: ['Appliances', 'Furniture', 'Cookware', 'Decor']
  },
  {
    name: 'Beauty & Personal Care',
    slug: 'beauty-personal-care',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    description: 'Skin Care, Hair Care, Wellness & Grooming',
    subcategories: ['Skin Care', 'Hair Care', 'Grooming']
  },
  {
    name: 'Books',
    slug: 'books',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80',
    description: 'Bestsellers, Tech, Self-Help & Fiction',
    subcategories: ['Self-Help', 'Technology', 'Fiction', 'Business']
  },
  {
    name: 'Sports & Fitness',
    slug: 'sports-fitness',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    description: 'Workout Gear, Footwear, Yoga & Accessories',
    subcategories: ['Footwear', 'Gear', 'Apparel']
  }
];

module.exports = { products, categories };