import React from 'react';

export default function CartSidebar({ cart, onClose, onUpdateQty, onRemove, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)' }} />
      <div style={{
        position: 'relative', width: 400, maxWidth: '90vw',
        background: '#111008', borderLeft: '1px solid rgba(212,175,55,0.2)',
        display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto',
      }}>
        {/* Header */}
        <div style={{
          padding: '28px 24px', borderBottom: '1px solid rgba(212,175,55,0.15)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <h2 style={{
            color: 'var(--gold)', margin: 0, fontSize: 20,
            fontFamily: 'var(--font-display)',
          }}>Your Cart ({cart.reduce((s, i) => s + i.qty, 0)})</h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', color: '#888', fontSize: 24, cursor: 'pointer',
          }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, padding: 24 }}>
          {cart.length === 0 ? (
            <p style={{ color: '#888', textAlign: 'center', marginTop: 60 }}>
              Your cart is empty
            </p>
          ) : cart.map(item => (
            <div key={item.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 0', borderBottom: '1px solid rgba(212,175,55,0.08)',
            }}>
              <div style={{ flex: 1 }}>
                <p style={{
                  color: 'var(--text-primary)', margin: '0 0 4px', fontSize: 14,
                  fontFamily: 'var(--font-display)',
                }}>{item.name}</p>
                <p style={{ color: 'var(--gold)', margin: 0, fontSize: 14 }}>
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => onUpdateQty(item.id, -1)} style={{
                  width: 28, height: 28, background: 'rgba(212,175,55,0.1)',
                  border: '1px solid rgba(212,175,55,0.2)', color: 'var(--gold)',
                  cursor: 'pointer', fontSize: 16, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>−</button>
                <span style={{ color: 'var(--text-primary)', width: 24, textAlign: 'center' }}>
                  {item.qty}
                </span>
                <button onClick={() => onUpdateQty(item.id, 1)} style={{
                  width: 28, height: 28, background: 'rgba(212,175,55,0.1)',
                  border: '1px solid rgba(212,175,55,0.2)', color: 'var(--gold)',
                  cursor: 'pointer', fontSize: 16, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>+</button>
                <button onClick={() => onRemove(item.id)} style={{
                  background: 'none', border: 'none', color: '#666',
                  cursor: 'pointer', fontSize: 14, marginLeft: 8,
                }}>✕</button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: 24, borderTop: '1px solid rgba(212,175,55,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ color: '#ccc', fontSize: 16 }}>Total</span>
              <span style={{ color: 'var(--gold)', fontSize: 24, fontWeight: 700 }}>
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => onCheckout('online')}
              className="btn-gold"
              style={{ width: '100%', marginBottom: 10 }}
            >Pay Online & Pickup</button>
            <button
              onClick={() => onCheckout('store')}
              className="btn-outline"
              style={{ width: '100%' }}
            >Reserve & Pay at Store</button>
          </div>
        )}
      </div>
    </div>
  );
}
