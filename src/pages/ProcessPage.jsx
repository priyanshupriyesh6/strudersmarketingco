import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VideoScrollScene from '../components/VideoScrollScene'

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
  { indent: 1, text: 'strategy: "premium",',         color: 'var(--white-dim)' },
  { indent: 1, text: 'audience: "global",',           color: 'var(--white-dim)' },
  { indent: 1, text: 'impact: Infinity,',             color: '#7ec8e3' },
  { indent: 0, text: '})',                            color: 'var(--gold)' },
  { indent: 0, text: '',                              color: '' },
  { indent: 0, text: 'brand.launch()',                color: '#a8e6a3' },
  { indent: 0, text: '// → Building presence...',    color: 'var(--white-muted)' },
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
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 1.1, ease: 'power4.out', delay: 0.3 }
      )

      // Steps — pinned scrub reveal
      stepsRef.current.forEach((step, i) => {
        if (!step) return
        gsap.fromTo(step,
          { opacity: 0, x: i % 2 === 0 ? -80 : 80, scale: 0.95 },
          {
            opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 78%', once: true }
          }
        )

        // Step number count animation
        const numEl = step.querySelector('.step-number')
        if (numEl) {
          gsap.fromTo(numEl,
            { opacity: 0, scale: 0.5 },
            {
              opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)',
              scrollTrigger: { trigger: step, start: 'top 80%', once: true }
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
              scrollTrigger: { trigger: step, start: 'center 70%', once: true }
            }
          )
        }
      })

      // Code terminal typewriter
      linesRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.4, delay: i * 0.18, ease: 'power1.out',
            scrollTrigger: { trigger: codeRef.current, start: 'top 85%', once: true }
          }
        )
      })

      // Blinking cursor
      gsap.to(cursorRef.current, { opacity: 0, duration: 0.6, repeat: -1, yoyo: true, ease: 'none' })
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
          background: 'linear-gradient(180deg, var(--navy) 0%, var(--black) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Animated grid */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />

          <div className="container" ref={heroRef}>
            <div className="subheading proc-hero-el" style={{ marginBottom: '1.5rem' }}>How We Work</div>
            <h1 className="heading-xl proc-hero-el" style={{ color: 'var(--white)', marginBottom: '0.5rem' }}>
              THE STRUDERS
            </h1>
            <h1 className="heading-xl proc-hero-el" style={{ color: 'var(--gold)', marginBottom: '2rem' }}>
              PROCESS.
            </h1>
            <p className="body-text proc-hero-el" style={{ maxWidth: '560px' }}>
              Five proven phases. Every engagement follows this precision framework —
              because great brands aren't built by accident, they're engineered.
            </p>
          </div>
        </section>

        {/* ── Brand Video Scroll ──────────────────────────────────────── */}
        <VideoScrollScene height="160vh" label="Process — How We Work" />

        {/* ── Process Steps ───────────────────────────────────────────── */}
        <section className="section" style={{ background: 'var(--black)' }}>
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
                      marginBottom: i < steps.length - 1 ? '0' : '0',
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
                            width: '1px',
                            height: '60px',
                            background: 'linear-gradient(to bottom, var(--gold-dim), rgba(201,168,76,0.3))',
                          }}
                        />
                      )}

                      {/* Number node */}
                      <div className="step-number" style={{
                        width: '64px', height: '64px',
                        borderRadius: '50%',
                        border: '1px solid var(--gold)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(201,168,76,0.05)',
                        boxShadow: '0 0 30px rgba(201,168,76,0.1)',
                        flexShrink: 0,
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: 'var(--gold)',
                          letterSpacing: '0.1em',
                        }}>{step.number}</span>
                      </div>

                      {/* Bottom connector */}
                      {i < steps.length - 1 && (
                        <div style={{
                          width: '1px',
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
          background: 'linear-gradient(135deg, var(--navy) 0%, var(--black) 100%)',
        }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }} className="terminal-grid">
              {/* Terminal */}
              <div ref={codeRef} style={{
                background: 'rgba(5,5,5,0.8)',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '6px',
                overflow: 'hidden',
                fontFamily: 'var(--font-mono)',
              }}>
                {/* Terminal bar */}
                <div style={{
                  padding: '0.75rem 1rem',
                  background: 'rgba(255,255,255,0.03)',
                  borderBottom: '1px solid rgba(201,168,76,0.1)',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}>
                  {['#C94F4F', '#C9A84C', '#4FC97A'].map((c, i) => (
                    <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
                  ))}
                  <span style={{ color: 'var(--white-muted)', fontSize: '0.65rem', marginLeft: '0.5rem', letterSpacing: '0.1em' }}>
                    struders.js
                  </span>
                </div>
                <div style={{ padding: '1.5rem', lineHeight: 1.8 }}>
                  {codeLines.map((line, i) => (
                    <div key={i} ref={el => linesRef.current[i] = el} style={{
                      paddingLeft: `${line.indent * 1.5}rem`,
                      fontSize: '0.82rem',
                      color: line.color || 'var(--white-dim)',
                      letterSpacing: '0.02em',
                      minHeight: '1.6rem',
                    }}>
                      <span style={{ color: 'rgba(201,168,76,0.25)', marginRight: '1rem', userSelect: 'none', fontSize: '0.65rem' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {line.text}
                    </div>
                  ))}
                  <div style={{ paddingLeft: '0', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                    <span style={{ color: 'rgba(201,168,76,0.25)', marginRight: '1rem', fontSize: '0.65rem' }}>09</span>
                    <span ref={cursorRef} style={{
                      display: 'inline-block', width: '8px', height: '16px',
                      background: 'var(--gold)', verticalAlign: 'middle',
                    }} />
                  </div>
                </div>
              </div>

              {/* Text */}
              <div>
                <div className="subheading" style={{ marginBottom: '1rem' }}>Strategy & Growth</div>
                <h2 className="heading-lg" style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>
                  STRATEGY THAT<br />
                  DRIVES <span style={{ color: 'var(--gold)' }}>GROWTH</span>
                </h2>
                <p className="body-text" style={{ marginBottom: '2rem' }}>
                  Every successful brand starts with a blueprint. We craft precision strategies —
                  roadmaps built on insight, culture, and data — that guide brands toward
                  measurable, lasting growth.
                </p>
                {['Brand Positioning', 'Market Research', 'Growth Roadmaps', 'Competitive Analysis'].map(f => (
                  <div key={f} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.9rem',
                  }}>
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: 'var(--gold)', boxShadow: '0 0 8px rgba(201,168,76,0.5)', flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: 'var(--font-heading)', fontSize: '0.95rem',
                      fontWeight: 400, color: 'var(--white-dim)', letterSpacing: '0.05em',
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
    <div className="glass-card" style={{
      padding: '2rem',
      textAlign: align,
      maxWidth: '460px',
      marginLeft: align === 'right' ? 'auto' : '0',
    }}>
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
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          color: 'var(--gold)',
          border: '1px solid rgba(201,168,76,0.3)',
          padding: '0.2rem 0.6rem',
          textTransform: 'uppercase',
        }}>{step.duration}</span>
      </div>

      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.2rem',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--white)',
        marginBottom: '0.75rem',
      }}>{step.title}</h3>

      <p style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '0.875rem',
        fontWeight: 300,
        lineHeight: 1.7,
        color: 'var(--white-dim)',
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
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            letterSpacing: '0.1em',
            color: 'var(--white-muted)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '0.2rem 0.5rem',
            borderRadius: '2px',
            textTransform: 'uppercase',
          }}>{d}</span>
        ))}
      </div>
    </div>
  )
}
