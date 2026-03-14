import express from 'express';
const router = express.Router();
import { getIngredients } from '../controllers/ingredientController.js';

router.route('/').get(getIngredients);

export default router;
