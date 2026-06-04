import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProductDetailModal({
  product,
  currency,
  onClose,
  onAddToCart,
}) {
  const sizes = product.sizeOptions || ['ONE SIZE'];
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [success, setSuccess] = useState(false);

  // Conversion of price
  const convertedPrice = Math.round(product.price * currency.rate);

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => {
      onAddToCart(product, selectedSize, quantity);
      setIsAdding(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-4xl rounded-3xl glass glass-dark overflow-hidden p-6 md:p-8 grid md:grid-cols-2 gap-8 text-slate-100 border border-white/10 shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all z-10"
          aria-label="Close details"
        >
          <X size={20} />
        </button>

        {/* Product Visual Container */}
        <div className="relative flex items-center justify-center bg-transparent rounded-2xl overflow-hidden aspect-square border-none group">
          {product.soldOut && (
            <div className="absolute top-4 left-4 font-mono text-xs tracking-widest bg-rose-600 text-white px-3 py-1.5 rounded-full uppercase z-10">
              Sold Out
            </div>
          )}
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full max-w-[360px] h-auto object-contain select-none group-hover:scale-105 duration-700 ease-out"
            layoutId={`product-image-${product.id}`}
          />
          {/* Subtle background glow mapping product theme colors */}
          <div
            className="absolute -inset-10 opacity-10 blur-3xl pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${product.hex} 0%, transparent 70%)`
            }}
          />
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#D1F362] uppercase bg-[#D1F362]/10 px-3 py-1 rounded-full inline-block mb-3">
              {product.category}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
              {product.title}
            </h2>
            <p className="font-mono text-xs tracking-wider text-slate-400 mt-1 uppercase">
              {product.subtitle}
            </p>

            <p className="text-xl md:text-2xl font-semibold text-white font-mono mt-4">
              {currency.symbol}{convertedPrice.toLocaleString()}
            </p>

            <p className="text-[#a1a1aa] text-sm leading-relaxed mt-5 font-sans border-t border-white/10 pt-5">
              {product.description}
            </p>

            {/* Sizes selector */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                  Select Size
                </span>
                {product.category === 'Footwear' && (
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                    US Men's Sizing
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    disabled={product.soldOut}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs font-mono tracking-widest rounded-xl transition-all border ${
                      product.soldOut
                        ? 'border-white/5 text-slate-600 cursor-not-allowed'
                        : selectedSize === size
                          ? 'border-[#D1F362] bg-[#D1F362] text-slate-950 font-bold'
                          : 'border-white/10 text-slate-300 hover:border-white/30 bg-white/5'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity select counter */}
            {!product.soldOut && (
              <div className="mt-6">
                <span className="text-xs font-mono tracking-widest text-slate-400 uppercase block mb-2.5">
                  Quantity
                </span>
                <div className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 p-1 h-[44px]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 px-3 hover:text-white text-slate-400 hover:bg-white/10 rounded-lg transition-all"
                    aria-label="Decrement quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-mono text-sm px-4 min-w-[2.5rem] text-center text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 px-3 hover:text-white text-slate-400 hover:bg-white/10 rounded-lg transition-all"
                    aria-label="Increment quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col gap-3">
            {product.soldOut ? (
              <div className="w-full text-center font-mono py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-400 text-xs tracking-widest uppercase">
                Currently Out of Stock
              </div>
            ) : (
              <button
                onClick={handleAdd}
                disabled={isAdding || success}
                className={`w-full py-3.5 h-[52px] rounded-2xl font-mono text-xs tracking-widest uppercase font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                  success
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-950 hover:bg-[#D1F362] active:scale-[0.98]'
                }`}
              >
                {isAdding ? (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                ) : success ? (
                  <>
                    <Check size={16} />
                    Added to Drawer
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    Add to Drawer
                  </>
                )}
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full py-3 text-xs font-mono tracking-widest uppercase text-slate-400 hover:text-white transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
