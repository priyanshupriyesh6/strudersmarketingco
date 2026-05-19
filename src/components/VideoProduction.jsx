import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reels = [
  { title: 'Cinematic Brand Film', tag: 'Commercial', duration: '2:30' },
  { title: 'Luxury Product Reveal', tag: 'Campaign',  duration: '1:45' },
  { title: 'Event Highlights Reel', tag: 'Event',     duration: '3:10' },
]

export default function VideoProduction() {
  const sectionRef = useRef(null)
  const reelRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.vp-heading'),
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )

      reelRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: i * 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current.querySelector('.reels-row'), start: 'top 85%', once: true } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section" style={{
      background: 'var(--black)',
    }}>
      <div className="container">
        <div className="vp-heading" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="subheading" style={{ marginBottom: '1rem' }}>Video Production</div>
          <h2 className="heading-lg" style={{ color: 'var(--white)' }}>
            STORIES THAT <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>MOVE</span> PEOPLE
          </h2>
          <span className="gold-line-center" style={{ marginTop: '1.5rem' }} />
          <p className="body-text" style={{ marginTop: '1.5rem', maxWidth: '540px', margin: '1.5rem auto 0' }}>
            From cinematic brand films to viral social reels, we craft visual stories
            that captivate, inspire, and leave a lasting impression.
          </p>
        </div>

        {/* Reel cards */}
        <div className="reels-row" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}>
          {reels.map((reel, i) => (
            <div
              key={reel.title}
              ref={el => reelRefs.current[i] = el}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.borderColor = 'var(--gold)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(201,168,76,0.1)'
                e.currentTarget.querySelector('.reel-overlay').style.opacity = '1'
                e.currentTarget.querySelector('.play-btn').style.transform = 'translate(-50%, -50%) scale(1.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.12)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.querySelector('.reel-overlay').style.opacity = '0'
                e.currentTarget.querySelector('.play-btn').style.transform = 'translate(-50%, -50%) scale(1)'
              }}
              style={{
                height: '340px', position: 'relative', overflow: 'hidden', borderRadius: '2px',
                border: '1px solid rgba(201,168,76,0.12)', cursor: 'pointer',
                background: `linear-gradient(${135 + i * 15}deg, #0d0a02 0%, #1a1208 40%, #050503 100%)`,
                transition: 'all 0.4s var(--ease-smooth)',
              }}
            >
              {/* Light leak effect */}
              <div style={{
                position: 'absolute',
                top: '-30%', left: '-10%',
                width: '60%', height: '160%',
                background: 'linear-gradient(45deg, transparent, rgba(201,168,76,0.04), transparent)',
                transform: 'rotate(20deg)',
                transition: 'opacity 0.3s',
              }} />

              {/* Film grain texture */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.02) 1px, transparent 1px)',
                backgroundSize: '4px 4px',
                opacity: 0.5,
              }} />

              {/* Hover overlay */}
              <div className="reel-overlay" style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.3)',
                opacity: 0,
                transition: 'opacity 0.3s',
              }} />

              {/* Play button */}
              <div className="play-btn" style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '56px', height: '56px',
                borderRadius: '50%',
                border: '1.5px solid var(--gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.3s var(--ease-smooth)',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)',
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 5l9 5-9 5V5z" fill="var(--gold)" />
                </svg>
              </div>

              {/* Duration badge */}
              <div style={{
                position: 'absolute', top: '1rem', right: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--white-dim)',
                background: 'rgba(0,0,0,0.6)',
                padding: '0.25rem 0.5rem',
                borderRadius: '2px',
                letterSpacing: '0.1em',
              }}>{reel.duration}</div>

              {/* Tag */}
              <div style={{
                position: 'absolute', top: '1rem', left: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--gold)',
                border: '1px solid rgba(201,168,76,0.3)',
                padding: '0.2rem 0.6rem',
                borderRadius: '2px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}>{reel.tag}</div>

              {/* Bottom info */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '1.25rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: 'var(--white)',
                  textTransform: 'uppercase',
                }}>{reel.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .reels-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
