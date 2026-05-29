import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Checkout({ cart, total, onClearCart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const method = location.state?.method || 'store';
  const [form, setForm] = useState({
    name: '', phone: '', email: '', pickupTime: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    setSubmitting(true);

    // Build order object
    const order = {
      items: cart.map(i => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
      total,
      customer: form,
      paymentMethod: method,
      createdAt: new Date().toISOString(),
    };

    if (method === 'online') {
      // TODO: Integrate Stripe Checkout
      // For now, simulate payment
      await new Promise(r => setTimeout(r, 1500));
      alert('Stripe payment integration coming soon! For now, order placed as pay-at-store.');
    } else {
      // Pay at store — just submit the order
      await new Promise(r => setTimeout(r, 800));
    }

    console.log('Order submitted:', order);
    onClearCart();
    navigate('/order-confirmation', {
      state: {
        orderNumber: `JL-${Date.now().toString(36).toUpperCase()}`,
        ...form,
        method,
        total,
        itemCount: cart.reduce((s, i) => s + i.qty, 0),
      }
    });
  };

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: 'rgba(212,175,55,0.06)',
    border: '1px solid rgba(212,175,55,0.2)',
    color: 'var(--text-primary)', fontSize: 14,
    fontFamily: 'var(--font-body)', outline: 'none',
    marginBottom: 16,
  };

  const labelStyle = {
    display: 'block', color: 'var(--gold)',
    fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
    marginBottom: 6,
  };

  if (cart.length === 0) {
    return (
      <div className="fade-in" style={{
        padding: '80px 24px', textAlign: 'center', maxWidth: 500, margin: '0 auto',
      }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 16 }}>
          Your cart is empty
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>
          Add some items before checking out.
        </p>
        <button onClick={() => navigate('/shop')} className="btn-gold">
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{
      padding: '40px 24px 80px', maxWidth: 600, margin: '0 auto',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: 28,
        marginBottom: 8,
      }}>Checkout</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 32 }}>
        {method === 'online'
          ? 'Pay online now and pick up your order at the store.'
          : 'Reserve your order and pay when you pick it up.'}
      </p>

      {/* Order Summary */}
      <div style={{
        background: 'var(--gold-faint)',
        border: '1px solid var(--gold-border)',
        padding: 24, marginBottom: 32,
      }}>
        <h3 style={{
          color: 'var(--gold)', fontSize: 12, letterSpacing: 3,
          textTransform: 'uppercase', marginBottom: 16,
        }}>Order Summary</h3>
        {cart.map(item => (
          <div key={item.id} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '8px 0', borderBottom: '1px solid rgba(212,175,55,0.06)',
          }}>
            <span style={{ color: 'var(--text-primary)', fontSize: 14 }}>
              {item.name} × {item.qty}
            </span>
            <span style={{ color: 'var(--gold)', fontSize: 14 }}>
              ${(item.price * item.qty).toFixed(2)}
            </span>
          </div>
        ))}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          paddingTop: 16, marginTop: 8,
        }}>
          <span style={{ color: 'var(--text-primary)', fontSize: 16, fontWeight: 700 }}>Total</span>
          <span style={{ color: 'var(--gold)', fontSize: 22, fontWeight: 700 }}>
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Customer Info */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{
          color: 'var(--gold)', fontSize: 12, letterSpacing: 3,
          textTransform: 'uppercase', marginBottom: 20,
        }}>Your Information</h3>

        <label style={labelStyle}>Full Name *</label>
        <input
          type="text" placeholder="John Doe" value={form.name}
          onChange={e => handleChange('name', e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Phone Number *</label>
        <input
          type="tel" placeholder="(845) 555-0123" value={form.phone}
          onChange={e => handleChange('phone', e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Email (for confirmation)</label>
        <input
          type="email" placeholder="john@example.com" value={form.email}
          onChange={e => handleChange('email', e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Preferred Pickup Time</label>
        <select
          value={form.pickupTime}
          onChange={e => handleChange('pickupTime', e.target.value)}
          style={{ ...inputStyle, cursor: 'pointer' }}
        >
          <option value="">Select a time...</option>
          <option value="asap">As soon as possible (~30 min)</option>
          <option value="1hr">In about 1 hour</option>
          <option value="2hr">In about 2 hours</option>
          <option value="today-evening">This evening</option>
          <option value="tomorrow">Tomorrow</option>
        </select>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="btn-gold"
        style={{
          width: '100%',
          opacity: submitting ? 0.6 : 1,
          cursor: submitting ? 'not-allowed' : 'pointer',
        }}
      >
        {submitting
          ? 'Placing Order...'
          : method === 'online'
            ? `Pay $${total.toFixed(2)} & Place Order`
            : 'Place Order (Pay at Store)'}
      </button>

      <p style={{
        color: 'var(--text-dim)', fontSize: 11,
        textAlign: 'center', marginTop: 16,
      }}>
        Must be 21+ with valid ID at pickup.
      </p>
    </div>
  );
}
