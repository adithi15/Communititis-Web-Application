import React from 'react';
import { motion } from 'motion/react';
import CheckoutView from '../components/CheckoutView';

export default function CheckoutPage({
  cartItems,
  currency,
  onBackToShop,
  clearCart
}) {
  return (
    <motion.section
      key="checkout-view"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-6xl mx-auto w-full"
    >
      <CheckoutView
        items={cartItems}
        currency={currency}
        onBackToShop={onBackToShop}
        onClearCart={clearCart}
      />
    </motion.section>
  );
}
