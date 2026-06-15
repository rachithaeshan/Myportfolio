import { useState, useEffect } from 'react';

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <footer style={{
      padding: isMobile ? '2rem 1.5rem' : '3rem 6rem',
      borderTop: '1px solid rgba(198,169,105,0.1)',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: isMobile ? '1.2rem' : 0,
      textAlign: isMobile ? 'center' : 'left',
    }}>
      <div style={{ fontFamily: 'Space Mono', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(248,246,240,0.2)' }}>
        © 2025 Rachitha Eshan
      </div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {[
          { label: 'GitHub', href: 'https://github.com/RachithaEshan' },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/rachitha-eshan' },
          { label: 'Email', href: 'mailto:rachithaeshan@gmail.com' },
        ].map(link => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer" style={{
            fontFamily: 'Space Mono', fontSize: '0.55rem', letterSpacing: '0.15em',
            color: 'rgba(248,246,240,0.3)', textDecoration: 'none', textTransform: 'uppercase',
            transition: 'color 0.3s',
          }}
          onMouseEnter={e => e.target.style.color = 'var(--gold)'}
          onMouseLeave={e => e.target.style.color = 'rgba(248,246,240,0.3)'}>
            {link.label}
          </a>
        ))}
      </div>
      <div style={{ fontFamily: 'Space Mono', fontSize: '0.55rem', color: 'rgba(248,246,240,0.15)', letterSpacing: '0.1em' }}>
        Built with React + Three.js
      </div>
    </footer>
  );
}
