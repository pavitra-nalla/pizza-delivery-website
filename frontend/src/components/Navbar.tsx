import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'Reviews', path: '/#reviews' },
  { label: 'Contacts', path: '/#contacts' },
];

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { isAuthenticated, isAdmin, cart, logout } = useApp();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-display font-bold text-foreground tracking-tight">
          PIZZA SLICE
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <Link
              key={item.label}
              to={item.path}
              className={`text-sm font-body font-medium transition-colors duration-200 hover:text-primary ${
                location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <AnimatePresence>
            {searchOpen && (
              <motion.input
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 180, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="bg-accent rounded-full px-4 py-1.5 text-sm font-body outline-none text-foreground"
                placeholder="Search..."
                autoFocus
              />
            )}
          </AnimatePresence>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            <Search className="w-4 h-4 text-muted-foreground" />
          </button>

          {isAuthenticated ? (
            <>
              <Link to={isAdmin ? '/admin' : '/dashboard'} className="p-2 rounded-full hover:bg-accent transition-colors">
                <User className="w-4 h-4 text-muted-foreground" />
              </Link>
              {!isAdmin && (
                <Link to="/checkout" className="p-2 rounded-full hover:bg-accent transition-colors relative">
                  <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-body font-bold">
                      {cart.length}
                    </span>
                  )}
                </Link>
              )}
              <button onClick={logout} className="p-2 rounded-full hover:bg-accent transition-colors">
                <LogOut className="w-4 h-4 text-muted-foreground" />
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary text-sm py-2 px-5">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
