# Joy's Liquor — joysliquor.com

Premium liquor store website with online ordering for pickup & delivery.

## Tech Stack
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** PostgreSQL (Neon free tier)
- **Payments:** Stripe Checkout
- **Hosting:** Cloudflare Pages

## Quick Start (Local Dev)

```bash
# 1. Install frontend deps
npm install

# 2. Install API deps
cd api && npm install && cd ..

# 3. Copy env template and fill in your values
cp api/.env.example api/.env

# 4. Set up database tables
cd api && npm run db:setup

# 5. Seed products
npm run db:seed

# 6. Start API server (terminal 1)
npm start

# 7. Start frontend dev server (terminal 2 — from root)
cd .. && npm run dev
```

Site runs at http://localhost:5173, API at http://localhost:3001.

## Deployment to Cloudflare Pages

See DEPLOY.md for step-by-step instructions.

## Project Structure

```
joysliquor/
├── src/                  # React frontend
│   ├── components/       # Navbar, Cart, ProductCard, etc.
│   ├── pages/            # Home, Shop, Delivery, About, Checkout
│   ├── data.js           # Product catalog & store info
│   ├── App.jsx           # Router & state
│   └── styles.css        # Global styles
├── api/                  # Express backend
│   ├── server.js         # API endpoints
│   ├── db/setup.js       # Create tables
│   ├── db/seed.js        # Seed products
│   └── .env.example      # Env template
├── package.json          # Frontend deps
└── vite.config.js        # Vite config
```
