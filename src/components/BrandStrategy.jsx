import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

export default function WebDev() {
  const sectionRef = useRef(null)
  const codeRef = useRef(null)
  const linesRef = useRef([])
  const cursorRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.wd-heading'),
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      )

      // Typewriter line by line
      linesRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, delay: i * 0.18, ease: 'power1.out',
            scrollTrigger: { trigger: codeRef.current, start: 'top 85%', once: true } }
        )
      })

      // Blinking cursor
      gsap.to(cursorRef.current, {
        opacity: 0, duration: 0.6, repeat: -1, yoyo: true, ease: 'none'
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section" style={{
      background: 'linear-gradient(135deg, var(--navy) 0%, var(--black) 100%)',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>

          {/* Left: Code terminal */}
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
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              {['#C94F4F','#C9A84C','#4FC97A'].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
              ))}
              <span style={{ color: 'var(--white-muted)', fontSize: '0.65rem', marginLeft: '0.5rem', letterSpacing: '0.1em' }}>
                struders.js
              </span>
            </div>

            {/* Code lines */}
            <div style={{ padding: '1.5rem', lineHeight: 1.8 }}>
              {codeLines.map((line, i) => (
                <div
                  key={i}
                  ref={el => linesRef.current[i] = el}
                  style={{
                    paddingLeft: `${line.indent * 1.5}rem`,
                    fontSize: '0.82rem',
                    color: line.color || 'var(--white-dim)',
                    letterSpacing: '0.02em',
                    minHeight: '1.6rem',
                  }}
                >
                  <span style={{ color: 'rgba(201,168,76,0.25)', marginRight: '1rem', userSelect: 'none', fontSize: '0.65rem' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {line.text}
                </div>
              ))}

              {/* Cursor */}
              <div style={{ paddingLeft: '0', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                <span style={{ color: 'rgba(201,168,76,0.25)', marginRight: '1rem', fontSize: '0.65rem' }}>09</span>
                <span ref={cursorRef} style={{
                  display: 'inline-block',
                  width: '8px', height: '16px',
                  background: 'var(--gold)',
                  verticalAlign: 'middle',
                }} />
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="wd-heading">
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

            {/* Feature list */}
            {['Brand Positioning', 'Market Research', 'Growth Roadmaps', 'Competitive Analysis'].map(f => (
              <div key={f} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                marginBottom: '0.9rem',
              }}>
                <div style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: 'var(--gold)',
                  boxShadow: '0 0 8px rgba(201,168,76,0.5)',
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: 'var(--white-dim)',
                  letterSpacing: '0.05em',
                }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
