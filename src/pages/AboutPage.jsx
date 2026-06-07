import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { SMLogoMark } from '../components/Loader'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  { icon: '◈', label: 'Strategy',   desc: 'Precision-crafted roadmaps that align brand vision with market reality.' },
  { icon: '◎', label: 'Creativity', desc: 'Boundary-pushing ideas that make your brand impossible to ignore.' },
  { icon: '◉', label: 'Culture',    desc: 'Deep cultural intelligence that makes campaigns feel native and real.' },
  { icon: '◆', label: 'Impact',     desc: 'Measurable results that elevate brand equity and accelerate growth.' },
]

const teamValues = [
  { number: '150+', label: 'Projects Delivered' },
  { number: '80+',  label: 'Happy Clients' },
  { number: '250M+',label: 'Audience Reached' },
  { number: '6+',   label: 'Years of Excellence' },
]

export default function AboutPage() {
  const heroRef    = useRef(null)
  const pillarsRef = useRef(null)
  const statsRef   = useRef(null)
  const manifestoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page hero entrance
      gsap.fromTo(heroRef.current.querySelectorAll('.about-hero-el'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 1.1, ease: 'power3.out', delay: 0.2 }
      )

      // Pillars stagger
      gsap.fromTo(pillarsRef.current.querySelectorAll('.pillar-card'),
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: pillarsRef.current, start: 'top 85%', once: true }
        }
      )

      // Stats counter roll
      statsRef.current.querySelectorAll('.stat-number').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true }
          }
        )
      })

      // Manifesto lines reveal
      gsap.fromTo(manifestoRef.current.querySelectorAll('.manifesto-line'),
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: manifestoRef.current, start: 'top 75%', once: true }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        {/* ── Page Hero ───────────────────────────────────────────────── */}
        <section style={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'flex-end',
          paddingTop: '10rem',
          paddingBottom: '6rem',
          background: 'var(--black)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background grid */}
          <div className="bg-dots" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5 }} />

          {/* Radial glow */}
          <div style={{
            position: 'absolute',
            top: '50%', right: '10%',
            transform: 'translateY(-50%)',
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Faint SM watermark */}
          <div style={{
            position: 'absolute', right: '5%', top: '50%',
            transform: 'translateY(-50%)',
            opacity: 0.03, pointerEvents: 'none',
          }}>
            <SMLogoMark size={320} />
          </div>

          <div className="container" ref={heroRef} style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-label about-hero-el" style={{ marginBottom: '1.5rem' }}>
              <span className="text-label" style={{ color: 'var(--gold)' }}>About Us</span>
            </div>
            <h1 className="text-h1 about-hero-el" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              WE DON'T JUST
            </h1>
            <h1 className="text-h1 about-hero-el" style={{ marginBottom: '0.5rem' }}>
              <span className="text-gradient">MARKET.</span>
            </h1>
            <h1 className="text-h1 about-hero-el" style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>
              WE CREATE <span className="text-serif text-gradient-animated">PRESENCE.</span>
            </h1>

            <p className="text-body about-hero-el" style={{ maxWidth: '560px' }}>
              At Struders Marketing Co., we blend strategy, creativity, and culture
              to build impactful digital identities. From influencer management to
              cinematic campaigns, we create experiences that connect, engage, and grow.
            </p>
          </div>
        </section>

        {/* ── Pillars ─────────────────────────────────────────────────── */}
        <section className="section" style={{
          background: 'var(--surface-0)',
        }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <div className="section-label justify-center" style={{ marginBottom: '1rem' }}>
                <span className="text-label" style={{ color: 'var(--text-secondary)' }}>What Drives Us</span>
              </div>
              <h2 className="text-h2" style={{ color: 'var(--text-primary)' }}>
                FOUR PILLARS OF <span className="text-gradient">EXCELLENCE</span>
              </h2>
            </div>

            <div ref={pillarsRef} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.5rem',
            }} className="pillars-grid">
              {pillars.map((p, i) => (
                <div key={p.label} className="pillar-card glass-card tilt-card" style={{
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const cx = rect.width / 2;
                  const cy = rect.height / 2;
                  gsap.to(card, { rotateX: ((y - cy) / cy) * -6, rotateY: ((x - cx) / cx) * 8, duration: 0.4, transformPerspective: 800 });
                }}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.7 })}
                >
                  <div style={{ fontSize: '2.5rem', color: 'var(--gold)', marginBottom: '1.5rem' }}>
                    {p.icon}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem',
                  }}>{p.label}</h3>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: 'var(--text-secondary)',
                  }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .pillars-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 480px) {
              .pillars-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>

        {/* ── Stats ───────────────────────────────────────────────────── */}
        <section className="section" style={{
          background: 'var(--black)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}>
          <div ref={statsRef} className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '3rem',
              textAlign: 'center',
            }} className="stats-about-grid">
              {teamValues.map(s => (
                <div key={s.label}>
                  <div className="stat-number" style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    marginBottom: '0.75rem',
                  }}>
                    {s.number.replace(/[^0-9]/g, '')}
                    <span className="text-gradient" style={{ fontSize: '0.8em' }}>
                      {s.number.replace(/[0-9]/g, '')}
                    </span>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 768px) {
              .stats-about-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
        </section>

        {/* ── Manifesto ───────────────────────────────────────────────── */}
        <section className="section" style={{
          background: 'var(--surface-0)',
        }}>
          <div className="container" ref={manifestoRef}>
            <div className="section-label manifesto-line" style={{ marginBottom: '2.5rem' }}>
              <span className="text-label" style={{ color: 'var(--text-secondary)' }}>Our Manifesto</span>
            </div>

            {[
              'We believe brands are living things — they breathe, evolve, and leave marks.',
              'We don\'t settle for visibility. We build presence.',
              'Every campaign we create is a statement. Every strategy is a blueprint for legacy.',
              'We are Struders. We don\'t follow trends. We create them.',
            ].map((line, i) => (
              <div key={i} className="manifesto-line" style={{
                fontFamily: i === 3 ? 'var(--font-serif)' : 'var(--font-sans)',
                fontSize: i === 3 ? 'clamp(1.8rem, 4vw, 3rem)' : 'clamp(1.2rem, 2.5vw, 1.8rem)',
                fontWeight: i === 3 ? 400 : 500,
                fontStyle: i === 3 ? 'italic' : 'normal',
                color: i === 3 ? 'var(--gold)' : 'var(--text-secondary)',
                lineHeight: 1.4,
                letterSpacing: i === 3 ? '0' : '-0.02em',
                paddingLeft: '2rem',
                borderLeft: '2px solid',
                borderColor: i === 3 ? 'var(--gold)' : 'var(--border)',
                marginBottom: '2rem',
                maxWidth: '900px',
              }}>
                {line}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
