import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 'digital-marketing',
    category: 'Marketing',
    number: '01',
    icon: (
      <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
        <path d="M4 28L12 18l6 6 6-10 8 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="28" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Digital Marketing',
    desc: 'Data-driven strategies that increase visibility, engagement & growth across all digital channels.',
  },
  {
    id: 'performance-marketing',
    category: 'Marketing',
    number: '02',
    icon: (
      <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="20" width="6" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="15" y="12" width="6" height="20" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="26" y="4" width="6" height="28" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 18l8-8 10 6 6-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Performance Marketing',
    desc: 'ROI-focused campaigns that convert clicks into customers and leads into loyal advocates.',
  },
  {
    id: 'public-relations',
    category: 'Strategy',
    number: '03',
    icon: (
      <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
        <path d="M18 4C10.27 4 4 9.373 4 16c0 3.15 1.3 6.02 3.42 8.15L6 32l8.16-2.16A15.4 15.4 0 0018 30c7.73 0 14-5.373 14-12S25.73 4 18 4z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 16h12M12 20h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Public Relations',
    desc: 'Building reputation, earning trust, and strengthening presence through strategic media relations.',
  },
  {
    id: 'influencer-management',
    category: 'Marketing',
    number: '04',
    icon: (
      <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="11" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="7" cy="24" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="29" cy="24" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10.5 24C10.5 20.5 14 18 18 18s7.5 2.5 7.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3.5 28C3.5 25.5 5 24 7 24M25 24c2 0 4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Influencer Management',
    desc: 'Connecting brands with the right voices to amplify influence and build authentic communities.',
  },
  {
    id: 'ad-campaigns',
    category: 'Production',
    number: '05',
    icon: (
      <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
        <rect x="3" y="6" width="30" height="22" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 12h30M9 6V4M27 6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 20l3-4 3 3 3-5 4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="8" y="28" width="20" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Advertisement Campaigns',
    desc: 'Cinematic, high-impact ad campaigns that capture attention and inspire action at scale.',
  },
  {
    id: 'podcast-media',
    category: 'Production',
    number: '06',
    icon: (
      <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="14" r="6" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M18 20v8M14 28h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 14c0 3 1.5 5.5 4.5 7M27 14c0 3-1.5 5.5-4.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 14c0 5.5 3 9 8 11M31 14c0 5.5-3 9-8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    title: 'Podcast & Media Production',
    desc: 'Producing powerful podcasts and shows that engage, inspire, and grow dedicated audiences.',
  },
]

const categories = ['All', 'Marketing', 'Strategy', 'Production']

// ─── 3D Tilt Card Component ───────────────────────────────────────
function ServiceCard({ svc, visible }) {
  const cardRef = useRef(null)
  const spotlightRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const spotlight = spotlightRef.current
    if (!card) return

    const onMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const rotX = ((y - cy) / cy) * -8
      const rotY = ((x - cx) / cx) * 10

      gsap.to(card, {
        rotateX: rotX,
        rotateY: rotY,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800,
      })

      // Cursor spotlight inside card
      if (spotlight) {
        spotlight.style.background = `radial-gradient(200px circle at ${x}px ${y}px, rgba(201,168,76,0.06), transparent 70%)`
        spotlight.style.opacity = '1'
      }
    }

    const onLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: 'power3.out',
        transformPerspective: 800,
      })
      if (spotlight) spotlight.style.opacity = '0'
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
      id={`service-card-${svc.id}`}
      ref={cardRef}
      style={{
        position: 'relative',
        background: 'var(--glass)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '2rem',
        display: visible ? 'flex' : 'none',
        flexDirection: 'column',
        gap: '1rem',
        cursor: 'default',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.08) inset'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Cursor spotlight layer */}
      <div
        ref={spotlightRef}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          opacity: 0,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Number + Icon row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}>{svc.number}</div>
        <div style={{
          width: '44px', height: '44px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(201,168,76,0.08)',
          border: '1px solid rgba(201,168,76,0.15)',
          borderRadius: '12px',
          color: 'var(--gold)',
          flexShrink: 0,
        }}>
          {svc.icon}
        </div>
      </div>

      {/* Category pill */}
      <span className="pill" style={{ alignSelf: 'flex-start', position: 'relative', zIndex: 1 }}>
        {svc.category}
      </span>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '1.05rem',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        color: 'var(--text-primary)',
        lineHeight: 1.3,
        position: 'relative', zIndex: 1,
      }}>{svc.title}</h3>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.7,
        color: 'var(--text-secondary)',
        flex: 1,
        position: 'relative', zIndex: 1,
      }}>{svc.desc}</p>

      {/* Learn more link */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--gold)',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.8rem',
          fontWeight: 600,
          marginTop: 'auto',
          cursor: 'pointer',
          position: 'relative', zIndex: 1,
          transition: 'gap 0.25s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.gap = '0.65rem'}
        onMouseLeave={e => e.currentTarget.style.gap = '0.4rem'}
      >
        Learn more
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(sectionRef.current.querySelector('.services-heading'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )

      // Cards stagger
      gsap.fromTo(sectionRef.current.querySelectorAll('[id^="service-card-"]'),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.services-grid'), start: 'top 85%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="section" style={{
      background: 'linear-gradient(180deg, var(--surface-0) 0%, var(--black) 100%)',
    }}>
      {/* Dot grid background */}
      <div className="bg-dots" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4 }} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', height: '400px',
        background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        {/* Section header */}
        <div className="services-heading" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <span className="text-label" style={{ color: 'var(--gold)' }}>What We Do</span>
          </div>
          <h2 className="text-h2" style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Solutions That Drive{' '}
            <span className="text-gradient">Growth</span>
          </h2>
          <p className="text-body" style={{ maxWidth: '500px', margin: '0 auto 2.5rem' }}>
            From digital strategy to cinematic production — we craft campaigns that move culture.
          </p>

          {/* Filter tabs */}
          <div className="filter-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-tab filter-tab-gold ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }}>
          {services.map(svc => (
            <ServiceCard
              key={svc.id}
              svc={svc}
              visible={activeFilter === 'All' || svc.category === activeFilter}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
