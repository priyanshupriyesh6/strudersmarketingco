import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

const works = [
  {
    id: 'luxury-redefined',
    title: 'Luxury Redefined',
    tag: 'Brand Identity',
    bg: 'linear-gradient(135deg, #1a1008 0%, #3d2a0a 50%, #0d0a05 100%)',
    bgHover: 'linear-gradient(135deg, #2a1c0d 0%, #5a3d0f 50%, #1a1208 100%)',
    accentColor: '#C9A84C',
    client: 'Prestige Co.',
    year: '2024',
    result: '340% brand recall boost',
  },
  {
    id: 'influence-connects',
    title: 'Influence That Connects',
    tag: 'Influencer Campaign',
    bg: 'linear-gradient(135deg, #0a0d1a 0%, #1a2240 50%, #050810 100%)',
    bgHover: 'linear-gradient(135deg, #0f1525 0%, #253060 50%, #080c18 100%)',
    accentColor: '#6e8ecf',
    client: 'NexGen Wear',
    year: '2024',
    result: '12M impressions in 30 days',
  },
  {
    id: 'drive-inspire',
    title: 'Drive. Inspire. Dominate.',
    tag: 'Performance Marketing',
    bg: 'linear-gradient(135deg, #0f0a00 0%, #2a1f00 50%, #0a0800 100%)',
    bgHover: 'linear-gradient(135deg, #1a1200 0%, #3d2d00 50%, #120f00 100%)',
    accentColor: '#C9A84C',
    client: 'AutoEdge',
    year: '2023',
    result: '5x ROAS achieved',
  },
  {
    id: 'voices-inspire',
    title: 'Voices That Inspire',
    tag: 'Podcast Production',
    bg: 'linear-gradient(135deg, #0a0a12 0%, #1a1a2e 50%, #050508 100%)',
    bgHover: 'linear-gradient(135deg, #10101e 0%, #252540 50%, #08080c 100%)',
    accentColor: '#9b8ecf',
    client: 'TechTalk Media',
    year: '2024',
    result: '500K monthly listeners',
  },
  {
    id: 'timeless-elegance',
    title: 'Timeless Elegance',
    tag: 'Ad Campaign',
    bg: 'linear-gradient(135deg, #12100a 0%, #2e2510 50%, #080705 100%)',
    bgHover: 'linear-gradient(135deg, #1c1810 0%, #42361a 50%, #0c0b08 100%)',
    accentColor: '#C9A84C',
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
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 1.1, ease: 'power3.out', delay: 0.2 }
      )

      // Slider
      gsap.fromTo(sliderRef.current,
        { opacity: 0, y: 40 },
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
    const card = sliderRef.current.querySelectorAll('.work-card-container')[idx]
    if (card) {
      const sliderWidth = sliderRef.current.clientWidth
      const cardLeft = card.offsetLeft
      const cardWidth = card.clientWidth
      const scrollPos = cardLeft - (sliderWidth / 2) + (cardWidth / 2)
      sliderRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' })
    }
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
          background: 'var(--black)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Dot Grid Background */}
          <div className="bg-dots" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4 }} />

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
            <div className="section-label work-hero-el" style={{ marginBottom: '1.5rem' }}>
              <span className="text-label" style={{ color: 'var(--gold)' }}>Featured Work</span>
            </div>
            <h1 className="text-h1 work-hero-el" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              MAKING IMPACT.
            </h1>
            <h1 className="text-h1 work-hero-el" style={{ marginBottom: '2rem' }}>
              CREATING{' '}
              <span className="text-serif text-gradient-animated">
                STORIES.
              </span>
            </h1>
            <p className="text-body work-hero-el" style={{ maxWidth: '520px' }}>
              Each project is a chapter in a brand's story. Here are the chapters
              we're most proud of — from concept to culture-shifting impact.
            </p>
          </div>
        </section>

        {/* ── Horizontal Work Slider ─────────────────────────────────── */}
        <section className="section" style={{
          background: 'var(--surface-0)',
          paddingLeft: 0,
          paddingRight: 0,
        }}>
          <div className="container" style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div className="section-label" style={{ marginBottom: '0.75rem' }}>
                  <span className="text-label" style={{ color: 'var(--text-tertiary)' }}>Selected Projects</span>
                </div>
                <h2 className="text-h2" style={{ color: 'var(--text-primary)' }}>
                  {works.length} <span className="text-gradient">Case Studies</span>
                </h2>
              </div>
              <p className="text-label" style={{ color: 'var(--text-tertiary)' }}>
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
              paddingBottom: '2rem',
              cursor: 'grab',
              userSelect: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {works.map((work, i) => (
              <div
                key={work.id}
                id={`work-card-${work.id}`}
                className="work-card-container tilt-card"
                onClick={() => scrollTo(i)}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  flex: '0 0 380px',
                  height: '520px',
                  borderRadius: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid var(--border)',
                  boxShadow: hoveredIdx === i ? '0 30px 80px rgba(0,0,0,0.6)' : '0 10px 30px rgba(0,0,0,0.3)',
                }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const cx = rect.width / 2;
                  const cy = rect.height / 2;
                  const rotX = ((y - cy) / cy) * -4;
                  const rotY = ((x - cx) / cx) * 6;
                  
                  gsap.to(card, {
                    rotateX: rotX,
                    rotateY: rotY,
                    duration: 0.4,
                    ease: 'power2.out',
                    transformPerspective: 800,
                  });
                }}
              >
                {/* Image area */}
                <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
                  {/* Base background */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: hoveredIdx === i ? work.bgHover : work.bg,
                    transition: 'background 0.5s ease',
                  }} />

                  {/* Decorative pattern */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                    opacity: hoveredIdx === i ? 0.8 : 0.4,
                    transition: 'opacity 0.4s ease',
                  }} />

                  {/* Accent orb */}
                  <div style={{
                    position: 'absolute',
                    width: '240px', height: '240px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${work.accentColor}22 0%, transparent 70%)`,
                    top: '-20%', right: '-20%',
                    transform: hoveredIdx === i ? 'scale(1.2)' : 'scale(1)',
                    transition: 'transform 0.6s ease',
                    filter: 'blur(30px)',
                  }} />

                  {/* Center logo mark */}
                  <div style={{
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: `translate(-50%, -50%) scale(${hoveredIdx === i ? 1.05 : 1})`,
                    opacity: hoveredIdx === i ? 0.25 : 0.1,
                    transition: 'all 0.4s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <text x="4" y="72" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="72" fill="white">S</text>
                    </svg>
                  </div>

                  {/* Hover overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                    opacity: hoveredIdx === i ? 1 : 0.7,
                    transition: 'opacity 0.4s ease',
                  }} />

                  {/* Tag pill — top right */}
                  <div style={{
                    position: 'absolute', top: '1.25rem', right: '1.25rem',
                  }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      fontFamily: 'var(--font-sans)',
                      background: 'rgba(0,0,0,0.6)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.8)',
                      letterSpacing: '0.04em',
                    }}>
                      {work.tag}
                    </span>
                  </div>

                  {/* Number — top left */}
                  <div style={{
                    position: 'absolute', top: '1.25rem', left: '1.25rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '0.06em',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Content (Bottom) */}
                  <div style={{ position: 'absolute', bottom: '2rem', left: '1.5rem', right: '1.5rem' }}>
                    {/* Client + Year */}
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.75rem',
                      color: 'var(--text-tertiary)',
                      letterSpacing: '0.04em',
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                    }}>
                      <span>{work.client}</span>
                      <span>{work.year}</span>
                    </div>

                    <h3 style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: 'var(--text-primary)',
                      lineHeight: 1.2,
                      marginBottom: '0.75rem',
                    }}>{work.title}</h3>

                    {/* Result */}
                    <div style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      color: 'var(--gold)',
                      fontWeight: 500,
                      opacity: hoveredIdx === i ? 1 : 0,
                      transform: hoveredIdx === i ? 'translateY(0)' : 'translateY(10px)',
                      transition: 'opacity 0.3s, transform 0.3s',
                      marginBottom: '1.25rem',
                    }}>
                      ✦ {work.result}
                    </div>

                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      color: 'var(--gold)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      transition: 'gap 0.3s ease',
                      gap: hoveredIdx === i ? '0.75rem' : '0.5rem',
                    }}>
                      View Case Study
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dot nav */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1rem' }}>
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
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
