// import React, { useState } from "react";
// import { motion, AnimatePresence } from "motion/react";

// const condimentHref =
//   "https://fonts.googleapis.com/css2?family=Condiment&display=swap";

// if (
//   typeof document !== "undefined" &&
//   !document.querySelector(`link[href="${condimentHref}"]`)
// ) {
//   const link = document.createElement("link");
//   link.rel = "stylesheet";
//   link.href = condimentHref;
//   document.head.appendChild(link);
// }

// // Shared glass pill style
// const glassPill = {
//   background: "rgba(255,255,255,0.12)",
//   backdropFilter: "blur(20px)",
//   WebkitBackdropFilter: "blur(20px)",
//   border: "1px solid rgba(255,255,255,0.35)",
//   boxShadow:
//     "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(255,255,255,0.15), inset 0 0 20px rgba(255,255,255,0.08)",
// };

// // Reusable shine overlays
// function GlassShine() {
//   return (
//     <>
//       <span
//         aria-hidden="true"
//         style={{
//           position: "absolute",
//           inset: 0,
//           background:
//             "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.02) 100%)",
//           pointerEvents: "none",
//           zIndex: 1,
//           borderRadius: "inherit",
//         }}
//       />
//       <span
//         aria-hidden="true"
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           height: "1px",
//           background:
//             "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
//           pointerEvents: "none",
//           zIndex: 2,
//         }}
//       />
//     </>
//   );
// }

// export default function Header({
//   currentTab,
//   setCurrentTab,
//   currency,
//   setCurrency,
//   currencies,
//   cartCount,
//   toggleCart,
//   onLogoClick,
// }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showCurrencyDrop, setShowCurrencyDrop] = useState(false);

//   const navItems = [
//     { id: "shop", label: "Shop" },
//     { id: "contact", label: "Contact" },
//     { id: "policies", label: "Policies" },
//     { id: "wallpapers", label: "Wallpapers" },
//     { id: "instagram", label: "IG" },
//   ];

//   const handleNavClick = (tab) => {
//     setCurrentTab(tab);
//     setMenuOpen(false);
//     setShowCurrencyDrop(false);
//   };

//   const Logo = ({ onClick }) => (
//     <button
//       onClick={onClick}
//       className="h-full flex items-center justify-center shrink-0 hover:bg-white/10 active:scale-95 transition-all outline-none px-5"
//       aria-label="Home"
//     >
//       <span
//         style={{
//           fontFamily: "'Condiment', cursive",
//           fontWeight: 500,
//           fontSize: "38px",
//           letterSpacing: "0.03em",
//           color: "rgba(8, 8, 8, 0.85)",
//           textShadow:
//             "0 1px 2px rgba(0,0,0,0.4), 0 -1px 0.5px rgba(255,255,255,0.4)",
//           whiteSpace: "nowrap",
//           lineHeight: 1,
//         }}
//       >
//         Communities
//       </span>
//     </button>
//   );

//   return (
//     <header className="fixed top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 z-[400] pointer-events-none flex items-start justify-between">
//       {/* ═══════════════════════════════════════════
//           DESKTOP HEADER  (md and above)
//           — horizontal expanding pill, unchanged
//       ═══════════════════════════════════════════ */}
//       <div
//         className="hidden md:flex pointer-events-auto items-center h-14 rounded-full text-white overflow-hidden relative"
//         style={glassPill}
//       >
//         <GlassShine />

//         {/* Logo */}
//         <Logo
//           onClick={() => {
//             onLogoClick?.();
//             setMenuOpen(false);
//             window.scrollTo({ top: 0, behavior: "smooth" });
//           }}
//         />

//         <div className="w-px h-4 bg-white/20 shrink-0" />

//         {/* Cart count */}
//         <button
//           onClick={toggleCart}
//           className="w-14 h-full flex items-center justify-center font-mono text-3xl font-bold text-white hover:bg-white/10 active:scale-95 transition-all outline-none shrink-0"
//           title="Open Bag"
//         >
//           {cartCount}
//         </button>

