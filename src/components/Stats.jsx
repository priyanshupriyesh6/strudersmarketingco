import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered', icon: '◈' },
  { value: 80,  suffix: '+', label: 'Happy Clients',      icon: '◎' },
  { value: 250, suffix: 'M+', label: 'Audience Reached',  icon: '◉' },
  { value: 15,  suffix: '+', label: 'Industries Served',  icon: '◆' },
]

export default function Stats() {
  const sectionRef = useRef(null)
  const countersRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      countersRef.current.forEach((el, i) => {
        if (!el) return
        const target = stats[i].value
        const numEl = el.querySelector('.counter-num')

        gsap.fromTo({ val: 0 },
          { val: 0 },
          {
            val: target,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: function () {
              numEl.textContent = Math.floor(this.targets()[0].val)
            },
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            }
          }
        )

        // Fade in
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.7,
            delay: i * 0.12,
            ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true }
          }
        )
      })

      // Gold line sweep
      gsap.fromTo(sectionRef.current.querySelector('.stats-line'),
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', once: true }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      padding: '5rem 0',
      background: 'linear-gradient(90deg, var(--navy) 0%, var(--black) 50%, var(--navy) 100%)',
      overflow: 'hidden',
    }}>
      {/* Top line */}
      <div className="stats-line" style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
        transformOrigin: 'left',
      }} />
      {/* Bottom line */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold-dim), transparent)',
      }} />

      {/* Moving glow */}
      <div style={{
        position: 'absolute',
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        animation: 'float 8s ease-in-out infinite',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
        }}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              ref={el => countersRef.current[i] = el}
              style={{
                textAlign: 'center',
                padding: '2rem 1rem',
                borderRight: i < stats.length - 1 ? '1px solid rgba(201,168,76,0.1)' : 'none',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                color: 'var(--gold)',
                marginBottom: '0.75rem',
                opacity: 0.7,
              }}>{s.icon}</div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                fontWeight: 700,
                color: 'var(--white)',
                lineHeight: 1,
                marginBottom: '0.4rem',
              }}>
                <span className="counter-num">0</span>
                <span style={{ color: 'var(--gold)' }}>{s.suffix}</span>
              </div>
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
        @media (max-width: 700px) {
          #stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  )
}
