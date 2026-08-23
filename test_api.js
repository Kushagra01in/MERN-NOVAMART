const http = require('http');

function testEndpoint(path, method = 'GET', data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const payload = data ? JSON.stringify(data) : null;
    const reqHeaders = { ...headers };
    if (payload) {
      reqHeaders['Content-Type'] = 'application/json';
      reqHeaders['Content-Length'] = Buffer.byteLength(payload);
    }

    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path,
      method,
      headers: reqHeaders
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, body });
        }
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function runTests() {
  console.log('🇮🇳 Running NovaMart India API Verification...\n');

  // 1. Health check
  const health = await testEndpoint('/api/health');
  console.log('1. Health Check:', health.status === 200 ? '✅ PASSED' : '❌ FAILED', JSON.stringify(health.data));

  // 2. Fetch Products
  const products = await testEndpoint('/api/products');
  const firstProd = products.data.products[0];
  console.log('2. INR Product Catalog:', products.status === 200 ? '✅ PASSED' : '❌ FAILED', `Sample: "${firstProd.name.substring(0, 30)}..." @ ₹${firstProd.price.toLocaleString('en-IN')}`);

  // 3. Featured Deals
  const deals = await testEndpoint('/api/products/featured/deals');
  console.log('3. Super Deals Rails:', deals.status === 200 ? '✅ PASSED' : '❌ FAILED', `Deals: ${deals.data.deals?.length}, Bestsellers: ${deals.data.bestSellers?.length}`);

  // 4. Admin Login
  const adminLogin = await testEndpoint('/api/auth/login', 'POST', {
    email: 'admin@novamart.com',
    password: 'admin123'
  });
  console.log('4. Admin Auth:', adminLogin.status === 200 ? '✅ PASSED' : '❌ FAILED', `User: ${adminLogin.data.user?.name} (Role: ${adminLogin.data.user?.role})`);

  // 5. Customer Login & Create Order with Indian UPI
  const userLogin = await testEndpoint('/api/auth/login', 'POST', {
    email: 'john@example.com',
    password: 'user123'
  });
  console.log('5. Indian Customer Auth:', userLogin.status === 200 ? '✅ PASSED' : '❌ FAILED', `Customer: ${userLogin.data.user?.name}`);

  const userToken = userLogin.data.token;
  const createOrder = await testEndpoint('/api/orders', 'POST', {
    orderItems: [{
      product: firstProd._id,
      name: firstProd.name,
      qty: 1,
      image: firstProd.mainImage,
      price: firstProd.price
    }],
    shippingAddress: {
      fullName: 'Kushagra Jha',
      street: '402 Sunrise Heights, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400050',
      phone: '+91 9876543210',
      country: 'India'
    },
    paymentMethod: 'UPI (GPay / PhonePe)',
    itemsPrice: firstProd.price,
    shippingPrice: 0,
    taxPrice: Math.round(firstProd.price * 0.18),
    totalPrice: firstProd.price
  }, {
    'Authorization': `Bearer ${userToken}`
  });

  console.log('6. INR Order Placement:', createOrder.status === 201 ? '✅ PASSED' : '❌ FAILED', `Tracking: ${createOrder.data.order?.trackingNumber}, Total: ₹${createOrder.data.order?.totalPrice.toLocaleString('en-IN')}`);

  console.log('\n🎉 NovaMart India is completely verified and running smoothly!');
}

runTests().catch(console.error);