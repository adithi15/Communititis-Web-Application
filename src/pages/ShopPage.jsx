import React, { useState } from "react";
import { PRODUCTS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Plus } from "lucide-react";

export default function ShopPage({
  handleAddToCart,
  setCartOpen,
  setSelectedProduct,
  setRestockProduct,
  onTileHover,
  onTileLeave,
}) {
  // Category filter
  // const [activeCategory, setActiveCategory] = useState('ALL');

  // Double click visual helper banner
  const [doubleClickBanner, setDoubleClickBanner] = useState(true);

  // Sold-out custom cursor tracking
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredSoldOut, setHoveredSoldOut] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  // Filter products by dynamic selected category pill
  // const filteredProducts = activeCategory === 'ALL'
  //   ? PRODUCTS
  //   : PRODUCTS.filter(p => p.category.toUpperCase() === activeCategory);

  // List unique categories available for filters
  // const categoryOptions = ['ALL', 'HOODIES', 'JOGGERS', 'FOOTWEAR', 'CASES', 'ACCESSORIES'];

  // Category filter removed
  const filteredProducts = PRODUCTS;
  return (
    <motion.section
      key="shop-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Sizing guides banner */}
      {/* {doubleClickBanner && (
        <div className="glass glass-opacity rounded-2xl p-3.5 px-5 flex flex-col md:flex-row justify-between items-center gap-3 border border-[#D1F362]/30 bg-white/45">
          <div className="flex items-center gap-2.5 text-xs text-slate-700">
            <Sparkles size={14} className="text-[#D1F362]" />
            <span><strong>TIP:</strong> Click on individual product cards to select sizes and add them to your custom bag. Hover tiles to dynamically shift app themes!</span>
          </div>
          <button 
            onClick={() => setDoubleClickBanner(false)}
            className="text-[10px] font-mono tracking-widest text-slate-400 hover:text-black uppercase"
          >
            [ DISMISS ]
          </button>
        </div>
      )} */}

      {/* Floating Filter Categories Row */}
      {/* <div className="flex flex-wrap gap-1.5 justify-center py-2">
        {categoryOptions.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4.5 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all ${
              activeCategory === cat
                ? 'bg-slate-900 text-white shadow-md font-bold'
                : 'glass glass-opacity hover:bg-white/60 text-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div> */}

      {/* Dynamic Floating organic layout - Staggered Bento grid on Desktop */}
      <div className="hidden md:grid md:grid-cols-4 gap-y-36 md:gap-y-48 gap-x-12 md:gap-x-20 px-8 py-16">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="relative flex justify-center items-center"
            style={{
              transform: `translate(${p.offsetX}, ${p.offsetY}) scale(${p.scale})`,
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => {
                onTileHover(p.hex);
                setHoveredProductId(p.id);
                if (p.soldOut) {
                  setHoveredSoldOut(true);
                }
              }}
              onMouseLeave={() => {
                onTileLeave();
                setHoveredProductId(null);
                setHoveredSoldOut(false);
              }}
              onMouseMove={(e) => {
                if (p.soldOut) {
                  setCursorPos({ x: e.clientX, y: e.clientY });
                }
              }}
              onClick={() => {
                if (p.soldOut) {
                  setRestockProduct(p);
                } else {
                  setSelectedProduct(p);
                }
              }}
              className="relative w-64 h-64 p-6 flex items-center justify-center cursor-pointer bg-transparent border-none select-none transition-all duration-300"
            >
              {/* Sub-hover glow */}
              <div
                className="absolute inset-x-8 top-8 bottom-8 opacity-0 group-hover:opacity-15 blur-2xl pointer-events-none transition-opacity duration-500"
                style={{ backgroundColor: p.hex }}
              />

              {/* Center image container - fills space with independent subtle floating motion */}
              <motion.div
                className="h-full w-full flex items-center justify-center relative select-none"
                animate={{
                  y: [0, -6, 0, 6, 0],
                  x: [0, 2, 0, -2, 0],
                  rotate: [0, 0.8, 0, -0.8, 0],
                }}
                transition={{
                  duration: 15 + (PRODUCTS.indexOf(p) % 4) * 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (PRODUCTS.indexOf(p) % 3) * 0.8,
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-300"
                />
              </motion.div>

              {/* Dynamic Addition Button */}
              {!p.soldOut && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  animate={{
                    opacity: hoveredProductId === p.id ? 1 : 0,
                    scale: hoveredProductId === p.id ? 1 : 0.8,
                    y: hoveredProductId === p.id ? 0 : 15,
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 h-10 bg-white text-slate-950 font-mono text-[10px] font-bold uppercase tracking-widest rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center select-none z-10 hover:scale-105 active:scale-95 duration-100"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(
                        p,
                        p.sizeOptions ? p.sizeOptions[0] : "ONE SIZE",
                        1,
                      );
                      setCartOpen(true);
                    }}
                    className="flex items-center px-4 w-full h-[38px] justify-center whitespace-nowrap gap-1.5 focus:outline-none"
                  >
                    <Plus size={14} className="flex-shrink-0 text-slate-950" />
                    {hoveredProductId === p.id && (
                      <span className="flex-shrink-0">Add</span>
                    )}
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Fallback Mobile Product slider: Multi-swipe lists layout */}
      <div className="md:hidden grid grid-cols-2 gap-4 py-6 px-1">
        {filteredProducts.map((p) => (
          <motion.div
            key={p.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (p.soldOut) {
                setRestockProduct(p);
              } else {
                setSelectedProduct(p);
              }
            }}
            className="relative aspect-square p-2 flex items-center justify-center cursor-pointer bg-transparent border-none transition-all duration-300"
          >
            <motion.div
              className="w-full h-full flex items-center justify-center relative select-none"
              animate={{
                y: [0, -4, 0, 4, 0],
                x: [0, 1.5, 0, -1.5, 0],
                rotate: [0, 0.5, 0, -0.5, 0],
              }}
              transition={{
                duration: 14 + (PRODUCTS.indexOf(p) % 4) * 2.0,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (PRODUCTS.indexOf(p) % 3) * 0.6,
              }}
            >
              <img
                src={p.image}
                alt={p.title}
                className="max-h-full max-w-full object-contain"
              />
              {p.soldOut && (
                <div className="absolute top-0 right-0">
                  <span className="font-mono text-[8px] font-bold text-white tracking-widest uppercase bg-[#de463e] px-2 py-0.5 rounded-full">
                    SOLD OUT
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Dynamic Cursor Target Layer for Sold Out indication */}
      <AnimatePresence>
        {hoveredSoldOut && (
          <motion.div
            style={{
              position: "fixed",
              left: cursorPos.x + 15,
              top: cursorPos.y + 15,
              pointerEvents: "none",
              zIndex: 99999,
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="bg-white border border-slate-200 text-slate-800 font-mono text-[9.5px] font-bold tracking-widest px-3 py-1 shadow-[0_4px_12px_rgba(0,0,0,0.08)] select-none pointer-events-none rounded-none whitespace-nowrap flex items-center justify-center uppercase"
          >
            SOLD OUT
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
