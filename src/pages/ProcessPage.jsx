import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Discovery & Audit',
    desc: 'We deep-dive into your brand ecosystem — analyzing your audience, competitors, cultural moment, and current presence to map the opportunity landscape.',
    icon: '◈',
    duration: '1–2 Weeks',
    deliverables: ['Brand Audit Report', 'Competitor Analysis', 'Audience Personas'],
  },
  {
    number: '02',
    title: 'Strategy Blueprint',
    desc: 'Every insight becomes a decision. We craft a precision roadmap — positioning, messaging, channel strategy, and campaign architecture — built for your specific growth goals.',
    icon: '◎',
    duration: '1–2 Weeks',
    deliverables: ['Brand Strategy Doc', 'Content Framework', 'Campaign Calendar'],
  },
  {
    number: '03',
    title: 'Creative Development',
    desc: 'Ideas become assets. From cinematic video production to editorial campaigns and digital content systems, we create work that\'s impossible to ignore.',
    icon: '◉',
    duration: '2–4 Weeks',
    deliverables: ['Creative Concepts', 'Visual Assets', 'Video & Content'],
  },
  {
    number: '04',
    title: 'Execution & Launch',
    desc: 'Flawless execution across every channel. We orchestrate paid media, influencer activations, PR pushes, and organic content in perfect synchrony.',
    icon: '◆',
    duration: '4–12 Weeks',
    deliverables: ['Campaign Launch', 'Media Buying', 'Influencer Activation'],
  },
  {
    number: '05',
    title: 'Measure & Optimize',
    desc: 'We track every signal. Real-time dashboards, weekly performance calls, and continuous optimization ensure your investment keeps compounding.',
    icon: '✦',
    duration: 'Ongoing',
    deliverables: ['Analytics Dashboard', 'Weekly Reports', 'Growth Recommendations'],
  },
]

const codeLines = [
  { indent: 0, text: 'const brand = new Struders({', color: 'var(--gold)' },
  { indent: 1, text: 'strategy: "premium",',         color: 'var(--text-secondary)' },
  { indent: 1, text: 'audience: "global",',           color: 'var(--text-secondary)' },
  { indent: 1, text: 'impact: Infinity,',             color: '#7ec8e3' },
  { indent: 0, text: '})',                            color: 'var(--gold)' },
  { indent: 0, text: '',                              color: '' },
  { indent: 0, text: 'brand.launch()',                color: '#a8e6a3' },
  { indent: 0, text: '// → Building presence...',    color: 'var(--text-tertiary)' },
]