//         {/* Expanding nav */}
//         <AnimatePresence initial={false}>
//           {menuOpen && (
//             <motion.div
//               key="nav-items"
//               initial={{ width: 0, opacity: 0 }}
//               animate={{ width: "auto", opacity: 1 }}
//               exit={{ width: 0, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 400, damping: 32 }}
//               className="flex items-center overflow-hidden"
//             >
//               <div className="w-px h-4 bg-white/20 shrink-0" />
//               {navItems.map((item, i) => (
//                 <motion.button
//                   key={item.id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{
//                     delay: menuOpen ? i * 0.04 : 0,
//                     duration: 0.15,
//                   }}
//                   onClick={() => handleNavClick(item.id)}
//                   className={`h-full px-3.5 flex items-center font-mono text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all outline-none shrink-0 ${
//                     currentTab === item.id
//                       ? "text-white bg-white/15"
//                       : "text-white/60 hover:text-white hover:bg-white/10"
//                   }`}
//                 >
//                   {item.label}
//                 </motion.button>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Toggle + / × */}
//         <button
//           onClick={() => {
//             setMenuOpen(!menuOpen);
//             setShowCurrencyDrop(false);
//           }}
//           className="w-11 h-full flex items-center justify-center font-mono font-bold text-white hover:bg-white/10 active:scale-95 transition-all outline-none shrink-0"
//           title="Navigation Menu"
//         >
//           <motion.span
//             animate={{ rotate: menuOpen ? 45 : 0 }}
//             transition={{ type: "spring", stiffness: 400, damping: 20 }}
//             className="relative inline-block leading-none text-3xl"
//           >
//             ＋
//           </motion.span>
//         </button>
//       </div>

//       {/* ═══════════════════════════════════════════
//           MOBILE HEADER  (below md)
//           — compact pill: logo · cart · hamburger
//           — dropdown card below when open
//       ═══════════════════════════════════════════ */}
//       <div className="md:hidden pointer-events-auto flex flex-col items-start w-full">
//         {/* Top pill row */}
//         <div
//           className="flex items-center h-12 rounded-full text-white overflow-hidden relative w-full"
//           style={glassPill}
//         >
//           <GlassShine />

//           {/* Logo */}
//           <Logo
//             onClick={() => {
//               onLogoClick?.();
//               setMenuOpen(false);
//               window.scrollTo({ top: 0, behavior: "smooth" });
//             }}
//           />

//           {/* Spacer pushes cart + hamburger to right */}
//           <div className="flex-1" />

//           {/* Cart count */}
//           <button
//             onClick={() => {
//               toggleCart();
//               setMenuOpen(false);
//             }}
//             className="w-11 h-full flex items-center justify-center font-mono text-xl font-bold text-white hover:bg-white/10 active:scale-95 transition-all outline-none shrink-0"
//             title="Open Bag"
//           >
//             {cartCount}
//           </button>

//           <div className="w-px h-4 bg-white/20 shrink-0" />

//           {/* Hamburger / close */}
//           <button
//             onClick={() => {
//               setMenuOpen(!menuOpen);
//               setShowCurrencyDrop(false);
//             }}
//             className="w-12 h-full flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all outline-none shrink-0"
//             aria-label={menuOpen ? "Close menu" : "Open menu"}
//           >
//             <AnimatePresence mode="wait" initial={false}>
//               {menuOpen ? (
//                 <motion.span
//                   key="close"
//                   initial={{ opacity: 0, rotate: -45 }}
//                   animate={{ opacity: 1, rotate: 0 }}
//                   exit={{ opacity: 0, rotate: 45 }}
//                   transition={{ duration: 0.18 }}
//                   className="text-2xl leading-none font-bold"
//                   style={{ display: "block" }}
//                 >
//                   ✕
//                 </motion.span>
//               ) : (
//                 <motion.span
//                   key="burger"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.18 }}
//                   className="flex flex-col gap-[5px] items-center justify-center"
//                   style={{ display: "flex" }}
//                 >
//                   <span className="block w-5 h-[2px] bg-white rounded-full" />
//                   <span className="block w-5 h-[2px] bg-white rounded-full" />
//                   <span className="block w-3.5 h-[2px] bg-white rounded-full self-start ml-[3px]" />
//                 </motion.span>
//               )}
//             </AnimatePresence>
//           </button>
//         </div>

