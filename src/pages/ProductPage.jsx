import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Check, Plus, Minus } from "lucide-react";
import { PRODUCTS } from "../data";

export default function ProductPage({
  product,
  currency,
  onBack,
  onAddToCart,
}) {
  const sizes = product.sizeOptions || ["ONE SIZE"];
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const imageList = product.images?.length ? product.images : [product.image];

  // Find variants — same title, different subtitle/color
  const variants = PRODUCTS.filter(
    (p) => p.title === product.title && p.id !== product.id
  );

  useEffect(() => {
    setActiveIndex(0);
    setSelectedSize((product.sizeOptions || ["ONE SIZE"])[0]);
    setQuantity(1);
    setSuccess(false);
  }, [product]);

  // Arrow key navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown")
        setActiveIndex((i) => (i + 1) % imageList.length);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        setActiveIndex((i) => (i - 1 + imageList.length) % imageList.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [imageList.length]);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1800);
  };

  const convertedPrice = Math.round(product.price * currency.rate);

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        overflow: "hidden",
        // Solid background — no bleed-through from shop page
        background: `radial-gradient(ellipse at 100% 100%, ${product.hex}ff 100%, ${product.hex}cc 100%, ${product.hex}88 100%, #0a0a0b 100%)`,
      }}
    >
      {/* Noise texture overlay */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          opacity: 0.18, mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── LEFT HALF: Image area ── */}
      <div style={{
        position: "absolute",
        left: 0, top: 0,
        width: "58%", height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={imageList[activeIndex]}
            alt={product.title}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.04, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              maxHeight: "75vh",
              maxWidth: "85%",
              objectFit: "contain",
              filter: "drop-shadow(0 50px 100px rgba(0,0,0,0.35))",
            }}
            draggable={false}
          />
        </AnimatePresence>

        {/* Thumbnail strip — only when multiple images */}
        {imageList.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              position: "absolute",
              bottom: 36,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 10,
            }}
          >
            {imageList.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                style={{
                  width: 60, height: 60,
                  borderRadius: 12,
                  border: activeIndex === i
                    ? "2px solid rgba(0,0,0,0.7)"
                    : "2px solid rgba(255,255,255,0.35)",
                  background: "rgba(255,255,255,0.3)",
                  backdropFilter: "blur(10px)",
                  padding: 4,
                  cursor: "pointer",
                  overflow: "hidden",
                  opacity: activeIndex === i ? 1 : 0.55,
                  transition: "all 0.15s ease",
                  flexShrink: 0,
                }}
              >
                <img
                  src={src} alt={`view ${i + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* ── RIGHT HALF: Details panel ── */}
      <div style={{
        position: "absolute",
        right: 0, top: 0,
        width: "42%", height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 40px 40px 20px",
        boxSizing: "border-box",
      }}>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 28 }}
          style={{
            width: "100%",
            maxWidth: 380,
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          }}
        >
          {/* Panel content (scrollable if needed) */}
          <div style={{ padding: "28px 28px 0 28px", maxHeight: "70vh", overflowY: "auto" }}>

            {/* Category tag */}
            <span style={{
              fontFamily: "monospace", fontSize: 9, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              background: "rgba(0,0,0,0.1)",
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 999, padding: "3px 10px",
              color: "rgba(0,0,0,0.55)",
              display: "inline-block", marginBottom: 12,
            }}>
              {product.category}
            </span>

            {/* Title */}
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 30, fontWeight: 900,
              letterSpacing: "-0.02em",
              color: "rgba(0,0,0,0.88)",
              margin: "0 0 6px 0", lineHeight: 1.05,
              textTransform: "uppercase",
            }}>
              {product.title}
            </h1>

            {/* Subtitle */}
            <p style={{
              fontFamily: "monospace", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "rgba(0,0,0,0.45)", marginBottom: 14,
            }}>
              {product.subtitle}
            </p>

            {/* Price */}
            <p style={{
              fontFamily: "monospace", fontSize: 22, fontWeight: 800,
              color: "rgba(0,0,0,0.82)", marginBottom: 14,
              letterSpacing: "-0.01em",
            }}>
              {currency.symbol}{convertedPrice.toLocaleString()}
            </p>

            {/* Description */}
            <p style={{
              fontSize: 12, color: "rgba(0,0,0,0.55)",
              lineHeight: 1.65, marginBottom: 20,
              fontFamily: "sans-serif",
              borderTop: "1px solid rgba(0,0,0,0.08)",
              paddingTop: 14,
            }}>
              {product.description}
            </p>

            {/* Color variants */}
            {variants.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <p style={{
                  fontFamily: "monospace", fontSize: 9, fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "rgba(0,0,0,0.45)", marginBottom: 8,
                }}>
                  COLOR &nbsp;[ {product.subtitle} ]
                </p>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: product.hex,
                    border: "2.5px solid rgba(0,0,0,0.55)",
                  }} />
                  {variants.map((v) => (
                    <button
                      key={v.id}
                      title={v.subtitle}
                      style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: v.hex,
                        border: "2px solid rgba(255,255,255,0.5)",
                        cursor: "pointer",
                        transition: "transform 0.15s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.18)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {sizes.length > 0 && sizes[0] !== "ONE SIZE" && (
              <div style={{ marginBottom: 20 }}>
                <p style={{
                  fontFamily: "monospace", fontSize: 9, fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "rgba(0,0,0,0.45)", marginBottom: 8,
                }}>
                  SIZE
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: "6px 14px", borderRadius: 999,
                        fontFamily: "monospace", fontSize: 10, fontWeight: 700,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        cursor: "pointer", transition: "all 0.15s ease",
                        border: selectedSize === s
                          ? "2px solid rgba(0,0,0,0.75)"
                          : "2px solid rgba(0,0,0,0.15)",
                        background: selectedSize === s
                          ? "rgba(0,0,0,0.8)"
                          : "rgba(255,255,255,0.4)",
                        color: selectedSize === s ? "white" : "rgba(0,0,0,0.6)",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            {!product.soldOut && (
              <div style={{ marginBottom: 20 }}>
                <p style={{
                  fontFamily: "monospace", fontSize: 9, fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "rgba(0,0,0,0.45)", marginBottom: 8,
                }}>
                  QUANTITY
                </p>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 0,
                  border: "1.5px solid rgba(0,0,0,0.15)", borderRadius: 999,
                  background: "rgba(255,255,255,0.4)", overflow: "hidden",
                }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      width: 36, height: 36, display: "flex",
                      alignItems: "center", justifyContent: "center",
                      background: "transparent", border: "none",
                      cursor: "pointer", color: "rgba(0,0,0,0.6)",
                    }}
                  >
                    <Minus size={12} />
                  </button>
                  <span style={{
                    fontFamily: "monospace", fontSize: 13, fontWeight: 800,
                    color: "rgba(0,0,0,0.8)", minWidth: 28, textAlign: "center",
                  }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      width: 36, height: 36, display: "flex",
                      alignItems: "center", justifyContent: "center",
                      background: "transparent", border: "none",
                      cursor: "pointer", color: "rgba(0,0,0,0.6)",
                    }}
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            )}

            {/* Ships in tag */}
            <div style={{ marginBottom: 4 }}>
              <span style={{
                fontFamily: "monospace", fontSize: 9, fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                background: "rgba(0,0,0,0.07)",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: 999, padding: "4px 12px",
                color: "rgba(0,0,0,0.45)",
              }}>
                SHIPS IN 2–3 WEEKS
              </span>
            </div>
          </div>

          {/* ADD TO CART — sticky bottom of panel */}
          <motion.button
            whileHover={{ opacity: 0.92 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAdd}
            disabled={product.soldOut}
            style={{
              width: "100%",
              height: 62,
              marginTop: 20,
              background: success ? "#22c55e" : "rgba(255,255,255,0.88)",
              color: success ? "white" : "rgba(0,0,0,0.85)",
              border: "none",
              borderTop: "1px solid rgba(255,255,255,0.5)",
              cursor: product.soldOut ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              padding: "0 28px",
              transition: "background 0.3s",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              {success ? <Check size={15} /> : <ShoppingBag size={15} />}
              <span style={{
                fontFamily: "monospace", fontSize: 11,
                fontWeight: 800, letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}>
                {product.soldOut ? "SOLD OUT" : success ? "ADDED!" : "ADD TO CART"}
              </span>
            </div>
            <span style={{
              fontFamily: "monospace", fontSize: 14,
              fontWeight: 800, letterSpacing: "-0.01em",
            }}>
              {currency.symbol}{convertedPrice.toLocaleString()}
            </span>
          </motion.button>
        </motion.div>
      </div>


    </motion.div>
  );
}