import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    id: '01',
    name: 'TeamFlow',
    subtitle: 'AI-Powered Project & Task Management',
    description: 'Full-stack project management platform with Admin, PM, and Team Member RBAC. 30+ REST APIs, Google Gemini AI for project summaries and intelligent assistant, deployed with GitHub Actions CI/CD.',
    tech: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Gemini AI'],
    type: 'AI Platform',
    accent: '#C6A969',
    link: 'https://github.com/rachithaeshan/TeamFlow',
    year: '2026',
    image: '/taskflow.png',
  },
  {
    id: '02',
    name: 'TeamPulse',
    subtitle: 'AI-Powered Meeting & Collaboration',
    description: 'Full-stack team collaboration platform with meeting management, AI-generated summaries and reports via Google Gemini, and an AI-powered chat assistant built with Spring Boot and Next.js.',
    tech: ['Spring Boot', 'Java', 'Next.js', 'PostgreSQL', 'Hibernate', 'Gemini AI'],
    type: 'AI Platform',
    accent: '#335C4A',
    link: 'https://github.com/rachithaeshan/TeamPulse',
    year: '2026',
    image: '/teampulse.png',
  },
  {
    id: '03',
    name: 'InternLink',
    subtitle: 'Internship & Placement Portal',
    description: 'Full-stack internship management platform with role-based access, JWT authentication, REST APIs, Excel report generation, and admin analytics dashboard.',
    tech: ['Spring Boot', 'Next.js', 'PostgreSQL', 'JWT'],
    type: 'Full-Stack',
    accent: '#C6A969',
    link: 'https://github.com/rachithaeshan/internLink',
    year: '2026',
    image: '/internlink.png',
  },
  {
    id: '04',
    name: 'FinTrack',
    subtitle: 'Finance & Budget Management',
    description: 'Personal finance web application with transaction management, budget tracking, category management, and a full admin dashboard secured with JWT.',
    tech: ['Angular', 'Spring Boot', 'PostgreSQL', 'Maven'],
    type: 'Full-Stack',
    accent: '#335C4A',
    link: 'https://github.com/rachithaeshan/FinTrack',
    year: '2026',
    image: '/finance.png',
  },
  {
    id: '05',
    name: 'CareLink',
    subtitle: 'Smart Healthcare Platform',
    description: 'Cloud-native healthcare platform built with microservices — patient/doctor management, live video consultations via Agora, Twilio notifications, and an AI symptom checker.',
    tech: ['MERN', 'Agora', 'Twilio', 'Microservices'],
    type: 'Cloud Platform',
    accent: '#C6A969',
    link: 'https://github.com/rachithaeshan/CareLink',
    year: '2026',
    image: '/carelink.png',
  },
  {
    id: '06',
    name: 'AquaShield',
    subtitle: 'Illegal Fishing Reporter',
    description: 'Marine conservation platform for monitoring illegal fishing, managing protected species databases, and streamlining case handling with role-based access.',
    tech: ['MERN', 'Role Auth', 'MongoDB'],
    type: 'Web Platform',
    accent: '#335C4A',
    link: 'https://github.com/rachithaeshan/AquaShield',
    year: '2026',
    image: '/aqua.png',
  },
  {
    id: '07',
    name: 'WORKPULSE',
    subtitle: 'Employee Management System',
    description: 'Full-stack hospital employee management system with automated role-based authentication and comprehensive account management features.',
    tech: ['MERN', 'JWT', 'MongoDB'],
    type: 'Enterprise App',
    accent: '#C6A969',
    year: '2025',
    image: '/workpulse.png',
  },
  {
    id: '08',
    name: 'Wellora',
    subtitle: 'Kotlin Mobile App',
    description: 'Android health monitoring app with local SQLite storage. Also built a companion meal suggestion app that tracks calories based on available groceries.',
    tech: ['Kotlin', 'SQLite', 'Android'],
    type: 'Mobile',
    accent: '#335C4A',
    link: 'https://github.com/rachithaeshan/Wellora',
    year: '2025',
    image: '/wellora1.png',
  },
];

const COLS = 3;

