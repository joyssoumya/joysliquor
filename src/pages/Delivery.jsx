import React from 'react';

const DELIVERY_PARTNERS = [
  {
    name: 'DoorDash',
    icon: '🔴',
    desc: 'Fast delivery from DoorDash. Browse our full catalog and get it delivered.',
    color: 'rgba(255,48,48,0.08)',
    borderColor: 'rgba(255,48,48,0.25)',
    url: '#', // Replace with your DoorDash store URL
  },
  {
    name: 'Uber Eats',
    icon: '🟢',
    desc: 'Order via Uber Eats. Quick delivery with real-time tracking.',
    color: 'rgba(6,196,84,0.08)',
    borderColor: 'rgba(6,196,84,0.25)',
    url: '#', // Replace with your Uber Eats store URL
  },
];

export default function Delivery() {
  return (
    <div className="fade-in" style={{
      padding: '60px 24px 80px', maxWidth: 700, margin: '0 auto', textAlign: 'center',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: 36, marginBottom: 16,
      }}>
        Get It <span style={{ color: 'var(--gold)' }}>Delivered</span>
      </h2>
      <p style={{
        color: 'var(--text-muted)', fontSize: 15,
        marginBottom: 48, lineHeight: 1.7,
      }}>
        Order through our delivery partners and get your favorites brought right
        to your door. Valid ID required at delivery.
      </p>

      <div style={{ display: 'grid', gap: 20 }}>
        {DELIVERY_PARTNERS.map((partner, i) => (
          <a
            key={i}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: 32, background: partner.color,
              border: `1px solid ${partner.borderColor}`,
              display: 'flex', alignItems: 'center', gap: 20,
              cursor: 'pointer', transition: 'all 0.3s',
              textDecoration: 'none',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            <span style={{ fontSize: 40 }}>{partner.icon}</span>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <h3 style={{
                color: 'var(--text-primary)', fontSize: 20, marginBottom: 4,
                fontFamily: 'var(--font-display)',
              }}>{partner.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{partner.desc}</p>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 24 }}>→</span>
          </a>
        ))}
      </div>

      {/* Pickup alternative */}
      <div style={{
        marginTop: 48, padding: 32,
        background: 'var(--gold-faint)',
        border: '1px solid var(--gold-border)',
      }}>
        <h3 style={{
          color: 'var(--gold)', fontSize: 18, marginBottom: 8,
          fontFamily: 'var(--font-display)',
        }}>Prefer to Pick Up?</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>
          Order online and pick up at the store. Pay ahead or at the counter — your choice.
        </p>
        <a href="/shop">
          <button className="btn-outline" style={{ padding: '12px 32px' }}>
            Shop for Pickup
          </button>
        </a>
      </div>

      <p style={{ color: 'var(--text-dim)', fontSize: 12, marginTop: 32 }}>
        Must be 21+. Valid government-issued ID required upon delivery.
      </p>
    </div>
  );
}
