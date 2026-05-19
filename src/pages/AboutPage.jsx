import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VideoScrollScene from '../components/VideoScrollScene'
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
      gsap.fromTo(heroRef.current.querySelectorAll('.about-hero-line'),
        { opacity: 0, y: 60, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, stagger: 0.15, duration: 1.1, ease: 'power4.out', delay: 0.3 }
      )

      // Pillars stagger
      gsap.fromTo(pillarsRef.current.querySelectorAll('.pillar-card'),
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.9, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: pillarsRef.current, start: 'top 80%', once: true }
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
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
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
          background: 'linear-gradient(180deg, var(--navy) 0%, var(--black) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background grid */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }} />

          {/* Faint SM watermark */}
          <div style={{
            position: 'absolute', right: '5%', top: '50%',
            transform: 'translateY(-50%)',
            opacity: 0.04, pointerEvents: 'none',
          }}>
            <SMLogoMark size={320} />
          </div>

          <div className="container" ref={heroRef}>
            <div className="subheading about-hero-line" style={{ marginBottom: '1.5rem' }}>
              About Us
            </div>
            <h1 className="heading-xl about-hero-line" style={{ color: 'var(--white)', marginBottom: '0.5rem' }}>
              WE DON'T JUST
            </h1>
            <h1 className="heading-xl about-hero-line" style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--gold)' }}>MARKET.</span>
            </h1>
            <h1 className="heading-xl about-hero-line" style={{ color: 'var(--white)', marginBottom: '2rem' }}>
              WE CREATE <span style={{ color: 'var(--gold)' }}>PRESENCE.</span>
            </h1>

            <p className="body-text about-hero-line" style={{ maxWidth: '560px' }}>
              At Struders Marketing Co., we blend strategy, creativity, and culture
              to build impactful digital identities. From influencer management to
              cinematic campaigns, we create experiences that connect, engage, and grow.
            </p>
          </div>
        </section>

        {/* ── Brand Video Scroll ──────────────────────────────────────── */}
        <VideoScrollScene height="180vh" label="About — Our Story" />

        {/* ── Pillars ─────────────────────────────────────────────────── */}
        <section className="section" style={{
          background: 'var(--navy)',
        }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <div className="subheading" style={{ marginBottom: '1rem' }}>What Drives Us</div>
              <h2 className="heading-lg" style={{ color: 'var(--white)' }}>
                FOUR PILLARS OF <span style={{ color: 'var(--gold)' }}>EXCELLENCE</span>
              </h2>
              <span className="gold-line-center" style={{ marginTop: '1.5rem' }} />
            </div>

            <div ref={pillarsRef} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.5rem',
            }} className="pillars-grid">
              {pillars.map(p => (
                <div key={p.label} className="pillar-card glass-card" style={{
                  padding: '2.5rem 1.75rem',
                  textAlign: 'center',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Corner accent */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '30px', height: '30px',
                    borderTop: '1px solid var(--gold)',
                    borderLeft: '1px solid var(--gold)',
                    opacity: 0.4,
                  }} />

                  <div style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: '1rem' }}>
                    {p.icon}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--white)',
                    marginBottom: '0.75rem',
                  }}>{p.label}</div>
                  <p style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.85rem',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: 'var(--white-dim)',
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
          borderTop: '1px solid rgba(201,168,76,0.08)',
          borderBottom: '1px solid rgba(201,168,76,0.08)',
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
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                  }}>{s.number}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    color: 'var(--white-dim)',
                    textTransform: 'uppercase',
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
          background: 'linear-gradient(180deg, var(--black) 0%, var(--navy) 100%)',
        }}>
          <div className="container" ref={manifestoRef}>
            <div className="subheading manifesto-line" style={{ marginBottom: '2rem' }}>Our Manifesto</div>

            {[
              'We believe brands are living things — they breathe, evolve, and leave marks.',
              'We don\'t settle for visibility. We build presence.',
              'Every campaign we create is a statement. Every strategy is a blueprint for legacy.',
              'We are Struders. We don\'t follow trends. We create them.',
            ].map((line, i) => (
              <div key={i} className="manifesto-line" style={{
                fontFamily: i === 3 ? 'var(--font-serif)' : 'var(--font-heading)',
                fontSize: i === 3 ? 'clamp(1.5rem, 3vw, 2.5rem)' : 'clamp(1rem, 2vw, 1.4rem)',
                fontWeight: i === 3 ? 400 : 300,
                fontStyle: i === 3 ? 'italic' : 'normal',
                color: i === 3 ? 'var(--gold)' : 'var(--white-dim)',
                lineHeight: 1.6,
                borderLeft: '2px solid rgba(201,168,76,0.3)',
                paddingLeft: '2rem',
                marginBottom: '1.5rem',
                maxWidth: '800px',
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
