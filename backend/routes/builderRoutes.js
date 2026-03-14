import express from 'express';
const router = express.Router();
import { buildPizza } from '../controllers/builderController.js';

router.route('/').post(buildPizza);

export default router;