//         {/* Dropdown nav card — slides down from pill */}
//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div
//               key="mobile-menu"
//               initial={{ opacity: 0, y: -12, scale: 0.97 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: -12, scale: 0.97 }}
//               transition={{ type: "spring", stiffness: 380, damping: 30 }}
//               className="w-full mt-2 rounded-2xl overflow-hidden"
//               style={{
//                 background: "rgba(255,255,255,0.18)",
//                 backdropFilter: "blur(24px)",
//                 WebkitBackdropFilter: "blur(24px)",
//                 border: "1px solid rgba(255,255,255,0.35)",
//                 boxShadow:
//                   "0 12px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.7)",
//               }}
//             >
//               {/* Nav items */}
//               <nav className="flex flex-col py-2">
//                 {navItems.map((item, i) => (
//                   <motion.button
//                     key={item.id}
//                     initial={{ opacity: 0, x: -8 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: i * 0.045, duration: 0.2 }}
//                     onClick={() => handleNavClick(item.id)}
//                     className={`w-full flex items-center justify-between px-5 py-3.5 font-mono text-[13px] font-bold uppercase tracking-widest transition-all active:bg-white/20 ${
//                       currentTab === item.id
//                         ? "text-slate-900"
//                         : "text-slate-800/70"
//                     }`}
//                   >
//                     <span>{item.label}</span>
//                     <span className="text-slate-900/40 text-xs">→</span>
//                   </motion.button>
//                 ))}
//               </nav>

//               {/* Divider */}
//               <div className="h-px bg-white/30 mx-4" />

//               {/* Currency row inside dropdown */}
//               <div className="px-5 py-3 flex items-center justify-between">
//                 <span
//                   className="

//                  text-[10px] tracking-widest uppercase text-slate-700/60"
//                 >
//                   Currency
//                 </span>
//                 <button
//                   onClick={() => setShowCurrencyDrop(!showCurrencyDrop)}
//                   className="font-mono text-[11px]  tracking-widest text-slate-900 flex items-center gap-1"
//                 >
//                   <span>[</span>
//                   <span>
//                     {currency.symbol}
//                     {currency.code}
//                   </span>
//                   <span>]</span>
//                 </button>
//               </div>

//               {/* Currency sub-options */}
//               <AnimatePresence>
//                 {showCurrencyDrop && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.22 }}
//                     className="overflow-hidden px-4 pb-3"
//                   >
//                     <div className="flex flex-col gap-1">
//                       {Object.values(currencies).map((curr) => (
//                         <button
//                           key={curr.code}
//                           onClick={() => {
//                             setCurrency(curr);
//                             setShowCurrencyDrop(false);
//                           }}
//                           className={`w-full text-left px-3 py-2 text-[10px] tracking-wider rounded-xl transition-all flex justify-between items-center ${
//                             currency.code === curr.code
//                               ? "bg-slate-900 text-white"
//                               : "text-slate-700 hover:bg-white/40"
//                           }`}
//                         >
//                           <span>{curr.label}</span>
//                           <span>
//                             {curr.symbol}
//                             {curr.code}
//                           </span>
//                         </button>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* ═══════════════════════════════════════════
//           DESKTOP: Right side currency pill
//           (hidden on mobile — currency is inside dropdown)
//       ═══════════════════════════════════════════ */}
//       <div className="hidden md:flex relative flex-col items-end">
//         <button
//           onClick={() => {
//             setShowCurrencyDrop(!showCurrencyDrop);
//             setMenuOpen(false);
//           }}
//           className="pointer-events-auto h-18 px-8 rounded-full flex items-center bg-transparent border-0 shadow-none select-none text-white hover:scale-102 active:scale-98 transition-all duration-200 outline-none font-mono text-md  uppercase tracking-widest gap-1"
//         >
//           <span>[</span>
//           <span className="text-black">
//             {currency.symbol}
//             {currency.code}
//           </span>
//           <span>]</span>
//         </button>

//         <AnimatePresence>
//           {showCurrencyDrop && (
//             <motion.div
//               initial={{ opacity: 0, y: -8, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: -8, scale: 0.95 }}
//               transition={{ type: "spring", stiffness: 450, damping: 25 }}
//               className="pointer-events-auto absolute top-full right-0 mt-2 w-48 bg-slate-950/80 backdrop-blur-md rounded-2xl p-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/10 z-50 flex flex-col gap-1.5"
//             >
//               <span className="text-[8px] font-mono tracking-widest uppercase text-slate-400 block mb-1 pl-1.5 select-none">
//                 Switch Currency
//               </span>
//               <div className="flex flex-col gap-1">
//                 {Object.values(currencies).map((curr) => (
//                   <button
//                     key={curr.code}
//                     onClick={() => {
//                       setCurrency(curr);
//                       setShowCurrencyDrop(false);
//                     }}
//                     className={`w-full text-left px-3 py-2 text-[9px] font-mono font-bold tracking-wider rounded-lg transition-all flex justify-between items-center ${
//                       currency.code === curr.code
//                         ? "bg-white text-slate-950"
//                         : "text-slate-300 hover:text-white hover:bg-white/5"
//                     }`}
//                   >
//                     <span>{curr.label}</span>
//                     <span>
//                       {curr.symbol}
//                       {curr.code}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </header>
//   );
// }

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "motion/react";

