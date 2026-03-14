import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { heroPizzaImage } from '@/data/mockData';

const HeroSection = () => {
  return (
    <section className="hero-gradient min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-6 z-10"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight">
            Love at<br />First Bite.
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 font-body max-w-md leading-relaxed">
            Your favorite slices, topped with love, melted cheese, and a little bit of pure happiness.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/menu" className="btn-primary">
              Order Now
            </Link>
            <Link to="/menu" className="btn-outline">
              View Menu
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative flex justify-center items-center"
        >
          <div className="absolute w-[90%] h-[90%] bg-card/30 rounded-full blur-3xl" />
          <img
            src={heroPizzaImage}
            alt="Delicious premium pizza with fresh toppings"
            className="relative w-full max-w-lg animate-float drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
