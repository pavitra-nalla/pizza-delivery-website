import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Package, ChefHat, Truck, Check, Edit2, Save } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';

const statusOptions: Array<{ key: 'received' | 'kitchen' | 'delivery'; label: string }> = [
  { key: 'received', label: 'Order Received' },
  { key: 'kitchen', label: 'In Kitchen' },
  { key: 'delivery', label: 'Sent to Delivery' },
];

const categoryLabels: Record<string, string> = {
  base: 'Pizza Base', sauce: 'Sauce', cheese: 'Cheese', veggies: 'Veggies', meat: 'Meat'
};

const AdminDashboard = () => {
  const { orders, inventory, updateOrderStatus, updateInventory } = useApp();
  const [tab, setTab] = useState<'orders' | 'inventory'>('orders');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState(0);

  const lowStockItems = inventory.filter(i => i.stock < i.threshold);

  const handleSaveStock = (id: string) => {
    updateInventory(id, editValue);
    setEditingId(null);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen cream-gradient pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground font-body mb-8">Manage orders, inventory, and more</p>
          </motion.div>

          {/* Low stock alerts */}
          {lowStockItems.length > 0 && (
            <div className="mb-8 space-y-3">
              {lowStockItems.map(item => (
                <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-body text-sm font-medium text-foreground">
                      Low Stock: {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-body">
                      Current: {item.stock} (Threshold: {item.threshold})
                    </p>
                  </div>
                  <span className="text-xs font-body text-destructive font-semibold px-3 py-1 rounded-full bg-destructive/10">
                    Alert Sent
                  </span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {(['orders', 'inventory'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-6 py-2.5 rounded-full text-sm font-body font-medium transition-all ${
                  tab === t ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:bg-accent'
                }`}>
                {t === 'orders' ? 'Orders' : 'Inventory'}
              </button>
            ))}
          </div>

          {tab === 'orders' && (
            <div className="bg-card rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-accent">
                    <tr>
                      {['Order ID', 'Customer', 'Total', 'Status', 'Actions'].map(h => (
                        <th key={h} className="px-6 py-4 text-left text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-accent/50 transition-colors">
                        <td className="px-6 py-4 font-body text-sm font-medium text-foreground">{order.id}</td>
                        <td className="px-6 py-4 font-body text-sm text-muted-foreground">{order.customerName}</td>
                        <td className="px-6 py-4 font-body text-sm font-semibold text-primary">${order.total.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-medium ${
                            order.status === 'delivered' ? 'bg-primary/10 text-primary' :
                            order.status === 'delivery' ? 'bg-secondary/30 text-secondary-foreground' :
                            order.status === 'kitchen' ? 'bg-accent text-accent-foreground' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {order.status === 'received' && <Package className="w-3 h-3" />}
                            {order.status === 'kitchen' && <ChefHat className="w-3 h-3" />}
                            {order.status === 'delivery' && <Truck className="w-3 h-3" />}
                            {order.status === 'delivered' && <Check className="w-3 h-3" />}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {order.status !== 'delivered' && (
                            <select
                              value={order.status}
                              onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                              className="px-3 py-1.5 rounded-lg bg-accent font-body text-xs text-foreground outline-none focus:ring-2 focus:ring-primary"
                            >
                              {statusOptions.map(s => (
                                <option key={s.key} value={s.key}>{s.label}</option>
                              ))}
                            </select>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'inventory' && (
            <div className="space-y-6">
              {Object.keys(categoryLabels).map(cat => {
                const items = inventory.filter(i => i.category === cat);
                if (items.length === 0) return null;
                return (
                  <div key={cat}>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-3">{categoryLabels[cat]}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {items.map(item => (
                        <motion.div key={item.id} whileHover={{ y: -2 }}
                          className={`bg-card rounded-xl p-5 shadow-sm border ${item.stock < item.threshold ? 'border-destructive/30' : 'border-transparent'}`}>
                          <div className="flex items-center justify-between">
                            <h4 className="font-body font-medium text-foreground text-sm">{item.name}</h4>
                            {item.stock < item.threshold && <AlertTriangle className="w-4 h-4 text-destructive" />}
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            {editingId === item.id ? (
                              <div className="flex items-center gap-2">
                                <input type="number" value={editValue} onChange={e => setEditValue(Number(e.target.value))}
                                  className="w-20 px-3 py-1.5 rounded-lg bg-accent font-body text-sm text-foreground outline-none focus:ring-2 focus:ring-primary" />
                                <button onClick={() => handleSaveStock(item.id)} className="p-1.5 rounded-lg bg-primary text-primary-foreground">
                                  <Save className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <span className={`text-2xl font-display font-bold ${item.stock < item.threshold ? 'text-destructive' : 'text-foreground'}`}>
                                  {item.stock}
                                </span>
                                <button onClick={() => { setEditingId(item.id); setEditValue(item.stock); }}
                                  className="p-1.5 rounded-lg hover:bg-accent transition-colors">
                                  <Edit2 className="w-4 h-4 text-muted-foreground" />
                                </button>
                              </>
                            )}
                          </div>
                          <div className="mt-2 w-full h-1.5 rounded-full bg-accent overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${item.stock < item.threshold ? 'bg-destructive' : 'bg-primary'}`}
                              style={{ width: `${Math.min(100, (item.stock / (item.threshold * 3)) * 100)}%` }} />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
