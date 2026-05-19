import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VideoScrollScene from '../components/VideoScrollScene'

gsap.registerPlugin(ScrollTrigger)

const works = [
  {
    id: 'luxury-redefined',
    title: 'Luxury Redefined',
    tag: 'Brand Identity',
    bg: 'linear-gradient(135deg, #1a1008 0%, #3d2a0a 50%, #0d0a05 100%)',
    client: 'Prestige Co.',
    year: '2024',
    result: '340% brand recall boost',
  },
  {
    id: 'influence-connects',
    title: 'Influence That Connects',
    tag: 'Influencer Campaign',
    bg: 'linear-gradient(135deg, #0a0d1a 0%, #1a2240 50%, #050810 100%)',
    client: 'NexGen Wear',
    year: '2024',
    result: '12M impressions in 30 days',
  },
  {
    id: 'drive-inspire',
    title: 'Drive. Inspire. Dominate.',
    tag: 'Performance Marketing',
    bg: 'linear-gradient(135deg, #0f0a00 0%, #2a1f00 50%, #0a0800 100%)',
    client: 'AutoEdge',
    year: '2023',
    result: '5x ROAS achieved',
  },
  {
    id: 'voices-inspire',
    title: 'Voices That Inspire',
    tag: 'Podcast Production',
    bg: 'linear-gradient(135deg, #0a0a12 0%, #1a1a2e 50%, #050508 100%)',
    client: 'TechTalk Media',
    year: '2024',
    result: '500K monthly listeners',
  },
  {
    id: 'timeless-elegance',
    title: 'Timeless Elegance',
    tag: 'Ad Campaign',
    bg: 'linear-gradient(135deg, #12100a 0%, #2e2510 50%, #080705 100%)',
    client: 'Élite Jewels',
    year: '2023',
    result: '78% conversion uplift',
  },
]

export default function WorkPage() {
  const heroRef   = useRef(null)
  const sliderRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const isDragging = useRef(false)
  const startX     = useRef(0)
  const scrollLeft = useRef(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(heroRef.current.querySelectorAll('.work-hero-el'),
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 1.1, ease: 'power4.out', delay: 0.3 }
      )

      // Slider
      gsap.fromTo(sliderRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sliderRef.current, start: 'top 85%', once: true }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  // Drag to scroll
  const onMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.pageX - sliderRef.current.offsetLeft
    scrollLeft.current = sliderRef.current.scrollLeft
    sliderRef.current.style.cursor = 'grabbing'
  }
  const onMouseUp = () => {
    isDragging.current = false
    if (sliderRef.current) sliderRef.current.style.cursor = 'grab'
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
          {/* Horizontal scan lines */}
          {[20, 45, 70].map((top, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${top}%`, left: 0, right: 0,
              height: '1px',
              background: `rgba(201,168,76,${0.02 + i * 0.01})`,
              pointerEvents: 'none',
            }} />
          ))}

          <div className="container" ref={heroRef}>
            <div className="subheading work-hero-el" style={{ marginBottom: '1.5rem' }}>Featured Work</div>
            <h1 className="heading-xl work-hero-el" style={{ color: 'var(--white)', marginBottom: '0.5rem' }}>
              MAKING IMPACT.
            </h1>
            <h1 className="heading-xl work-hero-el" style={{ marginBottom: '2rem' }}>
              CREATING{' '}
              <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
                STORIES.
              </span>
            </h1>
            <p className="body-text work-hero-el" style={{ maxWidth: '520px' }}>
              Each project is a chapter in a brand's story. Here are the chapters
              we're most proud of — from concept to culture-shifting impact.
            </p>
          </div>
        </section>

        {/* ── Brand Video Scroll ──────────────────────────────────────── */}
        <VideoScrollScene height="160vh" label="Work — Our Portfolio" />

        {/* ── Horizontal Work Slider ─────────────────────────────────── */}
        <section className="section" style={{
          background: 'var(--black)',
          paddingLeft: 0,
          paddingRight: 0,
        }}>
          <div className="container" style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div className="subheading" style={{ marginBottom: '0.75rem' }}>Selected Projects</div>
                <h2 className="heading-lg" style={{ color: 'var(--white)' }}>
                  {works.length} <span style={{ color: 'var(--gold)' }}>Case Studies</span>
                </h2>
              </div>
              <p className="body-text" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--white-muted)' }}>
                ← DRAG TO EXPLORE →
              </p>
            </div>
          </div>

          {/* Slider */}
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
              paddingLeft: 'max(2rem, calc((100vw - 1280px) / 2 + 2rem))',
              paddingRight: 'max(2rem, calc((100vw - 1280px) / 2 + 2rem))',
              paddingBottom: '1rem',
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
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  flex: '0 0 360px',
                  height: '480px',
                  borderRadius: '2px',
                  background: work.bg,
                  border: `1px solid ${activeIdx === i ? 'var(--gold)' : 'rgba(201,168,76,0.1)'}`,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, transform 0.5s var(--ease-smooth), box-shadow 0.5s ease',
                  cursor: 'pointer',
                  transform: hoveredIdx === i ? 'scale(1.02) translateY(-8px)' : 'scale(1) translateY(0)',
                  boxShadow: hoveredIdx === i ? '0 30px 80px rgba(0,0,0,0.6), 0 0 50px rgba(201,168,76,0.12)' : 'none',
                }}
              >
                {/* Cinematic overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.05) 100%)',
                }} />

                {/* Gold streak */}
                <div style={{
                  position: 'absolute', top: '-20%', left: '-20%',
                  width: '60%', height: '200%',
                  background: 'linear-gradient(45deg, transparent, rgba(201,168,76,0.04), transparent)',
                  transform: 'rotate(25deg)',
                  pointerEvents: 'none',
                }} />

                {/* Work number */}
                <div style={{
                  position: 'absolute', top: '1.5rem', left: '1.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: 'var(--gold)',
                  opacity: 0.6,
                }}>{String(i + 1).padStart(2, '0')}</div>

                {/* Tag */}
                <div style={{
                  position: 'absolute', top: '1.5rem', right: '1.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  color: 'var(--gold)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  padding: '0.25rem 0.6rem',
                  textTransform: 'uppercase',
                }}>{work.tag}</div>

                {/* Content */}
                <div style={{ position: 'absolute', bottom: '2rem', left: '1.5rem', right: '1.5rem' }}>
                  {/* Client + Year */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: 'var(--white-muted)',
                    letterSpacing: '0.15em',
                    marginBottom: '0.75rem',
                  }}>
                    <span>{work.client}</span>
                    <span>{work.year}</span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--white)',
                    lineHeight: 1.2,
                    marginBottom: '0.75rem',
                  }}>{work.title}</h3>

                  {/* Result */}
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--gold)',
                    letterSpacing: '0.1em',
                    opacity: hoveredIdx === i ? 1 : 0,
                    transform: hoveredIdx === i ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.3s, transform 0.3s',
                    marginBottom: '1rem',
                  }}>
                    ✦ {work.result}
                  </div>

                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
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

          {/* Dot nav */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2.5rem' }}>
            {works.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                style={{
                  width: activeIdx === i ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: activeIdx === i ? 'var(--gold)' : 'rgba(201,168,76,0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                  boxShadow: activeIdx === i ? '0 0 12px rgba(201,168,76,0.4)' : 'none',
                }}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
