import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/shop', label: 'Shop' },
  { path: '/delivery', label: 'Delivery' },
  { path: '/about', label: 'About' },
];

export default function Navbar({ cartCount, onCartClick }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--gold-border)',
      padding: '0 24px', height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <Link to="/" style={{
          color: 'var(--gold)', fontSize: 20,
          fontFamily: 'var(--font-display)', fontWeight: 700,
          letterSpacing: 1,
        }}>
          JOY'S LIQUOR
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 24 }}
          className="desktop-nav">
          {NAV_LINKS.map(link => (
            <Link key={link.path} to={link.path} style={{
              color: location.pathname === link.path ? 'var(--gold)' : 'var(--text-muted)',
              fontSize: 13, letterSpacing: 1, textTransform: 'uppercase',
              fontWeight: location.pathname === link.path ? 700 : 400,
              borderBottom: location.pathname === link.path
                ? '2px solid var(--gold)' : '2px solid transparent',
              padding: '20px 0', transition: 'all 0.3s',
            }}>{link.label}</Link>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onCartClick} style={{
          background: 'none',
          border: '1px solid rgba(212,175,55,0.3)',
          color: 'var(--gold)', padding: '8px 16px', cursor: 'pointer',
          fontSize: 13, fontFamily: 'var(--font-body)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          🛒 Cart
          {cartCount > 0 && (
            <span style={{
              background: 'var(--gold)', color: 'var(--bg-primary)',
              borderRadius: '50%', width: 20, height: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700,
              animation: 'pulse 0.3s ease',
            }}>{cartCount}</span>
          )}
        </button>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{
          display: 'none', background: 'none', border: 'none',
          color: 'var(--gold)', fontSize: 24, cursor: 'pointer',
        }} className="mobile-menu-btn">
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div style={{
          position: 'absolute', top: 64, left: 0, right: 0,
          background: 'rgba(10,10,10,0.98)',
          borderBottom: '1px solid var(--gold-border)',
          padding: '16px 24px',
        }} className="mobile-nav">
          {NAV_LINKS.map(link => (
            <Link key={link.path} to={link.path}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block', padding: '12px 0',
                color: location.pathname === link.path ? 'var(--gold)' : 'var(--text-muted)',
                fontSize: 14, letterSpacing: 1, textTransform: 'uppercase',
                borderBottom: '1px solid rgba(212,175,55,0.06)',
              }}>{link.label}</Link>
          ))}
        </div>
      )}
    </nav>
  );
}
