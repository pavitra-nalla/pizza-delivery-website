import express from 'express';
const router = express.Router();
import { getCart, addToCart, removeFromCart } from '../controllers/cartController.js';

router.route('/').post(addToCart);
router.route('/:sessionId').get(getCart);
router.route('/:sessionId/:itemId').delete(removeFromCart);

export default router;
