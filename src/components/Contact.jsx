import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mailto fallback
    const mailto = `mailto:rachithaeshan@gmail.com?subject=Portfolio Inquiry from ${form.name}&body=${encodeURIComponent(form.message + '\n\nFrom: ' + form.email)}`;
    window.open(mailto);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const contacts = [
    { label: 'Email', value: 'rachithaeshan@gmail.com', href: 'mailto:rachithaeshan@gmail.com' },
    { label: 'Phone', value: '+94 70 485 4274', href: 'tel:+94704854274' },
    { label: 'LinkedIn', value: 'linkedin.com/in/rachitha-eshan', href: 'https://linkedin.com/in/rachitha-eshan' },
    { label: 'GitHub', value: 'github.com/RachithaEshan', href: 'https://github.com/RachithaEshan' },
    { label: 'Location', value: 'Kaduwela, Sri Lanka', href: null },
  ];

  return (
    <section id="contact" ref={sectionRef} style={{ padding: '8rem 6rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%', height: '80%',
        background: 'radial-gradient(ellipse, rgba(198,169,105,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <span style={{ fontFamily: 'Space Mono', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase' }}>05 — Contact</span>
        <div className="gold-line" style={{ flex: 1, maxWidth: 80 }} />
      </div>

      <h2 style={{
        fontFamily: 'Playfair Display', fontSize: 'clamp(2.5rem, 6vw, 5rem)',
        fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease',
      }}>
        Let's Build<br />
        <span style={{
          background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          fontStyle: 'italic',
        }}>Something</span> Together
      </h2>
      <p style={{ color: 'rgba(248,246,240,0.4)', marginBottom: '4rem', fontSize: '0.95rem', maxWidth: 500 }}>
        Open to internships, collaborations, and conversations that lead somewhere interesting.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '6rem', alignItems: 'start' }}>
        {/* Contact info */}
        <div style={{
          opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-30px)',
          transition: 'all 0.8s ease 0.2s',
        }}>
          <p style={{ fontFamily: 'Space Mono', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(248,246,240,0.3)', textTransform: 'uppercase', marginBottom: '2rem' }}>
            Reach Out Directly
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {contacts.map(c => (
              <div key={c.label}>
                <div style={{ fontFamily: 'Space Mono', fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '4px' }}>{c.label}</div>
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{
                    fontSize: '0.85rem', color: 'rgba(248,246,240,0.6)', textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                    onMouseEnter={e => e.target.style.color = 'var(--ivory)'}
                    onMouseLeave={e => e.target.style.color = 'rgba(248,246,240,0.6)'}>
                    {c.value}
                  </a>
                ) : (
                  <span style={{ fontSize: '0.85rem', color: 'rgba(248,246,240,0.6)' }}>{c.value}</span>
                )}
              </div>
            ))}
          </div>
          {/* Download CV Button */}
          <a
            href="/Rachitha_Eshan_Software_Engineer_Intern.pdf"
            download
            style={{
              marginTop: '2.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '14px 28px',
              border: '1px solid var(--gold)',
              background: 'transparent',
              color: 'var(--gold)',
              textDecoration: 'none',
              fontFamily: 'Space Mono',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              transition: 'all 0.35s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--gold)';
              e.currentTarget.style.color = 'var(--bg)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--gold)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            ↓ Download CV
          </a>
        </div>

        {/* Form */}
        <div style={{
          opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(30px)',
          transition: 'all 0.8s ease 0.4s',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { key: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
              { key: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
            ].map(field => (
              <div key={field.key}>
                <label style={{ fontFamily: 'Space Mono', fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  style={{
                    width: '100%', background: 'transparent',
                    border: '1px solid rgba(198,169,105,0.2)',
                    padding: '12px 16px', color: 'var(--ivory)',
                    fontFamily: 'Inter', fontSize: '0.85rem',
                    outline: 'none', transition: 'border-color 0.3s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(198,169,105,0.2)'}
                />
              </div>
            ))}

            <div>
              <label style={{ fontFamily: 'Space Mono', fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Tell me about your project or opportunity..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{
                  width: '100%', background: 'transparent',
                  border: '1px solid rgba(198,169,105,0.2)',
                  padding: '12px 16px', color: 'var(--ivory)',
                  fontFamily: 'Inter', fontSize: '0.85rem',
                  outline: 'none', resize: 'vertical',
                  transition: 'border-color 0.3s',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                onBlur={e => e.target.style.borderColor = 'rgba(198,169,105,0.2)'}
              />
            </div>

            <button
              onClick={handleSubmit}
              style={{
                background: sent ? 'var(--emerald)' : 'var(--gold)',
                color: 'var(--bg)', border: 'none',
                padding: '14px 32px', fontFamily: 'Space Mono',
                fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.3s ease',
                alignSelf: 'flex-start',
              }}
              onMouseEnter={e => { if (!sent) e.currentTarget.style.opacity = '0.8'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              {sent ? '✓ Message Sent' : 'Send Message →'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
