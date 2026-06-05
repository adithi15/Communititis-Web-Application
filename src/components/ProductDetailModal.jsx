import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

  // Support both single `image` and multiple `images`
  const imageList = product.images?.length
    ? product.images
    : [product.image];

  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => setActiveIndex((i) => (i + 1) % imageList.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + imageList.length) % imageList.length);

  const convertedPrice = Math.round(product.price * currency.rate);

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => {
      onAddToCart(product, selectedSize, quantity);
      setIsAdding(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
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

        {/* ── Product Visual + Gallery ── */}
        <div className="flex gap-3">

          {/* Thumbnail strip — only shown when there are multiple images */}
          {imageList.length > 1 && (
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[420px] pr-1 scrollbar-thin scrollbar-thumb-white/10">
              {imageList.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    activeIndex === idx
                      ? 'border-[#D1F362] opacity-100 scale-105'
                      : 'border-white/10 opacity-50 hover:opacity-80'
                  }`}
                >
                  <img
                    src={src}
                    alt={`${product.title} view ${idx + 1}`}
                    className="w-full h-full object-contain bg-white/5"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main image area */}
          <div className="relative flex-1 flex items-center justify-center bg-transparent rounded-2xl overflow-hidden aspect-square group">
            {product.soldOut && (
              <div className="absolute top-4 left-4 font-mono text-xs tracking-widest bg-rose-600 text-white px-3 py-1.5 rounded-full uppercase z-10">
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={imageList[activeIndex]}
                alt={product.title}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="w-full max-w-[360px] h-auto object-contain select-none"
                layoutId={activeIndex === 0 ? `product-image-${product.id}` : undefined}
              />
            </AnimatePresence>

            {/* Prev / Next arrows — only when multiple images */}
            {imageList.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {imageList.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        activeIndex === idx ? 'bg-[#D1F362] w-3' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Background glow */}
            <div
              className="absolute -inset-10 opacity-10 blur-3xl pointer-events-none"
              style={{ background: `radial-gradient(circle, ${product.hex} 0%, transparent 70%)` }}
            />
          </div>
        </div>

        {/* ── Product Details ── */}
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

            {/* Size selector */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">Select Size</span>
                {product.category === 'Footwear' && (
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">US Men's Sizing</span>
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

            {/* Quantity */}
            {!product.soldOut && (
              <div className="mt-6">
                <span className="text-xs font-mono tracking-widest text-slate-400 uppercase block mb-2.5">Quantity</span>
                <div className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 p-1 h-[44px]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 px-3 hover:text-white text-slate-400 hover:bg-white/10 rounded-lg transition-all"
                    aria-label="Decrement"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-mono text-sm px-4 min-w-[2.5rem] text-center text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 px-3 hover:text-white text-slate-400 hover:bg-white/10 rounded-lg transition-all"
                    aria-label="Increment"
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
                  <><Check size={16} /> Added to Cart</>
                ) : (
                  <><ShoppingBag size={16} /> Add to Cart</>
                )}
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full py-3 text-xs font-mono tracking-widest uppercase text-slate-400 hover:text-white transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}