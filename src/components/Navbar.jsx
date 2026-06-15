import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);

    const sections = [
      'about',
      'skills',
      'projects',
      'certifications',
      'contact',
    ];

    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: '-40% 0px -55% 0px',
        }
      );

      observer.observe(el);
      return observer;
    });

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const links = [
    { label: 'About', href: 'about' },
    { label: 'Skills', href: 'skills' },
    { label: 'Projects', href: 'projects' },
    { label: 'Certifications', href: 'certifications' },
    { label: 'Contact', href: 'contact' },
  ];

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,

          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',

          padding: scrolled ? '1rem 2rem' : '1.5rem 2rem',

          background: scrolled
            ? 'rgba(11,11,11,0.92)'
            : menuOpen ? 'rgba(11,11,11,0.98)' : 'transparent',

          backdropFilter: scrolled || menuOpen ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled || menuOpen ? 'blur(24px)' : 'none',

          borderBottom: scrolled
            ? '1px solid rgba(214,178,94,0.12)'
            : '1px solid transparent',

          boxShadow: scrolled
            ? '0 4px 40px rgba(0,0,0,0.5)'
            : 'none',

          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* LOGO */}
        <a
          href="#about"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            textDecoration: 'none',
          }}
        >
          <img
            src="/logo.png"
            alt="RE Logo"
            style={{
              width: scrolled ? '38px' : '48px',
              height: scrolled ? '38px' : '48px',
              objectFit: 'contain',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              filter: scrolled
                ? 'drop-shadow(0 0 10px rgba(214,178,94,0.15))'
                : 'drop-shadow(0 0 18px rgba(214,178,94,0.25))',
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 1.1,
            }}
          >
            <span
              style={{
                fontFamily: 'Space Mono',
                fontSize: scrolled ? '0.7rem' : '0.8rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--ivory)',
                transition: 'all 0.4s ease',
              }}
            >
              RACHITHA
            </span>

            <span
              style={{
                fontFamily: 'Space Mono',
                fontSize: '0.48rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                opacity: 0.8,
              }}
            >
              SOFTWARE ENGINEER
            </span>
          </div>
        </a>

        {/* DESKTOP NAVIGATION */}
        <div
          className="nav-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3rem',
          }}
        >
          {links.map((link) => {
            const isActive = activeSection === link.href;

            return (
              <a
                key={link.label}
                href={`#${link.href}`}
                style={{
                  position: 'relative',
                  textDecoration: 'none',

                  fontFamily: 'Space Mono',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',

                  color: isActive
                    ? 'var(--gold)'
                    : 'rgba(248,246,240,0.45)',

                  transition: 'all 0.3s ease',
                  paddingBottom: '6px',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--ivory)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color =
                      'rgba(248,246,240,0.45)';
                  }
                }}
              >
                {link.label}

                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,

                    width: isActive ? '100%' : '0%',

                    height: '1px',
                    background: 'var(--gold)',

                    transition:
                      'width 0.4s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
              </a>
            );
          })}

          {/* CTA BUTTON */}
          <a
            href="#contact"
            style={{
              textDecoration: 'none',

              fontFamily: 'Space Mono',
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',

              color: '#0b0b0b',

              background:
                'linear-gradient(135deg,#D6B25E 0%,#F4D88A 100%)',

              padding: scrolled
                ? '9px 20px'
                : '11px 24px',

              border:
                '1px solid rgba(255,255,255,0.08)',

              boxShadow:
                '0 8px 25px rgba(214,178,94,0.15)',

              transition:
                'all 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0 12px 35px rgba(214,178,94,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                'translateY(0)';
              e.currentTarget.style.boxShadow =
                '0 8px 25px rgba(214,178,94,0.15)';
            }}
          >
            Hire Me
          </a>
        </div>

        {/* HAMBURGER BUTTON (mobile only) */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            flexDirection: 'column',
            gap: '5px',
            zIndex: 200,
          }}
        >
          <span style={{
            display: 'block', width: 24, height: 1.5,
            background: menuOpen ? 'var(--gold)' : 'var(--ivory)',
            transition: 'all 0.3s ease',
            transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            display: 'block', width: 24, height: 1.5,
            background: menuOpen ? 'var(--gold)' : 'var(--ivory)',
            transition: 'all 0.3s ease',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: 24, height: 1.5,
            background: menuOpen ? 'var(--gold)' : 'var(--ivory)',
            transition: 'all 0.3s ease',
            transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
          }} />
        </button>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        className="nav-mobile-menu"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99,
          background: 'rgba(11,11,11,0.97)',
          backdropFilter: 'blur(24px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        {links.map((link) => {
          const isActive = activeSection === link.href;
          return (
            <a
              key={link.label}
              href={`#${link.href}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'Playfair Display',
                fontSize: '2rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textDecoration: 'none',
                color: isActive ? 'var(--gold)' : 'var(--ivory)',
                transition: 'color 0.3s ease',
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.4s ease',
              }}
            >
              {link.label}
            </a>
          );
        })}
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: '1rem',
            fontFamily: 'Space Mono',
            fontSize: '0.65rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#0b0b0b',
            background: 'linear-gradient(135deg,#D6B25E 0%,#F4D88A 100%)',
            padding: '12px 28px',
            textDecoration: 'none',
          }}
        >
          Hire Me
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}