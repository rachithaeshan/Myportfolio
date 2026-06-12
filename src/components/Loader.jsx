import { useEffect, useState } from 'react';

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState(0);
  // phase 0: counting + bar, phase 1: name reveal, phase 2: exit

  useEffect(() => {
    // After 1.8s show name
    const t1 = setTimeout(() => setPhase(1), 1800);
    // After 3.2s start exit
    const t2 = setTimeout(() => setPhase(2), 3200);
    // After 3.9s unmount
    const t3 = setTimeout(() => onComplete(), 3900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#0B0B0B',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: phase === 2 ? 0 : 1,
      transform: phase === 2 ? 'scale(1.04)' : 'scale(1)',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
      pointerEvents: phase === 2 ? 'none' : 'all',
      overflow: 'hidden',
    }}>
      {/* Background grid lines */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.04 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${(i / 11) * 100}%`, top: 0, bottom: 0,
            width: 1, background: 'var(--gold)',
          }} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute', top: `${(i / 7) * 100}%`, left: 0, right: 0,
            height: 1, background: 'var(--gold)',
          }} />
        ))}
      </div>

      {/* Animated corner brackets */}
      {[
        { top: 40, left: 60, rotate: 0 },
        { top: 40, right: 60, rotate: 90 },
        { bottom: 40, right: 60, rotate: 180 },
        { bottom: 40, left: 60, rotate: 270 },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', ...pos,
          width: 40, height: 40,
          borderTop: i === 0 || i === 1 ? '1px solid rgba(198,169,105,0.4)' : 'none',
          borderBottom: i === 2 || i === 3 ? '1px solid rgba(198,169,105,0.4)' : 'none',
          borderLeft: i === 0 || i === 3 ? '1px solid rgba(198,169,105,0.4)' : 'none',
          borderRight: i === 1 || i === 2 ? '1px solid rgba(198,169,105,0.4)' : 'none',
          opacity: phase >= 0 ? 1 : 0,
          transform: phase === 2 ? `translate(${i === 1 || i === 2 ? '10px' : '-10px'}, ${i >= 2 ? '10px' : '-10px'})` : 'translate(0,0)',
          transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.7s ease`,
        }} />
      ))}

      {/* Center content */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>

        {/* Logo image */}
        <div style={{
          width: 140, height: 140,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: phase >= 0 ? 1 : 0,
          transition: 'opacity 0.6s ease',
          animation: 'logoPulse 3s ease-in-out infinite',
          flexShrink: 0,
          filter: 'drop-shadow(0 0 24px rgba(198,169,105,0.5))',
        }}>
          <img src="/logo.png" alt="RE Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>

        {/* Name reveal */}
        <div style={{
          textAlign: 'center',
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{
            fontFamily: 'Playfair Display', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900, letterSpacing: '-0.01em', lineHeight: 1,
            color: 'var(--ivory)',
          }}>
            Rachitha <span style={{
              background: 'linear-gradient(120deg, #C6A969, #E8D5A3, #C6A969)',
              backgroundSize: '200%',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 2s linear infinite',
            }}>Eshan</span>
          </div>
          <div style={{
            fontFamily: 'Space Mono', fontSize: '0.6rem', letterSpacing: '0.35em',
            color: 'rgba(198,169,105,0.5)', textTransform: 'uppercase', marginTop: '0.5rem',
          }}>
            Software Engineer
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ width: 220, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{
            height: 1, background: 'rgba(198,169,105,0.12)', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, height: '100%',
              background: 'linear-gradient(90deg, var(--emerald), var(--gold))',
              animation: 'loadBar 1.6s cubic-bezier(0.16,1,0.3,1) forwards',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'Space Mono', fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(198,169,105,0.3)' }}>
              LOADING
            </span>
            <LoadingCounter />
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div style={{
        position: 'absolute', bottom: 40,
        fontFamily: 'Space Mono', fontSize: '0.5rem', letterSpacing: '0.3em',
        color: 'rgba(248,246,240,0.15)', textTransform: 'uppercase',
      }}>
        Portfolio — 2025
      </div>

      <style>{`
        @keyframes logoPulse {
          0%, 100% { filter: drop-shadow(0 0 16px rgba(198,169,105,0.35)); transform: scale(1); }
          50% { filter: drop-shadow(0 0 32px rgba(198,169,105,0.65)); transform: scale(1.04); }
        }
        @keyframes loadBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}

function LoadingCounter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const duration = 1600;
    const frame = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, []);
  return (
    <span style={{ fontFamily: 'Space Mono', fontSize: '0.5rem', letterSpacing: '0.1em', color: 'var(--gold)' }}>
      {count}%
    </span>
  );
}