import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Pizza } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

interface PizzaCardProps {
  pizza: Pizza;
  index?: number;
}

const PizzaCard = ({ pizza, index = 0 }: PizzaCardProps) => {
  const { addToCart, isAuthenticated } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="card-pizza group"
    >
      <div className="relative overflow-hidden bg-accent/50 p-6">
        <img
          src={pizza.image}
          alt={pizza.name}
          className="w-full h-48 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
        />
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-lg text-card-foreground">{pizza.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm font-body font-medium text-muted-foreground">{pizza.rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground font-body line-clamp-2">{pizza.description}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xl font-display font-bold text-primary">₹{pizza.price.toFixed(2)}</span>
          <button
            onClick={() => isAuthenticated ? addToCart(pizza) : null}
            className="btn-primary text-sm py-2 px-5"
          >
            {isAuthenticated ? 'Add to Cart' : 'Sign In'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PizzaCard;
