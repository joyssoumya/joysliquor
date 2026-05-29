import React, { useState } from 'react';

export default function AgeGate({ onVerify }) {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');

  const verify = () => {
    const dob = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;

    if (isNaN(age) || year.length !== 4) {
      setError('Please enter a valid date of birth.');
    } else if (age < 21) {
      setError('You must be 21 or older to enter this site.');
    } else {
      onVerify();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') verify();
  };

  const inputStyle = (maxLen) => ({
    width: maxLen === 4 ? 80 : 56,
    padding: '12px 0',
    textAlign: 'center',
    background: 'rgba(212,175,55,0.08)',
    border: '1px solid rgba(212,175,55,0.25)',
    color: 'var(--gold)',
    fontSize: 18,
    fontFamily: 'var(--font-body)',
    outline: 'none',
  });

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1008 50%, #0a0a0a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        textAlign: 'center', padding: '60px 48px',
        border: '1px solid rgba(212,175,55,0.3)',
        background: 'rgba(20,15,8,0.9)',
        maxWidth: 440, width: '90%',
      }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🥃</div>
        <h1 style={{
          color: 'var(--gold)', fontSize: 32, fontWeight: 700,
          letterSpacing: 2, margin: '0 0 4px',
          fontFamily: 'var(--font-display)',
        }}>JOY'S LIQUOR</h1>
        <p style={{
          color: 'rgba(212,175,55,0.5)', fontSize: 11,
          letterSpacing: 6, margin: '0 0 32px', textTransform: 'uppercase',
        }}>Haverstraw, New York</p>
        <p style={{ color: '#ccc', fontSize: 14, marginBottom: 24 }}>
          You must be 21 years or older to enter this site.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 20 }}>
          <input type="text" placeholder="MM" value={month}
            onChange={e => { if (/^\d*$/.test(e.target.value) && e.target.value.length <= 2) setMonth(e.target.value); }}
            onKeyDown={handleKeyDown}
            style={inputStyle(2)} />
          <input type="text" placeholder="DD" value={day}
            onChange={e => { if (/^\d*$/.test(e.target.value) && e.target.value.length <= 2) setDay(e.target.value); }}
            onKeyDown={handleKeyDown}
            style={inputStyle(2)} />
          <input type="text" placeholder="YYYY" value={year}
            onChange={e => { if (/^\d*$/.test(e.target.value) && e.target.value.length <= 4) setYear(e.target.value); }}
            onKeyDown={handleKeyDown}
            style={inputStyle(4)} />
        </div>

        {error && <p style={{ color: '#e74c3c', fontSize: 13, marginBottom: 16 }}>{error}</p>}

        <button onClick={verify} className="btn-gold" style={{ padding: '14px 48px' }}>
          Enter
        </button>

        <p style={{ color: 'var(--text-dim)', fontSize: 11, marginTop: 24 }}>
          By entering, you agree you are of legal drinking age.
        </p>
      </div>
    </div>
  );
}
