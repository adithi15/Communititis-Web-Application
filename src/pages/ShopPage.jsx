import React, { useState } from "react";
import { PRODUCTS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

// Mimics the video exactly:
// - 4 columns, products staggered vertically so each sits at a different height
// - All products visible within ~900px height (no deep scrolling)
// - Each row of 4 is offset so they feel scattered, not grid-locked
// - Generous horizontal spacing, subtle rotations
//
// Layout pattern (col index 0-3, row index 0-2):
//   col0    col1    col2    col3
//   [p0]           [p2]
//           [p1]           [p3]
//   [p4]           [p6]
//           [p5]           [p7]
//   [p8]           [p10]
//           [p9]           [p11]

const buildOffsets = (count) => {
  // Each "row" of 4 products spans ~320px vertically
  // Within the row, even cols sit high, odd cols sit low — creating the zigzag
  const ROW_HEIGHT = 520;
  const COL_LEFTS = ["2%", "28%", "54%", "80%"];
  const ROW_NUDGE = [0, 220, 80, 300]; // vertical nudge per col within row

  return Array.from({ length: count }, (_, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    return {
      left: COL_LEFTS[col],
      top: row * ROW_HEIGHT + ROW_NUDGE[col],
    };
  });
};

const ROTATIONS = [
  "-2.5deg",
  "1.8deg",
  "-1.5deg",
  "2.8deg",
  "1.5deg",
  "-3deg",
  "2.2deg",
  "-1.6deg",
  "3deg",
  "-2deg",
  "1.4deg",
  "-2.8deg",
];

export default function ShopPage({
  handleAddToCart,
  setCartOpen,
  setSelectedProduct,
  setRestockProduct,
  onTileHover,
  onTileLeave,
}) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredSoldOut, setHoveredSoldOut] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const filteredProducts = PRODUCTS;
  const offsets = buildOffsets(filteredProducts.length);
  const containerH =
    offsets.reduce((max, o) => Math.max(max, o.top + 320), 600) + 80;

  return (
    <motion.section
      key="shop-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* DESKTOP */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: `${containerH}px`,
          paddingTop: "40px",
        }}
        className="hidden md:block"
      >
        {filteredProducts.map((p, idx) => {
          const { left, top } = offsets[idx];
          const rot = ROTATIONS[idx % ROTATIONS.length];

          return (
            <motion.div
              key={p.id}
              style={{
                position: "absolute",
                left,
                top: `${top}px`,
                width: "250px",
                zIndex: hoveredProductId === p.id ? 10 : 1,
              }}
              initial={{ rotate: rot }}
              whileHover={{ scale: 1.08, rotate: "0deg" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              onMouseEnter={() => {
                onTileHover(p.hex);
                setHoveredProductId(p.id);
                if (p.soldOut) setHoveredSoldOut(true);
              }}
              onMouseLeave={() => {
                onTileLeave();
                setHoveredProductId(null);
                setHoveredSoldOut(false);
              }}
              onMouseMove={(e) => {
                if (p.soldOut) setCursorPos({ x: e.clientX, y: e.clientY });
              }}
              onClick={() => {
                if (p.soldOut) setRestockProduct(p);
                else setSelectedProduct(p);
              }}
              className="flex flex-col items-center cursor-pointer select-none"
            >
              <motion.div
                style={{
                  width: "350px",
                  height: "350px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
                animate={{ y: [0, -8, 0, 8, 0] }}
                transition={{
                  duration: 14 + (idx % 4) * 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (idx % 3) * 0.9,
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                  draggable={false}
                />
                {/* {p.soldOut && (
                  <span
                    style={{ position: "absolute", top: 4, right: 4 }}
                    className="font-mono text-[8px] font-bold text-white tracking-widest uppercase bg-slate-900/70 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10"
                  > </span>
                )} */}
              </motion.div>

              <p
                className="mt-0.1 font-mono text-[15px] font-bold uppercase text-center text-slate-400"
                style={{ maxWidth: "180px" }}
              >
                {p.title}
              </p>

              {!p.soldOut && (
                <motion.div
                  animate={{
                    opacity: hoveredProductId === p.id ? 1 : 0,
                    y: hoveredProductId === p.id ? 0 : 8,
                    scale: hoveredProductId === p.id ? 1 : 0.85,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  className="mt-2"
                >
                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(p, p.sizeOptions ? p.sizeOptions[0] : "ONE SIZE", 1);
                      setCartOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-5 h-9 bg-white text-slate-900 font-mono text-[10px] font-bold uppercase tracking-widest rounded-full shadow-md border border-slate-100 focus:outline-none whitespace-nowrap"
                  >
                    <Plus size={13} />
                    Add
                  </button> */}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* MOBILE */}
      <div className="md:hidden grid grid-cols-2 gap-x-4 gap-y-8 py-8 px-4">
        {filteredProducts.map((p, idx) => (
          <motion.div
            key={p.id}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              if (p.soldOut) setRestockProduct(p);
              else setSelectedProduct(p);
            }}
            className="relative flex flex-col items-center cursor-pointer"
          >
            {/* Image area */}
            <div className="relative w-full aspect-square flex items-center justify-center">
              <motion.div
                className="w-full h-full flex items-center justify-center relative select-none"
                animate={{ y: [0, -5, 0, 5, 0] }}
                transition={{
                  duration: 13 + (idx % 4) * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (idx % 3) * 0.6,
                }}
              >
                <img
  src={p.image}
  alt={p.title}
  style={{
    maxHeight: "100%",
    maxWidth: "100%",
    objectFit: "contain",
    filter: `
      drop-shadow(0 0 20px rgba(255,255,255,.12))
      drop-shadow(0 0 40px rgba(255,255,255,.08))
      drop-shadow(0 10px 30px rgba(0,0,0,.12))
    `,
  }}
/>
              </motion.div>
              {/* Subtle sold-out badge with actual text */}
              {p.soldOut && (
                <div className="absolute top-1 right-1">
                  <span className="font-mono text-[7px] font-bold text-white tracking-widest uppercase bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
                    SOLD OUT
                  </span>
                </div>
              )}
            </div>
            {/* Product name */}
            <p className="mt-2 font-mono text-[10px] font-bold uppercase text-center text-slate-500 leading-tight px-1 line-clamp-2">
              {p.title}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Sold-out cursor */}
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
            className="bg-white border border-slate-200 text-slate-800 font-mono text-[9.5px] font-bold tracking-widest px-3 py-1 shadow-md select-none pointer-events-none rounded-none whitespace-nowrap uppercase"
          >
            SOLD OUT
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}