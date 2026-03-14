import Cart from '../models/Cart.js';

// @desc    Get cart by session ID
// @route   GET /api/cart/:sessionId
// @access  Public
const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId }).populate(
      'items.customizations.base items.customizations.sauce items.customizations.cheese items.customizations.veggies items.customizations.meat'
    );
    if (cart) {
      res.json(cart);
    } else {
      res.json({ sessionId: req.params.sessionId, items: [] });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Public
const addToCart = async (req, res, next) => {
  try {
    const { sessionId, item } = req.body;
    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      cart = new Cart({ sessionId, items: [item] });
    } else {
      cart.items.push(item);
    }

    const updatedCart = await cart.save();
    res.status(201).json(updatedCart);
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:sessionId/:itemId
// @access  Public
const removeFromCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId });

    if (cart) {
      cart.items = cart.items.filter((item) => item._id.toString() !== req.params.itemId);
      const updatedCart = await cart.save();
      res.json(updatedCart);
    } else {
      res.status(404);
      throw new Error('Cart not found');
    }
  } catch (error) {
    next(error);
  }
};

export { getCart, addToCart, removeFromCart };
