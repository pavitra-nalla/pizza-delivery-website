import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { reviews } from '@/data/mockData';

const CustomerReviews = () => {
  return (
    <section id="reviews" className="section-padding cream-gradient">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-md space-y-4"
            >
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">"{review.text}"</p>
              <div>
                <p className="font-display font-semibold text-foreground text-sm">{review.name}</p>
                <p className="text-xs text-muted-foreground font-body">{review.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
