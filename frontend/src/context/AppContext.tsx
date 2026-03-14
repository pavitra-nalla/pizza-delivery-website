import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Pizza, PizzaCustomization, Order, InventoryItem, mockOrders, mockInventory } from '@/data/mockData';

interface AppState {
  cart: CartItem[];
  isAuthenticated: boolean;
  isAdmin: boolean;
  userName: string;
  orders: Order[];
  inventory: InventoryItem[];
  currentOrder: Order | null;
  addToCart: (pizza: Pizza, quantity?: number, customizations?: PizzaCustomization) => void;
  removeFromCart: (pizzaId: string) => void;
  updateCartQuantity: (pizzaId: string, quantity: number) => void;
  clearCart: () => void;
  login: (email: string, password: string) => boolean;
  adminLogin: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string) => boolean;
  placeOrder: (address: string) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateInventory: (itemId: string, newStock: number) => void;
  cartTotal: number;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const addToCart = (pizza: Pizza, quantity = 1, customizations?: PizzaCustomization) => {
    setCart(prev => {
      const existing = prev.find(item => item.pizza.id === pizza.id);
      if (existing && !customizations) {
        return prev.map(item =>
          item.pizza.id === pizza.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { pizza, quantity, customizations }];
    });
  };

  const removeFromCart = (pizzaId: string) => {
    setCart(prev => prev.filter(item => item.pizza.id !== pizzaId));
  };

  const updateCartQuantity = (pizzaId: string, quantity: number) => {
    if (quantity <= 0) { removeFromCart(pizzaId); return; }
    setCart(prev => prev.map(item =>
      item.pizza.id === pizzaId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.pizza.price * item.quantity, 0);

  const login = (email: string, _password: string) => {
    setIsAuthenticated(true);
    setIsAdmin(false);
    setUserName(email.split('@')[0]);
    return true;
  };

  const adminLogin = (email: string, _password: string) => {
    setIsAuthenticated(true);
    setIsAdmin(true);
    setUserName('Admin');
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserName('');
  };

  const register = (name: string, _email: string, _password: string) => {
    setUserName(name);
    return true;
  };

  const placeOrder = (address: string) => {
    const order: Order = {
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      items: [...cart],
      total: cartTotal,
      status: 'received',
      customerName: userName,
      address,
      date: new Date().toISOString().split('T')[0],
    };
    setOrders(prev => [order, ...prev]);
    setCurrentOrder(order);
    clearCart();
    return order;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    if (currentOrder?.id === orderId) {
      setCurrentOrder(prev => prev ? { ...prev, status } : null);
    }
  };

  const updateInventory = (itemId: string, newStock: number) => {
    setInventory(prev => prev.map(i => i.id === itemId ? { ...i, stock: newStock } : i));
  };

  return (
    <AppContext.Provider value={{
      cart, isAuthenticated, isAdmin, userName, orders, inventory, currentOrder,
      addToCart, removeFromCart, updateCartQuantity, clearCart,
      login, adminLogin, logout, register, placeOrder,
      updateOrderStatus, updateInventory, cartTotal,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
