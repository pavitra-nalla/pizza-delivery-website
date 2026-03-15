import Ingredient from '../models/Ingredient.js';
import Order from '../models/Order.js';

// @desc    Calculate price for custom pizza and save order
// @route   POST /api/build
// @access  Public
const buildPizza = async (req, res, next) => {
  try {
    // 1. Safely handle undefined req.body and missing fields
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing or undefined." });
    }

    // 2. Accept frontend fields
    const { base, sauce, cheese, veggies = [], meat = [] } = req.body;

    // 3. Combine cheese, veggies, meat into a single ingredients array (for logging or schema if needed)
    const ingredients = [];
    if (cheese) ingredients.push(cheese);
    if (Array.isArray(veggies)) ingredients.push(...veggies);
    if (Array.isArray(meat)) ingredients.push(...meat);

    // 4. Calculate totalPrice using a price map
    let basePrice = 10.99;
    let extraCost = 0;

    const priceMap = {
      thin: 0, thick: 1.5, 'cheese-burst': 3.0, wheat: 1.0,
      tomato: 0, marinara: 0.5, bbq: 0.5, garlic: 0.5, pesto: 1.0,
      mozzarella: 0, cheddar: 0.5, parmesan: 1.0, blend: 1.5, extra: 2.0,
      capsicum: 0.5, tomatoes: 0.5, mushrooms: 0.75, corn: 0.5, paneer: 1.0,
      pepperoni: 1.5, chicken: 1.5
    };

    const addCost = id => { 
      if (id && priceMap[id] !== undefined) extraCost += priceMap[id]; 
    };

    addCost(base);
    addCost(sauce);
    addCost(cheese);
    if (Array.isArray(veggies)) veggies.forEach(addCost);
    if (Array.isArray(meat)) meat.forEach(addCost);

    const totalPrice = basePrice + extraCost;

    // 5. Generate a unique orderId
    const orderId = 'ORD-' + Date.now();

    // 6. Save order to MongoDB
    const newOrder = await Order.create({
      customerName: 'Guest Builder',
      phoneNumber: 'N/A',
      deliveryAddress: 'N/A',
      totalPrice: totalPrice,
      status: 'pending_payment',
      items: [
        {
          pizzaId: orderId,
          name: 'Custom Builder Pizza',
          price: totalPrice,
          quantity: 1,
          customizations: { base, sauce, cheese, veggies, meat }
        }
      ]
    });

    // 7. Return JSON response
    res.status(201).json({
      message: "Pizza built successfully",
      totalPrice: totalPrice,
      orderId: newOrder._id
    });

  } catch (error) {
    // 8. Error handling
    console.error("Error in buildPizza:", error);
    res.status(500).json({ message: "Server error processing pizza build", error: error.message });
  }
};

export { buildPizza };