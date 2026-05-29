const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const PRODUCTS = [
  { name: 'Hennessy VS', category: 'spirits', price: 39.99, size: '750ml', tag: 'Popular' },
  { name: 'Casamigos Blanco', category: 'spirits', price: 49.99, size: '750ml', tag: 'Trending' },
  { name: 'Grey Goose Vodka', category: 'spirits', price: 34.99, size: '750ml', tag: null },
  { name: "Jack Daniel's Old No.7", category: 'spirits', price: 27.99, size: '750ml', tag: null },
  { name: 'Don Julio 1942', category: 'spirits', price: 159.99, size: '750ml', tag: 'Premium' },
  { name: 'Patron Silver', category: 'spirits', price: 44.99, size: '750ml', tag: null },
  { name: 'Ciroc Vodka', category: 'spirits', price: 32.99, size: '750ml', tag: null },
  { name: 'Bacardi Superior', category: 'spirits', price: 14.99, size: '750ml', tag: 'Value' },
  { name: 'Moët & Chandon Imperial', category: 'champagne', price: 54.99, size: '750ml', tag: 'Celebration' },
  { name: 'Veuve Clicquot Yellow', category: 'champagne', price: 59.99, size: '750ml', tag: null },
  { name: 'La Marca Prosecco', category: 'champagne', price: 15.99, size: '750ml', tag: 'Best Value' },
  { name: 'Dom Pérignon', category: 'champagne', price: 249.99, size: '750ml', tag: 'Luxury' },
  { name: 'Josh Cellars Cabernet', category: 'wine', price: 14.99, size: '750ml', tag: 'Staff Pick' },
  { name: 'Kendall-Jackson Chardonnay', category: 'wine', price: 13.99, size: '750ml', tag: null },
  { name: '19 Crimes Red Blend', category: 'wine', price: 11.99, size: '750ml', tag: null },
  { name: 'Stella Rosa Black', category: 'wine', price: 12.99, size: '750ml', tag: 'Sweet' },
  { name: 'Apothic Red', category: 'wine', price: 10.99, size: '750ml', tag: null },
  { name: 'Barefoot Moscato', category: 'wine', price: 7.99, size: '750ml', tag: 'Budget' },
  { name: 'Corona Extra 12-Pack', category: 'beer', price: 17.99, size: '12pk', tag: null },
  { name: 'Modelo Especial 12-Pack', category: 'beer', price: 17.99, size: '12pk', tag: 'Popular' },
  { name: 'Blue Moon Belgian White', category: 'beer', price: 10.99, size: '6pk', tag: null },
  { name: 'Heineken 12-Pack', category: 'beer', price: 16.99, size: '12pk', tag: null },
  { name: 'Guinness Draught', category: 'beer', price: 11.99, size: '6pk', tag: null },
  { name: 'White Claw Variety 12-Pack', category: 'beer', price: 18.99, size: '12pk', tag: 'Seltzer' },
  { name: 'Coca-Cola 2L', category: 'mixers', price: 2.49, size: '2L', tag: null },
  { name: 'Fever-Tree Tonic Water', category: 'mixers', price: 6.99, size: '4pk', tag: 'Premium' },
  { name: 'Lime Juice', category: 'mixers', price: 3.99, size: '12oz', tag: null },
  { name: 'Ginger Beer', category: 'mixers', price: 5.99, size: '4pk', tag: null },
  { name: 'Club Soda 1L', category: 'mixers', price: 1.99, size: '1L', tag: null },
  { name: 'Cranberry Juice', category: 'mixers', price: 4.49, size: '32oz', tag: null },
];

async function seed() {
  const client = await pool.connect();

  try {
    // Clear existing products
    await client.query('DELETE FROM order_items');
    await client.query('DELETE FROM orders');
    await client.query('DELETE FROM products');

    // Insert products
    for (const p of PRODUCTS) {
      await client.query(
        `INSERT INTO products (name, category, price, size, tag)
         VALUES ($1, $2, $3, $4, $5)`,
        [p.name, p.category, p.price, p.size, p.tag]
      );
    }

    console.log(`✅ Seeded ${PRODUCTS.length} products!`);
  } catch (err) {
    console.error('❌ Error seeding:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
