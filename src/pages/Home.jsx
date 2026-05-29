import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data';
import ProductCard from '../components/ProductCard';

const FEATURES = [
  { icon: '🛒', title: 'Order Online', desc: 'Browse & order for pickup' },
  { icon: '🚗', title: 'DoorDash & Uber', desc: 'Delivery to your door' },
  { icon: '🏪', title: 'Pay at Store', desc: 'Reserve now, pay later' },
  { icon: '⚡', title: 'Same Day', desc: 'Ready in 30 minutes' },
];

export default function Home({ onAddToCart }) {
  const featured = PRODUCTS.filter(p => p.tag).slice(0, 4);

  return (
    <div className="fade-in">
      {/* Hero */}
      <div style={{
        padding: '100px 24px 80px', textAlign: 'center',
        background: 'radial-gradient(ellipse at center top, rgba(212,175,55,0.08) 0%, transparent 60%)',
      }}>
        <p style={{
          color: 'rgba(212,175,55,0.5)', fontSize: 12,
          letterSpacing: 6, textTransform: 'uppercase', marginBottom: 20,
        }}>Haverstraw's Finest Selection</p>
        <h2 style={{
          fontSize: 'clamp(36px, 6vw, 56px)',
          fontFamily: 'var(--font-display)', fontWeight: 700,
          lineHeight: 1.15, marginBottom: 20,
          maxWidth: 700, margin: '0 auto 20px',
        }}>
          Premium Spirits,<br />
          <span style={{ color: 'var(--gold)' }}>Delivered to You</span>
        </h2>
        <p style={{
          color: 'var(--text-muted)', fontSize: 16,
          maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.7,
        }}>
          Order online for pickup or get it delivered through DoorDash & Uber Eats.
          Your favorite bottles, always ready.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/shop"><button className="btn-gold">Shop Now</button></Link>
          <Link to="/delivery"><button className="btn-outline">Order Delivery</button></Link>
        </div>
      </div>

      {/* Features */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 1, padding: '0 24px 60px', maxWidth: 1000, margin: '0 auto',
      }}>
        {FEATURES.map((f, i) => (
          <div key={i} style={{
            padding: '36px 24px', textAlign: 'center',
            background: 'var(--gold-faint)',
            border: '1px solid rgba(212,175,55,0.08)',
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
            <h4 style={{
              color: 'var(--gold)', fontSize: 14,
              letterSpacing: 1.5, marginBottom: 8, textTransform: 'uppercase',
            }}>{f.title}</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Featured */}
      <div style={{ padding: '40px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <h3 style={{
          textAlign: 'center', color: 'var(--gold)', fontSize: 13,
          letterSpacing: 6, textTransform: 'uppercase', marginBottom: 40,
        }}>Featured Picks</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 20,
        }}>
          {featured.map(p => (
            <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/shop"><button className="btn-outline">View All Products</button></Link>
        </div>
      </div>
    </div>
  );
}
