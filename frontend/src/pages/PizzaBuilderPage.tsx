import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { builderBases, builderSauces, builderCheeses, builderVeggies, builderMeats, heroPizzaImage as heroPizza } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';

const steps = ['Choose Base', 'Choose Sauce', 'Choose Cheese', 'Choose Veggies', 'Choose Meat', 'Review Order'];

const fixedPositions = [
  { top: '30%', left: '40%' },
  { top: '60%', left: '70%' },
  { top: '40%', left: '70%' },
  { top: '70%', left: '40%' },
  { top: '50%', left: '50%' },
  { top: '35%', left: '60%' },
  { top: '65%', left: '55%' },
  { top: '50%', left: '25%' },
  { top: '45%', left: '80%' },
  { top: '75%', left: '60%' },
  { top: '25%', left: '50%' },
  { top: '50%', left: '75%' },
];

const PizzaBuilderPage = () => {
  const [step, setStep] = useState(0);
  const [selectedBase, setSelectedBase] = useState('');
  const [selectedSauce, setSelectedSauce] = useState('');
  const [selectedCheese, setSelectedCheese] = useState('');
  const [selectedVeggies, setSelectedVeggies] = useState<string[]>([]);
  const [selectedMeats, setSelectedMeats] = useState<string[]>([]);
  const { addToCart } = useApp();
  const navigate = useNavigate();

  const [backendPrice, setBackendPrice] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (step === 5) {
      const fetchPrice = async () => {
        setIsCalculating(true);
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/build`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              base: selectedBase,
              sauce: selectedSauce,
              cheese: selectedCheese,
              veggies: selectedVeggies,
              meat: selectedMeats,
            }),
          });
          const data = await res.json();
          if (res.ok) {
            setBackendPrice(Number(data.totalPrice));
            setOrderId(data.orderId);
          } else {
            console.error('Failed to get price from server:', data.message);
          }
        } catch (error) {
          console.error('Error fetching price:', error);
        } finally {
          setIsCalculating(false);
        }
      };
      
      fetchPrice();
    }
  }, [step, selectedBase, selectedSauce, selectedCheese, selectedVeggies, selectedMeats]);

  const toggleVeggie = (id: string) => {
    setSelectedVeggies(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };
  const toggleMeat = (id: string) => {
    setSelectedMeats(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  const basePrice = 10.99;
  const totalExtras = [
    builderBases.find(b => b.id === selectedBase)?.price || 0,
    builderSauces.find(s => s.id === selectedSauce)?.price || 0,
    builderCheeses.find(c => c.id === selectedCheese)?.price || 0,
    ...selectedVeggies.map(v => builderVeggies.find(bv => bv.id === v)?.price || 0),
    ...selectedMeats.map(m => builderMeats.find(bm => bm.id === m)?.price || 0),
  ].reduce((a, b) => a + b, 0);
  const totalPrice = basePrice + totalExtras;

  const handleCheckout = () => {
    addToCart(
      { id: orderId || ('custom-' + Date.now()), name: 'Custom Pizza', description: 'Your custom creation', price: backendPrice ?? totalPrice, image: heroPizza, rating: 5, category: 'popular', isVeg: selectedMeats.length === 0 },
      1,
      { base: selectedBase, sauce: selectedSauce, cheese: selectedCheese, veggies: selectedVeggies, meat: selectedMeats }
    );
    navigate('/checkout');
  };

  const canNext = () => {
    if (step === 0) return !!selectedBase;
    if (step === 1) return !!selectedSauce;
    if (step === 2) return !!selectedCheese;
    return true;
  };

  const renderCard = (item: { id: string; name: string; description?: string; price?: number; image?: string }, isSelected: boolean, onClick: () => void) => (
    <motion.div
      key={item.id}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative overflow-hidden cursor-pointer rounded-2xl bg-card border-2 transition-all duration-300 flex flex-col h-full ${
        isSelected
          ? 'border-[#C0433A] shadow-lg shadow-[#C0433A]/20 ring-1 ring-[#C0433A]/50'
          : 'border-border shadow-sm hover:shadow-md hover:border-[#C0433A]/50'
      }`}
    >
      {isSelected && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#C0433A] flex items-center justify-center z-20 shadow-md">
          <Check className="w-4 h-4 text-white" />
        </motion.div>
      )}
      <div className="w-full h-36 relative group overflow-hidden bg-accent/30 shrink-0">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full bg-accent/50" />
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow bg-card z-10">
        <h4 className="font-display font-semibold text-foreground text-[15px]">{item.name}</h4>
        {item.description && <p className="text-xs text-muted-foreground font-body mt-2 flex-grow line-clamp-3">{item.description}</p>}
        {item.price !== undefined && item.price > 0 && <p className="text-sm text-[#C0433A] font-display font-bold mt-3">+₹{item.price.toFixed(2)}</p>}
      </div>
    </motion.div>
  );

  const currentBase = builderBases.find(b => b.id === selectedBase);
  const previewImage = currentBase?.image || heroPizza;

  const selectedItems = useMemo(() => {
    return [
      builderSauces.find(s => s.id === selectedSauce),
      builderCheeses.find(c => c.id === selectedCheese),
      ...selectedVeggies.map(v => builderVeggies.find(bv => bv.id === v)),
      ...selectedMeats.map(m => builderMeats.find(bm => bm.id === m))
    ].filter(Boolean);
  }, [selectedSauce, selectedCheese, selectedVeggies, selectedMeats]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen cream-gradient pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Step Progress */}
          <div className="flex items-center justify-center mb-10 overflow-x-auto pb-4">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body font-medium whitespace-nowrap transition-all duration-300 ${
                  i === step ? 'bg-[#C0433A] text-white shadow-md' :
                  i < step ? 'bg-[#C0433A]/10 text-[#C0433A]' : 'bg-card text-muted-foreground'
                }`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    i === step ? 'bg-white/20' : i < step ? 'bg-[#C0433A]/20' : 'bg-current/10'
                  }`}>
                    {i < step ? <Check className="w-3 h-3" /> : i + 1}
                  </span>
                  <span className="hidden sm:inline">{s}</span>
                </div>
                {i < steps.length - 1 && <div className={`w-4 md:w-10 h-0.5 mx-2 rounded-full transition-colors duration-300 ${i < step ? 'bg-[#C0433A]' : 'bg-border'}`} />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-start">
            {/* Left: Selection */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  {step === 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 auto-rows-fr">
                      {builderBases.map(b => renderCard(b, selectedBase === b.id, () => setSelectedBase(b.id)))}
                    </div>
                  )}
                  {step === 1 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 auto-rows-fr">
                      {builderSauces.map(s => renderCard(s, selectedSauce === s.id, () => setSelectedSauce(s.id)))}
                    </div>
                  )}
                  {step === 2 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 auto-rows-fr">
                      {builderCheeses.map(c => renderCard(c, selectedCheese === c.id, () => setSelectedCheese(c.id)))}
                    </div>
                  )}
                  {step === 3 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 auto-rows-fr">
                      {builderVeggies.map(v => renderCard(v, selectedVeggies.includes(v.id), () => toggleVeggie(v.id)))}
                    </div>
                  )}
                  {step === 4 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 auto-rows-fr">
                      {builderMeats.map(m => renderCard(m, selectedMeats.includes(m.id), () => toggleMeat(m.id)))}
                    </div>
                  )}
                  {step === 5 && (
                    <div className="bg-card rounded-3xl p-8 shadow-xl border border-border/50">
                      <h3 className="text-3xl font-display font-bold text-foreground mb-6">Order Summary</h3>
                      <div className="space-y-4 font-body text-sm">
                        <div className="flex justify-between py-3 border-b border-border">
                          <span className="text-muted-foreground text-base">Base Pizza</span>
                          <span className="text-foreground font-semibold text-base">₹{basePrice.toFixed(2)}</span>
                        </div>
                        {selectedBase && <div className="flex justify-between py-3 border-b border-border">
                          <span className="text-muted-foreground flex items-center gap-3">
                            {builderBases.find(b => b.id === selectedBase)?.image && <img src={builderBases.find(b => b.id === selectedBase)?.image} className="w-10 h-10 rounded-full object-cover shadow-sm border border-border" />}
                            {builderBases.find(b => b.id === selectedBase)?.name}
                          </span>
                          <span className="text-foreground font-medium flex items-center">+₹{(builderBases.find(b => b.id === selectedBase)?.price || 0).toFixed(2)}</span>
                        </div>}
                        {selectedSauce && <div className="flex justify-between py-3 border-b border-border">
                          <span className="text-muted-foreground flex items-center gap-3">
                            {builderSauces.find(s => s.id === selectedSauce)?.image && <img src={builderSauces.find(s => s.id === selectedSauce)?.image} className="w-10 h-10 rounded-full object-cover shadow-sm border border-border" />}
                            {builderSauces.find(s => s.id === selectedSauce)?.name}
                          </span>
                          <span className="text-foreground font-medium flex items-center">+₹{(builderSauces.find(s => s.id === selectedSauce)?.price || 0).toFixed(2)}</span>
                        </div>}
                        {selectedCheese && <div className="flex justify-between py-3 border-b border-border">
                          <span className="text-muted-foreground flex items-center gap-3">
                            {builderCheeses.find(c => c.id === selectedCheese)?.image && <img src={builderCheeses.find(c => c.id === selectedCheese)?.image} className="w-10 h-10 rounded-full object-cover shadow-sm border border-border" />}
                            {builderCheeses.find(c => c.id === selectedCheese)?.name}
                          </span>
                          <span className="text-foreground font-medium flex items-center">+₹{(builderCheeses.find(c => c.id === selectedCheese)?.price || 0).toFixed(2)}</span>
                        </div>}
                        {selectedVeggies.length > 0 && <div className="flex flex-col py-3 border-b border-border gap-3">
                          <div className="flex justify-between w-full">
                            <span className="text-muted-foreground">Veggies</span>
                            <span className="text-foreground font-medium">+₹{selectedVeggies.reduce((s, v) => s + (builderVeggies.find(bv => bv.id === v)?.price || 0), 0).toFixed(2)}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                             {selectedVeggies.map(v => {
                               const veg = builderVeggies.find(bv => bv.id === v);
                               return <div key={v} className="flex items-center gap-2 bg-accent px-3 py-1.5 rounded-full border border-border/50">
                                   <img src={veg?.image} className="w-6 h-6 rounded-full object-cover" />
                                   <span className="text-xs font-medium text-foreground">{veg?.name}</span>
                               </div>
                             })}
                          </div>
                        </div>}
                        {selectedMeats.length > 0 && <div className="flex flex-col py-3 border-b border-border gap-3">
                          <div className="flex justify-between w-full">
                            <span className="text-muted-foreground">Meat</span>
                            <span className="text-foreground font-medium">+₹{selectedMeats.reduce((s, m) => s + (builderMeats.find(bm => bm.id === m)?.price || 0), 0).toFixed(2)}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                             {selectedMeats.map(m => {
                               const meat = builderMeats.find(bm => bm.id === m);
                               return <div key={m} className="flex items-center gap-2 bg-accent px-3 py-1.5 rounded-full border border-border/50">
                                   <img src={meat?.image} className="w-6 h-6 rounded-full object-cover" />
                                   <span className="text-xs font-medium text-foreground">{meat?.name}</span>
                               </div>
                             })}
                          </div>
                        </div>}
                        <div className="flex justify-between py-6 text-2xl font-display font-bold items-center">
                          <span>Total</span>
                          <span className="text-[#C0433A] text-3xl">₹{(backendPrice ?? totalPrice).toFixed(2)}</span>
                        </div>
                      </div>
                      <button onClick={handleCheckout} disabled={isCalculating} className="w-full bg-[#C0433A] hover:bg-[#A0352A] text-white text-lg font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                        <ShoppingCart className="w-6 h-6" /> {isCalculating ? 'Calculating...' : 'Add to Cart & Checkout'}
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {step < 5 && (
                <div className="flex justify-between mt-10">
                  <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
                    className="flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm font-semibold bg-white text-muted-foreground shadow-sm border border-border hover:bg-accent hover:text-foreground transition-all disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed">
                    <ChevronLeft className="w-5 h-5" /> Back
                  </button>
                  <button onClick={() => setStep(Math.min(5, step + 1))} disabled={!canNext()}
                    className="flex items-center gap-2 px-8 py-3 rounded-full font-body text-sm font-bold bg-[#C0433A] text-white shadow-md hover:bg-[#A0352A] hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                    Next <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Right: Live Pizza Preview */}
            <div className="hidden lg:flex flex-col items-center">
              <div className="sticky top-28 w-full">
                <div className="bg-card rounded-3xl p-8 shadow-xl border border-border/50 text-center relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#C0433A]/5 to-transparent rounded-t-3xl" />
                  
                  <h3 className="font-display text-2xl font-bold text-foreground mb-8 relative z-10">Live Preview</h3>
                  
                  <div className="relative w-64 h-64 xl:w-[320px] xl:h-[320px] mx-auto rounded-full shadow-2xl border-[6px] border-white mb-10 group">
                    {/* Base Image */}
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-accent">
                      <motion.div
                        className="w-full h-full relative"
                        animate={{ rotate: step < 5 ? 360 : 0 }}
                        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                      >
                        <img
                          src={previewImage}
                          alt="Custom pizza preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                        
                        {/* Toppings rendered on top of the base */}
                        <AnimatePresence>
                          {selectedItems.map((item, i) => {
                            if (!item) return null;
                            const pos = fixedPositions[i % fixedPositions.length];
                            return (
                              <motion.div
                                key={`${item.id}-${i}`}
                                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 0, opacity: 0, rotate: 45 }}
                                className="absolute w-14 h-14 xl:w-20 xl:h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white"
                                style={{
                                  top: pos.top,
                                  left: pos.left,
                                  transform: 'translate(-50%, -50%)',
                                  zIndex: i + 10
                                }}
                              >
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                  </div>

                  <div className="relative z-10 space-y-3 bg-accent/30 p-6 rounded-2xl">
                    <p className="text-4xl font-display font-black text-[#C0433A]">₹{(backendPrice ?? totalPrice).toFixed(2)}</p>
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-sm font-semibold text-foreground">
                        {[selectedBase, selectedSauce, selectedCheese].filter(Boolean).length} / 3 Base Items
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {selectedVeggies.length + selectedMeats.length} Toppings Added
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PizzaBuilderPage;
