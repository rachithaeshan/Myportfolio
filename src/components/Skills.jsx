import { useEffect, useRef, useState } from 'react';

const skillGroups = [
  {
    category: 'Languages',
    icon: '{ }',
    skills: [
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'C/C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    ],
  },
  {
    category: 'Frontend',
    icon: '◈',
    skills: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
      { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'SCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    ],
  },
  {
    category: 'Backend',
    icon: '⬡',
    skills: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { name: 'Kotlin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
    ],
  },
  {
    category: 'Database',
    icon: '◎',
    skills: [
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    ],
  },
  {
    category: 'DevOps & Tools',
    icon: '⚙',
    skills: [
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
      { name: 'IntelliJ', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    ],
  },
  {
    category: 'Testing',
    icon: '✓',
    skills: [
      { name: 'Playwright', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg' },
      { name: 'Selenium', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg' },
      { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
    ],
  },
];

function SkillBadge({ skill, delay, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '8px 14px',
        border: `1px solid ${hovered ? 'rgba(198,169,105,0.5)' : 'rgba(198,169,105,0.12)'}`,
        background: hovered ? 'rgba(198,169,105,0.06)' : 'transparent',
        transition: 'all 0.25s ease',
        cursor: 'default',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transitionDelay: delay,
      }}
    >
      <img
        src={skill.icon}
        alt={skill.name}
        width={18}
        height={18}
        style={{
          filter: hovered ? 'none' : 'grayscale(40%) brightness(0.85)',
          transition: 'filter 0.25s ease',
          flexShrink: 0,
        }}
        onError={e => { e.target.style.display = 'none'; }}
      />
      <span style={{
        fontFamily: 'Space Mono', fontSize: '0.62rem', letterSpacing: '0.08em',
        color: hovered ? 'var(--ivory)' : 'rgba(248,246,240,0.55)',
        transition: 'color 0.25s ease',
        whiteSpace: 'nowrap',
      }}>
        {skill.name}
      </span>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} style={{ padding: '8rem 6rem', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
        background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(51,92,74,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <span style={{ fontFamily: 'Space Mono', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase' }}>02 — Arsenal</span>
        <div className="gold-line" style={{ flex: 1, maxWidth: 80 }} />
      </div>

      <h2 style={{
        fontFamily: 'Playfair Display', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: 700, color: 'var(--ivory)', marginBottom: '0.5rem',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease',
      }}>
        Technical <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Stack</span>
      </h2>
      <p style={{ color: 'rgba(248,246,240,0.35)', marginBottom: '4rem', fontSize: '0.9rem' }}>
        The tools I wield to build meaningful software.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
        {skillGroups.map((group, gi) => (
          <div key={group.category} style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            borderBottom: '1px solid rgba(198,169,105,0.08)',
            minHeight: 90,
          }}>
            {/* Category label */}
            <div style={{
              padding: '1.8rem 2rem',
              borderRight: '1px solid rgba(198,169,105,0.08)',
              display: 'flex', alignItems: 'center', gap: '12px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-20px)',
              transition: `all 0.7s ease ${gi * 0.08}s`,
            }}>
              <span style={{ fontFamily: 'Space Mono', fontSize: '0.9rem', color: 'var(--gold)', lineHeight: 1 }}>{group.icon}</span>
              <span style={{ fontFamily: 'Space Mono', fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(248,246,240,0.3)', textTransform: 'uppercase' }}>
                {group.category}
              </span>
            </div>

            {/* Skills */}
            <div style={{
              padding: '1.5rem 2rem',
              display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center',
            }}>
              {group.skills.map((skill, si) => (
                <SkillBadge
                  key={skill.name}
                  skill={skill}
                  visible={visible}
                  delay={`${gi * 0.08 + si * 0.05}s`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
