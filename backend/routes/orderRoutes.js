import express from 'express';
const router = express.Router();
import { placeOrder, getOrders, initOrder } from '../controllers/orderController.js';

router.route('/').post(placeOrder).get(getOrders);
router.route('/init').post(initOrder);

export default router;
