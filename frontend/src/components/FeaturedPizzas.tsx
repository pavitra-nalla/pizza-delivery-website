import { motion } from 'framer-motion';
import { pizzas } from '@/data/mockData';
import PizzaCard from './PizzaCard';

const FeaturedPizzas = () => {
  return (
    <section className="section-padding cream-gradient">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Featured Pizzas
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-md mx-auto">
            Handcrafted with premium ingredients and baked to perfection
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pizzas.slice(0, 8).map((pizza, i) => (
            <PizzaCard key={pizza.id} pizza={pizza} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPizzas;
