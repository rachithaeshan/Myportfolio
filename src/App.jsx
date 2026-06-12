import { useState } from 'react';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

function Divider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '0 6rem' }}>
      <div className="gold-line" style={{ flex: 1 }} />
      <span style={{ fontFamily: 'Space Mono', fontSize: '0.5rem', letterSpacing: '0.3em', color: 'rgba(198,169,105,0.18)', textTransform: 'uppercase', flexShrink: 0 }}>{label}</span>
      <div className="gold-line" style={{ flex: 1 }} />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="noise" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      {!loading && (
        <>
          <CustomCursor />
          <Navbar />
          <Hero />
          <Divider label="Skills & Expertise" />
          <Skills />
          <Divider label="Featured Projects" />
          <Projects />
          <Divider label="Credentials" />
          <Certifications />
          <Divider label="Get In Touch" />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
}