// const condimentHref =
//   "https://fonts.googleapis.com/css2?family=Condiment&display=swap";

// if (
//   typeof document !== "undefined" &&
//   !document.querySelector(`link[href="${condimentHref}"]`)
// ) {
//   const link = document.createElement("link");
//   link.rel = "stylesheet";
//   link.href = condimentHref;
//   document.head.appendChild(link);
// }

// // ═══════════════════════════════════════════
// // AUTHENTIC HIGH-FIDELITY CRYSTAL GLASS ENGINE
// // ═══════════════════════════════════════════
// const glassPill = {
//   // Pure water-clear liquid baseline. No artificial colors or hard gray gradients.
//   background: "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.08) 100%)",

//   // High-performance magnification warp to cleanly distort whatever moves underneath
//   backdropFilter: "blur(20px) saturate(135%) contrast(104%)",
//   WebkitBackdropFilter: "blur(20px) saturate(135%) contrast(104%)",

//   // The iconic Skylark fluid-meniscus frame. Clean, high-opacity, real glass rim.
//   border: "1.5px solid rgba(255, 255, 255, 0.85)",

//   // Natural physical light map: Smooth internal glow bounding the upper edge naturally
//   boxShadow: `
//     inset 0 2px 3px 0px rgba(255, 255, 255, 0.8),
//     inset 0 -1px 3px 0px rgba(0, 0, 0, 0.02),
//     0 8px 24px -4px rgba(0, 40, 80, 0.1)
//   `,
// };

// // Continuous natural ambient specular bounce (No hard vector cut lines)
// function GlassShine() {
//   return (
//     <span
//       aria-hidden="true"
//       style={{
//         position: "absolute",
//         inset: 0,
//         // Perfectly smooth light decay simulating a high-end camera lens glare
//         background: "linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 50%)",
//         pointerEvents: "none",
//         zIndex: 1,
//         borderRadius: "inherit",
//       }}
//     />
//   );
// }

// export default function Header({
//   currentTab,
//   setCurrentTab,
//   currency,
//   setCurrency,
//   currencies,
//   cartCount,
//   toggleCart,
//   onLogoClick,
// }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showCurrencyDrop, setShowCurrencyDrop] = useState(false);

//   const navItems = [
//     { id: "shop", label: "Shop" },
//     { id: "contact", label: "Contact" },
//     { id: "policies", label: "Policies" },
//     { id: "wallpapers", label: "Wallpapers" },
//     { id: "instagram", label: "IG" },
//   ];

//   const handleNavClick = (tab) => {
//     setCurrentTab(tab);
//     setMenuOpen(false);
//     setShowCurrencyDrop(false);
//   };

//   const Logo = ({ onClick }) => (
//     <button
//       onClick={onClick}
//       className="h-full flex items-center justify-center shrink-0 hover:bg-white/10 active:scale-95 transition-all outline-none px-6 relative z-10"
//       aria-label="Home"
//     >
//       <span
//         style={{
//           fontFamily: "'Condiment', cursive",
//           fontWeight: 500,
//           fontSize: "36px",
//           letterSpacing: "0.01em",
//           color: "#FFFFFF",
//           textShadow: "0 1px 2px rgba(0, 30, 60, 0.1)",
//           whiteSpace: "nowrap",
//           lineHeight: 1,
//         }}
//       >
//         Communities
//       </span>
//     </button>
//   );

//   return (
//     <header className="fixed top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 z-[400] pointer-events-none flex items-start justify-between">
//       {/* ═══════════════════════════════════════════
//           DESKTOP HEADER
//       ═══════════════════════════════════════════ */}
//       <div
//         className="hidden md:flex pointer-events-auto items-center h-14 rounded-full text-white overflow-hidden relative gap-0.5"
//         style={glassPill}
//       >
//         <GlassShine />

//         {/* Logo */}
//         <Logo
//           onClick={() => {
//             onLogoClick?.();
//             setMenuOpen(false);
//             window.scrollTo({ top: 0, behavior: "smooth" });
//           }}
//         />

//         <div className="w-px h-5 bg-white/40 shrink-0 relative z-10" />

