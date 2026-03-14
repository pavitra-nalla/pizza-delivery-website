import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { pizzas } from '@/data/mockData';
import PizzaCard from '@/components/PizzaCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const filters = ['All', 'Veg', 'Non-Veg', 'Cheese Burst', 'Popular', 'Offers'];

const MenuPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = pizzas.filter(p => {
    const matchFilter = activeFilter === 'All' || p.category === activeFilter.toLowerCase().replace(' ', '-');
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen cream-gradient pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Our Menu</h1>
            <p className="text-muted-foreground font-body text-lg">Explore our handcrafted selection</p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 ${
                    activeFilter === f
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-card text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text" placeholder="Search pizzas..." value={search} onChange={e => setSearch(e.target.value)}
                className="pl-11 pr-4 py-2.5 rounded-full bg-card font-body text-sm text-foreground outline-none focus:ring-2 focus:ring-primary shadow-sm w-60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((pizza, i) => (
              <PizzaCard key={pizza.id} pizza={pizza} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground font-body mt-12">No pizzas found matching your criteria.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MenuPage;
