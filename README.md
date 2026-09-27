# 4N DEV — E-commerce client template

Reusable, mobile-first React + TypeScript + Vite storefront for 4N DEV client projects. This repository is a **template**, not a live shop. Demo products and prices must be replaced before delivering to a client.

## Start locally

```bash
cd frontend
npm install
npm run dev
```

Build: `npm run build` (runs TypeScript validation and Vite build).

## Customize for a new client

1. **Copy this repository** to a new private repository for each client; keep this master template unchanged.
2. Edit `frontend/src/storeConfig.ts`: store name, hero text, locale/currency, footer and client WhatsApp number. Leave `whatsappNumber` blank until confirmed; ordering remains disabled while blank.
3. Edit `frontend/src/products.ts`: real products, prices, categories, icons and optional image URLs. Use `featured: true` for the “Voir les nouveautés” section.
4. Edit the color tokens in `frontend/src/App.css` and `frontend/index.html` title/description to match client branding.
5. Test on phone and desktop, verify contact details, product stock and delivery fees before publication.

## Included now

- Responsive storefront, search, category filters and featured products.
- Product favorites (in-memory), cart drawer with quantities, remove and totals.
- Optional WhatsApp order link with product summary.
- Product photos via `image` URL or emoji fallback.
- All catalog and store text isolated for quick customization.

## Before launching a paid shop

This is a frontend demo. It has **no backend, login, inventory database, payment gateway, payment verification, tax/shipping calculations or server-side order storage**. WhatsApp ordering is only a contact handoff, not a confirmed paid order. Add these capabilities and test security before promising production checkout.

Keep client secrets and payment API keys on a backend; never place them in React frontend files.
