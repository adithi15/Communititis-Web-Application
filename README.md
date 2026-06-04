# Communities — Communititis  Storefront

A React-based fashion e-commerce storefront for the **Communititis** apparel brand. Built with Vite, Tailwind CSS v4, and Framer Motion.

## Stack

- **React 19** + **Vite 6**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion** (`motion/react`) for animations
- **Lucide React** for icons
- **Express** backend (minimal, for local dev)

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Floating pill nav with expandable menu + currency switcher
│   ├── CartDrawer.jsx      # Slide-in cart with quantity controls
│   ├── ProductDetailModal.jsx  # Full product detail overlay with size/qty selection
│   └── CheckoutView.jsx    # Multi-step checkout form with order summary
├── pages/
│   ├── ShopPage.jsx        # Staggered bento product grid with hover effects
│   ├── CheckoutPage.jsx    # Checkout page wrapper
│   ├── ContactPage.jsx     # Support ticket form
│   ├── InstagramPage.jsx   # Editorial lookbook / IG feed mockup
│   ├── PoliciesPage.jsx    # FAQ, returns, privacy, terms tabs
│   └── WallpapersPage.jsx  # Downloadable brand wallpapers
└── data.js                 # PRODUCTS, WALLPAPERS, FAQ_DATA, POLICY_TABS, currencies
```

## Getting Started

```bash
npm install
npm run dev
```

## Features

- Multi-currency support (switcher in header)
- Cart drawer with per-item quantity editing and removal
- Product detail modal with size selection and animated add-to-cart
- Simulated checkout flow with promo code support (`SKYLRK25`, `FREE`)
- Sold-out product handling with restock notification prompts
- Responsive: bento grid on desktop, 2-column grid on mobile
- Dynamic background theming based on hovered product color
- Wallpapers gallery with fullscreen preview

## Notes

This is a **frontend demo** — no payments are processed and no orders are fulfilled. The checkout flow is fully simulated.
