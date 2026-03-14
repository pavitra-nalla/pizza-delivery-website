import Ingredient from '../models/Ingredient.js';

// @desc    Calculate price for custom pizza
// @route   POST /api/build
// @access  Public
const buildPizza = async (req, res, next) => {
  try {
    const { base, sauce, cheese, veggies, meat } = req.body;
    
    let basePrice = 10.99; // Starting base price
    let extraCost = 0;
    
    // Helper function to fetch ingredient and add to extraCost
    const addCost = async (id, category) => {
      if (id) {
        const item = await Ingredient.findOne({ _id: id, category });
        if (item) extraCost += item.price;
      }
    };

    await addCost(base, 'base');
    await addCost(sauce, 'sauce');
    await addCost(cheese, 'cheese');
    
    if (veggies && veggies.length > 0) {
      for(let v of veggies) {
        await addCost(v, 'veggies');
      }
    }
    
    if (meat && meat.length > 0) {
      for(let m of meat) {
        await addCost(m, 'meat');
      }
    }

    const totalPrice = basePrice + extraCost;
    
    res.json({ totalPrice: totalPrice.toFixed(2) });
  } catch (error) {
    next(error);
  }
};

export { buildPizza };
