import React, { useState } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQty,
  onRemove,
  onClear,
  onCheckoutClick,
}) {
  // Subtotals
  const subtotalBase = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const convertedSubtotal = Math.round(subtotalBase * currency.rate);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[300] pointer-events-auto"
          />

          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 top-0 h-full w-full max-w-[380px] md:max-w-[420px] bg-slate-950/20 backdrop-blur-xl shadow-2xl z-[301] flex flex-col justify-between border-r border-white/10 pointer-events-auto"
            role="dialog"
            aria-label="Shopping drawer"
          >
            {/* Header: Clean transparent list style */}
            <div className="p-6 md:p-8 flex justify-between items-center">
              <h2 className="font-sans font-bold text-lg md:text-xl tracking-widest uppercase text-white">
                CART
              </h2>
              <button
                onClick={onClose}
                className="p-1 text-white/50 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart list content */}
            {items.length === 0 ? (
              <div className="flex-1 px-8 py-12 flex flex-col justify-center items-center text-slate-400">
                <p className="font-mono text-[10px] tracking-widest uppercase text-slate-500">
                  Your cart is empty
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 border border-white/10 hover:border-white/30 text-[9px] font-mono uppercase tracking-widest rounded-full text-white/70 hover:text-white transition-all bg-white/5"
                >
                  Shop Now
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-6 flex flex-col gap-8">
                {items.map((item) => {
                  const itemPrice = Math.round(item.product.price * currency.rate);
                  return (
                    <div
                      key={item.key}
                      className="flex gap-4 pb-6 border-b border-white/5 last:border-b-0 items-start relative select-none"
                    >
                      {/* Left Side: Thumbnail Image */}
                      <div className="w-16 h-18 bg-white/5 rounded-lg flex-shrink-0 flex items-center justify-center p-1.5 overflow-hidden">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Right Side: Variant details & price */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                          <div>
                            <h4 className="text-white text-[11px] font-mono uppercase tracking-widest font-bold">
                              {item.product.title}
                            </h4>
                            <p className="text-[10px] font-mono uppercase tracking-wider text-white/60 mt-0.5">
                              {item.product.subtitle}
                            </p>
                            <p className="text-[9px] font-mono text-white/40 italic mt-0.5">
                              Ships in 2-3 weeks
                            </p>
                          </div>
                          
                          {/* Item Price */}
                          <div className="text-right flex-shrink-0">
                            <span className="font-mono text-[11px] font-bold text-white">
                              {currency.symbol}{itemPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* QTY selector & size option */}
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-[9px] font-mono text-white/50 tracking-wider">
                            SIZE: {item.selectedSize}
                          </span>

                          <div className="flex items-center gap-2">
                            {/* Quantity Modifier */}
                            <div className="flex items-center border border-white/10 rounded-full px-2 py-0.5 bg-black/20">
                              <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest mr-1.5 select-none">
                                QTY
                              </span>
                              <button
                                onClick={() => onUpdateQty(item.key, item.quantity - 1)}
                                className="p-0.5 text-white/40 hover:text-white transition-colors"
                              >
                                <Minus size={9} />
                              </button>
                              <span className="text-[10px] font-mono font-bold px-1.5 text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQty(item.key, item.quantity + 1)}
                                className="p-0.5 text-white/40 hover:text-white transition-colors"
                              >
                                <Plus size={9} />
                              </button>
                            </div>

                            {/* Trash Delete icon */}
                            <button
                              onClick={() => onRemove(item.key)}
                              className="text-white/30 hover:text-red-400 transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom calculation and Checkout buttons panel */}
            {items.length > 0 && (
              <div className="p-6 md:p-8 border-t border-white/10 bg-black/40">
                <div className="flex flex-col gap-2 font-mono text-[10px] md:text-xs mb-6 text-white/70">
                  <div className="flex justify-between items-center text-white/40">
                    <span className="uppercase tracking-widest">Shipping</span>
                    <span className="tracking-wider">Calculated at checkout</span>
                  </div>
                  
                  <div className="flex justify-between items-center font-bold text-white pt-1.5">
                    <span className="uppercase tracking-widest">Subtotal</span>
                    <span className="text-white text-xs font-bold md:text-sm">
                      {currency.symbol}{convertedSubtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onCheckoutClick}
                  className="w-full h-12 bg-white text-slate-950 hover:bg-white/90 active:scale-98 font-mono text-[10px] md:text-xs tracking-widest uppercase font-bold rounded-full flex items-center justify-center transition-all shadow-[0_4px_24px_rgba(255,255,255,0.08)]"
                >
                  CHECKOUT
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}