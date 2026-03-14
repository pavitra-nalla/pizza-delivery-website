import Ingredient from '../models/Ingredient.js';

// @desc    Fetch all ingredients
// @route   GET /api/ingredients
// @access  Public
const getIngredients = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find({});
    
    // Group ingredients by category
    const categorized = {
      base: ingredients.filter(i => i.category === 'base'),
      sauce: ingredients.filter(i => i.category === 'sauce'),
      cheese: ingredients.filter(i => i.category === 'cheese'),
      veggies: ingredients.filter(i => i.category === 'veggies'),
      meat: ingredients.filter(i => i.category === 'meat')
    };
    
    res.json(categorized);
  } catch (error) {
    next(error);
  }
};

export { getIngredients };
