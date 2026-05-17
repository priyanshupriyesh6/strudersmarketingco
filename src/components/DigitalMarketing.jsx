import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  { label: 'Reach', value: '250M+' },
  { label: 'Engagement Rate', value: '8.4%' },
  { label: 'Avg. ROI', value: '340%' },
  { label: 'Campaigns', value: '150+' },
]

export default function DigitalMarketing() {
  const sectionRef = useRef(null)
  const chartRef = useRef(null)
  const barsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(sectionRef.current.querySelector('.dm-heading'),
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      )

      // Metric cards
      gsap.fromTo(sectionRef.current.querySelectorAll('.metric-card'),
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.7, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.metrics-row'), start: 'top 85%', once: true } }
      )

      // Animated bars growing upward
      const barHeights = [55, 75, 45, 90, 65, 85, 70]
      barsRef.current.forEach((bar, i) => {
        if (!bar) return
        gsap.fromTo(bar,
          { scaleY: 0, transformOrigin: 'bottom' },
          {
            scaleY: 1,
            duration: 1,
            delay: i * 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: chartRef.current, start: 'top 85%', once: true }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const barData = [55, 75, 45, 90, 65, 85, 70]

  return (
    <section id="process" ref={sectionRef} className="section" style={{
      background: 'linear-gradient(135deg, var(--black) 0%, var(--navy) 60%, var(--black) 100%)',
    }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(201,168,76,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.02) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="container">
        {/* Label */}
        <div className="subheading" style={{ marginBottom: '1rem' }}>Digital Marketing</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          {/* Left text */}
          <div className="dm-heading">
            <h2 className="heading-lg" style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>
              DIGITAL MARKETING<br />
              THAT CREATES <span style={{ color: 'var(--gold)' }}>IMPACT</span>
            </h2>
            <p className="body-text" style={{ marginBottom: '2.5rem' }}>
              We deploy data-driven strategies that amplify your brand across every channel —
              turning audiences into communities and clicks into loyal customers.
            </p>

            {/* Metric cards */}
            <div className="metrics-row" style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'
            }}>
              {metrics.map(m => (
                <div key={m.label} className="metric-card glass-card" style={{ padding: '1.25rem' }}>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    lineHeight: 1,
                  }}>{m.value}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: 'var(--white-dim)',
                    letterSpacing: '0.1em',
                    marginTop: '0.3rem',
                    textTransform: 'uppercase',
                  }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Animated chart */}
          <div ref={chartRef} style={{
            background: 'rgba(5,5,5,0.6)',
            border: '1px solid rgba(201,168,76,0.15)',
            borderRadius: '4px',
            padding: '2rem',
            position: 'relative',
          }}>
            {/* Chart header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.2em' }}>
                PERFORMANCE OVERVIEW
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['#','#','#'].map((_, i) => (
                  <div key={i} style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: i===0 ? 'var(--gold)' : 'rgba(201,168,76,0.2)'
                  }} />
                ))}
              </div>
            </div>

            {/* Bar chart */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '10px',
              height: '160px',
              padding: '0 0.5rem',
              borderBottom: '1px solid rgba(201,168,76,0.1)',
              marginBottom: '0.75rem',
            }}>
              {barData.map((h, i) => (
                <div key={i} ref={el => barsRef.current[i] = el} style={{
                  flex: 1,
                  height: `${h}%`,
                  background: i === 3
                    ? 'linear-gradient(to top, var(--gold-dim), var(--gold-light))'
                    : 'linear-gradient(to top, rgba(201,168,76,0.2), rgba(201,168,76,0.5))',
                  borderRadius: '2px 2px 0 0',
                  position: 'relative',
                  boxShadow: i === 3 ? '0 0 20px rgba(201,168,76,0.3)' : 'none',
                }} />
              ))}
            </div>

            {/* X-axis labels */}
            <div style={{ display: 'flex', gap: '10px', paddingBottom: '0.5rem', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
              {['Jan','Feb','Mar','Apr','May','Jun','Jul'].map((m, i) => (
                <div key={m} style={{
                  flex: 1,
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  color: 'var(--white-muted)',
                  letterSpacing: '0.05em',
                }}>{m}</div>
              ))}
            </div>

            {/* Floating glow particles */}
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: '4px', height: '4px',
                borderRadius: '50%',
                background: 'var(--gold)',
                boxShadow: '0 0 8px var(--gold)',
                top: `${20 + i * 15}%`,
                left: `${10 + i * 18}%`,
                animation: `float ${3 + i * 0.7}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
                opacity: 0.6,
              }} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #process .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