export default function ProcessPage() {
  const heroRef    = useRef(null)
  const stepsRef   = useRef([])
  const codeRef    = useRef(null)
  const linesRef   = useRef([])
  const cursorRef  = useRef(null)
  const connectorRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(heroRef.current.querySelectorAll('.proc-hero-el'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 1.1, ease: 'power3.out', delay: 0.2 }
      )

      // Steps — pinned scrub reveal
      stepsRef.current.forEach((step, i) => {
        if (!step) return
        gsap.fromTo(step,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40, scale: 0.98 },
          {
            opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 80%', once: true }
          }
        )

        // Step number count animation
        const numEl = step.querySelector('.step-number')
        if (numEl) {
          gsap.fromTo(numEl,
            { opacity: 0, scale: 0.5 },
            {
              opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)',
              scrollTrigger: { trigger: step, start: 'top 85%', once: true }
            }
          )
        }

        // Connector lines
        const connector = connectorRefs.current[i]
        if (connector) {
          gsap.fromTo(connector,
            { scaleY: 0, transformOrigin: 'top' },
            {
              scaleY: 1, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: step, start: 'center 75%', once: true }
            }
          )
        }
      })

      // Code terminal typewriter
      linesRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { opacity: 0, x: -10 },
          {
            opacity: 1, x: 0, duration: 0.4, delay: i * 0.18, ease: 'power1.out',
            scrollTrigger: { trigger: codeRef.current, start: 'top 85%', once: true }
          }
        )
      })

      // Blinking cursor
      gsap.to(cursorRef.current, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: 'steps(1)' })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        {/* ── Page Hero ───────────────────────────────────────────────── */}
        <section style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'flex-end',
          paddingTop: '10rem',
          paddingBottom: '5rem',
          background: 'var(--black)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Animated grid */}
          <div className="bg-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5 }} />

          {/* Radial glow */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '10%',
            transform: 'translateY(-50%)',
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div className="container" ref={heroRef} style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-label proc-hero-el" style={{ marginBottom: '1.5rem' }}>
              <span className="text-label" style={{ color: 'var(--gold)' }}>How We Work</span>
            </div>
            <h1 className="text-h1 proc-hero-el" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              THE STRUDERS
            </h1>
            <h1 className="text-h1 proc-hero-el text-gradient-animated" style={{ marginBottom: '2rem' }}>
              PROCESS.
            </h1>
            <p className="text-body proc-hero-el" style={{ maxWidth: '560px' }}>
              Five proven phases. Every engagement follows this precision framework —
              because great brands aren't built by accident, they're engineered.
            </p>
          </div>
        </section>

        {/* ── Process Steps ───────────────────────────────────────────── */}
        <section className="section" style={{ background: 'var(--surface-0)' }}>
          <div className="container">
            <div style={{ position: 'relative' }}>
              {steps.map((step, i) => (
                <div key={step.number}>
                  {/* Step card — alternating sides */}
                  <div
                    ref={el => stepsRef.current[i] = el}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: i % 2 === 0 ? '1fr auto 1fr' : '1fr auto 1fr',
                      gap: '0',
                      alignItems: 'center',
                    }}
                    className="process-step-row"
                  >
                    {/* Left side */}
                    <div style={{ padding: '2.5rem', textAlign: 'right', display: i % 2 === 0 ? 'block' : 'none' }}>
                      <ProcessCard step={step} align="right" />
                    </div>
                    <div style={{ padding: '2.5rem', textAlign: 'right', display: i % 2 !== 0 ? 'block' : 'none', visibility: 'hidden' }}>
                      {/* Spacer */}
                    </div>

                    {/* Center — number node */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '100px',
                    }}>
                      {/* Top connector */}
                      {i > 0 && (
                        <div
                          ref={el => connectorRefs.current[i - 1] = el}
                          style={{
                            width: '2px',
                            height: '60px',
                            background: 'linear-gradient(to bottom, var(--gold-dim), rgba(201,168,76,0.3))',
                          }}
                        />
                      )}

                      {/* Number node */}
                      <div className="step-number" style={{
                        width: '64px', height: '64px',
                        borderRadius: '50%',
                        border: '1px solid rgba(201,168,76,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(20,20,20,0.5)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 0 20px rgba(0,0,0,0.2)',
                        flexShrink: 0,
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: 'var(--gold)',
                          letterSpacing: '0.05em',
                        }}>{step.number}</span>
                      </div>

                      {/* Bottom connector */}
                      {i < steps.length - 1 && (
                        <div style={{
                          width: '2px',
                          height: '60px',
                          background: 'linear-gradient(to bottom, rgba(201,168,76,0.3), transparent)',
                        }} />
                      )}
                    </div>

                    {/* Right side */}
                    <div style={{ padding: '2.5rem', display: i % 2 !== 0 ? 'block' : 'block' }}>
                      {i % 2 !== 0
                        ? <ProcessCard step={step} align="left" />
                        : <div style={{ visibility: 'hidden' }}><ProcessCard step={step} align="left" /></div>
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 768px) {
              .process-step-row { grid-template-columns: auto 1fr !important; }
            }
          `}</style>
        </section>

        {/* ── Code Terminal Section ────────────────────────────────────── */}
        <section className="section" style={{
          background: 'var(--black)',
        }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }} className="terminal-grid">
              {/* Terminal */}
              <div ref={codeRef} className="glass-card" style={{
                background: 'rgba(10,10,10,0.8)',
                borderRadius: '12px',
                overflow: 'hidden',
                padding: 0,
                border: '1px solid var(--border)',
              }}>
                {/* Terminal bar */}
                <div style={{
                  padding: '1rem 1.25rem',
                  background: 'rgba(255,255,255,0.02)',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}>
                  {['#ff5f56', '#ffbd2e', '#27c93f'].map((c, i) => (
                    <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
                  ))}
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', marginLeft: '0.5rem', letterSpacing: '0.05em', fontFamily: 'monospace' }}>
                    struders.js
                  </span>
                </div>
                <div style={{ padding: '1.5rem', lineHeight: 1.8, fontFamily: 'monospace' }}>
                  {codeLines.map((line, i) => (
                    <div key={i} ref={el => linesRef.current[i] = el} style={{
                      paddingLeft: `${line.indent * 1.5}rem`,
                      fontSize: '0.85rem',
                      color: line.color || 'var(--text-secondary)',
                      letterSpacing: '0.02em',
                      minHeight: '1.6rem',
                    }}>
                      <span style={{ color: 'rgba(255,255,255,0.15)', marginRight: '1rem', userSelect: 'none', fontSize: '0.75rem' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {line.text}
                    </div>
                  ))}
                  <div style={{ paddingLeft: '0', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.15)', marginRight: '1rem', fontSize: '0.75rem' }}>09</span>
                    <span ref={cursorRef} style={{
                      display: 'inline-block', width: '8px', height: '16px',
                      background: 'var(--gold)', verticalAlign: 'middle',
                    }} />
                  </div>
                </div>
              </div>

              {/* Text */}
              <div>
                <div className="section-label" style={{ marginBottom: '1rem' }}>
                  <span className="text-label" style={{ color: 'var(--text-secondary)' }}>Strategy & Growth</span>
                </div>
                <h2 className="text-h2" style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                  STRATEGY THAT<br />
                  DRIVES <span className="text-gradient">GROWTH</span>
                </h2>
                <p className="text-body" style={{ marginBottom: '2rem' }}>
                  Every successful brand starts with a blueprint. We craft precision strategies —
                  roadmaps built on insight, culture, and data — that guide brands toward
                  measurable, lasting growth.
                </p>
                {['Brand Positioning', 'Market Research', 'Growth Roadmaps', 'Competitive Analysis'].map(f => (
                  <div key={f} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem',
                  }}>
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: 'var(--gold)', boxShadow: '0 0 8px rgba(201,168,76,0.5)', flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: 'var(--font-sans)', fontSize: '1rem',
                      fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: '-0.01em',
                    }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .terminal-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
            }
          `}</style>
        </section>
      </main>
      <Footer />
    </div>
  )
}

