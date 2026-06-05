import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";

export default function ProductDrawer({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [imgIndex, setImgIndex] = useState(0);

  const images = product
    ? product.images?.length
      ? product.images
      : [product.image]
    : [];

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizeOptions?.[0] ?? "ONE SIZE");
      setQty(1);
      setImgIndex(0);
    }
  }, [product]);

  const prev = useCallback(() => setImgIndex(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setImgIndex(i => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!product) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next();
      if (e.key === "ArrowUp"   || e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [product, onClose, next, prev]);

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 1000,
            }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: "spring", stiffness: 340, damping: 36 }}
            style={{
              position: "fixed",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1001,
              width: "min(760px, 94vw)",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#1a1a1a",
              borderRadius: "20px",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
              color: "white",
              display: "flex",
              flexDirection: "row",
            }}
            className="product-modal"
          >
            {/* ── LEFT: images ── */}
            <div style={{
              width: "340px", flexShrink: 0,
              display: "flex", flexDirection: "row",
              gap: "12px", padding: "24px",
              background: "#111",
              borderRadius: "20px 0 0 20px",
            }}>
              {/* Thumbnails column */}
              {images.length > 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      style={{
                        width: "52px", height: "52px",
                        borderRadius: "10px",
                        border: imgIndex === i ? "2px solid #d1f362" : "2px solid #333",
                        background: "#1a1a1a",
                        padding: "4px",
                        cursor: "pointer",
                        overflow: "hidden",
                        flexShrink: 0,
                        transition: "border-color 0.15s",
                      }}
                    >
                      <img
                        src={src}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{
                  flex: 1, width: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  minHeight: "260px",
                }}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imgIndex}
                      src={images[imgIndex]}
                      alt={product.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      style={{ maxWidth: "100%", maxHeight: "280px", objectFit: "contain" }}
                      draggable={false}
                    />
                  </AnimatePresence>
                </div>

                {/* Dot indicators */}
                {images.length > 1 && (
                  <div style={{ display: "flex", gap: "6px", marginTop: "12px" }}>
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIndex(i)}
                        style={{
                          width: imgIndex === i ? 18 : 6,
                          height: 6,
                          borderRadius: 99,
                          background: imgIndex === i ? "#d1f362" : "#444",
                          border: "none", cursor: "pointer",
                          transition: "all 0.2s ease",
                          padding: 0,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT: details ── */}
            <div style={{
              flex: 1, padding: "28px 28px 28px 24px",
              display: "flex", flexDirection: "column", gap: "16px",
              overflowY: "auto",
            }}>
              {/* Close */}
              <button
                onClick={onClose}
                style={{
                  position: "absolute", top: 16, right: 16,
                  width: 32, height: 32, borderRadius: "50%",
                  background: "#2a2a2a", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#aaa",
                }}
              >
                <X size={15} />
              </button>

              {/* Category pill */}
              {product.category && (
                <span style={{
                  display: "inline-block",
                  background: "#d1f362",
                  color: "#1a1a1a",
                  fontFamily: "monospace",
                  fontSize: "9px",
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  width: "fit-content",
                }}>
                  {product.category}
                </span>
              )}

              {/* Name */}
              <div>
                <h2 style={{
                  fontSize: "28px", fontWeight: 900,
                  letterSpacing: "-0.02em", lineHeight: 1.1,
                  color: "white", margin: 0,
                  textTransform: "uppercase",
                }}>
                  {product.title}
                </h2>
                {product.color && (
                  <p style={{
                    fontFamily: "monospace", fontSize: "10px",
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: "#666", marginTop: "6px",
                  }}>
                    {product.color}
                  </p>
                )}
              </div>

              {/* Price */}
              <p style={{
                fontSize: "24px", fontWeight: 800,
                color: "white", letterSpacing: "-0.01em",
                borderBottom: "1px solid #2a2a2a",
                paddingBottom: "16px",
              }}>
                {product.price ? `₹${Number(product.price).toLocaleString("en-IN")}` : ""}
              </p>

              {/* Description */}
              {product.description && (
                <p style={{
                  fontSize: "13px", color: "#888",
                  lineHeight: 1.65, margin: 0,
                }}>
                  {product.description}
                </p>
              )}

              {/* Size */}
              {product.sizeOptions?.length > 0 && (
                <div>
                  <p style={{
                    fontFamily: "monospace", fontSize: "9px", fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: "#555", marginBottom: "10px",
                  }}>
                    SELECT SIZE
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {product.sizeOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        style={{
                          padding: "7px 16px",
                          borderRadius: "999px",
                          fontFamily: "monospace",
                          fontSize: "10px", fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                          border: "none",
                          background: selectedSize === s ? "#d1f362" : "#2a2a2a",
                          color: selectedSize === s ? "#1a1a1a" : "#888",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <p style={{
                  fontFamily: "monospace", fontSize: "9px", fontWeight: 700,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "#555", marginBottom: "10px",
                }}>
                  QUANTITY
                </p>
                <div style={{
                  display: "inline-flex", alignItems: "center",
                  background: "#2a2a2a", borderRadius: "999px",
                  overflow: "hidden",
                }}>
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    style={{
                      width: 40, height: 40, border: "none",
                      background: "transparent", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#888",
                    }}
                  >
                    <Minus size={13} />
                  </button>
                  <span style={{
                    minWidth: 28, textAlign: "center",
                    fontFamily: "monospace", fontSize: "14px",
                    fontWeight: 700, color: "white",
                  }}>
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    style={{
                      width: 40, height: 40, border: "none",
                      background: "transparent", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#888",
                    }}
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* ADD TO CART */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  onAddToCart(product, selectedSize || "ONE SIZE", qty);
                  onClose();
                }}
                style={{
                  width: "100%", height: "52px",
                  background: "white", color: "#1a1a1a",
                  border: "none", borderRadius: "12px",
                  fontFamily: "monospace", fontSize: "11px",
                  fontWeight: 800, letterSpacing: "0.18em",
                  textTransform: "uppercase", cursor: "pointer",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "8px",
                  marginTop: "4px",
                }}
              >
                <ShoppingCart size={15} />
                ADD TO CART
              </motion.button>

              {/* Continue shopping */}
              <button
                onClick={onClose}
                style={{
                  background: "none", border: "none",
                  fontFamily: "monospace", fontSize: "9px",
                  fontWeight: 700, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "#555",
                  cursor: "pointer", textAlign: "center",
                }}
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </motion.div>

          {/* Mobile styles */}
          <style>{`
            @media (max-width: 640px) {
              .product-modal {
                flex-direction: column !important;
                width: 94vw !important;
                max-height: 92vh !important;
              }
              .product-modal > div:first-child {
                width: 100% !important;
                border-radius: 20px 20px 0 0 !important;
                min-height: 260px;
              }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}