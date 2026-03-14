import http from 'http';

const request = (method, path, data = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch(e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (e) => reject(e));

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
};

async function runTests() {
  console.log('--- Starting API Tests ---');
  let ingredients = [];
  try {
    // 1. Fetch ingredients
    console.log('\\n1. Fetch Ingredients: GET /api/ingredients');
    let res = await request('GET', '/api/ingredients');
    console.log(`Status: ${res.status}`);
    const data = res.data;
    
    // Flatten categorical ingredients
    const allIngredients = [];
    if (data.base) allIngredients.push(...data.base);
    if (data.sauce) allIngredients.push(...data.sauce);
    if (data.cheese) allIngredients.push(...data.cheese);
    if (data.veggies) allIngredients.push(...data.veggies);
    
    console.log(`Received ${allIngredients.length} ingredients.`);
    
    // 2. Build Pizza (Calculate Price)
    console.log('\\n2. Calculate Price: POST /api/build');
    const componentIds = allIngredients.slice(0, 3).map(i => i._id);
    res = await request('POST', '/api/build', { components: componentIds });
    console.log(`Status: ${res.status}`);
    console.log('Response:', JSON.stringify(res.data));

    // 3. Add to Cart
    console.log('\\n3. Add to Cart: POST /api/cart');
    const sessionId = 'test-session-123';
    const cartItem = {
      sessionId,
      item: {
        pizzaId: 'custom-123',
        name: 'Custom Pizza',
        price: res.data.totalPrice || 10,
        quantity: 1,
        customizations: {
          base: componentIds[0],
          sauce: componentIds[1],
          cheese: componentIds[2],
          veggies: []
        }
      }
    };
    res = await request('POST', '/api/cart', cartItem);
    console.log(`Status: ${res.status}`);
    console.log('Response:', JSON.stringify(res.data));

    // 4. Place an order
    console.log('\\n4. Place Order: POST /api/orders');
    const orderData = {
      customerName: 'John Doe',
      phoneNumber: '1234567890',
      deliveryAddress: '123 Pizza Street',
      items: [cartItem.item],
      totalPrice: cartItem.item.price
    };
    res = await request('POST', '/api/orders', orderData);
    console.log(`Status: ${res.status}`);
    console.log('Response:', JSON.stringify(res.data));
    
    // 5. Fetch Orders
    console.log('\\n5. Fetch Orders: GET /api/orders');
    res = await request('GET', '/api/orders');
    console.log(`Status: ${res.status}`);
    if (Array.isArray(res.data)) {
        console.log(`Received ${res.data.length} orders.`);
    } else {
        console.log('Response:', JSON.stringify(res.data));
    }

  } catch(e) {
    console.error('Test failed:', e);
  }
}

runTests();
