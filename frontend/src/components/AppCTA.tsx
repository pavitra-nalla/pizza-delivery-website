import { motion } from 'framer-motion';
import { Smartphone, Download } from 'lucide-react';

const AppCTA = () => (
  <section className="section-padding bg-card">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="hero-gradient rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-10"
      >
        <div className="flex-1 space-y-5">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Get the CHEEZO App
          </h2>
          <p className="text-foreground/70 font-body text-lg max-w-md">
            Order faster, track your delivery in real-time, and unlock exclusive deals only on the app.
          </p>
          <div className="flex gap-4">
            <button className="btn-primary flex items-center gap-2">
              <Download className="w-4 h-4" /> App Store
            </button>
            <button className="btn-outline flex items-center gap-2">
              <Download className="w-4 h-4" /> Google Play
            </button>
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="w-48 h-80 bg-card rounded-3xl shadow-2xl flex items-center justify-center">
            <Smartphone className="w-16 h-16 text-primary/30" />
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AppCTA;