// ── Process Card sub-component ────────────────────────────────────────────────
function ProcessCard({ step, align }) {
  return (
    <div className="glass-card tilt-card" style={{
      padding: '2rem',
      textAlign: align,
      maxWidth: '460px',
      marginLeft: align === 'right' ? 'auto' : '0',
      borderRadius: '16px',
      position: 'relative',
    }}
    onMouseMove={(e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -6;
      const rotY = ((x - cx) / cx) * 8;
      
      gsap.to(card, {
        rotateX: rotX,
        rotateY: rotY,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800,
      });
    }}
    onMouseLeave={(e) => {
      gsap.to(e.currentTarget, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: 'power3.out',
        transformPerspective: 800,
      });
    }}
    >
      {/* Icon + Duration */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        marginBottom: '1rem',
      }}>
        <span style={{ fontSize: '1.4rem', color: 'var(--gold)' }}>{step.icon}</span>
        <span style={{
          display: 'inline-block',
          padding: '0.2rem 0.6rem',
          borderRadius: '9999px',
          fontSize: '0.65rem',
          fontWeight: 600,
          fontFamily: 'var(--font-sans)',
          background: 'rgba(201,168,76,0.1)',
          border: '1px solid rgba(201,168,76,0.2)',
          color: 'var(--gold)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>{step.duration}</span>
      </div>

      <h3 style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '1.25rem',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'var(--text-primary)',
        marginBottom: '0.75rem',
      }}>{step.title}</h3>

      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.9rem',
        fontWeight: 400,
        lineHeight: 1.7,
        color: 'var(--text-secondary)',
        marginBottom: '1.25rem',
      }}>{step.desc}</p>

      {/* Deliverables */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      }}>
        {step.deliverables.map(d => (
          <span key={d} style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.02em',
            color: 'var(--text-tertiary)',
            border: '1px solid var(--border)',
            padding: '0.3rem 0.6rem',
            borderRadius: '9999px',
          }}>{d}</span>
        ))}
      </div>
    </div>
  )
}
