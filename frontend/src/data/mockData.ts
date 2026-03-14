import pizzaMargherita from '@/assets/pizza-margherita.png';
import pizzaBBQ from '@/assets/pizza-bbq.png';
import pizzaVeggie from '@/assets/pizza-veggie.png';
import pizzaHawaiian from '@/assets/pizza-hawaiian.png';
import pizzaCheese from '@/assets/pizza-cheese.png';
import pizzaMeat from '@/assets/pizza-meat.png';
import heroPizza from '@/assets/hero-pizza.png';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: 'veg' | 'non-veg' | 'cheese-burst' | 'popular' | 'offers';
  isVeg: boolean;
}

export interface CartItem {
  pizza: Pizza;
  quantity: number;
  customizations?: PizzaCustomization;
}

export interface PizzaCustomization {
  base: string;
  sauce: string;
  cheese: string;
  veggies: string[];
  meat: string[];
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'received' | 'kitchen' | 'delivery' | 'delivered';
  customerName: string;
  address: string;
  date: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'base' | 'sauce' | 'cheese' | 'veggies' | 'meat';
  stock: number;
  threshold: number;
}

export const pizzas: Pizza[] = [
  { id: '1', name: 'Classic Margherita', description: 'Fresh mozzarella, tomato sauce, and basil on a thin crust', price: 12.99, image: pizzaMargherita, rating: 4.8, category: 'veg', isVeg: true },
  { id: '2', name: 'BBQ Chicken', description: 'Grilled chicken, red onions, cilantro with smoky BBQ sauce', price: 16.99, image: pizzaBBQ, rating: 4.7, category: 'non-veg', isVeg: false },
  { id: '3', name: 'Garden Veggie', description: 'Bell peppers, mushrooms, olives, and fresh herbs', price: 14.99, image: pizzaVeggie, rating: 4.6, category: 'veg', isVeg: true },
  { id: '4', name: 'Hawaiian Bliss', description: 'Sweet pineapple chunks with savory ham and cheese', price: 15.99, image: pizzaHawaiian, rating: 4.5, category: 'non-veg', isVeg: false },
  { id: '5', name: 'Four Cheese', description: 'Mozzarella, parmesan, gorgonzola, and cheddar blend', price: 17.99, image: pizzaCheese, rating: 4.9, category: 'cheese-burst', isVeg: true },
  { id: '6', name: 'Meat Feast', description: 'Pepperoni, sausage, bacon, and ground beef', price: 18.99, image: pizzaMeat, rating: 4.8, category: 'non-veg', isVeg: false },
  { id: '7', name: 'Pepperoni Classic', description: 'Double pepperoni with extra mozzarella cheese', price: 14.99, image: pizzaMeat, rating: 4.7, category: 'popular', isVeg: false },
  { id: '8', name: 'Cheese Burst Deluxe', description: 'Triple cheese stuffed crust with premium toppings', price: 19.99, image: pizzaCheese, rating: 4.9, category: 'cheese-burst', isVeg: true },
];

export const heroPizzaImage = heroPizza;

import baseThinCrust from '@/assets/images/base/thin crust.jpg';
import baseThickCrust from '@/assets/images/base/Pan Pizza.jpg';
import baseCheeseBurst from '@/assets/images/base/cheese brust.jpg';
import baseWheatCrust from '@/assets/images/base/Whole Wheat.jpg';

import sauceTomato from '@/assets/images/Sauce/Classic Tomato.jpg';
import sauceMarinara from '@/assets/images/Sauce/Spicy Marinara.jpg';
import sauceGarlic from '@/assets/images/Sauce/Garlic Sauce.jpg';
import sauceBbq from '@/assets/images/Sauce/BBQ Sauce.jpg';
import saucePesto from '@/assets/images/Sauce/Pesto Sauce.jpg';

import cheeseCheddar from '@/assets/images/cheese/Cheddar.jpg';
import cheeseParmesan from '@/assets/images/cheese/Parmesan.jpg';
import cheeseMozzarella from '@/assets/images/cheese/Mozzarella.jpg';
import cheeseBlend from '@/assets/images/cheese/Cheese Blend.jpg';
import extraCheese from '@/assets/images/cheese/Extra Cheese.jpg';

import veggieCapsicum from '@/assets/images/veggies/capsicum.jpg';
import veggieTomatoes from '@/assets/images/veggies/tomato.jpg';
import veggiePaneer from '@/assets/images/veggies/Paneer.jpg';
import veggieMushroom from '@/assets/images/veggies/mushroom.jpg';
import veggieCorn from '@/assets/images/veggies/sweet corn.jpg';

import meatChicken from '@/assets/images/Non-Veg/Chicken.jpg';
import meatPepperoni from '@/assets/images/Non-Veg/pepperoni.jpg';

const placeholder = '/placeholder.svg';

export const builderBases = [
  { id: 'thin', name: 'Classic Thin Crust', description: 'Light crispy traditional pizza base', price: 0, image: baseThinCrust },
  { id: 'thick', name: 'Pan Pizza', description: 'Soft and fluffy pan style base', price: 1.5, image: baseThickCrust },
  { id: 'cheese-burst', name: 'Cheese Burst', description: 'Stuffed crust filled with melted cheese', price: 3.0, image: baseCheeseBurst },
  { id: 'wheat', name: 'Whole Wheat', description: 'Healthy whole grain pizza base', price: 1.0, image: baseWheatCrust },
];

