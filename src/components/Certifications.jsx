
import { useEffect, useRef, useState } from 'react';

const certs = [
  {
    name: 'Higher Diploma in Information Technology',
    org: 'SLIIT',
    year: '2024',
    accent: '#C6A969',
    logo: '/sliit.jpeg',
    fallbackText: 'SLIIT',
    fallbackColor: '#004B87',
    category: 'Academic',
  },
  {
    name: 'Oracle Java Foundations',
    org: 'Oracle',
    year: '2024',
    accent: '#C6A969',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg',
    fallbackText: 'ORC',
    fallbackColor: '#F80000',
    category: 'Programming',
  },
  {
  name: 'C# and .NET Essential Training',
  org: 'LinkedIn Learning',
  year: '2026',
  accent: '#0A66C2',
  logo: '/linkedin-learning.png',
  fallbackText: '.NET',
  fallbackColor: '#512BD4',
  category: 'Programming',
},
  {
    name: 'PostgreSQL: Become an SQL Developer',
    org: 'Udemy',
    year: '2024',
    accent: '#335C4A',
    logo: '/simplilearn.png',
    fallbackText: 'PG',
    fallbackColor: '#336791',
    category: 'Database',
  },
  {
    name: 'Introduction to Kubernetes',
    org: 'Linux Foundation',
    year: '2024',
    accent: '#335C4A',
    logo: '/linux.png',
    fallbackText: 'K8S',
    fallbackColor: '#326CE5',
    category: 'DevOps',
  },
  {
    name: 'Introduction to AI',
    org: 'Netcad',
    year: '2024',
    accent: '#C6A969',
    logo: '/netcad.png',
    fallbackText: 'AI',
    fallbackColor: '#335C4A',
    category: 'AI/ML',
  },
  {
    name: 'Python for Beginners',
    org: 'University of Moratuwa',
    year: '2024',
    accent: '#335C4A',
    logo: '/moratuwa.png',
    fallbackText: 'UOM',
    fallbackColor: '#3776AB',
    category: 'Programming',
  },
  {
    name: 'Java Programming Basics & Structure',
    org: 'Alison',
    year: '2023',
    accent: '#C6A969',
    logo: '/alison.png',
    fallbackText: 'JV',
    fallbackColor: '#E76F00',
    category: 'Programming',
  },
];

function CertCard({ cert, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '1.5rem',
        padding: '1.4rem 1.6rem',
        border: `1px solid ${hovered ? cert.accent + '40' : 'rgba(198,169,105,0.07)'}`,
        background: hovered ? `rgba(198,169,105,0.03)` : 'transparent',
        transition: 'all 0.35s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${index * 0.07}s`,
        cursor: 'default',
      }}
    >
      {/* Logo */}
      <div style={{
        width: 52, height: 52, flexShrink: 0,
        border: `1px solid ${hovered ? cert.accent + '40' : 'rgba(198,169,105,0.1)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(255,255,255,0.02)',
        transition: 'border-color 0.3s',
        overflow: 'hidden',
      }}>
        {cert.logo && !imgError ? (
          <img
            src={cert.logo}
            alt={cert.org}
            width={30}
            height={30}
            style={{ objectFit: 'contain' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <span style={{
            fontFamily: 'Space Mono', fontSize: '0.6rem', fontWeight: 700,
            color: cert.fallbackColor, letterSpacing: '0.05em',
          }}>
            {cert.fallbackText}
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'Playfair Display', fontSize: '0.95rem', fontWeight: 600,
          color: hovered ? 'var(--ivory)' : 'rgba(248,246,240,0.8)',
          marginBottom: '3px', transition: 'color 0.3s',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {cert.name}
        </div>
        <div style={{
          fontFamily: 'Space Mono', fontSize: '0.56rem', letterSpacing: '0.12em',
          color: cert.accent, textTransform: 'uppercase',
        }}>
          {cert.org}
        </div>
      </div>

      {/* Category + Year */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
        <div style={{
          fontFamily: 'Space Mono', fontSize: '0.5rem', letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'rgba(248,246,240,0.25)',
          border: '1px solid rgba(198,169,105,0.1)', padding: '2px 8px',
        }}>
          {cert.category}
        </div>
        <div style={{ fontFamily: 'Space Mono', fontSize: '0.52rem', color: 'rgba(248,246,240,0.2)', letterSpacing: '0.08em' }}>
          {cert.year}
        </div>
      </div>

      {/* Hover accent line */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: hovered ? 2 : 0,
        background: cert.accent,
        transition: 'width 0.3s ease',
      }} />
    </div>
  );
}

export default function Certifications() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section id="certifications" ref={sectionRef} style={{
      padding: isMobile ? '5rem 1.5rem' : '8rem 6rem',
      background: 'linear-gradient(180deg, transparent, rgba(51,92,74,0.03), transparent)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <span style={{ fontFamily: 'Space Mono', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase' }}>04 — Credentials</span>
        <div className="gold-line" style={{ flex: 1, maxWidth: 80 }} />
      </div>

      <h2 style={{
        fontFamily: 'Playfair Display', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: 700, color: 'var(--ivory)', marginBottom: '0.5rem',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease',
      }}>
        Continuous <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Learning</span>
      </h2>
      <p style={{ color: 'rgba(248,246,240,0.35)', marginBottom: '3rem', fontSize: '0.9rem' }}>
        Credentials that back the craft.
      </p>

      {/* Stats bar */}
      <div style={{
        display: 'flex', gap: '2px', marginBottom: '2.5rem',
        opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.3s',
        overflowX: 'auto',
      }}>
        {[
          { label: 'Academic', count: 1, color: '#C6A969' },
          { label: 'Programming', count: 3, color: '#9B7F42' },
          { label: 'Database', count: 1, color: '#335C4A' },
          { label: 'DevOps', count: 1, color: '#2A4A3C' },
          { label: 'AI/ML', count: 1, color: '#3D6E59' },
        ].map((cat, i) => (
          <div key={cat.label} style={{
            flex: cat.count, background: cat.color,
            height: 4, position: 'relative',
            transition: `all 1s ease ${i * 0.1 + 0.5}s`,
            minWidth: 20,
          }}>
            <div style={{
              position: 'absolute', top: 8, left: 0,
              fontFamily: 'Space Mono', fontSize: '0.45rem', letterSpacing: '0.1em',
              color: 'rgba(248,246,240,0.3)', textTransform: 'uppercase', whiteSpace: 'nowrap',
            }}>{cat.label}</div>
          </div>
        ))}
      </div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '1px',
        background: 'rgba(198,169,105,0.06)',
        position: 'relative',
      }}>
        {certs.map((cert, i) => (
          <div key={cert.name} style={{
            position: 'relative', background: 'var(--bg)',
            gridColumn: 'auto',
          }}>
            <CertCard cert={cert} index={i} visible={visible} />
          </div>
        ))}
        {certs.length % 2 !== 0 && !isMobile && (
          <div style={{ background: 'var(--bg)' }} />
        )}
      </div>
    </section>
  );
}