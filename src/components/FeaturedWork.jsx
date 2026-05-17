import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const works = [
  {
    id: 'luxury-redefined',
    title: 'Luxury Redefined',
    tag: 'Brand Identity',
    bg: 'linear-gradient(135deg, #1a1008 0%, #3d2a0a 50%, #0d0a05 100%)',
  },
  {
    id: 'influence-connects',
    title: 'Influence That Connects',
    tag: 'Influencer Campaign',
    bg: 'linear-gradient(135deg, #0a0d1a 0%, #1a2240 50%, #050810 100%)',
  },
  {
    id: 'drive-inspire',
    title: 'Drive. Inspire. Dominate.',
    tag: 'Performance Marketing',
    bg: 'linear-gradient(135deg, #0f0a00 0%, #2a1f00 50%, #0a0800 100%)',
  },
  {
    id: 'voices-inspire',
    title: 'Voices That Inspire',
    tag: 'Podcast Production',
    bg: 'linear-gradient(135deg, #0a0a12 0%, #1a1a2e 50%, #050508 100%)',
  },
  {
    id: 'timeless-elegance',
    title: 'Timeless Elegance',
    tag: 'Ad Campaign',
    bg: 'linear-gradient(135deg, #12100a 0%, #2e2510 50%, #080705 100%)',
  },
]

export default function FeaturedWork() {
  const sectionRef = useRef(null)
  const sliderRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.work-heading'),
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
        }
      )
      gsap.fromTo(sliderRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: sliderRef.current, start: 'top 85%', once: true }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Drag-to-scroll
  const onMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.pageX - sliderRef.current.offsetLeft
    scrollLeft.current = sliderRef.current.scrollLeft
    sliderRef.current.style.cursor = 'grabbing'
  }
  const onMouseUp = () => {
    isDragging.current = false
    sliderRef.current.style.cursor = 'grab'
  }
  const onMouseMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    sliderRef.current.scrollLeft = scrollLeft.current - walk
  }

  const scrollTo = (idx) => {
    setActiveIdx(idx)
    const card = sliderRef.current.querySelectorAll('.work-card')[idx]
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  return (
    <section id="work" ref={sectionRef} className="section" style={{
      background: 'linear-gradient(180deg, var(--navy) 0%, var(--black) 100%)',
      paddingBottom: '6rem',
    }}>
      <div className="container" style={{ marginBottom: '3rem' }}>
        <div className="work-heading" style={{ textAlign: 'center' }}>
          <div className="subheading" style={{ marginBottom: '1rem' }}>Featured Work</div>
          <h2 className="heading-lg" style={{ color: 'var(--white)' }}>
            MAKING IMPACT. CREATING{' '}
            <span style={{
              color: 'var(--gold)',
              fontStyle: 'italic',
              fontFamily: 'var(--font-serif)',
            }}>STORIES.</span>
          </h2>
          <span className="gold-line-center" style={{ marginTop: '1.5rem' }} />
        </div>
      </div>

      {/* Horizontal slider */}
      <div
        ref={sliderRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        style={{
          display: 'flex',
          gap: '1.5rem',
          overflowX: 'auto',
          paddingLeft: 'calc((100vw - 1280px) / 2 + 2rem)',
          paddingRight: 'calc((100vw - 1280px) / 2 + 2rem)',
          paddingBottom: '1rem',
          scrollbarWidth: 'none',
          cursor: 'grab',
          userSelect: 'none',
        }}
      >
        {works.map((work, i) => (
          <div
            key={work.id}
            id={`work-card-${work.id}`}
            className="work-card"
            onClick={() => setActiveIdx(i)}
            style={{
              flex: '0 0 320px',
              height: '420px',
              borderRadius: '2px',
              background: work.bg,
              border: `1px solid ${activeIdx === i ? 'var(--gold)' : 'rgba(201,168,76,0.1)'}`,
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.3s, transform 0.4s var(--ease-smooth), box-shadow 0.4s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.02) translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(201,168,76,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Cinematic gold overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.1) 100%)',
            }} />

            {/* Gold light streak */}
            <div style={{
              position: 'absolute',
              top: '-20%', left: '-20%',
              width: '60%', height: '200%',
              background: 'linear-gradient(45deg, transparent, rgba(201,168,76,0.03), transparent)',
              transform: 'rotate(25deg)',
              pointerEvents: 'none',
            }} />

            {/* Work number */}
            <div style={{
              position: 'absolute',
              top: '1.5rem', left: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              color: 'var(--gold)',
              opacity: 0.6,
            }}>
              {String(i + 1).padStart(2, '0')}
            </div>

            {/* Tag */}
            <div style={{
              position: 'absolute',
              top: '1.5rem', right: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              color: 'var(--gold)',
              border: '1px solid rgba(201,168,76,0.3)',
              padding: '0.25rem 0.6rem',
              textTransform: 'uppercase',
            }}>
              {work.tag}
            </div>

            {/* Content bottom */}
            <div style={{
              position: 'absolute',
              bottom: '2rem', left: '1.5rem', right: '1.5rem',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.3rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--white)',
                lineHeight: 1.2,
                marginBottom: '1rem',
              }}>{work.title}</h3>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--gold)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
              }}>
                VIEW CASE
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem',
        marginTop: '2.5rem',
      }}>
        {works.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            style={{
              width: activeIdx === i ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: activeIdx === i ? 'var(--gold)' : 'rgba(201,168,76,0.25)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}
