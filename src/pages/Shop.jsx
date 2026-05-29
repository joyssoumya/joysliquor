import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../data';
import ProductCard from '../components/ProductCard';

export default function Shop({ onAddToCart }) {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');

  let filtered = PRODUCTS.filter(p =>
    (category === 'all' || p.category === category) &&
    (search === '' || p.name.toLowerCase().includes(search.toLowerCase()))
  );

  if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
  else filtered.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="fade-in" style={{
      padding: '40px 24px 80px', maxWidth: 1100, margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 32, flexWrap: 'wrap', gap: 16,
      }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28 }}>
          Our Collection
        </h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input
            type="text" placeholder="Search products..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{
              background: 'rgba(212,175,55,0.06)',
              border: '1px solid rgba(212,175,55,0.15)',
              color: 'var(--text-primary)', padding: '10px 20px',
              fontSize: 14, width: 220, outline: 'none',
              fontFamily: 'var(--font-body)',
            }}
          />
          <select
            value={sortBy} onChange={e => setSortBy(e.target.value)}
            style={{
              background: 'rgba(212,175,55,0.06)',
              border: '1px solid rgba(212,175,55,0.15)',
              color: 'var(--text-primary)', padding: '10px 16px',
              fontSize: 13, outline: 'none',
              fontFamily: 'var(--font-body)',
            }}
          >
            <option value="name">Name A-Z</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setCategory(c.id)} style={{
            background: category === c.id ? 'var(--gold-light)' : 'var(--gold-faint)',
            border: `1px solid ${category === c.id ? 'rgba(212,175,55,0.4)' : 'rgba(212,175,55,0.1)'}`,
            color: category === c.id ? 'var(--gold)' : 'var(--text-muted)',
            padding: '8px 18px', fontSize: 12, cursor: 'pointer',
            letterSpacing: 1.5, textTransform: 'uppercase',
            fontFamily: 'var(--font-body)', transition: 'all 0.3s',
          }}>{c.icon} {c.name}</button>
        ))}
      </div>

      {/* Results count */}
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>
        {filtered.length} product{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Product Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
        gap: 20,
      }}>
        {filtered.map((p, i) => (
          <div key={p.id} style={{ animation: `fadeInUp 0.4s ease ${i * 0.03}s both` }}>
            <ProductCard product={p} onAdd={onAddToCart} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: '#888', marginTop: 60, fontSize: 16 }}>
          No products found. Try a different search or category.
        </p>
      )}
    </div>
  );
}
