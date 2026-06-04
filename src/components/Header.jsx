import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// const orbitronHref =
//   "https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap";
// if (
//   typeof document !== "undefined" &&
//   !document.querySelector(`link[href="${orbitronHref}"]`)
// ) {
//   const link = document.createElement("link");
//   link.rel = "stylesheet";
//   link.href = orbitronHref;
//   document.head.appendChild(link);
// }

const condimentHref =
  "https://fonts.googleapis.com/css2?family=Condiment&display=swap";

if (
  typeof document !== "undefined" &&
  !document.querySelector(`link[href="${condimentHref}"]`)
) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = condimentHref;
  document.head.appendChild(link);
}

export default function Header({
  currentTab,
  setCurrentTab,
  currency,
  setCurrency,
  currencies,
  cartCount,
  toggleCart,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCurrencyDrop, setShowCurrencyDrop] = useState(false);

  const navItems = [
    { id: "shop", label: "Shop" },
    { id: "contact", label: "Contact" },
    { id: "policies", label: "Policies" },
    { id: "wallpapers", label: "Wallpapers" },
    { id: "instagram", label: "IG" },
  ];

  const handleNavClick = (tab) => {
    setCurrentTab(tab);
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 z-50 pointer-events-none flex items-start justify-between">
      {/* Left Side: Expandable Pill with glass-card effect */}
      <div
        className="pointer-events-auto flex items-center h-12 md:h-14 rounded-full text-white overflow-hidden relative"
        style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.35)",
          boxShadow: `
      0 8px 32px rgba(0,0,0,0.12),
      inset 0 1px 0 rgba(255,255,255,0.8),
      inset 0 -1px 0 rgba(255,255,255,0.15),
      inset 0 0 20px rgba(255,255,255,0.08)
    `,
        }}
      >
        {/* top edge horizontal light sweep (::before) */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.02) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        {/* left edge vertical light strip (::after) */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Logo */}
      <button
  onClick={() => {
    setCurrentTab("shop");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
  className="h-full w-[300px] flex items-center justify-center shrink-0 hover:bg-white/10 active:scale-95 transition-all outline-none"
  aria-label="Home"
>
  <span
    style={{
      fontFamily: "'Condiment', cursive",
      fontWeight: 500,
      fontSize: "42px",
      letterSpacing: "0.03em",
      color: "rgba(8, 8, 8, 0.85)",
      textShadow:
        "0 1px 2px rgba(0,0,0,0.4), 0 -1px 0.5px rgba(255,255,255,0.4)",
      whiteSpace: "nowrap",
    }}
  >
    Communities
  </span>
</button>

        {/* Divider */}
        <div className="w-px h-4 bg-white/20 shrink-0" />

        {/* Bag count */}
        <button
          onClick={toggleCart}
          className="w-12 md:w-14 h-full flex items-center justify-center font-mono text-2xl md:text-3xl font-bold text-white hover:bg-white/10 active:scale-95 transition-all outline-none shrink-0"
          title="Open Bag"
        >
          {cartCount}
        </button>

        {/* Inline nav items — expand horizontally */}
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              key="nav-items"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              className="flex items-center overflow-hidden"
            >
              <div className="w-px h-4 bg-white/20 shrink-0" />
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay: menuOpen ? i * 0.04 : 0,
                    duration: 0.15,
                  }}
                  onClick={() => handleNavClick(item.id)}
                  className={`h-full px-3 md:px-3.5 flex items-center font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all outline-none shrink-0 ${
                    currentTab === item.id
                      ? "text-white bg-white/15"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle +/× button */}
        <button
          onClick={() => {
            setMenuOpen(!menuOpen);
            setShowCurrencyDrop(false);
          }}
          className="w-9 md:w-11 h-full flex items-center justify-center font-mono text-md md:text-sm font-bold text-white hover:bg-white/10 active:scale-95 transition-all outline-none shrink-0"
          title="Navigation Menu"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="relative inline-block leading-none text-3xl"
          >
            ＋
          </motion.span>
        </button>
      </div>

      {/* Right Side: Currency Display */}
      <div className="relative flex flex-col items-end">
        <button
          onClick={() => {
            setShowCurrencyDrop(!showCurrencyDrop);
            setMenuOpen(false);
          }}
          className="pointer-events-auto h-9 md:h-11 px-4 md:px-5 rounded-full flex items-center bg-transparent border-0 shadow-none select-none text-white hover:scale-102 active:scale-98 transition-all duration-200 outline-none font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest gap-1"
        >
          <span>[</span>
          <span className="text-white">
            {currency.symbol}
            {currency.code}
          </span>
          <span>]</span>
        </button>

        <AnimatePresence>
          {showCurrencyDrop && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              className="pointer-events-auto absolute top-full right-0 mt-2 w-48 bg-slate-950/80 backdrop-blur-md rounded-2xl p-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/10 z-50 flex flex-col gap-1.5"
            >
              <span className="text-[8px] font-mono tracking-widest uppercase text-slate-400 block mb-1 pl-1.5 select-none">
                Switch Currency
              </span>
              <div className="flex flex-col gap-1">
                {Object.values(currencies).map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      setCurrency(curr);
                      setShowCurrencyDrop(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-[9px] font-mono font-bold tracking-wider rounded-lg transition-all flex justify-between items-center ${
                      currency.code === curr.code
                        ? "bg-white text-slate-950"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{curr.label}</span>
                    <span>
                      {curr.symbol}
                      {curr.code}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
