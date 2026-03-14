import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    items: [
      {
        pizzaId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        customizations: {
          base: { type: String },
          sauce: { type: String },
          cheese: { type: String },
          veggies: [{ type: String }],
          meat: [{ type: String }],
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending_payment', 'received', 'kitchen', 'delivery', 'delivered'],
      default: 'pending_payment',
    },
    paymentId: {
      type: String,
    },
    signature: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
