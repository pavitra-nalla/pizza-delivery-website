import { motion } from 'framer-motion';
import { Flame, Clock, Truck, Award } from 'lucide-react';

const features = [
  { icon: Flame, title: 'Fresh Ingredients', desc: 'We source the finest ingredients from local farms and artisan suppliers.' },
  { icon: Clock, title: '30 Min Delivery', desc: 'Hot pizza at your door in 30 minutes or your next order is on us.' },
  { icon: Truck, title: 'Free Delivery', desc: 'Enjoy free delivery on all orders above $25. No hidden charges.' },
  { icon: Award, title: 'Award Winning', desc: 'Voted best pizza in the city three years running.' },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-card">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-md mx-auto">
            There are many reasons to love CHEEZO
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-4 p-6 rounded-2xl hover:bg-accent transition-colors duration-300"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
