const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Database
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

// ============================================
// PRODUCTS
// ============================================

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = 'SELECT * FROM products WHERE in_stock = true';
    const params = [];

    if (category && category !== 'all') {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }
    if (search) {
      params.push(`%${search}%`);
      query += ` AND name ILIKE $${params.length}`;
    }

    query += ' ORDER BY name ASC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// ============================================
// ORDERS
// ============================================

// Create order
app.post('/api/orders', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { items, customer, paymentMethod, pickupTime } = req.body;

    // Calculate totals
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const taxRate = 0.08; // NY sales tax ~8%
    const tax = Math.round(subtotal * taxRate * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;

    // Generate order number
    const orderNumber = `JL-${Date.now().toString(36).toUpperCase()}`;

    // Insert order
    const orderResult = await client.query(
      `INSERT INTO orders (order_number, customer_name, customer_phone, customer_email,
        payment_method, pickup_time, subtotal, tax, total)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [orderNumber, customer.name, customer.phone, customer.email || null,
       paymentMethod, pickupTime || null, subtotal, tax, total]
    );
    const order = orderResult.rows[0];

    // Insert order items
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
         VALUES ($1, $2, $3, $4, $5)`,
        [order.id, item.id, item.name, item.qty, item.price]
      );
    }

    await client.query('COMMIT');
    res.status(201).json(order);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  } finally {
    client.release();
  }
});

// Get order by order number
app.get('/api/orders/:orderNumber', async (req, res) => {
  try {
    const orderResult = await pool.query(
      'SELECT * FROM orders WHERE order_number = $1',
      [req.params.orderNumber]
    );
    if (orderResult.rows.length === 0) return res.status(404).json({ error: 'Order not found' });

    const order = orderResult.rows[0];
    const itemsResult = await pool.query(
      'SELECT * FROM order_items WHERE order_id = $1',
      [order.id]
    );
    order.items = itemsResult.rows;

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// ============================================
// STRIPE CHECKOUT
// ============================================

app.post('/api/checkout/create-session', async (req, res) => {
  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const { items, customer } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.qty,
      })),
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/shop`,
      customer_email: customer.email || undefined,
      metadata: {
        customer_name: customer.name,
        customer_phone: customer.phone,
      },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Stripe webhook
app.post('/api/webhook/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      // Update order payment status
      await pool.query(
        `UPDATE orders SET payment_status = 'paid', stripe_session_id = $1
         WHERE stripe_session_id = $2`,
        ['paid', session.id]
      );
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

// ============================================
// ADMIN ENDPOINTS (basic — add auth later)
// ============================================

// Get all orders
app.get('/api/admin/orders', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders ORDER BY created_at DESC LIMIT 50'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Update order status
app.patch('/api/admin/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const result = await pool.query(
      `UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [status, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Order not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// ============================================
// START
// ============================================

app.listen(PORT, () => {
  console.log(`🥃 Joy's Liquor API running on port ${PORT}`);
});
