import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  { icon: '◈', label: 'Strategy' },
  { icon: '◎', label: 'Creativity' },
  { icon: '◉', label: 'Culture' },
  { icon: '◆', label: 'Impact' },
]

export default function About() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const lineRef = useRef(null)
  const textRef = useRef(null)
  const pillarsRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          }
        }
      )

      // Gold line expand
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.2, ease: 'power2.out',
          transformOrigin: 'left',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 80%',
          }
        }
      )

      // Text stagger
      gsap.fromTo(textRef.current.querySelectorAll('p'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.2, ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          }
        }
      )

      // Pillars stagger
      gsap.fromTo(pillarsRef.current.querySelectorAll('.pillar-item'),
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, stagger: 0.15, ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: 'top 85%',
          }
        }
      )

      // Parallax on the right decorative element
      gsap.to(imageRef.current, {
        y: -60,
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
      background: 'linear-gradient(180deg, var(--black) 0%, var(--navy) 100%)',
    }}>
      {/* Background grid lines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
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
            <div className="subheading" style={{ marginBottom: '1.5rem' }}>
              About Us
            </div>

            <h2 ref={headingRef} className="heading-lg" style={{
              color: 'var(--white)',
              marginBottom: '0.5rem'
            }}>
              WE DON'T JUST<br />
              <span style={{ color: 'var(--gold)' }}>MARKET.</span>
            </h2>
            <h2 className="heading-lg" style={{
              color: 'var(--white)',
              marginBottom: '1.5rem'
            }}>
              WE CREATE <span style={{ color: 'var(--gold)' }}>PRESENCE.</span>
            </h2>

            <div ref={lineRef} style={{
              width: '80px',
              height: '2px',
              background: 'linear-gradient(90deg, var(--gold), transparent)',
              marginBottom: '2rem',
            }} />

            <div ref={textRef}>
              <p className="body-text" style={{ marginBottom: '1.25rem' }}>
                At Struders Marketing Co., we blend strategy, creativity, and culture
                to build impactful digital identities. From influencer management to
                cinematic campaigns, we create experiences that connect, engage, and grow.
              </p>
              <p className="body-text">
                We don't settle for visibility — we build presence. Every brand we
                touch leaves a mark on the culture it inhabits.
              </p>
            </div>

            {/* Pillars */}
            <div ref={pillarsRef} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem',
              marginTop: '3rem',
            }}>
              {pillars.map(p => (
                <div key={p.label} className="pillar-item glass-card" style={{
                  padding: '1.25rem 0.75rem',
                  textAlign: 'center',
                  cursor: 'default',
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    color: 'var(--gold)',
                    marginBottom: '0.5rem',
                  }}>{p.icon}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    color: 'var(--white-dim)',
                    textTransform: 'uppercase'
                  }}>{p.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Decorative visual */}
          <div ref={imageRef} style={{ position: 'relative', height: '500px' }}>
            {/* Large faint SM monogram */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="380" height="380" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="aboutGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F0CC6E" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#8B6914" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <text x="4" y="72" fontFamily="Rajdhani, sans-serif" fontWeight="700" fontSize="72" fill="url(#aboutGoldGrad)">S</text>
                <text x="44" y="68" fontFamily="Rajdhani, sans-serif" fontWeight="700" fontSize="56" fill="url(#aboutGoldGrad)">M</text>
              </svg>
            </div>

            {/* Glow orb */}
            <div style={{
              position: 'absolute',
              width: '300px', height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none'
            }} />

            {/* Stats cards floating */}
            {[
              { value: '150+', label: 'Projects Delivered', top: '10%', right: '5%' },
              { value: '80+', label: 'Happy Clients', top: '45%', left: '0%' },
              { value: '250M+', label: 'Audience Reached', bottom: '10%', right: '10%' },
            ].map(s => (
              <div key={s.label} className="glass-card" style={{
                position: 'absolute',
                padding: '1rem 1.25rem',
                top: s.top, bottom: s.bottom,
                left: s.left, right: s.right,
                minWidth: '130px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: 'var(--gold)',
                  lineHeight: 1,
                }}>{s.value}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--white-dim)',
                  letterSpacing: '0.1em',
                  marginTop: '0.25rem'
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about .container > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
          #about .pillar-item { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  )
}
