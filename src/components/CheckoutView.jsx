import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, ShieldCheck, Tag, Ticket, CheckCircle, Sparkles } from 'lucide-react';

export default function CheckoutView({
  items,
  currency,
  onBackToShop,
  onClearCart,
}) {
  // Input form states
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('');
  const [stateCode, setStateCode] = useState('Maharashtra');
  const [pinCode, setPinCode] = useState('');
  const [phone, setPhone] = useState('');
  
  // Card input states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  
  // Promo code
  const [promo, setPromo] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // percent
  const [promoSuccess, setPromoSuccess] = useState('');

  // Flow states
  const [isPaying, setIsPaying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotalBase = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const convertedSubtotal = Math.round(subtotalBase * currency.rate);
  const discountAmount = Math.round(convertedSubtotal * (appliedDiscount / 100));
  
  // Standard shipping (e.g. INR 250 equivalent)
  const shippingAmount = appliedDiscount === 100 ? 0 : Math.round(250 * currency.rate);
  const totalAmount = Math.max(0, convertedSubtotal - discountAmount + shippingAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const cleanPromo = promo.trim().toUpperCase();
    if (cleanPromo === 'SKYLRK25') {
       setAppliedDiscount(25);
       setPromoSuccess('25% DISCOUNT APPLIED!');
    } else if (cleanPromo === 'FREE') {
       setAppliedDiscount(100);
       setPromoSuccess('100% ROYAL ALLOCATED FREE!');
    } else {
       setPromoSuccess('COUPON CODE APPLIED SUCCESSFULLY');
       setAppliedDiscount(10); // Default 10% discount for playing along
    }
  };

  const handlePay = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please fill out your email.');
      return;
    }
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/15 rounded-[32px] p-8 md:p-10 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Decorative glows */}
          <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 text-emerald-400">
            <CheckCircle size={32} />
          </div>

          <h1 className="font-sans font-bold text-2xl md:text-3xl text-white uppercase tracking-widest leading-tight">
            ORDER SECURED
          </h1>
          <p className="text-white/60 text-xs md:text-sm mt-4 leading-relaxed font-mono font-medium max-w-sm mx-auto">
            Allocation for {email} successful. Your drop request has been logged.
          </p>

          <div className="bg-black/25 rounded-2xl p-5 text-left border border-white/5 my-8 space-y-3 font-mono text-[10px] md:text-xs">
            <div className="flex justify-between items-center text-white/50 pb-2 border-b border-white/5">
              <span>ORDER REFERENCE:</span>
              <span className="text-white font-bold uppercase tracking-wider">SK-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            
            <div className="flex justify-between items-center text-white/50 pb-2 border-b border-white/5">
              <span>DELIVERY ADDRESS:</span>
              <span className="text-white font-bold truncate max-w-[200px]">{address || 'India Drop Point'}</span>
            </div>

            <div className="flex justify-between items-center text-white/50">
              <span className="text-emerald-400 font-bold">TOTAL PAID:</span>
              <span className="text-emerald-400 font-bold text-sm">
                {currency.symbol}{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                onClearCart();
                onBackToShop();
              }}
              className="w-full h-12 bg-white text-slate-950 hover:bg-white/90 active:scale-98 font-mono text-xs font-bold uppercase tracking-widest rounded-full transition-all"
            >
              CONTINUE SHOPPING
            </button>
            
            <span className="text-[8px] font-mono tracking-widest uppercase text-slate-500">
              SIMULATED DROP FULFILLMENT BY SKYLRK
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen text-white py-4 font-mono select-none bg-[#0a0a0b]">
      
      {/* Back button */}
      <button
        onClick={onBackToShop}
        className="flex items-center gap-2 mb-8 text-white/70 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* Left Column: Form Details */}
        <div className="lg:col-span-7 space-y-10">
          
          <form onSubmit={handlePay} className="space-y-8">
            
            {/* Contact Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs uppercase tracking-widest font-bold text-white relative">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-white/20" />
                </h3>
                <span className="text-[10px] text-white/40 tracking-normal">Already have an account? Sign in</span>
              </div>
              
              <div className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-4 bg-white/5 hover:bg-white/10 focus:bg-white/10 rounded-xl text-white text-xs placeholder-white/40 outline-none border border-white/10 focus:border-white/30 transition-all font-mono"
                />
                <label className="flex items-center gap-2 text-[9px] text-white/50 font-sans tracking-wide cursor-pointer pl-1 mt-1">
                  <input type="checkbox" className="rounded border-white/20 bg-transparent text-slate-950 focus:ring-0 w-3.5 h-3.5" defaultChecked />
                  Email me with news and offers
                </label>
              </div>
            </div>

            {/* Delivery Section */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest font-bold text-white relative">
                Delivery
                <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-white/20" />
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <select 
                    className="w-full h-11 px-4 bg-white/5 rounded-xl text-white text-xs border border-white/10 outline-none cursor-pointer"
                    defaultValue="India"
                  >
                    <option value="India" className="bg-slate-900 text-white">India</option>
                    <option value="United States" className="bg-slate-900 text-white">United States</option>
                    <option value="United Kingdom" className="bg-slate-900 text-white">United Kingdom</option>
                    <option value="Europe" className="bg-slate-900 text-white">Europe</option>
                  </select>
                </div>

                <input
                  type="text"
                  required
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full h-11 px-4 bg-white/5 hover:bg-white/10 placeholder-white/40 border border-white/10 rounded-xl text-xs outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full h-11 px-4 bg-white/5 hover:bg-white/10 placeholder-white/40 border border-white/10 rounded-xl text-xs outline-none"
                />

                <div className="md:col-span-2">
                  <input
                    type="text"
                    required
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-11 px-4 bg-white/5 hover:bg-white/10 placeholder-white/40 border border-white/10 rounded-xl text-xs outline-none mb-3"
                  />
                  <input
                    type="text"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={apt}
                    onChange={(e) => setApt(e.target.value)}
                    className="w-full h-11 px-4 bg-white/5 hover:bg-white/10 placeholder-white/40 border border-white/10 rounded-xl text-xs outline-none"
                  />
                </div>

                <input
                  type="text"
                  required
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full h-11 px-4 bg-white/5 hover:bg-white/10 placeholder-white/40 border border-white/10 rounded-xl text-xs outline-none"
                />
                <select
                  value={stateCode}
                  onChange={(e) => setStateCode(e.target.value)}
                  className="w-full h-11 px-4 bg-slate-950/20 border border-white/10 rounded-xl text-xs outline-none cursor-pointer"
                >
                  <option value="Maharashtra" className="bg-slate-900">Maharashtra</option>
                  <option value="Delhi" className="bg-slate-900">Delhi</option>
                  <option value="Karnataka" className="bg-slate-900">Karnataka</option>
                  <option value="Tamil Nadu" className="bg-slate-900">Tamil Nadu</option>
                  <option value="Sikkim" className="bg-slate-900">Sikkim</option>
                </select>

                <input
                  type="text"
                  required
                  placeholder="PIN code"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full h-11 px-4 bg-white/5 hover:bg-white/10 placeholder-white/40 border border-white/10 rounded-xl text-xs outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-4 bg-white/5 hover:bg-white/10 placeholder-white/40 border border-white/10 rounded-xl text-xs outline-none"
                />
              </div>
            </div>

            {/* Payment Info */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest font-bold text-white relative">
                Payment
                <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-white/20" />
              </h3>
              <p className="text-[9px] text-white/40 uppercase tracking-wider">All transactions are secure and encrypted.</p>

              <div className="bg-white/5 rounded-2xl border border-white/10 p-4 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest">Credit or Debit card</span>
                  <div className="flex gap-2 text-[10px] text-white/50">
                    <span>VISA</span>
                    <span>MC</span>
                    <span>AMEX</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="md:col-span-2 relative">
                    <input
                      type="text"
                      required
                      placeholder="Card number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full h-11 px-4 bg-white/5 hover:bg-white/10 placeholder-white/40 border border-white/10 rounded-xl text-[11px] outline-none pr-10"
                    />
                    <CreditCard size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Expiration date (MM / YY)"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full h-11 px-4 bg-white/5 hover:bg-white/10 placeholder-white/40 border border-white/10 rounded-xl text-xs outline-none"
                  />
                  <input
                    type="password"
                    required
                    maxLength={4}
                    placeholder="Security code"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full h-11 px-4 bg-white/5 hover:bg-white/10 placeholder-white/40 border border-white/10 rounded-xl text-xs outline-none"
                  />

                  <div className="md:col-span-2">
                    <input
                      type="text"
                      required
                      placeholder="Name on card"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full h-11 px-4 bg-white/5 hover:bg-white/10 placeholder-white/40 border border-white/10 rounded-xl text-xs outline-none"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-[9px] text-white/50 font-sans cursor-pointer pt-2">
                  <input type="checkbox" className="rounded border-white/20 bg-transparent focus:ring-0 text-slate-950 w-3.5 h-3.5" defaultChecked />
                  Use shipping address as billing address
                </label>
              </div>
            </div>

            {/* Action dispatch button */}
            <button
              type="submit"
              disabled={isPaying}
              className="w-full h-14 bg-white text-slate-950 hover:bg-white/95 active:scale-[0.99] font-mono text-xs font-black uppercase tracking-[0.2em] rounded-full flex items-center justify-center transition-all mt-4 shadow-xl"
            >
              {isPaying ? (
                <div className="w-5 h-5 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
              ) : (
                'Pay now'
              )}
            </button>

            <div className="flex justify-center items-center gap-2 text-[8px] text-white/30 uppercase tracking-[0.15em] pt-2">
              <ShieldCheck size={12} className="text-emerald-500/50" />
              <span>Simulated encrypted SSL gateway</span>
            </div>
          </form>

          {/* Refund Policies summary links */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[8px] tracking-wider text-white/30 uppercase border-t border-white/5 pt-6 font-mono">
            <button type="button" className="hover:text-white transition-colors">Refund policy</button>
            <button type="button" className="hover:text-white transition-colors">Shipping policy</button>
            <button type="button" className="hover:text-white transition-colors">Privacy policy</button>
            <button type="button" className="hover:text-white transition-colors">Terms of service</button>
            <button type="button" className="hover:text-white transition-colors">Contact information</button>
          </div>
        </div>

        {/* Right Column: Checkout Order Summary info */}
        <div className="lg:col-span-5 bg-white/5 rounded-3xl border border-white/10 p-6 md:p-8 space-y-6">
          <h3 className="text-xs uppercase tracking-widest font-bold text-white relative pb-3 border-b border-white/5">
            Order Summary
          </h3>

          {/* Items count details */}
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={item.key} className="flex gap-4 items-center">
                <div className="relative w-14 h-14 bg-white/5 rounded-xl border border-white/10 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-12 h-12 object-contain"
                  />
                  <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 rounded-full bg-white/20 backdrop-blur border border-white/30 text-white flex items-center justify-center font-mono text-[9px] font-bold px-1 select-none">
                    {item.quantity}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-[11px] font-mono font-bold uppercase truncate">
                    {item.product.title}
                  </h4>
                  <p className="text-[9px] font-mono text-white/50 mt-0.5 uppercase tracking-wide">
                    {item.product.subtitle}
                  </p>
                  <span className="text-[9px] font-mono text-white/40">
                    SIZE: {item.selectedSize}
                  </span>
                </div>

                <span className="font-mono text-xs font-bold text-white flex-shrink-0">
                  {currency.symbol}{Math.round(item.product.price * currency.rate * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Checkout Discount promo application */}
          <form onSubmit={handleApplyPromo} className="flex gap-2 border-t border-b border-white/5 py-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Discount code or gift card"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="w-full h-10 px-4 bg-white/5 placeholder-white/40 border border-white/10 rounded-xl text-xs outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 h-10 bg-white/10 hover:bg-white/25 active:scale-95 text-[10px] font-bold tracking-widest uppercase transition-all rounded-xl"
            >
              Apply
            </button>
          </form>
          {promoSuccess && (
            <p className="text-[9.5px] font-mono text-emerald-400 uppercase tracking-widest pl-1">
              {promoSuccess}
            </p>
          )}

          {/* Pricing breakdowns */}
          <div className="space-y-2.5 font-mono text-[11px] text-white/60 pt-2">
            <div className="flex justify-between">
              <span>Subtotal ( {items.reduce((sum, item) => sum + item.quantity, 0)} items )</span>
              <span className="text-white font-bold">{currency.symbol}{convertedSubtotal.toLocaleString()}</span>
            </div>

            {appliedDiscount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span className="flex items-center gap-1">
                  <Tag size={10} />
                  PROMO DISCOUNT ({appliedDiscount}%)
                </span>
                <span>-{currency.symbol}{discountAmount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between items-center text-white/40">
              <span>Shipping</span>
              {appliedDiscount === 100 ? (
                <span className="text-emerald-400 uppercase font-black text-[10px]">FREE</span>
              ) : (
                <span className="text-white">{currency.symbol}{shippingAmount.toLocaleString()}</span>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/5 text-white/90">
              <span className="text-xs uppercase tracking-widest font-black">Total Due</span>
              <div className="text-right">
                <span className="text-slate-400 text-[9px] mr-1 select-none font-sans"></span>
                <span className="text-lg font-black tracking-normal text-white">
                  {currency.symbol}{totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
