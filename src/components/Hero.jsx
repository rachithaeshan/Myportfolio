import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function BgStars() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 70 }} gl={{ antialias: true, alpha: true }}>
      <Stars radius={80} depth={60} count={2000} factor={2.5} saturation={0} fade speed={0.3} />
    </Canvas>
  );
}

const roles = ['Software Engineer', 'Full-Stack Developer', 'Problem Solver', 'MERN Developer'];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const photoRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Role cycling
  useEffect(() => {
    const iv = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => { setRoleIdx(i => (i + 1) % roles.length); setRoleVisible(true); }, 400);
    }, 2800);
    return () => clearInterval(iv);
  }, []);

  // Subtle parallax on photo (desktop only)
  useEffect(() => {
    const onMove = (e) => {
      if (!photoRef.current || isMobile) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      photoRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  return (
    <section id="about" style={{
      minHeight: '100vh', position: 'relative',
      display: 'flex', alignItems: 'stretch',
      overflow: 'hidden',
      flexDirection: isMobile ? 'column' : 'row',
    }}>
      {/* Stars background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <BgStars />
      </div>

      {/* Left radial glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '-10%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(198,169,105,0.05) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* ─── TEXT PANEL ─── */}
      <div style={{
        position: 'relative', zIndex: 3,
        flex: isMobile ? 'none' : '0 0 52%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: isMobile ? '7rem 1.5rem 2rem' : '7rem 4rem 4rem 6rem',
        order: isMobile ? 2 : 1,
      }}>
        {/* Status */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          border: '1px solid rgba(198,169,105,0.2)',
          padding: '5px 14px', marginBottom: '2rem', alignSelf: 'flex-start',
          background: 'rgba(198,169,105,0.03)',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.8s ease 0.1s',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#335C4A', animation: 'pulse 2s infinite', display: 'block' }} />
          <span style={{ fontFamily: 'Space Mono', fontSize: '0.58rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>
            Available for Internships
          </span>
        </div>

        {/* Hello */}
        <div style={{
          fontFamily: 'Space Mono', fontSize: '0.65rem', letterSpacing: '0.3em',
          color: 'rgba(198,169,105,0.6)', textTransform: 'uppercase', marginBottom: '0.5rem',
          opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 0.25s',
        }}>
          Hello, I'm
        </div>

        {/* Name */}
        <div style={{ marginBottom: '1rem', lineHeight: 0.92 }}>
          <h1 style={{
            fontFamily: 'Playfair Display', margin: 0,
            fontSize: isMobile ? 'clamp(3rem, 14vw, 4.5rem)' : 'clamp(3.8rem, 7vw, 6.5rem)',
            fontWeight: 900, color: 'var(--ivory)',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.35s',
          }}>Rachitha</h1>
          <h1 style={{
            fontFamily: 'Playfair Display', margin: 0,
            fontSize: isMobile ? 'clamp(3rem, 14vw, 4.5rem)' : 'clamp(3.8rem, 7vw, 6.5rem)',
            fontWeight: 900,
            background: 'linear-gradient(120deg, #C6A969 0%, #E8D5A3 40%, #C6A969 100%)',
            backgroundSize: '200%',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            animation: mounted ? 'shimmer 4s linear infinite' : 'none',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.5s',
          }}>Eshan</h1>
        </div>

        {/* Role */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.4rem',
          opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 0.75s',
        }}>
          <div style={{ width: 30, height: 1, background: 'var(--gold)', flexShrink: 0 }} />
          <span style={{
            fontFamily: 'Space Mono', fontSize: '0.65rem', letterSpacing: '0.2em',
            color: 'rgba(248,246,240,0.5)', textTransform: 'uppercase',
            opacity: roleVisible ? 1 : 0,
            transform: roleVisible ? 'translateY(0)' : 'translateY(6px)',
            transition: 'all 0.35s ease', display: 'inline-block',
          }}>{roles[roleIdx]}</span>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '0.9rem', lineHeight: 1.85,
          color: 'rgba(248,246,240,0.45)', maxWidth: 440, marginBottom: '2rem',
          opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 0.9s',
        }}>
          Software Engineering undergraduate at SLIIT, building full-stack systems that solve
          real problems from microservices to mobile apps. Passionate about clean architecture
          and code that lasts.
        </p>

        {/* Buttons */}
        <div style={{
          display: 'flex', gap: '1rem', flexWrap: 'wrap',
          opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 1.05s',
        }}>
          <a href="#projects" style={{
            fontFamily: 'Space Mono', fontSize: '0.62rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--bg)',
            background: 'var(--gold)', padding: '13px 28px',
            textDecoration: 'none', transition: 'all 0.3s ease',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--ivory)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            View My Work →
          </a>
          <a href="#contact" style={{
            fontFamily: 'Space Mono', fontSize: '0.62rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--gold)',
            border: '1px solid rgba(198,169,105,0.3)', padding: '13px 28px',
            textDecoration: 'none', transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(198,169,105,0.06)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(198,169,105,0.3)'; }}>
            Let's Talk
          </a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: isMobile ? '2rem' : '2.5rem', marginTop: '2.5rem',
          paddingTop: '1.5rem', borderTop: '1px solid rgba(198,169,105,0.1)',
          opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 1.3s',
        }}>
          {[{ num: '10+', label: 'Projects' }, { num: '7+', label: 'Certifications' }, { num: 'SLIIT', label: 'University' }].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'Playfair Display', fontSize: '1.75rem', color: 'var(--gold)', fontWeight: 700 }}>{s.num}</div>
              <div style={{ fontFamily: 'Space Mono', fontSize: '0.5rem', letterSpacing: '0.18em', color: 'rgba(248,246,240,0.28)', textTransform: 'uppercase', marginTop: '3px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── PHOTO PANEL ─── */}
      <div style={{
        flex: isMobile ? 'none' : '0 0 48%',
        position: 'relative', zIndex: 2,
        overflow: 'visible',
        display: 'flex', alignItems: isMobile ? 'center' : 'flex-end', justifyContent: 'center',
        order: isMobile ? 1 : 2,
        minHeight: isMobile ? '50vh' : 'auto',
        paddingTop: isMobile ? '6rem' : 0,
      }}>
        {/* Full bleed dark gradient from left (desktop only) */}
        {!isMobile && (
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: 200,
            background: 'linear-gradient(to right, #0B0B0B, transparent)',
            zIndex: 5, pointerEvents: 'none',
          }} />
        )}

        {/* Rotating ring decoration — behind photo */}
        <div style={{
          position: 'absolute', bottom: '8%', right: '5%',
          width: isMobile ? 220 : 320, height: isMobile ? 220 : 320, borderRadius: '50%',
          border: '1px solid rgba(198,169,105,0.08)',
          animation: 'slowSpin 20s linear infinite',
          zIndex: 1,
        }}>
          <div style={{
            position: 'absolute', top: -4, left: '50%',
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--gold)', transform: 'translateX(-50%)',
            boxShadow: '0 0 12px rgba(198,169,105,0.6)',
          }} />
        </div>
        <div style={{
          position: 'absolute', bottom: '5%', right: '2%',
          width: isMobile ? 280 : 400, height: isMobile ? 280 : 400, borderRadius: '50%',
          border: '1px solid rgba(51,92,74,0.1)',
          animation: 'slowSpinReverse 28s linear infinite',
          zIndex: 1,
        }}>
          <div style={{
            position: 'absolute', bottom: -4, left: '50%',
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--emerald)', transform: 'translateX(-50%)',
            boxShadow: '0 0 10px rgba(51,92,74,0.6)',
          }} />
        </div>

        {/* Scattered geometric accents (desktop) */}
        {!isMobile && <>
          <div style={{
            position: 'absolute', top: '15%', right: '12%', zIndex: 6,
            width: 1, height: 80, background: 'linear-gradient(180deg, transparent, rgba(198,169,105,0.4), transparent)',
          }} />
          <div style={{
            position: 'absolute', top: '18%', right: '10%', zIndex: 6,
            width: 50, height: 1, background: 'linear-gradient(90deg, transparent, rgba(198,169,105,0.4), transparent)',
          }} />
        </>}

        {/* Gold emerald corner box */}
        <div style={{
          position: 'absolute', top: isMobile ? '5%' : '10%', right: '8%', zIndex: 6,
          width: isMobile ? 32 : 48, height: isMobile ? 32 : 48,
          border: '1px solid rgba(198,169,105,0.25)',
          animation: 'floatY 5s ease-in-out infinite',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 1s ease 1.5s',
        }} />

        {/* Photo */}
        <div style={{
          position: 'relative', zIndex: 4,
          width: isMobile ? '70%' : '90%',
          maxWidth: isMobile ? 300 : 520,
          marginBottom: 0,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 1.2s ease 0.4s',
        }}>
          {/* Glow behind photo */}
          <div style={{
            position: 'absolute', bottom: -30, left: '10%', right: '10%', height: 200,
            background: 'radial-gradient(ellipse, rgba(198,169,105,0.12) 0%, transparent 70%)',
            filter: 'blur(30px)',
            zIndex: 0,
          }} />

          {/* Emerald shadow block */}
          <div style={{
            position: 'absolute', bottom: -8, right: -8,
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg, rgba(51,92,74,0.15), transparent)',
            border: '1px solid rgba(51,92,74,0.2)',
            zIndex: 0,
          }} />

          {/* The actual photo */}
          <div ref={photoRef} style={{
            position: 'relative', zIndex: 2,
            transition: 'transform 0.2s ease',
          }}>
            <img
              src="/photo.png"
              alt="Rachitha Eshan"
              style={{
                width: '100%',
                display: 'block',
                objectFit: 'contain',
                objectPosition: 'bottom center',
                maxHeight: isMobile ? '55vh' : '88vh',
                filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.8)) drop-shadow(0 0 40px rgba(198,169,105,0.08))',
              }}
            />
          </div>

          {/* Floating badge — Open to Work */}
          <div style={{
            position: 'absolute', top: '18%', right: isMobile ? -50 : -70, zIndex: 7,
            background: 'rgba(11,11,11,0.95)',
            border: '1px solid rgba(198,169,105,0.25)',
            padding: isMobile ? '8px 12px' : '10px 16px',
            animation: 'floatY 4s ease-in-out infinite',
            opacity: mounted ? 1 : 0, transition: 'opacity 1s ease 1.8s',
          }}>
            <div style={{ fontFamily: 'Space Mono', fontSize: isMobile ? '0.5rem' : '0.58rem', color: 'var(--gold)', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>⚡ Open to Work</div>
          </div>

          {/* Floating badge — Stack (hidden on very small screens) */}
          {!isMobile && (
            <div style={{
              position: 'absolute', bottom: '25%', left: -80, zIndex: 7,
              background: 'rgba(11,11,11,0.95)',
              border: '1px solid rgba(51,92,74,0.35)',
              padding: '10px 16px',
              animation: 'floatY 5s ease-in-out infinite 0.8s',
              opacity: mounted ? 1 : 0, transition: 'opacity 1s ease 2s',
            }}>
              <div style={{ fontFamily: 'Space Mono', fontSize: '0.55rem', color: 'var(--emerald-light)', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>MERN · Spring · Next.js</div>
            </div>
          )}

          {/* Name plate at bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 7,
            padding: '0.8rem 1rem',
            background: 'linear-gradient(transparent, rgba(11,11,11,0.9))',
          }}>
            <div style={{ fontFamily: 'Space Mono', fontSize: '0.5rem', letterSpacing: '0.25em', color: 'rgba(198,169,105,0.5)', textTransform: 'uppercase' }}>
              Software Engineering · SLIIT · Sri Lanka
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        opacity: mounted ? 0.4 : 0, transition: 'opacity 1s ease 2.2s',
      }}>
        <span style={{ fontFamily: 'Space Mono', fontSize: '0.48rem', letterSpacing: '0.3em', color: 'rgba(248,246,240,0.3)', textTransform: 'uppercase' }}>scroll</span>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(180deg, rgba(198,169,105,0.5), transparent)' }} />
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.75)} }
        @keyframes shimmer { 0%{background-position:0% center} 100%{background-position:200% center} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes slowSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes slowSpinReverse { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
      `}</style>
    </section>
  );
}
