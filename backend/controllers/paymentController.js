import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';

// Initialize Razorpay
const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

// @desc    Create a Razorpay order
// @route   POST /api/payments/create-order
// @access  Public
export const createOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;

    console.log("createOrder amount received:", amount);

    if (!amount) {
      console.log("Amount missing, returning 400");
      res.status(400);
      throw new Error('Amount is required');
    }

    console.log("Initializing Razorpay instance");
    const instance = getRazorpayInstance();

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise (multiply by 100)
      currency: 'INR', // Using INR
      receipt: `receipt_${Date.now()}`,
    };

// Removed debug log:
    const order = await instance.orders.create(options);
    console.log("Razorpay order response:", order);

    if (!order) {
      res.status(500);
      throw new Error('Some error occured while creating Razorpay order');
    }

    res.json({ ...order, key_id: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    console.error("Error creating order:", error);
    next(error);
  }
};

// @desc    Verify payment signature & update database
// @route   POST /api/payments/verify
// @access  Public
export const verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      dbOrderId, // The _id of the order saved in our MongoDB
    } = req.body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      // Payment is authentic
      // Update our database order status
      const updatedOrder = await Order.findByIdAndUpdate(
        dbOrderId,
        {
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
          status: 'received', // Payment successful, order is now received by kitchen
        },
        { new: true }
      );

      return res.status(200).json({ message: 'Payment verified successfully', order: updatedOrder });
    } else {
      res.status(400);
      throw new Error('Invalid signature sent!');
    }
  } catch (error) {
    next(error);
  }
};
