import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Ingredient from './models/Ingredient.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const ingredients = [
  { name: 'Thin Crust', category: 'base', price: 0, image: 'thin-crust.png', description: 'Classic light crust' },
  { name: 'Cheese Burst', category: 'base', price: 3, image: 'cheese-burst.png', description: 'Stuffed cheese' },
  { name: 'Classic Tomato', category: 'sauce', price: 0, image: 'tomato-sauce.png', description: 'Rich tomato' },
  { name: 'Spicy Marinara', category: 'sauce', price: 0.5, image: 'marinara.png', description: 'Spicy herbs' },
  { name: 'Mozzarella', category: 'cheese', price: 0, image: 'mozzarella.png', description: 'Stretchy cheese' },
  { name: 'Cheddar', category: 'cheese', price: 0.5, image: 'cheddar.png', description: 'Sharp flavor' },
  { name: 'Capsicum', category: 'veggies', price: 0.5, image: 'capsicum.png', description: 'Fresh green' },
  { name: 'Jalapenos', category: 'veggies', price: 0.75, image: 'jalapeno.png', description: 'Spicy peppers' },
  { name: 'Black Olives', category: 'veggies', price: 0.75, image: 'olives.png', description: 'Sliced olives' },
  { name: 'Paneer', category: 'veggies', price: 1, image: 'paneer.png', description: 'Soft paneer cubes' }
];

const importData = async () => {
  try {
    await Ingredient.deleteMany();
    await Ingredient.insertMany(ingredients);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();
