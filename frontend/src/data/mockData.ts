// Removed local pizza imports

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
  { id: '1', name: 'Classic Margherita', description: 'Fresh mozzarella, tomato sauce, and basil on a thin crust', price: 12.99, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773567078/pizza-margherita_kmhsl7.png', rating: 4.8, category: 'veg', isVeg: true },
  { id: '2', name: 'BBQ Chicken', description: 'Grilled chicken, red onions, cilantro with smoky BBQ sauce', price: 16.99, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773566940/pizza-bbq_geikee.png', rating: 4.7, category: 'non-veg', isVeg: false },
  { id: '3', name: 'Garden Veggie', description: 'Bell peppers, mushrooms, olives, and fresh herbs', price: 14.99, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773567171/pizza-veggie_gnkchl.png', rating: 4.6, category: 'veg', isVeg: true },
  { id: '4', name: 'Hawaiian Bliss', description: 'Sweet pineapple chunks with savory ham and cheese', price: 15.99, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773567024/pizza-hawaiian_c0ckz4.png', rating: 4.5, category: 'non-veg', isVeg: false },
  { id: '5', name: 'Four Cheese', description: 'Mozzarella, parmesan, gorgonzola, and cheddar blend', price: 17.99, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773566982/pizza-cheese_pkxwk8.png', rating: 4.9, category: 'cheese-burst', isVeg: true },
  { id: '6', name: 'Meat Feast', description: 'Pepperoni, sausage, bacon, and ground beef', price: 18.99, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773567126/pizza-meat_eepffd.png', rating: 4.8, category: 'non-veg', isVeg: false },
  { id: '7', name: 'Pepperoni Classic', description: 'Double pepperoni with extra mozzarella cheese', price: 14.99, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773567126/pizza-meat_eepffd.png', rating: 4.7, category: 'popular', isVeg: false },
  { id: '8', name: 'Cheese Burst Deluxe', description: 'Triple cheese stuffed crust with premium toppings', price: 19.99, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773566982/pizza-cheese_pkxwk8.png', rating: 4.9, category: 'cheese-burst', isVeg: true },
];

export const heroPizzaImage = 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773566883/hero-pizza_ftanui.png';

const placeholder = '/placeholder.svg';

export const builderBases = [
  { id: 'thin', name: 'Classic Thin Crust', description: 'Light crispy traditional pizza base', price: 0, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773564084/thin_crust_f3t1l9.jpg' },
  { id: 'thick', name: 'Pan Pizza', description: 'Soft and fluffy pan style base', price: 1.5, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773564013/Pan_Pizza_cghqgw.jpg' },
  { id: 'cheese-burst', name: 'Cheese Burst', description: 'Stuffed crust filled with melted cheese', price: 3.0, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773563627/cheese_brust_jqlsqg.jpg' },
  { id: 'wheat', name: 'Whole Wheat', description: 'Healthy whole grain pizza base', price: 1.0, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773564134/Whole_Wheat_blqbxf.jpg' },
];

export const builderSauces = [
  { id: 'tomato', name: 'Classic Tomato', description: 'Rich and tangy traditional tomato sauce', price: 0, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773564651/Classic_Tomato_ib9jbk.jpg' },
  { id: 'marinara', name: 'Spicy Marinara', description: 'Fiery tomato sauce with chili flakes', price: 0.5, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773564814/Spicy_Marinara_kdumeo.jpg' },
  { id: 'bbq', name: 'Barbecue Sauce', description: 'Smoky sweet BBQ flavor', price: 0.5, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773564596/BBQ_Sauce_zatkmr.jpg' },
  { id: 'garlic', name: 'Garlic Sauce', description: 'Creamy roasted garlic butter sauce', price: 0.5, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773564707/Garlic_Sauce_ylhvda.jpg' },
  { id: 'pesto', name: 'Pesto Sauce', description: 'Fresh basil and pine nut sauce', price: 1.0, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773564761/Pesto_Sauce_vcgvqc.jpg' },
];

export const builderCheeses = [
  { id: 'mozzarella', name: 'Mozzarella', description: 'Classic stretchy Italian cheese', price: 0, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773564339/Mozzarella_zoetdl.jpg' },
  { id: 'cheddar', name: 'Cheddar', description: 'Sharp and tangy aged cheese', price: 0.5, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773564190/Cheddar_dxgqrx.jpg' },
  { id: 'parmesan', name: 'Parmesan', description: 'Nutty and savory aged Italian cheese', price: 1.0, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773564425/Parmesan_w7jduw.jpg' },
  { id: 'blend', name: 'Cheese Blend', description: 'Perfect mix of cheeses', price: 1.5, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773564234/Cheese_Blend_hv7l77.jpg' },
  { id: 'extra', name: 'Extra Cheese', description: 'Double the cheesy goodness', price: 2.0, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773564279/Extra_Cheese_aiqcl3.jpg' },
];

export const builderVeggies = [
  { id: 'capsicum', name: 'Capsicum', description: 'Fresh green capsicum slices', price: 0.5, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773564921/capsicum_m1vqzm.jpg' },
  { id: 'tomatoes', name: 'Tomatoes', description: 'Fresh tomato slices', price: 0.5, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773565117/tomato_u3iu6n.jpg' },
  { id: 'mushrooms', name: 'Mushrooms', description: 'Fresh mushroom slices', price: 0.75, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773564981/mushroom_r3toww.jpg' },
  { id: 'corn', name: 'Corn', description: 'Sweet corn kernels', price: 0.5, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773565073/sweet_corn_keoiuh.jpg' },
  { id: 'paneer', name: 'Paneer', description: 'Fresh paneer cubes', price: 1.0, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773565030/Paneer_rmmll3.jpg' },
];

export const builderMeats = [
  { id: 'pepperoni', name: 'Pepperoni', description: 'Spiced Italian cured meat slices', price: 1.5, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773564547/pepperoni_wzwa1p.jpg' },
  { id: 'chicken', name: 'Chicken', description: 'Seasoned chicken chunks', price: 1.5, image: 'https://res.cloudinary.com/dhlbyi8w1/image/upload/v1773564492/Chicken_fjt4pa.jpg' },
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
