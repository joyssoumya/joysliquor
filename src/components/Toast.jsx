import React from 'react';

export default function Toast({ message }) {
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 2000,
      background: 'rgba(212,175,55,0.95)', color: 'var(--bg-primary)',
      padding: '12px 24px', fontSize: 13, fontWeight: 600,
      animation: 'slideIn 0.3s ease', letterSpacing: 0.5,
    }}>
      {message}
    </div>
  );
}
