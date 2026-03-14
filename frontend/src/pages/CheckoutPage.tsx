import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CreditCard, Check, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage = () => {
  const { cart, cartTotal, placeOrder, removeFromCart, updateCartQuantity } = useApp();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePay = async () => {
    if (!address || !city || !zip) {
      setError('Please fill in your complete delivery address.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      // 1. Create pending order on our backend DB
      const dbOrderRes = await fetch('http://localhost:5000/api/orders/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: 'Guest User', // Mock name since user isn't logged in in this flow
          phoneNumber: '9999999999',
          deliveryAddress: `${address}, ${city} ${zip}`,
          items: cart.map(item => ({
            pizzaId: item.pizza.id,
            name: item.pizza.name,
            price: item.pizza.price,
            quantity: item.quantity,
            customizations: item.customizations || {}
          })),
          totalPrice: cartTotal
        }),
      });
      const dbOrder = await dbOrderRes.json();
      if (!dbOrderRes.ok) throw new Error(dbOrder.message || 'Failed to initialize backend order');

      // 2. Call our API to create Razorpay Order
      const orderRes = await fetch('http://localhost:5000/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cartTotal }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) throw new Error(orderData.message || 'Failed to initialize payment');

      // 3. Open Razorpay Checkout
      const options = {
        key: orderData.key_id, // Dynamically use the key provided by the backend
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Pizza Slice',
        description: 'Pizza Order Payment',
        order_id: orderData.id, 
        handler: async function (response: any) {
          // 4. Verify Payment with the real dbOrderId
          try {
            const verifyRes = await fetch('http://localhost:5000/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                dbOrderId: dbOrder._id // Send the actual MongoDB order ID
              }),
            });

            const verifyData = await verifyRes.json();
            
            if (verifyRes.ok) {
              setOrderId(dbOrder._id);
              placeOrder(`${address}, ${city} ${zip}`); // Clear cart in frontend context
              setOrderPlaced(true);
            } else {
              setError(verifyData.message || 'Payment verification failed.');
            }
          } catch (err: any) {
            setError(err.message || 'Payment verification failed.');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#fb923c', // primary color
        },
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
        setError(response.error.description || 'Payment Failed.');
        setLoading(false);
      });

      rzp.open();

    } catch (err: any) {
      setError(err.message || 'An error occurred during checkout.');
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center cream-gradient pt-16 px-6">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center"
            >
              <Check className="w-12 h-12 text-primary" />
            </motion.div>
            <h2 className="text-3xl font-display font-bold text-foreground">Order Confirmed!</h2>
            <p className="text-muted-foreground font-body">Order #{orderId} has been placed successfully.</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => navigate('/order-tracking')} className="btn-primary">Track Order</button>
              <button onClick={() => navigate('/menu')} className="btn-outline">Continue Shopping</button>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen cream-gradient pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-display font-bold text-foreground mb-8">
            Checkout
          </motion.h1>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="font-body text-sm font-medium">{error}</p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Delivery */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-md space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold text-lg text-foreground">Delivery Address</h3>
                </div>
                <input type="text" placeholder="Street address" value={address} onChange={e => setAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-accent font-body text-sm text-foreground outline-none focus:ring-2 focus:ring-primary" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-accent font-body text-sm text-foreground outline-none focus:ring-2 focus:ring-primary" />
                  <input type="text" placeholder="ZIP code" value={zip} onChange={e => setZip(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-accent font-body text-sm text-foreground outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 shadow-md space-y-4 sticky top-24">
                <h3 className="font-display font-semibold text-lg text-foreground">Order Summary</h3>
                {cart.length === 0 ? (
                  <p className="text-muted-foreground font-body text-sm">Your cart is empty</p>
                ) : (
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div key={item.pizza.id} className="flex items-center gap-3">
                        <img src={item.pizza.image} alt={item.pizza.name} className="w-12 h-12 rounded-lg object-contain bg-accent" />
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm font-medium text-foreground truncate">{item.pizza.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <button onClick={() => updateCartQuantity(item.pizza.id, item.quantity - 1)} className="w-6 h-6 rounded-full bg-accent text-foreground text-xs flex items-center justify-center">-</button>
                            <span className="text-xs font-body">{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.pizza.id, item.quantity + 1)} className="w-6 h-6 rounded-full bg-accent text-foreground text-xs flex items-center justify-center">+</button>
                          </div>
                        </div>
                        <p className="font-body text-sm font-semibold text-foreground">₹{(item.pizza.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-display font-bold text-foreground">Total</span>
                      <span className="font-display font-bold text-primary text-xl">₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <button onClick={handlePay} disabled={cart.length === 0 || loading}
                      className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-40">
                      <CreditCard className="w-4 h-4" /> {loading ? 'Processing...' : 'Pay Now'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
