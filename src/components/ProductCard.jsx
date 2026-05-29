import React, { useState } from 'react';

export default function ProductCard({ product, onAdd }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--gold-faint)',
        border: '1px solid rgba(212,175,55,0.1)',
        padding: 24, position: 'relative',
        transition: 'all 0.3s ease',
        transform: hover ? 'translateY(-4px)' : 'none',
        boxShadow: hover ? '0 12px 40px rgba(212,175,55,0.1)' : 'none',
        cursor: 'pointer',
      }}
    >
      {product.tag && (
        <span style={{
          position: 'absolute', top: 12, right: 12,
          background: 'var(--gold-light)', color: 'var(--gold)',
          fontSize: 10, padding: '4px 10px', letterSpacing: 1.5,
          textTransform: 'uppercase',
        }}>{product.tag}</span>
      )}
      <div style={{
        fontSize: 56, textAlign: 'center', padding: '20px 0',
        filter: 'drop-shadow(0 4px 12px rgba(212,175,55,0.2))',
      }}>{product.image}</div>
      <p style={{
        color: 'var(--text-dim)', fontSize: 10, letterSpacing: 2,
        textTransform: 'uppercase', margin: '0 0 6px',
      }}>{product.size}</p>
      <h3 style={{
        color: 'var(--text-primary)', fontSize: 16, margin: '0 0 12px',
        fontFamily: 'var(--font-display)', fontWeight: 600, lineHeight: 1.3,
      }}>{product.name}</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          color: 'var(--gold)', fontSize: 22, fontWeight: 700,
        }}>${product.price.toFixed(2)}</span>
        <button
          onClick={(e) => { e.stopPropagation(); onAdd(product); }}
          style={{
            background: hover ? 'linear-gradient(135deg, var(--gold), var(--gold-dark))' : 'transparent',
            color: hover ? 'var(--bg-primary)' : 'var(--gold)',
            border: '1px solid rgba(212,175,55,0.4)',
            padding: '8px 16px', fontSize: 11, fontWeight: 700,
            cursor: 'pointer', letterSpacing: 1.5, textTransform: 'uppercase',
            fontFamily: 'var(--font-body)', transition: 'all 0.3s',
          }}
        >+ Add</button>
      </div>
    </div>
  );
}