//         {/* Nested Opaque UI Bubble Indicator */}
//         <div className="h-full flex items-center px-2 relative z-10">
//           <button
//             onClick={toggleCart}
//             className="h-7 min-w-[28px] px-2 rounded-full flex items-center justify-center bg-white text-slate-800 font-mono text-sm font-bold shadow-[0_1px_2px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95 transition-all outline-none"
//             title="Open Bag"
//           >
//             {cartCount}
//           </button>
//         </div>

//         {/* Expanding nav — direct horizontal reveal with zero fading artifact leaks */}
//         <AnimatePresence initial={false}>
//           {menuOpen && (
//             <motion.div
//               key="nav-items"
//               initial={{ width: 0 }}
//               animate={{ width: "auto" }}
//               exit={{ width: 0 }}
//               transition={{ type: "spring", stiffness: 420, damping: 28 }}
//               className="flex items-center overflow-hidden relative z-10"
//             >
//               <div className="w-px h-5 bg-white/40 shrink-0" />
//               {navItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => handleNavClick(item.id)}
//                   className={`h-full px-4 flex items-center font-mono text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all outline-none shrink-0 ${
//                     currentTab === item.id
//                       ? "text-white bg-white/20 font-extrabold"
//                       : "text-white/85 hover:text-white hover:bg-white/10"
//                   }`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Toggle ＋ / ✕ */}
//         <button
//           onClick={() => {
//             setMenuOpen(!menuOpen);
//             setShowCurrencyDrop(false);
//           }}
//           className="w-12 h-full flex items-center justify-center font-mono font-bold text-white hover:bg-white/10 active:scale-95 transition-all outline-none shrink-0 relative z-10"
//           title="Navigation Menu"
//         >
//           <motion.span
//             animate={{ rotate: menuOpen ? 45 : 0 }}
//             transition={{ type: "spring", stiffness: 450, damping: 24 }}
//             className="relative inline-block leading-none text-2xl text-white"
//           >
//             ＋
//           </motion.span>
//         </button>
//       </div>

//       {/* ═══════════════════════════════════════════
//           MOBILE HEADER
//       ═══════════════════════════════════════════ */}
//       <div className="md:hidden pointer-events-auto flex flex-col items-start w-full">
//         <div
//           className="flex items-center h-12 rounded-full text-white overflow-hidden relative w-full"
//           style={glassPill}
//         >
//           <GlassShine />

//           {/* Logo */}
//           <Logo
//             onClick={() => {
//               onLogoClick?.();
//               setMenuOpen(false);
//               window.scrollTo({ top: 0, behavior: "smooth" });
//             }}
//           />

//           <div className="flex-1" />

//           {/* Solid Inset Bubble */}
//           <div className="h-full flex items-center px-1 relative z-10">
//             <button
//               onClick={() => {
//                 toggleCart();
//                 setMenuOpen(false);
//               }}
//               className="h-6 min-w-[24px] px-1.5 rounded-full flex items-center justify-center bg-white text-slate-800 font-mono text-xs font-bold shadow-[0_1px_2px_rgba(0,0,0,0.12)] active:scale-95 transition-all outline-none"
//               title="Open Bag"
//             >
//               {cartCount}
//             </button>
//           </div>

//           <div className="w-px h-4 bg-white/40 shrink-0 relative z-10" />

//           {/* Hamburger Menu Toggle */}
//           <button
//             onClick={() => {
//               setMenuOpen(!menuOpen);
//               setShowCurrencyDrop(false);
//             }}
//             className="w-12 h-full flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all outline-none shrink-0 relative z-10"
//             aria-label={menuOpen ? "Close menu" : "Open menu"}
//           >
//             <AnimatePresence mode="wait" initial={false}>
//               {menuOpen ? (
//                 <motion.span
//                   key="close"
//                   initial={{ rotate: -45 }}
//                   animate={{ rotate: 0 }}
//                   exit={{ rotate: 45 }}
//                   transition={{ duration: 0.12 }}
//                   className="text-xl leading-none font-bold text-white"
//                   style={{ display: "block" }}
//                 >
//                   ✕
//                 </motion.span>
//               ) : (
//                 <motion.span
//                   key="burger"
//                   className="flex flex-col gap-[4px] items-center justify-center"
//                   style={{ display: "flex" }}
//                 >
//                   <span className="block w-4 h-[2px] bg-white rounded-full" />
//                   <span className="block w-4 h-[2px] bg-white rounded-full" />
//                   <span className="block w-3 h-[2px] bg-white rounded-full self-start ml-[2px]" />
//                 </motion.span>
//               )}
//             </AnimatePresence>
//           </button>
//         </div>

