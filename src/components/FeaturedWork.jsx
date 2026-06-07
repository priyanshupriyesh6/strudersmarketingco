import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const works = [
  {
    id: 'luxury-redefined',
    title: 'Luxury Redefined',
    tag: 'Brand Identity',
    category: 'Brand Strategy',
    bg: 'linear-gradient(135deg, #1a1008 0%, #3d2a0a 50%, #0d0a05 100%)',
    bgHover: 'linear-gradient(135deg, #2a1c0d 0%, #5a3d0f 50%, #1a1208 100%)',
    accentColor: '#C9A84C',
    year: '2024',
  },
  {
    id: 'influence-connects',
    title: 'Influence That Connects',
    tag: 'Influencer Campaign',
    category: 'Social Media',
    bg: 'linear-gradient(135deg, #0a0d1a 0%, #1a2240 50%, #050810 100%)',
    bgHover: 'linear-gradient(135deg, #0f1525 0%, #253060 50%, #080c18 100%)',
    accentColor: '#6e8ecf',
    year: '2024',
  },
  {
    id: 'drive-inspire',
    title: 'Drive. Inspire. Dominate.',
    tag: 'Performance Marketing',
    category: 'Marketing',
    bg: 'linear-gradient(135deg, #0f0a00 0%, #2a1f00 50%, #0a0800 100%)',
    bgHover: 'linear-gradient(135deg, #1a1200 0%, #3d2d00 50%, #120f00 100%)',
    accentColor: '#C9A84C',
    year: '2024',
  },
  {
    id: 'voices-inspire',
    title: 'Voices That Inspire',
    tag: 'Podcast Production',
    category: 'Production',
    bg: 'linear-gradient(135deg, #0a0a12 0%, #1a1a2e 50%, #050508 100%)',
    bgHover: 'linear-gradient(135deg, #10101e 0%, #252540 50%, #08080c 100%)',
    accentColor: '#9b8ecf',
    year: '2023',
  },
  {
    id: 'timeless-elegance',
    title: 'Timeless Elegance',
    tag: 'Ad Campaign',
    category: 'Production',
    bg: 'linear-gradient(135deg, #12100a 0%, #2e2510 50%, #080705 100%)',
    bgHover: 'linear-gradient(135deg, #1c1810 0%, #42361a 50%, #0c0b08 100%)',
    accentColor: '#C9A84C',
    year: '2023',
  },
  {
    id: 'digital-presence',
    title: 'Digital Presence',
    tag: 'Digital Marketing',
    category: 'Marketing',
    bg: 'linear-gradient(135deg, #080c10 0%, #101820 50%, #040608 100%)',
    bgHover: 'linear-gradient(135deg, #0c1018 0%, #162030 50%, #060a0e 100%)',
    accentColor: '#4a9eca',
    year: '2023',
  },
]

// ─── Work Card Component (Framer-style) ──────────────────────────
function WorkCard({ work, index }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const onMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const rotX = ((y - cy) / cy) * -6
      const rotY = ((x - cx) / cx) * 8

      gsap.to(card, {
        rotateX: rotX,
        rotateY: rotY,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800,
      })
    }

    const onLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: 'power3.out',
        transformPerspective: 800,
      })
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      id={`work-card-${work.id}`}
      ref={cardRef}
      className="work-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.6)' : '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Image area */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        {/* Base background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered ? work.bgHover : work.bg,
          transition: 'background 0.5s ease',
        }} />

        {/* Decorative pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: hovered ? 0.8 : 0.4,
          transition: 'opacity 0.4s ease',
        }} />

        {/* Accent orb */}
        <div style={{
          position: 'absolute',
          width: '180px', height: '180px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${work.accentColor}22 0%, transparent 70%)`,
          top: '-30%', right: '-10%',
          transform: hovered ? 'scale(1.2)' : 'scale(1)',
          transition: 'transform 0.6s ease',
          filter: 'blur(20px)',
        }} />

        {/* Center logo mark */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: hovered ? 0.25 : 0.1,
          transition: 'opacity 0.4s ease',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}>
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="4" y="72" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="72" fill="white">S</text>
          </svg>
        </div>

        {/* Hover overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
          opacity: hovered ? 1 : 0.6,
          transition: 'opacity 0.4s ease',
        }} />

        {/* Tag pill — top right */}
        <div style={{
          position: 'absolute', top: '0.875rem', right: '0.875rem',
        }}>
          <span style={{
            display: 'inline-block',
            padding: '0.25rem 0.65rem',
            borderRadius: '9999px',
            fontSize: '0.62rem',
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
          position: 'absolute', top: '0.875rem', left: '0.875rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.65rem',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.06em',
        }}>
          {String(parseInt(works.indexOf(work)) + 1).padStart(2, '0')}
        </div>

        {/* View case — appears on hover */}
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: `translateX(-50%) translateY(${hovered ? '0px' : '8px'})`,
          opacity: hovered ? 1 : 0,
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.5rem 1rem',
          borderRadius: '9999px',
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'white',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}>
          View Case Study
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1.5 6h9M6.5 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Card footer */}
      <div style={{
        padding: '1rem 1.25rem',
        background: 'var(--surface-1)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: 'var(--text-primary)',
            marginBottom: '0.2rem',
          }}>{work.title}</h3>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            color: 'var(--text-tertiary)',
            fontWeight: 400,
          }}>{work.category}</span>
        </div>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.7rem',
          color: 'var(--text-tertiary)',
          fontWeight: 400,
        }}>{work.year}</span>
      </div>
    </div>
  )
}

export default function FeaturedWork() {
  const sectionRef = useRef(null)
  const gridRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.work-heading'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )

      gsap.fromTo(gridRef.current.querySelectorAll('.work-card'),
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="section" style={{
      background: 'var(--black)',
    }}>
      {/* Grid BG */}
      <div className="bg-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5 }} />

      <div className="container">
        {/* Section header */}
        <div className="work-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div className="section-label">
              <span className="text-label" style={{ color: 'var(--gold)' }}>Featured Work</span>
            </div>
            <h2 className="text-h2" style={{ color: 'var(--text-primary)' }}>
              Making Impact.{' '}
              <span className="text-serif text-gradient">Creating Stories.</span>
            </h2>
          </div>
          <Link
            to="/work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            View all work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </Link>
        </div>

        {/* 3-column grid */}
        <div ref={gridRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }}>
          {works.map((work, i) => (
            <WorkCard key={work.id} work={work} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #work .container > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          #work .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
