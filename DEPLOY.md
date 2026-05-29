# Deploying Joy's Liquor to Cloudflare Pages

## Step 1: Set Up Accounts (Free)

### Cloudflare
1. Go to https://dash.cloudflare.com/sign-up
2. Create a free account
3. Click "Add a site" → enter `joysliquor.com`
4. Select the **Free** plan
5. Cloudflare gives you two nameservers (e.g. `ada.ns.cloudflare.com`)
6. Go to your domain registrar (where you bought the domain)
7. Replace the existing nameservers with the Cloudflare ones
8. Wait 10–30 minutes for activation

### Neon PostgreSQL
1. Go to https://neon.tech → Sign up free
2. Create a project called `joysliquor`
3. Copy the connection string — looks like:
   `postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/joysliquor?sslmode=require`

### Stripe
1. Go to https://dashboard.stripe.com/register
2. Create an account (start in Test mode)
3. Go to Developers → API Keys
4. Copy your `Publishable key` (pk_test_...) and `Secret key` (sk_test_...)

## Step 2: Push Code to GitHub

```bash
# In the joysliquor folder
git init
git add .
git commit -m "Initial commit - Joy's Liquor"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/joysliquor.git
git branch -M main
git push -u origin main
```

## Step 3: Set Up Database

```bash
# From the api/ folder, with your .env filled in:
cd api
cp .env.example .env
# Edit .env with your Neon connection string and Stripe keys

npm install
npm run db:setup    # Creates tables
npm run db:seed     # Adds 30 products
```

## Step 4: Deploy Frontend to Cloudflare Pages

1. In Cloudflare dashboard → Workers & Pages → Create → Pages
2. Connect to Git → select your GitHub repo
3. Configure build:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** (leave blank)
4. Click Deploy

## Step 5: Deploy API as Cloudflare Worker (or use a simple host)

### Option A: Run API on Railway.app (Easiest, free tier)
1. Go to https://railway.app → Sign up
2. New Project → Deploy from GitHub → select `joysliquor`
3. Set Root Directory to `api`
4. Add environment variables (DATABASE_URL, STRIPE keys, FRONTEND_URL)
5. Railway gives you a URL like `https://joysliquor-api.up.railway.app`
6. Update your frontend to use this API URL

### Option B: Run API on Render.com (Free tier)
1. Go to https://render.com → New Web Service
2. Connect GitHub repo, set Root Directory to `api`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add env vars
6. Free tier spins down after inactivity (30s cold start)

## Step 6: Connect Custom Domain

1. In Cloudflare Pages → your project → Custom Domains
2. Add `joysliquor.com` and `www.joysliquor.com`
3. SSL certificate is automatic
4. Done — your site is live!

## Step 7: Go Live with Stripe

1. Complete Stripe account verification (ID, bank account)
2. Switch from Test to Live mode in Stripe dashboard
3. Get your Live API keys (pk_live_... and sk_live_...)
4. Update your environment variables with the live keys
5. Set up a webhook endpoint in Stripe pointing to your API URL

## After Deployment

Every time you push to GitHub, Cloudflare auto-deploys the frontend.
For the API, Railway/Render also auto-deploys on push.

### Updating Products
Edit `api/db/seed.js` with new products and run `npm run db:seed`.
Or build an admin panel later.

### Adding Real Photos
Replace emoji placeholders in `src/data.js` with image URLs.
Store images in Cloudflare R2 (free 10GB) or just use product images.
