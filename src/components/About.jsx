import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  { icon: '◈', label: 'Strategy',   desc: 'Data-led planning' },
  { icon: '◎', label: 'Creativity', desc: 'Bold, original ideas' },
  { icon: '◉', label: 'Culture',    desc: 'Trend-native thinking' },
  { icon: '◆', label: 'Impact',     desc: 'Measurable results' },
]

export default function About() {
  const sectionRef  = useRef(null)
  const headingRef  = useRef(null)
  const textRef     = useRef(null)
  const pillarsRef  = useRef(null)
  const rightRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' } }
      )

      gsap.fromTo(textRef.current.querySelectorAll('p'),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.18, ease: 'power2.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 80%' } }
      )

      gsap.fromTo(pillarsRef.current.querySelectorAll('.pillar-item'),
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: pillarsRef.current, start: 'top 85%' } }
      )

      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%' } }
      )

      // Parallax
      gsap.to(rightRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section" style={{
      background: 'var(--black)',
    }}>
      {/* Dot grid background */}
      <div className="bg-dots" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4 }} />

      {/* Side glow */}
      <div style={{
        position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
        width: '500px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          alignItems: 'center',
        }}>
          {/* Left: Text */}
          <div>
            {/* Label */}
            <div className="section-label" style={{ marginBottom: '1.25rem' }}>
              <span className="text-label" style={{ color: 'var(--gold)' }}>About Struders</span>
            </div>

            {/* Heading */}
            <div ref={headingRef} style={{ marginBottom: '1.5rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--text-primary)',
              }}>
                We Don't Just{' '}
                <span className="text-gradient">Market.</span>
                <br />
                We Create{' '}
                <span className="text-gradient">Presence.</span>
              </h2>
            </div>

            {/* Body text */}
            <div ref={textRef} style={{ marginBottom: '2.5rem' }}>
              <p className="text-body" style={{ marginBottom: '1.25rem' }}>
                At Struders Marketing Co., we blend strategy, creativity, and culture
                to build impactful digital identities. From influencer management to
                cinematic campaigns, we create experiences that connect, engage, and grow.
              </p>
              <p className="text-body">
                We don't settle for visibility — we build presence. Every brand we
                touch leaves a mark on the culture it inhabits.
              </p>
            </div>

            {/* Pillars */}
            <div ref={pillarsRef} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0.75rem',
            }}>
              {pillars.map(p => (
                <div
                  key={p.label}
                  className="pillar-item"
                  style={{
                    padding: '1.25rem 0.875rem',
                    textAlign: 'center',
                    background: 'var(--glass)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    cursor: 'default',
                    transition: 'border-color 0.25s, background 0.25s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'
                    e.currentTarget.style.background = 'rgba(201,168,76,0.05)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.background = 'var(--glass)'
                  }}
                >
                  <div style={{ fontSize: '1.2rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>{p.icon}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem', letterSpacing: '-0.005em' }}>{p.label}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', color: 'var(--text-tertiary)', fontWeight: 400 }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div ref={rightRef} style={{ position: 'relative', height: '520px' }}>
            {/* Large SM monogram */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="360" height="360" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="aboutGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F0CC6E" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#8B6914" stopOpacity="0.04" />
                  </linearGradient>
                </defs>
                <text x="4" y="72" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="72" fill="url(#aboutGoldGrad)">S</text>
                <text x="44" y="68" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="56" fill="url(#aboutGoldGrad)">M</text>
              </svg>
            </div>

            {/* Central orb */}
            <div style={{
              position: 'absolute',
              width: '280px', height: '280px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              filter: 'blur(20px)',
              animation: 'floatSlow 8s ease-in-out infinite',
            }} />

            {/* Floating stat cards */}
            {[
              { value: '150+', label: 'Projects Delivered', style: { top: '8%', right: '5%' } },
              { value: '80+',  label: 'Happy Clients',      style: { top: '43%', left: '0%' } },
              { value: '250M+',label: 'Audience Reached',   style: { bottom: '8%', right: '8%' } },
            ].map(s => (
              <div
                key={s.label}
                style={{
                  position: 'absolute',
                  padding: '1rem 1.25rem',
                  background: 'rgba(10,10,10,0.85)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '14px',
                  backdropFilter: 'blur(16px)',
                  minWidth: '140px',
                  ...s.style,
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: '0.3rem',
                }} className="text-gradient">{s.value}</div>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.65rem',
                  color: 'var(--text-tertiary)',
                  fontWeight: 400,
                  letterSpacing: '0.04em',
                }}>{s.label}</div>
              </div>
            ))}

            {/* Decorative ring */}
            <div style={{
              position: 'absolute',
              width: '320px', height: '320px',
              borderRadius: '50%',
              border: '1px solid rgba(201,168,76,0.06)',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'spin-slow 30s linear infinite',
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -55%) scale(1.05); }
        }
        @media (max-width: 900px) {
          #about .container > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
          #about .container > div > div:last-child { height: 300px !important; }
        }
      `}</style>
    </section>
  )
}
