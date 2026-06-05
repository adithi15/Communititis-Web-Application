import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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

// Shared glass pill style
const glassPill = {
  background: "rgba(255,255,255,0.12)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.35)",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(255,255,255,0.15), inset 0 0 20px rgba(255,255,255,0.08)",
};

// Reusable shine overlays
function GlassShine() {
  return (
    <>
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.02) 100%)",
          pointerEvents: "none",
          zIndex: 1,
          borderRadius: "inherit",
        }}
      />
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
    </>
  );
}

export default function Header({
  currentTab,
  setCurrentTab,
  currency,
  setCurrency,
  currencies,
  cartCount,
  toggleCart,
  onLogoClick,
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
    setShowCurrencyDrop(false);
  };

  const Logo = ({ onClick }) => (
    <button
      onClick={onClick}
      className="h-full flex items-center justify-center shrink-0 hover:bg-white/10 active:scale-95 transition-all outline-none px-5"
      aria-label="Home"
    >
      <span
        style={{
          fontFamily: "'Condiment', cursive",
          fontWeight: 500,
          fontSize: "38px",
          letterSpacing: "0.03em",
          color: "rgba(8, 8, 8, 0.85)",
          textShadow:
            "0 1px 2px rgba(0,0,0,0.4), 0 -1px 0.5px rgba(255,255,255,0.4)",
          whiteSpace: "nowrap",
          lineHeight: 1,
        }}
      >
        Communities
      </span>
    </button>
  );

  return (
    <header className="fixed top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 z-[400] pointer-events-none flex items-start justify-between">

      {/* ═══════════════════════════════════════════
          DESKTOP HEADER  (md and above)
          — horizontal expanding pill, unchanged
      ═══════════════════════════════════════════ */}
      <div
        className="hidden md:flex pointer-events-auto items-center h-14 rounded-full text-white overflow-hidden relative"
        style={glassPill}
      >
        <GlassShine />

        {/* Logo */}
        <Logo
          onClick={() => {
            onLogoClick?.();
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />

        <div className="w-px h-4 bg-white/20 shrink-0" />

        {/* Cart count */}
        <button
          onClick={toggleCart}
          className="w-14 h-full flex items-center justify-center font-mono text-3xl font-bold text-white hover:bg-white/10 active:scale-95 transition-all outline-none shrink-0"
          title="Open Bag"
        >
          {cartCount}
        </button>

        {/* Expanding nav */}
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
                  transition={{ delay: menuOpen ? i * 0.04 : 0, duration: 0.15 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`h-full px-3.5 flex items-center font-mono text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all outline-none shrink-0 ${
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

        {/* Toggle + / × */}
        <button
          onClick={() => { setMenuOpen(!menuOpen); setShowCurrencyDrop(false); }}
          className="w-11 h-full flex items-center justify-center font-mono font-bold text-white hover:bg-white/10 active:scale-95 transition-all outline-none shrink-0"
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

      {/* ═══════════════════════════════════════════
          MOBILE HEADER  (below md)
          — compact pill: logo · cart · hamburger
          — dropdown card below when open
      ═══════════════════════════════════════════ */}
      <div className="md:hidden pointer-events-auto flex flex-col items-start w-full">

        {/* Top pill row */}
        <div
          className="flex items-center h-12 rounded-full text-white overflow-hidden relative w-full"
          style={glassPill}
        >
          <GlassShine />

          {/* Logo */}
          <Logo
            onClick={() => {
              onLogoClick?.();
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />

          {/* Spacer pushes cart + hamburger to right */}
          <div className="flex-1" />

          {/* Cart count */}
          <button
            onClick={() => { toggleCart(); setMenuOpen(false); }}
            className="w-11 h-full flex items-center justify-center font-mono text-xl font-bold text-white hover:bg-white/10 active:scale-95 transition-all outline-none shrink-0"
            title="Open Bag"
          >
            {cartCount}
          </button>

          <div className="w-px h-4 bg-white/20 shrink-0" />

          {/* Hamburger / close */}
          <button
            onClick={() => { setMenuOpen(!menuOpen); setShowCurrencyDrop(false); }}
            className="w-12 h-full flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all outline-none shrink-0"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.18 }}
                  className="text-2xl leading-none font-bold"
                  style={{ display: "block" }}
                >
                  ✕
                </motion.span>
              ) : (
                <motion.span
                  key="burger"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col gap-[5px] items-center justify-center"
                  style={{ display: "flex" }}
                >
                  <span className="block w-5 h-[2px] bg-white rounded-full" />
                  <span className="block w-5 h-[2px] bg-white rounded-full" />
                  <span className="block w-3.5 h-[2px] bg-white rounded-full self-start ml-[3px]" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Dropdown nav card — slides down from pill */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="w-full mt-2 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.35)",
                boxShadow:
                  "0 12px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.7)",
              }}
            >
              {/* Nav items */}
              <nav className="flex flex-col py-2">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045, duration: 0.2 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-5 py-3.5 font-mono text-[13px] font-bold uppercase tracking-widest transition-all active:bg-white/20 ${
                      currentTab === item.id
                        ? "text-slate-900"
                        : "text-slate-800/70"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-slate-900/40 text-xs">→</span>
                  </motion.button>
                ))}
              </nav>

              {/* Divider */}
              <div className="h-px bg-white/30 mx-4" />

              {/* Currency row inside dropdown */}
              <div className="px-5 py-3 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-widest uppercase text-slate-700/60">
                  Currency
                </span>
                <button
                  onClick={() => setShowCurrencyDrop(!showCurrencyDrop)}
                  className="font-mono text-[11px] font-bold tracking-widest text-slate-900 flex items-center gap-1"
                >
                  <span>[</span>
                  <span>{currency.symbol}{currency.code}</span>
                  <span>]</span>
                </button>
              </div>

              {/* Currency sub-options */}
              <AnimatePresence>
                {showCurrencyDrop && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden px-4 pb-3"
                  >
                    <div className="flex flex-col gap-1">
                      {Object.values(currencies).map((curr) => (
                        <button
                          key={curr.code}
                          onClick={() => {
                            setCurrency(curr);
                            setShowCurrencyDrop(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-[10px] font-mono font-bold tracking-wider rounded-xl transition-all flex justify-between items-center ${
                            currency.code === curr.code
                              ? "bg-slate-900 text-white"
                              : "text-slate-700 hover:bg-white/40"
                          }`}
                        >
                          <span>{curr.label}</span>
                          <span>{curr.symbol}{curr.code}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════
          DESKTOP: Right side currency pill
          (hidden on mobile — currency is inside dropdown)
      ═══════════════════════════════════════════ */}
      <div className="hidden md:flex relative flex-col items-end">
        <button
          onClick={() => { setShowCurrencyDrop(!showCurrencyDrop); setMenuOpen(false); }}
          className="pointer-events-auto h-11 px-5 rounded-full flex items-center bg-transparent border-0 shadow-none select-none text-white hover:scale-102 active:scale-98 transition-all duration-200 outline-none font-mono text-xs font-bold uppercase tracking-widest gap-1"
        >
          <span>[</span>
          <span className="text-white">{currency.symbol}{currency.code}</span>
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
                    onClick={() => { setCurrency(curr); setShowCurrencyDrop(false); }}
                    className={`w-full text-left px-3 py-2 text-[9px] font-mono font-bold tracking-wider rounded-lg transition-all flex justify-between items-center ${
                      currency.code === curr.code
                        ? "bg-white text-slate-950"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{curr.label}</span>
                    <span>{curr.symbol}{curr.code}</span>
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