//         {/* Mobile Dropdown Panel */}
//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div
//               key="mobile-menu"
//               initial={{ y: -6, scale: 0.99 }}
//               animate={{ y: 0, scale: 1 }}
//               exit={{ y: -6, scale: 0.99 }}
//               transition={{ type: "spring", stiffness: 420, damping: 26 }}
//               className="w-full mt-2 rounded-2xl overflow-hidden"
//               style={{
//                 background: "rgba(255, 255, 255, 0.32)",
//                 backdropFilter: "blur(24px) contrast(104%)",
//                 WebkitBackdropFilter: "blur(24px) contrast(104%)",
//                 border: "1.5px solid rgba(255, 255, 255, 0.75)",
//                 boxShadow: "0 12px 32px rgba(0, 40, 80, 0.1), inset 0 2px 3px rgba(255, 255, 255, 0.6)",
//               }}
//             >
//               <nav className="flex flex-col py-1">
//                 {navItems.map((item) => (
//                   <button
//                     key={item.id}
//                     onClick={() => handleNavClick(item.id)}
//                     className={`w-full flex items-center justify-between px-5 py-3 font-mono text-[13px] font-bold uppercase tracking-widest transition-all active:bg-white/15 ${
//                       currentTab === item.id ? "text-white bg-white/20" : "text-white/85"
//                     }`}
//                   >
//                     <span>{item.label}</span>
//                     <span className="text-white/40 text-xs">→</span>
//                   </button>
//                 ))}
//               </nav>

//               <div className="h-px bg-white/30 mx-4" />

//               <div className="px-5 py-3 flex items-center justify-between">
//                 <span className="text-[10px] tracking-widest uppercase text-white/60">
//                   Currency
//                 </span>
//                 <button
//                   onClick={() => setShowCurrencyDrop(!showCurrencyDrop)}
//                   className="font-mono text-[11px] tracking-widest text-white flex items-center gap-1 bg-white/25 px-2.5 py-0.5 rounded-full"
//                 >
//                   <span>
//                     {currency.symbol}
//                     {currency.code}
//                   </span>
//                 </button>
//               </div>

//               <AnimatePresence>
//                 {showCurrencyDrop && (
//                   <motion.div
//                     initial={{ height: 0 }}
//                     animate={{ height: "auto" }}
//                     exit={{ height: 0 }}
//                     transition={{ duration: 0.16 }}
//                     className="overflow-hidden px-4 pb-3"
//                   >
//                     <div className="flex flex-col gap-1">
//                       {Object.values(currencies).map((curr) => (
//                         <button
//                           key={curr.code}
//                           onClick={() => {
//                             setCurrency(curr);
//                             setShowCurrencyDrop(false);
//                           }}
//                           className={`w-full text-left px-3 py-2 text-[10px] tracking-wider rounded-xl transition-all flex justify-between items-center ${
//                             currency.code === curr.code
//                               ? "bg-white text-slate-800 shadow-sm"
//                               : "text-white hover:bg-white/15"
//                           }`}
//                         >
//                           <span>{curr.label}</span>
//                           <span>
//                             {curr.symbol}
//                             {curr.code}
//                           </span>
//                         </button>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* ═══════════════════════════════════════════
//           DESKTOP: RIGHT SIDE CURRENCY PILL
//       ═══════════════════════════════════════════ */}
//       <div className="hidden md:flex relative flex-col items-end">
//         <button
//           onClick={() => {
//             setShowCurrencyDrop(!showCurrencyDrop);
//             setMenuOpen(false);
//           }}
//           className="pointer-events-auto h-14 px-5 rounded-full flex items-center text-white hover:scale-102 active:scale-98 transition-all duration-200 outline-none font-mono text-sm uppercase tracking-widest gap-1"
//           style={glassPill}
//         >
//           <GlassShine />
//           <span className="relative z-10 font-bold">
//             {currency.symbol}
//             {currency.code}
//           </span>
//         </button>

