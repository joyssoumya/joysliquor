import React from 'react';
import { STORE_INFO } from '../data';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--gold-border)',
      padding: 32, textAlign: 'center',
    }}>
      <p style={{ color: 'var(--text-dim)', fontSize: 12, marginBottom: 8 }}>
        © {new Date().getFullYear()} {STORE_INFO.name} · {STORE_INFO.fullAddress}
      </p>
      <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: 11 }}>
        Must be 21+ to purchase. Please drink responsibly.
      </p>
    </footer>
  );
}
