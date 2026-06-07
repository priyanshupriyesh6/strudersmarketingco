import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered', desc: 'Across 15+ industries' },
  { value: 80,  suffix: '+', label: 'Happy Clients',      desc: 'Globally served' },
  { value: 250, suffix: 'M+', label: 'Audience Reached',  desc: 'Total impressions' },
  { value: 340, suffix: '%', label: 'Avg Growth',          desc: 'Client performance' },
]

export default function Stats() {
  const sectionRef  = useRef(null)
  const countersRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      countersRef.current.forEach((el, i) => {
        if (!el) return
        const target = stats[i].value
        const numEl = el.querySelector('.counter-num')

        gsap.fromTo({ val: 0 }, { val: 0 }, {
          val: target,
          duration: 2.5,
          ease: 'power2.out',
          onUpdate: function () {
            numEl.textContent = Math.floor(this.targets()[0].val)
          },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        })

        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      padding: '5rem 0',
      background: 'var(--surface-0)',
      overflow: 'hidden',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      {/* Top glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '200px',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0',
        }}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              ref={el => countersRef.current[i] = el}
              style={{
                padding: '2.5rem 2rem',
                borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {/* Number */}
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                marginBottom: '0.4rem',
              }}>
                <span className="counter-num">0</span>
                <span className="text-gradient">{s.suffix}</span>
              </div>

              {/* Label */}
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '0.25rem',
                letterSpacing: '-0.01em',
              }}>{s.label}</div>

              {/* Sub-label */}
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                color: 'var(--text-tertiary)',
                fontWeight: 400,
              }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          section [style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  )
}
