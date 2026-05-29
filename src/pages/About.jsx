import React from 'react';
import { STORE_HOURS, STORE_INFO } from '../data';

export default function About() {
  return (
    <div className="fade-in" style={{
      padding: '60px 24px 80px', maxWidth: 700, margin: '0 auto',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: 36,
        marginBottom: 8, textAlign: 'center',
      }}>
        About <span style={{ color: 'var(--gold)' }}>{STORE_INFO.name}</span>
      </h2>
      <p style={{
        color: 'rgba(212,175,55,0.4)', fontSize: 11,
        letterSpacing: 6, textAlign: 'center',
        textTransform: 'uppercase', marginBottom: 40,
      }}>{STORE_INFO.fullAddress}</p>
      <p style={{
        color: 'rgba(255,255,255,0.6)', fontSize: 15,
        lineHeight: 1.8, marginBottom: 40, textAlign: 'center',
      }}>
        Joy's Liquor is your neighborhood liquor store in Haverstraw, offering a
        curated selection of premium spirits, wines, beers, and more. Whether you're
        celebrating a special occasion or stocking up for the weekend, we've got
        you covered with competitive prices and friendly service.
      </p>

      {/* Store Hours */}
      <div style={{
        background: 'var(--gold-faint)',
        border: '1px solid var(--gold-border)',
        padding: 32, marginBottom: 24,
      }}>
        <h3 style={{
          color: 'var(--gold)', fontSize: 13,
          letterSpacing: 4, textTransform: 'uppercase',
          marginBottom: 20, textAlign: 'center',
        }}>Store Hours</h3>
        {STORE_HOURS.map((h, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '12px 0',
            borderBottom: i < STORE_HOURS.length - 1
              ? '1px solid rgba(212,175,55,0.06)' : 'none',
          }}>
            <span style={{ color: 'var(--text-primary)', fontSize: 14 }}>{h.day}</span>
            <span style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 600 }}>{h.hours}</span>
          </div>
        ))}
      </div>

      {/* Contact & Map */}
      <div style={{
        background: 'var(--gold-faint)',
        border: '1px solid var(--gold-border)',
        padding: 32, textAlign: 'center',
      }}>
        <h3 style={{
          color: 'var(--gold)', fontSize: 13,
          letterSpacing: 4, textTransform: 'uppercase',
          marginBottom: 20,
        }}>Visit Us</h3>
        <p style={{ color: 'var(--text-primary)', fontSize: 15, marginBottom: 4 }}>
          {STORE_INFO.address}
        </p>
        <p style={{ color: 'var(--text-primary)', fontSize: 15, marginBottom: 20 }}>
          {STORE_INFO.city}, {STORE_INFO.state} {STORE_INFO.zip}
        </p>

        {/* Google Maps embed */}
        <div style={{
          width: '100%', height: 250,
          border: '1px solid var(--gold-border)',
          marginBottom: 16, overflow: 'hidden',
        }}>
          <iframe
            title="Joy's Liquor Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-73.9684!3d41.2097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s65+Broadway+Haverstraw+NY+10927!5e0!3m2!1sen!2sus!4v1"
            width="100%" height="250"
            style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) saturate(0.3)' }}
            allowFullScreen="" loading="lazy"
          />
        </div>

        <a
          href="https://www.google.com/maps/dir//65+Broadway+Haverstraw+NY+10927"
          target="_blank" rel="noopener noreferrer"
        >
          <button className="btn-outline" style={{ padding: '12px 32px' }}>
            Get Directions
          </button>
        </a>
      </div>
    </div>
  );
}
