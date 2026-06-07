import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { SMLogoMark } from './Loader'

// ─── Subtle Particle Cloud ─────────────────────────────────────────
function ParticleCloud() {
  const pointsRef = useRef()
  const count = 1800

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 25
    positions[i * 3 + 1] = (Math.random() - 0.5) * 25
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12
  }

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.04
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#C9A84C"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  )
}

// ─── Thin Orbital Ring ─────────────────────────────────────────────
function OrbitalRing({ radius, speed, tilt, opacity = 0.12 }) {
  const ringRef = useRef()
  useFrame((state) => {
    if (!ringRef.current) return
    ringRef.current.rotation.z = state.clock.elapsedTime * speed
  })
  return (
    <mesh ref={ringRef} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 2, 128]} />
      <meshBasicMaterial color="#C9A84C" transparent opacity={opacity} />
    </mesh>
  )
}

// ─── Floating Mockup Card (3D tilt on mouse) ──────────────────────
function FloatingCard({ title, tag, index, delay }) {
  const cardRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 30, rotateX: 5 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1, delay, ease: 'power3.out' }
    )

    // Float animation
    gsap.to(cardRef.current, {
      y: index % 2 === 0 ? -10 : 10,
      duration: 3 + index * 0.7,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: index * 0.4,
    })

    // Mouse tilt
    const el = cardRef.current
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / 20
      const dy = -(e.clientY - cy) / 20
      gsap.to(el, { rotateY: dx, rotateX: dy, duration: 0.5, ease: 'power2.out' })
    }
    const onLeave = () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power3.out' })
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [delay, index])

  const colors = [
    'linear-gradient(135deg, #1a1008 0%, #3d2a0a 50%, #0d0a05 100%)',
    'linear-gradient(135deg, #0a0d1a 0%, #1a2240 50%, #050810 100%)',
    'linear-gradient(135deg, #0f0a00 0%, #2a1f00 50%, #0a0800 100%)',
  ]

  return (
    <div
      ref={cardRef}
      style={{
        background: colors[index % colors.length],
        border: '1px solid rgba(201,168,76,0.2)',
        borderRadius: '16px',
        padding: '1.25rem',
        width: '200px',
        flexShrink: 0,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        cursor: 'default',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        opacity: 0,
      }}
    >
      <div style={{ height: '90px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', marginBottom: '0.75rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 30%, rgba(201,168,76,0.15) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '0.5rem', left: '0.5rem', width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SMLogoMark size={16} />
        </div>
      </div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem', letterSpacing: '-0.01em' }}>{title}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', color: 'var(--text-tertiary)', fontWeight: 400 }}>{tag}</span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', color: 'var(--gold)', fontWeight: 600, padding: '2px 6px', borderRadius: '9999px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>Live</span>
      </div>
    </div>
  )
}