export const builderSauces = [
  { id: 'tomato', name: 'Classic Tomato', description: 'Rich and tangy traditional tomato sauce', price: 0, image: sauceTomato },
  { id: 'marinara', name: 'Spicy Marinara', description: 'Fiery tomato sauce with chili flakes', price: 0.5, image: sauceMarinara },
  { id: 'bbq', name: 'Barbecue Sauce', description: 'Smoky sweet BBQ flavor', price: 0.5, image: sauceBbq },
  { id: 'garlic', name: 'Garlic Sauce', description: 'Creamy roasted garlic butter sauce', price: 0.5, image: sauceGarlic },
  { id: 'pesto', name: 'Pesto Sauce', description: 'Fresh basil and pine nut sauce', price: 1.0, image: saucePesto },
];

export const builderCheeses = [
  { id: 'mozzarella', name: 'Mozzarella', description: 'Classic stretchy Italian cheese', price: 0, image: cheeseMozzarella },
  { id: 'cheddar', name: 'Cheddar', description: 'Sharp and tangy aged cheese', price: 0.5, image: cheeseCheddar },
  { id: 'parmesan', name: 'Parmesan', description: 'Nutty and savory aged Italian cheese', price: 1.0, image: cheeseParmesan },
  { id: 'blend', name: 'Cheese Blend', description: 'Perfect mix of cheeses', price: 1.5, image: cheeseBlend },
  { id: 'extra', name: 'Extra Cheese', description: 'Double the cheesy goodness', price: 2.0, image: extraCheese },
];

export const builderVeggies = [
  { id: 'capsicum', name: 'Capsicum', description: 'Fresh green capsicum slices', price: 0.5, image: veggieCapsicum },
  { id: 'tomatoes', name: 'Tomatoes', description: 'Fresh tomato slices', price: 0.5, image: veggieTomatoes },
  { id: 'mushrooms', name: 'Mushrooms', description: 'Fresh mushroom slices', price: 0.75, image: veggieMushroom },
  { id: 'corn', name: 'Corn', description: 'Sweet corn kernels', price: 0.5, image: veggieCorn },
  { id: 'paneer', name: 'Paneer', description: 'Fresh paneer cubes', price: 1.0, image: veggiePaneer },
];

export const builderMeats = [
  { id: 'pepperoni', name: 'Pepperoni', description: 'Spiced Italian cured meat slices', price: 1.5, image: meatPepperoni },
  { id: 'chicken', name: 'Chicken', description: 'Seasoned chicken chunks', price: 1.5, image: meatChicken },
];

export const mockOrders: Order[] = [
  { id: 'ORD-001', items: [], total: 42.97, status: 'kitchen', customerName: 'John Smith', address: '123 Main St, Apt 4B', date: '2026-03-12' },
  { id: 'ORD-002', items: [], total: 31.98, status: 'delivery', customerName: 'Sarah Johnson', address: '456 Oak Ave', date: '2026-03-12' },
  { id: 'ORD-003', items: [], total: 54.96, status: 'received', customerName: 'Mike Davis', address: '789 Pine Rd', date: '2026-03-12' },
  { id: 'ORD-004', items: [], total: 25.98, status: 'delivered', customerName: 'Emily Chen', address: '321 Elm St', date: '2026-03-11' },
];

export const mockInventory: InventoryItem[] = [
  { id: '1', name: 'Classic Thin Crust', category: 'base', stock: 15, threshold: 20 },
  { id: '2', name: 'Thick Crust', category: 'base', stock: 45, threshold: 20 },
  { id: '3', name: 'Cheese Burst', category: 'base', stock: 30, threshold: 20 },
  { id: '4', name: 'Classic Tomato', category: 'sauce', stock: 50, threshold: 15 },
  { id: '5', name: 'Spicy Marinara', category: 'sauce', stock: 10, threshold: 15 },
  { id: '6', name: 'Mozzarella', category: 'cheese', stock: 60, threshold: 25 },
  { id: '7', name: 'Cheddar', category: 'cheese', stock: 35, threshold: 15 },
  { id: '8', name: 'Onions', category: 'veggies', stock: 8, threshold: 10 },
  { id: '9', name: 'Mushrooms', category: 'veggies', stock: 40, threshold: 10 },
  { id: '10', name: 'Pepperoni', category: 'meat', stock: 5, threshold: 10 },
  { id: '11', name: 'Grilled Chicken', category: 'meat', stock: 25, threshold: 10 },
];

export const reviews = [
  { id: '1', name: 'Alex Thompson', rating: 5, text: 'Best pizza in town! The cheese burst crust is absolutely divine.', date: '2 days ago' },
  { id: '2', name: 'Maria Garcia', rating: 5, text: 'Quick delivery and the pizza was still piping hot. Love the custom builder!', date: '1 week ago' },
  { id: '3', name: 'James Wilson', rating: 4, text: 'Great variety and amazing flavors. The BBQ chicken is a must-try.', date: '2 weeks ago' },
  { id: '4', name: 'Lisa Park', rating: 5, text: 'The freshest ingredients and perfect crust every single time.', date: '3 weeks ago' },
];
