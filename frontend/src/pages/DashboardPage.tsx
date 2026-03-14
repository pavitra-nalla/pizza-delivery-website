import { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pizzas } from '@/data/mockData';
import PizzaCard from '@/components/PizzaCard';
import Navbar from '@/components/Navbar';
import { useApp } from '@/context/AppContext';

const filters = ['All', 'Veg', 'Non-Veg', 'Cheese Burst', 'Popular', 'Offers'];

const DashboardPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const { userName } = useApp();

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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">Hey, {userName}!</h1>
              <p className="text-muted-foreground font-body mt-1">What are you craving today?</p>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-0">
              <Link to="/pizza-builder" className="btn-primary text-sm py-2">Build Your Own</Link>
              <Link to="/order-tracking" className="btn-outline text-sm py-2">Track Orders</Link>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 ${
                    activeFilter === f ? 'bg-primary text-primary-foreground shadow-md' : 'bg-card text-muted-foreground hover:bg-accent'
                  }`}>
                  {f}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search pizzas..." value={search} onChange={e => setSearch(e.target.value)}
                className="pl-11 pr-4 py-2.5 rounded-full bg-card font-body text-sm text-foreground outline-none focus:ring-2 focus:ring-primary shadow-sm w-60" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((pizza, i) => (
              <PizzaCard key={pizza.id} pizza={pizza} index={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
