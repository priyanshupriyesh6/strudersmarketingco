import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VideoScrollScene from '../components/VideoScrollScene'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 'digital-marketing',
    icon: (
      <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
        <path d="M4 28L12 18l6 6 6-10 8 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="28" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Digital Marketing',
    desc: 'Data-driven strategies that increase visibility, engagement & growth across all digital channels.',
    tag: '01',
  },
  {
    id: 'performance-marketing',
    icon: (
      <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="20" width="6" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="15" y="12" width="6" height="20" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="26" y="4" width="6" height="28" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 18l8-8 10 6 6-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Performance Marketing',
    desc: 'ROI-focused campaigns that convert clicks into customers and leads into loyal advocates.',
    tag: '02',
  },
  {
    id: 'public-relations',
    icon: (
      <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
        <path d="M18 4C10.27 4 4 9.373 4 16c0 3.15 1.3 6.02 3.42 8.15L6 32l8.16-2.16A15.4 15.4 0 0018 30c7.73 0 14-5.373 14-12S25.73 4 18 4z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 16h12M12 20h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Public Relations',
    desc: 'Building reputation, earning trust, and strengthening presence through strategic media relations.',
    tag: '03',
  },
  {
    id: 'influencer-management',
    icon: (
      <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="11" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="7" cy="24" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="29" cy="24" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10.5 24C10.5 20.5 14 18 18 18s7.5 2.5 7.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3.5 28C3.5 25.5 5 24 7 24M25 24c2 0 4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Influencer Management',
    desc: 'Connecting brands with the right voices to amplify influence and build authentic communities.',
    tag: '04',
  },
  {
    id: 'ad-campaigns',
    icon: (
      <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
        <rect x="3" y="6" width="30" height="22" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 12h30M9 6V4M27 6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 20l3-4 3 3 3-5 4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="8" y="28" width="20" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Advertisement Campaigns',
    desc: 'Cinematic, high-impact ad campaigns that capture attention and inspire action.',
    tag: '05',
  },
  {
    id: 'podcast-media',
    icon: (
      <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="14" r="6" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M18 20v8M14 28h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 14c0 3 1.5 5.5 4.5 7M27 14c0 3-1.5 5.5-4.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 14c0 5.5 3 9 8 11M31 14c0 5.5-3 9-8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    title: 'Podcast & Media Production',
    desc: 'Producing powerful podcasts and shows that engage, inspire, and grow dedicated audiences.',
    tag: '06',
  },
]

export default function ServicesPage() {
  const heroRef   = useRef(null)
  const gridRef   = useRef(null)
  const cardsRef  = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(heroRef.current.querySelectorAll('.srv-hero-el'),
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: 'power4.out', delay: 0.3 }
      )

      // Cards beam-in from bottom
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 80, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.08, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true }
        }
      )

      // Floating gold number per card
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card.querySelector('.srv-tag'),
          { opacity: 0, x: 20 },
          {
            opacity: 1, x: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 85%', once: true }
          }
        )
      })
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
          background: 'var(--navy)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Radial glow */}
          <div style={{
            position: 'absolute',
            top: '50%', right: '10%',
            transform: 'translateY(-50%)',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div className="container" ref={heroRef}>
            <div className="subheading srv-hero-el" style={{ marginBottom: '1.5rem' }}>What We Do</div>
            <h1 className="heading-xl srv-hero-el" style={{ color: 'var(--white)', marginBottom: '0.5rem' }}>
              SOLUTIONS THAT
            </h1>
            <h1 className="heading-xl srv-hero-el" style={{ color: 'var(--gold)', marginBottom: '2rem' }}>
              DRIVE GROWTH.
            </h1>
            <p className="body-text srv-hero-el" style={{ maxWidth: '520px' }}>
              Six core disciplines. One unified mission: to build brands that command
              attention, shape culture, and deliver measurable impact.
            </p>
          </div>
        </section>

        {/* ── Brand Video Scroll ──────────────────────────────────────── */}
        <VideoScrollScene height="160vh" label="Services — What We Do" />

        {/* ── Services Grid ───────────────────────────────────────────── */}
        <section className="section" style={{ background: 'var(--black)' }}>
          {/* Radial center glow */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%', height: '80%',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.03) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div className="container">
            <div ref={gridRef} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem',
            }} className="services-page-grid">
              {services.map((svc, i) => (
                <div
                  key={svc.id}
                  id={`service-${svc.id}`}
                  ref={el => cardsRef.current[i] = el}
                  className="glass-card"
                  style={{
                    padding: '2.5rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    cursor: 'default',
                    background: 'linear-gradient(135deg, rgba(10,15,30,0.6) 0%, rgba(5,5,5,0.4) 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.4s var(--ease-smooth)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {/* Top glow line */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                    background: 'linear-gradient(90deg, transparent, var(--gold-dim), transparent)',
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                  }} className="card-top-line" />

                  {/* Service number */}
                  <div className="srv-tag" style={{
                    position: 'absolute', top: '1.5rem', right: '1.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    color: 'rgba(201,168,76,0.06)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                  }}>{svc.tag}</div>

                  {/* Icon */}
                  <div style={{ color: 'var(--gold)', opacity: 0.9 }}>{svc.icon}</div>

                  {/* Title */}
                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--white)',
                  }}>{svc.title}</h2>

                  {/* Description */}
                  <p style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.875rem',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: 'var(--white-dim)',
                    flex: 1,
                  }}>{svc.desc}</p>

                  {/* Learn more */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    color: 'var(--gold)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    marginTop: '0.5rem',
                    opacity: 0.7,
                    transition: 'opacity 0.3s, gap 0.3s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.gap = '0.75rem' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = 0.7; e.currentTarget.style.gap = '0.5rem' }}
                  >
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            .glass-card:hover .card-top-line { opacity: 1 !important; }
            @media (max-width: 900px) {
              .services-page-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 580px) {
              .services-page-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>
      </main>
      <Footer />
    </div>
  )
}
