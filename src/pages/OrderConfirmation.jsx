import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { STORE_INFO } from '../data';

export default function OrderConfirmation() {
  const location = useLocation();
  const order = location.state || {};

  return (
    <div className="fade-in" style={{
      padding: '60px 24px 80px', maxWidth: 600, margin: '0 auto', textAlign: 'center',
    }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: 32, marginBottom: 8,
      }}>Order Confirmed!</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 32 }}>
        Thank you for your order. We're getting it ready for you.
      </p>

      <div style={{
        background: 'var(--gold-faint)',
        border: '1px solid var(--gold-border)',
        padding: 32, marginBottom: 32, textAlign: 'left',
      }}>
        {order.orderNumber && (
          <div style={{ marginBottom: 20 }}>
            <p style={{
              color: 'var(--gold)', fontSize: 11, letterSpacing: 2,
              textTransform: 'uppercase', marginBottom: 4,
            }}>Order Number</p>
            <p style={{
              color: 'var(--text-primary)', fontSize: 24,
              fontFamily: 'var(--font-display)', fontWeight: 700,
            }}>{order.orderNumber}</p>
          </div>
        )}

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }}>
          {order.name && (
            <div>
              <p style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Name</p>
              <p style={{ color: 'var(--text-primary)', fontSize: 14 }}>{order.name}</p>
            </div>
          )}
          {order.method && (
            <div>
              <p style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Payment</p>
              <p style={{ color: 'var(--text-primary)', fontSize: 14 }}>
                {order.method === 'online' ? 'Paid Online' : 'Pay at Store'}
              </p>
            </div>
          )}
          {order.itemCount && (
            <div>
              <p style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Items</p>
              <p style={{ color: 'var(--text-primary)', fontSize: 14 }}>{order.itemCount} item(s)</p>
            </div>
          )}
          {order.total && (
            <div>
              <p style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Total</p>
              <p style={{ color: 'var(--gold)', fontSize: 20, fontWeight: 700 }}>${order.total.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Pickup Info */}
      <div style={{
        background: 'var(--gold-faint)',
        border: '1px solid var(--gold-border)',
        padding: 24, marginBottom: 32,
      }}>
        <h3 style={{
          color: 'var(--gold)', fontSize: 12, letterSpacing: 3,
          textTransform: 'uppercase', marginBottom: 12,
        }}>Pickup Location</h3>
        <p style={{ color: 'var(--text-primary)', fontSize: 15, marginBottom: 4 }}>
          {STORE_INFO.name}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 12 }}>
          {STORE_INFO.fullAddress}
        </p>
        <p style={{ color: 'var(--text-dim)', fontSize: 12 }}>
          Please bring a valid government-issued ID (21+)
        </p>
      </div>

      <Link to="/shop">
        <button className="btn-outline" style={{ padding: '14px 32px' }}>
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}
