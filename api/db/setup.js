const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function setup() {
  const client = await pool.connect();

  try {
    await client.query(`
      -- Products table
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        size VARCHAR(50),
        image_url TEXT,
        tag VARCHAR(50),
        in_stock BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Orders table
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50) NOT NULL,
        customer_email VARCHAR(255),
        payment_method VARCHAR(20) NOT NULL DEFAULT 'store',
        payment_status VARCHAR(20) DEFAULT 'pending',
        stripe_session_id VARCHAR(255),
        pickup_time VARCHAR(50),
        subtotal DECIMAL(10,2) NOT NULL,
        tax DECIMAL(10,2) DEFAULT 0,
        total DECIMAL(10,2) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Order items
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id),
        product_name VARCHAR(255) NOT NULL,
        quantity INTEGER NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Create indexes
      CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
      CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);
      CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
    `);

    console.log('✅ Database tables created successfully!');
  } catch (err) {
    console.error('❌ Error creating tables:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

setup();