// ─── Main Hero Component ──────────────────────────────────────────
export default function Hero() {
  const headingRef  = useRef(null)
  const subRef      = useRef(null)
  const ctaRef      = useRef(null)
  const badgeRef    = useRef(null)
  const scrollHintRef = useRef(null)
  const rightColRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([badgeRef.current, headingRef.current, subRef.current, ctaRef.current, scrollHintRef.current, rightColRef.current], {
        opacity: 0, y: 32
      })

      const tl = gsap.timeline({ delay: 0.2 })
      tl.to(badgeRef.current,    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .to(headingRef.current,  { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.4')
        .to(subRef.current,      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
        .to(ctaRef.current,      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .to(scrollHintRef.current,{ opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
        .to(rightColRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.9')
    })
    return () => ctx.revert()
  }, [])

  const mockupCards = [
    { title: 'Brand Identity Kit', tag: 'Brand Strategy' },
    { title: 'Campaign Launch', tag: 'Performance' },
    { title: 'Influencer Wave', tag: 'Social Media' },
  ]

  return (
    <section id="home" style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'var(--black)',
    }}>
      {/* ── Background: 3D Canvas ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} color="#C9A84C" intensity={0.3} />
          <ParticleCloud />
          <OrbitalRing radius={6} speed={0.1} tilt={Math.PI / 5} opacity={0.08} />
          <OrbitalRing radius={8} speed={-0.06} tilt={Math.PI / 3} opacity={0.05} />
          <OrbitalRing radius={4.5} speed={0.14} tilt={Math.PI / 2.2} opacity={0.07} />
        </Canvas>
      </div>

      {/* ── Animated Blob Orbs (Framer-style) ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Primary gold blob */}
        <div style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.03) 40%, transparent 70%)',
          top: '-15%',
          right: '-10%',
          animation: 'blobMove1 12s ease-in-out infinite',
          filter: 'blur(40px)',
        }} />
        {/* Secondary teal/blue blob for contrast */}
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100,80,30,0.06) 0%, transparent 70%)',
          bottom: '5%',
          left: '-8%',
          animation: 'blobMove2 15s ease-in-out infinite',
          filter: 'blur(60px)',
        }} />
        {/* Center radial glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 60%)',
        }} />
      </div>

      {/* ── Left Gradient Overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(90deg, rgba(8,8,8,0.92) 40%, rgba(8,8,8,0.4) 70%, rgba(8,8,8,0.1) 100%)',
      }} />

      {/* ── Bottom Fade ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%',
        background: 'linear-gradient(to top, var(--black), transparent)',
        pointerEvents: 'none',
      }} />

      {/* ── Dot Grid BG ── */}
      <div className="bg-dots" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5,
      }} />

      {/* ── Main Content ── */}
      <div className="container" style={{
        position: 'relative', zIndex: 2,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
        paddingTop: '6rem',
        paddingBottom: '4rem',
        minHeight: '100vh',
      }}>
        {/* Left column */}
        <div>
          {/* Badge pill */}
          <div ref={badgeRef} style={{ marginBottom: '1.75rem' }}>
            <span className="pill pill-gold">
              <span className="pill-dot" />
              Full-Scale Digital Agency
            </span>
          </div>

          {/* Main heading with gradient shimmer */}
          <h1 ref={headingRef} style={{ marginBottom: '1.5rem' }}>
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
            }}>
              We Don't Follow
            </span>
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
            }}>
              Trends.{' '}
            </span>
            <span
              className="text-gradient-animated"
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
              }}
            >
              We Create Them.
            </span>
          </h1>

          {/* Sub copy */}
          <p ref={subRef} className="text-body" style={{
            maxWidth: '460px',
            marginBottom: '2.5rem',
            fontSize: '1.05rem',
          }}>
            Struders Marketing Co. is a full-scale digital marketing & media agency
            that builds brands, drives influence, and delivers impact that lasts.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '3.5rem',
          }}>
            <Link to="/work" id="hero-explore-btn" className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '0.75rem 1.75rem' }}>
              Explore Our Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </Link>
            <Link to="/services" id="hero-services-btn" className="btn btn-secondary" style={{ fontSize: '0.9rem', padding: '0.75rem 1.75rem' }}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor"/>
              </svg>
              Our Services
            </Link>
          </div>

          {/* Micro stats row */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { value: '150+', label: 'Projects' },
              { value: '80+', label: 'Clients' },
              { value: '250M+', label: 'Reach' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--gold-light)', letterSpacing: '-0.02em', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: 'var(--text-tertiary)', fontWeight: 500, marginTop: '0.2rem', letterSpacing: '0.04em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — floating mockup cards */}
        <div ref={rightColRef} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          alignItems: 'flex-end',
          perspective: '800px',
          paddingRight: '2rem',
          opacity: 0,
        }}>
          {/* Top stat badge */}
          <div style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '14px',
            padding: '0.75rem 1.25rem',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            alignSelf: 'flex-start',
          }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 12L6 7l3 3 3-5 4 5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>+340% Growth</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: 'var(--text-tertiary)', fontWeight: 400 }}>avg client performance</div>
            </div>
          </div>

          {/* Stacked mockup cards */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {mockupCards.map((card, i) => (
              <FloatingCard key={card.title} title={card.title} tag={card.tag} index={i} delay={0.5 + i * 0.15} />
            ))}
          </div>

          {/* Bottom badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1rem',
            borderRadius: '9999px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
          }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#C9A84C">
                <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9l-3 1.5.5-3.5L1 4.5 4.5 4z"/>
              </svg>
            ))}
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 500, marginLeft: '0.25rem' }}>
              Trusted by 80+ brands
            </span>
          </div>
        </div>
      </div>

      {/* ── Scroll Hint ── */}
      <div ref={scrollHintRef} style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        zIndex: 3,
        opacity: 0,
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.65rem',
          fontWeight: 500,
          letterSpacing: '0.15em',
          color: 'var(--text-tertiary)',
          textTransform: 'uppercase',
        }}>Scroll</span>
        <div style={{
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to bottom, var(--gold), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); transform-origin: top; }
        }
        @keyframes blobMove1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.97); }
        }
        @keyframes blobMove2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 20px) scale(1.03); }
          66% { transform: translate(15px, -25px) scale(0.98); }
        }
        @media (max-width: 900px) {
          #home .container > div { grid-template-columns: 1fr !important; gap: 3rem !important; padding-top: 7rem !important; }
          #home [style*="alignItems: flex-end"] { align-items: center !important; padding-right: 0 !important; }
        }
        @media (max-width: 580px) {
          #home [style*="200px"] { width: 160px !important; }
        }
      `}</style>
    </section>
  )
}