//         <AnimatePresence>
//           {showCurrencyDrop && (
//             <motion.div
//               initial={{ y: -4, scale: 0.97 }}
//               animate={{ y: 0, scale: 1 }}
//               exit={{ y: -4, scale: 0.97 }}
//               transition={{ type: "spring", stiffness: 450, damping: 25 }}
//               className="pointer-events-auto absolute top-full right-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-2xl p-2 shadow-[0_12px_32px_rgba(0,40,80,0.12)] border border-white/60 z-50 flex flex-col gap-1"
//             >
//               <span className="text-[8px] font-mono tracking-widest uppercase text-slate-500 block mb-1 pl-1.5 select-none">
//                 Switch Currency
//               </span>
//               <div className="flex flex-col gap-0.5">
//                 {Object.values(currencies).map((curr) => (
//                   <button
//                     key={curr.code}
//                     onClick={() => {
//                       setCurrency(curr);
//                       setShowCurrencyDrop(false);
//                     }}
//                     className={`w-full text-left px-3 py-2 text-[10px] font-mono font-bold tracking-wider rounded-lg transition-all flex justify-between items-center ${
//                       currency.code === curr.code
//                         ? "bg-white text-slate-800 shadow-sm"
//                         : "text-slate-600 hover:bg-black/5"
//                     }`}
//                   >
//                     <span>{curr.label}</span>
//                     <span>
//                       {curr.symbol}
//                       {curr.code}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </header>
//   );
// }

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const glassPill = {
  background: "rgba(255, 255, 255, 0.12)",
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)",
  border: "1px solid rgba(255, 255, 255, 0.35)",
  boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 -1px 0 rgba(255, 255, 255, 0.15),
    inset 0 0 20px rgba(255, 255, 255, 0.08)
  `,
};

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

// Communities wordmark — replaces the Skylrk SVG
function CommunitiesLogo() {
  return (
    <img
      src="/image/logo.png"
      alt="Communities"
      style={{
        height: "100px",
        width: "220px",
        objectFit: "cover",
        objectPosition: "left center",
        mixBlendMode: "multiply",
        transform: "translateY(10px)",
      }}
    />
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

  const MenuToggleSVG = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#menu_clip)">
        <path
          d="M20.0049 9.99294C20.0049 9.27516 19.4252 8.69542 18.7074 8.69542L12.9099 8.69542C12.0265 8.69542 11.3087 7.97763 11.2995 7.08501L11.3087 1.29674C11.3087 0.57895 10.729 -0.000793457 10.0112 -0.000793457C9.29343 -0.000793457 8.71364 0.57895 8.71364 1.29674V7.09421C8.71364 7.97763 7.99585 8.69542 7.10323 8.70462L1.29655 8.69542C0.578771 8.69542 -0.000976563 9.27516 -0.000976563 9.99294C-0.000976563 10.7107 0.578771 11.2905 1.29655 11.2905H7.09403C7.97745 11.2905 8.69523 12.0082 8.70444 12.9009L8.70444 18.6984C8.70444 19.4162 9.28421 19.9959 10.002 19.9959C10.7197 19.9959 11.2995 19.4162 11.2995 18.6984L11.2995 12.9009C11.2995 12.0174 12.0172 11.2997 12.9099 11.2905L18.7074 11.2905C19.4252 11.2905 20.0049 10.7107 20.0049 9.99294Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="menu_clip">
          <rect width="20.0099" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <header className="fixed top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 z-[400] pointer-events-none flex items-start justify-between">
      {/* ═══════════════════════════════════════════
          DESKTOP — logo pill + menu pill
      ═══════════════════════════════════════════ */}
      <div className="hidden md:flex pointer-events-auto items-center gap-2">
        {/* PILL 1: Logo */}
        <a
          href="/"
          className="flex items-center justify-center h-25 px-0"
          aria-label="Communities"
          onClick={(e) => {
            e.preventDefault();
            onLogoClick?.();
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <CommunitiesLogo />
        </a>

        {/* PILL 2: Menu pill — cart + nav + toggle */}
        <div
          className="flex items-center h-14 rounded-full text-white overflow-hidden relative"
          style={glassPill}
        >
          <GlassShine />

          <button
            onClick={toggleCart}
            aria-label="Open cart"
            className="h-full px-4 flex items-center justify-center font-mono text-xl font-bold text-white hover:bg-white/10 active:scale-95 transition-all outline-none shrink-0 relative z-10"
          >
            <span>{cartCount}</span>
          </button>

          <div className="flex items-center relative z-10">
            <AnimatePresence initial={false}>
              {menuOpen && (
                <motion.nav
                  key="desktop-nav"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="flex items-center overflow-hidden"
                >
                  {navItems.map((item, i) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.15 }}
                      onClick={() => handleNavClick(item.id)}
                      className={`h-14 px-4 flex items-center font-mono text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all outline-none shrink-0 ${
                        currentTab === item.id
                          ? "text-white bg-white/15"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => {
              setMenuOpen(!menuOpen);
              setShowCurrencyDrop(false);
            }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="w-12 h-full flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all outline-none shrink-0 relative z-10"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex"
            >
              <MenuToggleSVG />
            </motion.span>
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MOBILE HEADER
      ═══════════════════════════════════════════ */}
      <div className="md:hidden pointer-events-auto flex flex-col items-start w-full">
        <div
          className="flex items-center h-12 rounded-full text-white overflow-hidden relative w-full"
          // style={glassPill}
        >
          {/* <GlassShine /> */}

          {/* Logo */}
          <a
            href="/"
            className="h-full flex items-center justify-center shrink-0 hover:bg-white/10 transition-all outline-none px-4 relative z-10"
            aria-label="Communities"
            onClick={(e) => {
              e.preventDefault();
              onLogoClick?.();
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="translate-y-2">
              <CommunitiesLogo />
            </div>
          </a>

          <div className="flex-1" />

          <button
            onClick={() => {
              toggleCart();
              setMenuOpen(false);
            }}
            className="w-11 h-full flex items-center justify-center font-mono text-xl font-bold text-white hover:bg-white/10 active:scale-95 transition-all outline-none shrink-0 relative z-10"
            title="Open Bag"
          >
            {cartCount}
          </button>

          <div className="w-px h-4 bg-white/20 shrink-0 relative z-10" />

          <button
            onClick={() => {
              setMenuOpen(!menuOpen);
              setShowCurrencyDrop(false);
            }}
            className="w-12 h-full flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all outline-none shrink-0 relative z-10"
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

        {/* Mobile dropdown */}
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
                background: "rgba(255, 255, 255, 0.18)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.35)",
                boxShadow:
                  "0 12px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 0 20px rgba(255,255,255,0.08)",
              }}
            >
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
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 5H9M9 5L5.5 1.5M9 5L5.5 8.5"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                ))}
              </nav>

              <div className="h-px bg-white/30 mx-4" />

              <div className="px-5 py-3 flex items-center justify-between">
                <span className="text-[10px] tracking-widest uppercase text-slate-700/60">
                  Currency
                </span>
                <button
                  onClick={() => setShowCurrencyDrop(!showCurrencyDrop)}
                  className="font-mono text-[11px] tracking-widest text-slate-900 flex items-center gap-1"
                >
                  [ {currency.symbol}
                  {currency.code} ]
                </button>
              </div>

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
                          className={`w-full text-left px-3 py-2 text-[10px] tracking-wider rounded-xl transition-all flex justify-between items-center ${
                            currency.code === curr.code
                              ? "bg-slate-900 text-white"
                              : "text-slate-700 hover:bg-white/40"
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════
          DESKTOP: Right side currency pill
      ═══════════════════════════════════════════ */}
      <div className="hidden md:flex relative flex-col items-end">
        <button
          onClick={() => {
            setShowCurrencyDrop(!showCurrencyDrop);
            setMenuOpen(false);
          }}
          className="pointer-events-auto h-14 px-6 rounded-full flex items-center select-none hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 outline-none font-mono text-sm uppercase tracking-widest relative overflow-hidden"
          style={glassPill}
          aria-expanded={showCurrencyDrop}
        >
          <GlassShine />
          <span className="relative z-10 text-slate-900 font-bold">
            [ {currency.symbol}
            {currency.code} ]
          </span>
        </button>

        <AnimatePresence>
          {showCurrencyDrop && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              className="pointer-events-auto absolute top-full right-0 mt-2 w-48 rounded-2xl p-2.5 z-50 flex flex-col gap-1.5"
              style={{
                background: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.35)",
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 0 20px rgba(255,255,255,0.08)",
              }}
            >
              <span className="text-[8px] font-mono tracking-widest uppercase text-slate-600 block mb-1 pl-1.5 select-none">
                Switch Currency
              </span>
              <div className="flex flex-col gap-0.5">
                {Object.values(currencies).map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      setCurrency(curr);
                      setShowCurrencyDrop(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-[9px] font-mono font-bold tracking-wider rounded-lg transition-all flex justify-between items-center ${
                      currency.code === curr.code
                        ? "bg-white/80 text-slate-900 shadow-sm"
                        : "text-slate-700 hover:bg-white/20"
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
