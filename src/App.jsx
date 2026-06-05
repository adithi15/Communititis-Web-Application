import React, { useState, useEffect } from "react";
import { PRODUCTS, CURRENCIES } from "./data";
import Header from "./components/Header";
import ProductDetailModal from "./components/ProductDetailModal";
import ProductPage from "./pages/ProductPage";
import CartDrawer from "./components/CartDrawer";

import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import PoliciesPage from "./pages/PoliciesPage";
import WallpapersPage from "./pages/WallpapersPage";
import InstagramPage from "./pages/InstagramPage";
import CheckoutPage from "./pages/CheckoutPage";

import { Check, BellPlus, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentTab, setCurrentTab] = useState("shop");
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [currency, setCurrency] = useState(CURRENCIES.INR);
  // Replace the old sky blue values with these:
  const [moodColor, setMoodColor] = useState("#0f1011"); // Matte Deep Black
  const [moodColor2, setMoodColor2] = useState("#242629"); // Polished Graphite Grey
  // const [moodColor, setMoodColor] = useState("#9dd5f1");
  // const [moodColor2, setMoodColor2] = useState("#8fd5ff");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [restockProduct, setRestockProduct] = useState(null);
  const [restockEmail, setRestockEmail] = useState("");
  const [restockSuccess, setRestockSuccess] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [activePolicyTab, setActivePolicyTab] = useState("faq");

  useEffect(() => {
    const saved = localStorage.getItem("skylrk_cart");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse cart", err);
      }
    }
  }, []);

  const saveCartToStorage = (updatedList) => {
    setCartItems(updatedList);
    localStorage.setItem("skylrk_cart", JSON.stringify(updatedList));
  };

  const handleAddToCart = (product, size, quantity) => {
    const key = `${product.id}-${size}`;
    const existingIndex = cartItems.findIndex((item) => item.key === key);
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      saveCartToStorage(updated);
    } else {
      saveCartToStorage([
        ...cartItems,
        { key, product, selectedSize: size, quantity },
      ]);
    }
  };

  const handleUpdateQty = (key, qty) => {
    if (qty <= 0) {
      handleRemoveItem(key);
      return;
    }
    saveCartToStorage(
      cartItems.map((item) =>
        item.key === key ? { ...item, quantity: qty } : item,
      ),
    );
  };

  const handleRemoveItem = (key) =>
    saveCartToStorage(cartItems.filter((item) => item.key !== key));
  const clearCart = () => saveCartToStorage([]);

  const onTileHover = (colorHex) => {
    setMoodColor(colorHex);
    setMoodColor2(colorHex === "#353433" ? "#151515" : `${colorHex}c5`);
  };

 
  



  const onTileLeave = () => {
  setMoodColor("#0f1011"); // Returns to Matte Deep Black
  setMoodColor2("#242629"); // Returns to Polished Graphite Grey
};

  const handleRestockSubmit = (e) => {
    e.preventDefault();
    if (!restockEmail || !restockProduct) return;
    setRestockSuccess(true);
    setTimeout(() => {
      setRestockSuccess(false);
      setRestockProduct(null);
      setRestockEmail("");
    }, 3000);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterSuccess(false);
      setNewsletterEmail("");
    }, 3000);
  };

  const navigateToPolicyTab = (subTab) => {
    setCurrentTab("policies");
    setActivePolicyTab(subTab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* GRAIN ANIMATION */}
      <style>{`
        @keyframes grain {
          0%   { transform: translate(0%, 0%); }
          20%  { transform: translate(-4%, -4%); }
          40%  { transform: translate(4%, -2%); }
          60%  { transform: translate(-2%, 4%); }
          80%  { transform: translate(4%, 4%); }
          100% { transform: translate(0%, 0%); }
        }
      `}</style>

      {/* BASE GRADIENT */}
      <div
        className={`fixed inset-0 -z-10 pointer-events-none ${
          currentTab === "checkout"
            ? ""
            : "transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        }`}
        style={{
          background:
            currentTab === "checkout"
              ? "#0a0a0b"
              : `
                radial-gradient(ellipse 90% 70% at 25% 35%, ${moodColor}ff 0%, ${moodColor}cc 35%, transparent 65%),
                radial-gradient(ellipse 70% 80% at 80% 65%, ${moodColor}dd 0%, ${moodColor}88 30%, transparent 60%),
                radial-gradient(ellipse 50% 60% at 15% 85%, ${moodColor}99 0%, transparent 55%),
                radial-gradient(ellipse 100% 100% at 50% 50%, ${moodColor}ee 0%, ${moodColor}99 40%, ${moodColor}33 70%, #e8eef2 100%)
              `,
        }}
      />

      {/* ANIMATED GRAIN */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          style={{
            position: "absolute",
            inset: "-50%",
            width: "200%",
            height: "200%",
            opacity: 0.10,
            animation: "grain 0.6s steps(1) infinite",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* SUBTLE GRID */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* MAIN CONTENT */}
      <div
        className="relative min-h-screen text-slate-800 overflow-x-hidden font-sans"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {!cartOpen && (
          <Header
            currentTab={currentTab}
            setCurrentTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            currency={currency}
            setCurrency={setCurrency}
            currencies={CURRENCIES}
            cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            toggleCart={() => setCartOpen(!cartOpen)}
            onLogoClick={() => {
              setSelectedProduct(null);
              setCurrentTab("shop");
            }}
          />
        )}

        <main className="pt-28 md:pt-40 pb-24 px-4 md:px-16 max-w-[1600px] mx-auto">
          <AnimatePresence mode="wait">
            {currentTab === "shop" && (
              <ShopPage
                handleAddToCart={handleAddToCart}
                setCartOpen={setCartOpen}
                setSelectedProduct={setSelectedProduct}
                setRestockProduct={setRestockProduct}
                onTileHover={onTileHover}
                onTileLeave={onTileLeave}
              />
            )}
            {currentTab === "contact" && <ContactPage />}
            {currentTab === "policies" && (
              <PoliciesPage
                activePolicyTab={activePolicyTab}
                setActivePolicyTab={setActivePolicyTab}
              />
            )}
            {currentTab === "wallpapers" && <WallpapersPage />}
            {currentTab === "instagram" && <InstagramPage />}
            {currentTab === "checkout" && (
              <CheckoutPage
                cartItems={cartItems}
                currency={currency}
                onBackToShop={() => setCurrentTab("shop")}
                clearCart={clearCart}
              />
            )}
          </AnimatePresence>
        </main>

        {/* RESTOCK POPUP */}
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
                    <img
                      src={restockProduct.image}
                      alt=""
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-white uppercase truncate">
                      {restockProduct.title}
                    </h3>
                    <p className="font-mono text-[9px] text-slate-400 uppercase truncate">
                      {restockProduct.subtitle}
                    </p>
                  </div>
                </div>
                {restockSuccess ? (
                  <div className="text-center py-6">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                      <Check size={18} />
                    </div>
                    <h4 className="font-mono text-xs tracking-widest text-[#D1F362] uppercase">
                      REGISTERED SUCCESSFULLY
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-2 font-sans">
                      You will receive a high priority alert code to your inbox
                      the moment this inventory size is restocked on our looms.
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
                        This clothing core has completed its production line and
                        is temporarily sold out. Submit your email to secure
                        early queue priority on the restock drop.
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

        {/* PRODUCT PAGE */}
        <AnimatePresence>
          {selectedProduct && (
            <ProductPage
              product={selectedProduct}
              currency={currency}
              onBack={() => setSelectedProduct(null)}
              onAddToCart={(prod, sz, qty) => {
                handleAddToCart(prod, sz, qty);
                setCartOpen(true);
              }}
            />
          )}
        </AnimatePresence>

        {/* CART DRAWER */}
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
            setSelectedProduct(null);
            setCurrentTab("checkout");
          }}
        />
      </div>
    </>
  );
}