function ProjectCard({ project, index, visible, isMobile }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => project.link && window.open(project.link, '_blank')}
      style={{
        position: 'relative', overflow: 'hidden',
        border: `1px solid ${hovered ? project.accent + '50' : 'rgba(198,169,105,0.08)'}`,
        background: 'rgba(255,255,255,0.01)',
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${index * 0.08}s`,
        cursor: project.link ? 'pointer' : 'default',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Project image */}
      <div style={{ position: 'relative', height: isMobile ? 180 : 200, overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={project.image}
          alt={project.name}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: hovered ? 'grayscale(0%) brightness(0.9)' : 'grayscale(30%) brightness(0.6)',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(11,11,11,0.2), rgba(11,11,11,0.7))',
        }} />
        {/* ID badge */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          fontFamily: 'Space Mono', fontSize: '0.55rem', letterSpacing: '0.15em',
          color: project.accent, background: 'rgba(11,11,11,0.8)',
          padding: '4px 10px', border: `1px solid ${project.accent}30`,
        }}>
          {project.id}
        </div>
        {/* Type badge */}
        <div style={{
          position: 'absolute', top: 14, right: 14,
          fontFamily: 'Space Mono', fontSize: '0.52rem', letterSpacing: '0.12em',
          color: 'rgba(248,246,240,0.6)', background: 'rgba(11,11,11,0.8)',
          padding: '4px 10px', textTransform: 'uppercase',
        }}>
          {project.type}
        </div>
        {/* Year */}
        <div style={{
          position: 'absolute', bottom: 14, right: 14,
          fontFamily: 'Space Mono', fontSize: '0.5rem',
          color: 'rgba(248,246,240,0.35)',
        }}>
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.6rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontFamily: 'Playfair Display', fontSize: '1.25rem', fontWeight: 700,
          color: 'var(--ivory)', marginBottom: '3px', lineHeight: 1.2,
        }}>
          {project.name}
        </h3>
        <p style={{
          fontFamily: 'Space Mono', fontSize: '0.55rem', letterSpacing: '0.1em',
          color: project.accent, marginBottom: '0.8rem', textTransform: 'uppercase',
        }}>
          {project.subtitle}
        </p>
        <p style={{
          fontSize: '0.82rem', color: 'rgba(248,246,240,0.45)',
          lineHeight: 1.7, marginBottom: '1.2rem', flex: 1,
        }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '1.2rem' }}>
          {project.tech.map(t => (
            <span key={t} style={{
              fontFamily: 'Space Mono', fontSize: '0.52rem', padding: '3px 8px',
              background: `${project.accent}10`,
              border: `1px solid ${project.accent}25`,
              color: 'rgba(248,246,240,0.5)', letterSpacing: '0.08em',
            }}>{t}</span>
          ))}
        </div>

        {/* Link */}
        {project.link && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: project.accent, fontFamily: 'Space Mono', fontSize: '0.57rem',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            opacity: hovered ? 1 : 0.4, transition: 'opacity 0.3s ease',
          }}>
            <span>View on GitHub</span>
            <span style={{
              transform: hovered ? 'translate(2px,-2px)' : 'translate(0,0)',
              transition: 'transform 0.3s ease',
            }}>↗</span>
          </div>
        )}
      </div>

      {/* Accent line on hover */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: hovered ? '100%' : '0%',
        height: '2px',
        background: `linear-gradient(90deg, ${project.accent}, transparent)`,
        transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
      }} />
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // How many filler cells needed to complete the last row
  const remainder = projects.length % COLS;
  const fillerCount = !isMobile && remainder !== 0 ? COLS - remainder : 0;

  return (
    <section id="projects" ref={sectionRef} style={{
      padding: isMobile ? '5rem 1.5rem' : '8rem 6rem',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '70%', height: '60%',
        background: 'radial-gradient(ellipse, rgba(198,169,105,0.025) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <span style={{
          fontFamily: 'Space Mono', fontSize: '0.6rem', letterSpacing: '0.25em',
          color: 'var(--gold)', textTransform: 'uppercase',
        }}>
          03 — Selected Work
        </span>
        <div className="gold-line" style={{ flex: 1, maxWidth: 80 }} />
      </div>

      <h2 style={{
        fontFamily: 'Playfair Display', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: 700, color: 'var(--ivory)', marginBottom: '0.5rem',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease',
      }}>
        What I've <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Built</span>
      </h2>
      <p style={{
        color: 'rgba(248,246,240,0.35)', marginBottom: '3rem',
        fontSize: '0.9rem', maxWidth: 500,
      }}>
        A selection of projects spanning full-stack web, mobile, and cloud platforms.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : `repeat(${COLS}, 1fr)`,
        gap: '1px',
        background: 'rgba(198,169,105,0.06)',
      }}>
        {projects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            visible={visible}
            isMobile={isMobile}
          />
        ))}

        {/* Fill remaining cells in last row with bg color so gold gap doesn't show */}
        {Array.from({ length: fillerCount }).map((_, i) => (
          <div key={`filler-${i}`} style={{ background: 'var(--bg)' }} />
        ))}
      </div>
    </section>
  );
}