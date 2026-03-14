import mongoose from 'mongoose';

const cartItemSchema = mongoose.Schema({
  pizzaId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  customizations: {
    base: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
    sauce: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
    cheese: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
    veggies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
    meat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
  },
});

const cartSchema = mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
