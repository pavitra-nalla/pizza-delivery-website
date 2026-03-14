import Order from '../models/Order.js';

// @desc    Place a new order
// @route   POST /api/orders
// @access  Public
const placeOrder = async (req, res, next) => {
  try {
    const { customerName, phoneNumber, deliveryAddress, items, totalPrice } = req.body;

    if (!items || items.length === 0) {
      res.status(400);
      throw new Error('No order items');
    }

    const order = new Order({
      customerName,
      phoneNumber,
      deliveryAddress,
      items,
      totalPrice,
      status: 'received'
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Initialize a new order before payment
// @route   POST /api/orders/init
// @access  Public
const initOrder = async (req, res, next) => {
  try {
    const { customerName, phoneNumber, deliveryAddress, items, totalPrice } = req.body;

    if (!items || items.length === 0) {
      res.status(400);
      throw new Error('No order items');
    }

    const order = new Order({
      customerName,
      phoneNumber,
      deliveryAddress,
      items,
      totalPrice,
      status: 'pending_payment' // new status indicating waiting for payment
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export { placeOrder, getOrders, initOrder };
