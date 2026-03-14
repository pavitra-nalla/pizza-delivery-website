import { motion } from 'framer-motion';
import { Check, ChefHat, Truck, Package } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';

const statusSteps = [
  { key: 'received', label: 'Order Received', icon: Package },
  { key: 'kitchen', label: 'In Kitchen', icon: ChefHat },
  { key: 'delivery', label: 'Sent to Delivery', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: Check },
];

const OrderTrackingPage = () => {
  const { currentOrder, orders } = useApp();
  const order = currentOrder || orders[0];

  const statusIndex = statusSteps.findIndex(s => s.key === order?.status);

  return (
    <>
      <Navbar />
      <div className="min-h-screen cream-gradient pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-display font-bold text-foreground mb-2">Order Tracking</h1>
            {order && <p className="text-muted-foreground font-body mb-10">Order #{order.id}</p>}
          </motion.div>

          {order ? (
            <div className="bg-card rounded-2xl p-8 shadow-md">
              <div className="space-y-8">
                {statusSteps.map((s, i) => {
                  const isActive = i <= statusIndex;
                  const isCurrent = i === statusIndex;
                  return (
                    <motion.div
                      key={s.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <motion.div
                          animate={isCurrent ? { scale: [1, 1.15, 1] } : {}}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isActive ? 'bg-primary text-primary-foreground' : 'bg-accent text-muted-foreground'
                          }`}
                        >
                          <s.icon className="w-5 h-5" />
                        </motion.div>
                        {i < statusSteps.length - 1 && (
                          <div className={`w-0.5 h-12 ${isActive ? 'bg-primary' : 'bg-border'}`} />
                        )}
                      </div>
                      <div className="pt-2">
                        <h4 className={`font-display font-semibold ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {s.label}
                        </h4>
                        {isCurrent && (
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary font-body mt-1">
                            Current status
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Delivery to</span>
                  <span className="text-foreground font-medium">{order.address}</span>
                </div>
                <div className="flex justify-between font-body text-sm mt-2">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-primary font-display font-bold text-lg">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground font-body text-center">No active orders to track.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderTrackingPage;
