import React, { useState, useEffect } from 'react';
import { PRODUCTS, CURRENCIES } from './data';
import Header from './components/Header';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';

// Import newly refactored standalone page views
import ShopPage from './pages/ShopPage';
import ContactPage from './pages/ContactPage';
import PoliciesPage from './pages/PoliciesPage';
import WallpapersPage from './pages/WallpapersPage';
import InstagramPage from './pages/InstagramPage';
import CheckoutPage from './pages/CheckoutPage';

import { 
  Sparkles, Check, Instagram, BellPlus, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation Active tab: 'shop' | 'contact' | 'policies' | 'wallpapers' | 'instagram' | 'checkout'
  const [currentTab, setCurrentTab] = useState('shop');

  // Cart Management
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Global Selected Currency config
  const [currency, setCurrency] = useState(CURRENCIES.INR);

  // Background Mood state (dynamic gradient shifts on product hover)
  const [moodColor, setMoodColor] = useState('#9dd5f1');
  const [moodColor2, setMoodColor2] = useState('#8fd5ff');

  // Interactive Product detail Modal focus
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sold-out restock notification state
  const [restockProduct, setRestockProduct] = useState(null);
  const [restockEmail, setRestockEmail] = useState('');
  const [restockSuccess, setRestockSuccess] = useState(false);

  // Newsletter Signups
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Active policy tab state (kept global to sync from footer actions)
  const [activePolicyTab, setActivePolicyTab] = useState('faq');

  // Load cart state from local storage on startup
  useEffect(() => {
    const saved = localStorage.getItem('skylrk_cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse cart local storage text', err);
      }
    }
  }, []);

  // Save cart back to local storage whenever they change an item
  const saveCartToStorage = (updatedList) => {
    setCartItems(updatedList);
    localStorage.setItem('skylrk_cart', JSON.stringify(updatedList));
  };

  const handleAddToCart = (product, size, quantity) => {
    const key = `${product.id}-${size}`;
    const existingIndex = cartItems.findIndex(item => item.key === key);

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      saveCartToStorage(updated);
    } else {
      const newItem = {
        key,
        product,
        selectedSize: size,
        quantity,
      };
      saveCartToStorage([...cartItems, newItem]);
    }
  };

  const handleUpdateQty = (key, qty) => {
    if (qty <= 0) {
      handleRemoveItem(key);
      return;
    }
    const updated = cartItems.map(item => 
      item.key === key ? { ...item, quantity: qty } : item
    );
    saveCartToStorage(updated);
  };

  const handleRemoveItem = (key) => {
    const filtered = cartItems.filter(item => item.key !== key);
    saveCartToStorage(filtered);
  };

  const clearCart = () => {
    saveCartToStorage([]);
  };

  // Hover animations triggers background color shifts
  const onTileHover = (colorHex) => {
    setMoodColor(colorHex);
    // Darken/shift secondary coordinate for rich dynamic mood radial contrast
    setMoodColor2(colorHex === '#353433' ? '#151515' : `${colorHex}c5`);
  };

  const onTileLeave = () => {
    setMoodColor('#9dd5f1');
    setMoodColor2('#8fd5ff');
  };

  // Restock Notification submission
  const handleRestockSubmit = (e) => {
    e.preventDefault();
    if (!restockEmail || !restockProduct) return;
    setRestockSuccess(true);
    setTimeout(() => {
      setRestockSuccess(false);
      setRestockProduct(null);
      setRestockEmail('');
    }, 3000);
  };

  // Bottom newsletter form actions
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterSuccess(false);
      setNewsletterEmail('');
    }, 3000);
  };

  // Function to navigate to policies tab with specific sub-section
  const navigateToPolicyTab = (subTab) => {
    setCurrentTab('policies');
    setActivePolicyTab(subTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen text-slate-800 transition-colors duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-x-hidden font-sans">
      {/* Dynamic Animated background mesh */}
      <div 
        className="fixed inset-0 -z-10 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          background: currentTab === 'checkout'
            ? 'radial-gradient(ellipse at 50% 30%, #1c1c1e, #0a0a0b)'
            : `radial-gradient(ellipse at 50% 30%, ${moodColor}, ${moodColor2})`,
        }}
      />

      {/* Procedural Film Grain/Noise overlay */}
      <div 
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.25] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Grid overlay for texture */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />

      {/* Floating Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          // Auto scroll to view top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currency={currency}
        setCurrency={setCurrency}
        currencies={CURRENCIES}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        toggleCart={() => setCartOpen(!cartOpen)}
      />

      {/* Main Container workspace spacing top header */}
      <main className="pt-28 md:pt-40 pb-24 px-4 md:px-16 max-w-[1600px] mx-auto">
        <AnimatePresence mode="wait">
          
          {currentTab === 'shop' && (
            <ShopPage
              handleAddToCart={handleAddToCart}
              setCartOpen={setCartOpen}
              setSelectedProduct={setSelectedProduct}
              setRestockProduct={setRestockProduct}
              onTileHover={onTileHover}
              onTileLeave={onTileLeave}
            />
          )}

          {currentTab === 'contact' && (
            <ContactPage />
          )}

          {currentTab === 'policies' && (
            <PoliciesPage
              activePolicyTab={activePolicyTab}
              setActivePolicyTab={setActivePolicyTab}
            />
          )}

          {currentTab === 'wallpapers' && (
            <WallpapersPage />
          )}

          {currentTab === 'instagram' && (
            <InstagramPage />
          )}

          {currentTab === 'checkout' && (
            <CheckoutPage
              cartItems={cartItems}
              currency={currency}
              onBackToShop={() => setCurrentTab('shop')}
              clearCart={clearCart}
            />
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER BAR: Newsletter signup overlay and terms */}
      {/* <footer className="w-full bg-slate-950 text-slate-100 py-16 px-4 md:px-8 border-t border-white/10 relative z-30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12"> */}
          {/* Brand info column */}
          {/* <div className="space-y-4">
            <h3 className="font-display font-bold text-lg tracking-wider text-white">SKYLRK CORP</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-sans">
              High-end apparel cores, technical drop accessories, and ergonomic recovery footbeds designed with minimalist silhouettes. All custom garments washed, assembled, and finished on organic looms.
            </p>
            <button 
              onClick={() => { setCurrentTab('instagram'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3 pt-2 text-[#D1F362] hover:opacity-85 transition-opacity"
            >
              <Instagram size={16} />
              <span className="font-mono text-[10px] tracking-widest uppercase">@skylrk</span>
            </button>
          </div> */}

          {/* Bottom active newsletter intake forms */}
          {/* <div>
            <h3 className="font-display font-medium text-xs tracking-widest text-slate-300 uppercase mb-4">
              JOIN THE INNER CIRCLE
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Sign up with your electronic mail below to stay updated on future seasonal inventory releases and premium coupons.
            </p>
            {newsletterSuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-center font-mono text-[10px] tracking-widest uppercase">
                SUCCESS! ACCESS GRANTED ON LEEK DROPS.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="ENTER EMAIL ADDRESS"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs uppercase font-mono tracking-widest text-white placeholder-slate-500 focus:outline-none focus:border-[#D1F362] focus:bg-white/10 transition-all"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-[#D1F362] text-slate-950 font-bold transition-all hover:scale-103 px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-widest shrink-0"
                >
                  JOIN
                </button>
              </form>
            )}
          </div> */}

          {/* Quick policy navigational nodes */}
          {/* <div className="space-y-4 text-left md:text-right">
            <h3 className="font-display font-medium text-xs tracking-widest text-slate-300 uppercase">
              DECREED POLICIES
            </h3>
            <div className="flex flex-col gap-2 font-mono text-[10px] tracking-widest uppercase text-slate-400 text-left md:text-right">
              <button onClick={() => navigateToPolicyTab('faq')} className="hover:text-white transition-colors text-left md:text-right">[ FAQ & HELP ]</button>
              <button onClick={() => navigateToPolicyTab('privacy')} className="hover:text-white transition-colors text-left md:text-right">[ PRIVACY SECURITY ]</button>
              <button onClick={() => navigateToPolicyTab('returns')} className="hover:text-white transition-colors text-left md:text-right">[ SIZING & RETURNS ]</button>
              <button onClick={() => navigateToPolicyTab('terms')} className="hover:text-white transition-colors text-left md:text-right">[ TERMS & SERVICE ]</button>
            </div>
          </div>
        </div>

        // <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 font-mono text-[9px] tracking-widest uppercase">
        //   <span>SKYLRK INTELLECTUAL PROPERTY CORP © 2026</span>
        //   <span className="flex items-center gap-1.5"><Sparkles size={10} className="text-[#D1F362]" /> CULTIVATED FOR RESILIENT CORES</span>
        // </div>
      </footer> */}

      {/* POPUP: Sizing / restock notifications signups for sold out products */}
      <AnimatePresence>
        {restockProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass glass-dark w-full max-w-md rounded-3xl p-6 border border-white/10 text-slate-100 text-left relative"
            >
              <button
                onClick={() => setRestockProduct(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                aria-label="Close form"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/5">
                  <img src={restockProduct.image} alt="" className="w-10 h-10 object-contain" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white uppercase truncate">{restockProduct.title}</h3>
                  <p className="font-mono text-[9px] text-slate-400 uppercase truncate">{restockProduct.subtitle}</p>
                </div>
              </div>

              {restockSuccess ? (
                <div className="text-center py-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                    <Check size={18} />
                  </div>
                  <h4 className="font-mono text-xs tracking-widest text-[#D1F362] uppercase">REGISTERED SUCCESSFULLY</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-2 font-sans">
                    You will receive a high priority alert code to your inbox the moment this inventory size is restocked on our looms.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRestockSubmit} className="space-y-4">
                  <div>
                    <h4 className="font-display font-medium text-xs text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <BellPlus size={14} className="text-[#de463e]" />
                      RESTOCK ALERTS INTENT
                    </h4>
                    <p className="text-xs text-slate-400 leading-normal mb-4 font-sans">
                      This clothing core has completed its production line and is temporarily sold out. Submit your email to secure early queue priority on the restock drop.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ENTER EMAIL ADDRESS"
                      value={restockEmail}
                      onChange={(e) => setRestockEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs uppercase font-mono tracking-widest text-white outline-none focus:border-[#de463e] focus:bg-white/10 transition-all font-semibold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#de463e] hover:bg-red-700 text-white font-mono text-xs tracking-widest uppercase font-bold rounded-xl transition-all"
                  >
                    ALERT ME ON RESTOCK
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* POPUP DETAIL: Focus details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            currency={currency}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(prod, sz, qty) => {
              handleAddToCart(prod, sz, qty);
              setSelectedProduct(null);
              setCartOpen(true); // Auto reveal the drawer on add for immediate feedback!
            }}
          />
        )}
      </AnimatePresence>

      {/* FIXED DRAWER: Interactive Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveItem}
        onClear={clearCart}
        onCheckoutClick={() => {
          setCartOpen(false);
          setCurrentTab('checkout');
        }}
      />
    </div>
  );
}
