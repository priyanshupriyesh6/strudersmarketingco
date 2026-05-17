import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { SMLogoMark } from './Loader'

gsap.registerPlugin(TextPlugin)

// ─── Particle Field ──────────────────────────────────────────────
function GoldParticles() {
  const pointsRef = useRef()
  const count = 3000

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 30
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15
  }

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#C9A84C"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

// ─── Wireframe Sphere ─────────────────────────────────────────────
function WireframeSphere() {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.08
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.04
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03
    meshRef.current.scale.set(s, s, s)
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[4.5, 32, 32]} />
      <meshBasicMaterial
        color="#C9A84C"
        wireframe
        transparent
        opacity={0.06}
      />
    </mesh>
  )
}

// ─── Floating Gold Rings ──────────────────────────────────────────
function GoldRing({ radius, speed, tilt }) {
  const ringRef = useRef()
  useFrame((state) => {
    if (!ringRef.current) return
    ringRef.current.rotation.z = state.clock.elapsedTime * speed
  })
  return (
    <mesh ref={ringRef} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.01, 2, 128]} />
      <meshBasicMaterial color="#C9A84C" transparent opacity={0.15} />
    </mesh>
  )
}

// ─── Main Hero Component ──────────────────────────────────────────
export default function Hero() {
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const taglineRef = useRef(null)
  const scrollHintRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      gsap.set([headingRef.current, subRef.current, ctaRef.current, taglineRef.current, scrollHintRef.current], {
        opacity: 0, y: 40
      })

      tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
        .to(headingRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3')
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .to(scrollHintRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1')

      // Typewriter on the headline after it appears
      tl.to(headingRef.current.querySelector('.type-line-2'), {
        duration: 0.01,
        onComplete: () => {
          // Gold underline sweep animation
          const el = headingRef.current.querySelector('.heading-underline')
          if (el) gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power2.out', transformOrigin: 'left' })
        }
      }, '-=0.5')
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="home" style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      minHeight: '700px',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'var(--black)',
    }}>
      {/* 3D Canvas Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(10,15,30,0.9) 0%, rgba(5,5,5,1) 100%)'
      }}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} color="#C9A84C" intensity={0.5} />
          <GoldParticles />
          <WireframeSphere />
          <GoldRing radius={6} speed={0.15} tilt={Math.PI / 6} />
          <GoldRing radius={7.5} speed={-0.08} tilt={Math.PI / 3} />
          <GoldRing radius={5} speed={0.12} tilt={Math.PI / 2.5} />
        </Canvas>
      </div>

      {/* Dark gradient overlay for text readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(5,5,5,0.85) 45%, rgba(5,5,5,0.1) 100%)',
        pointerEvents: 'none'
      }} />

      {/* Bottom gradient fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
        background: 'linear-gradient(to top, var(--black), transparent)',
        pointerEvents: 'none'
      }} />

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>

        {/* Top label */}
        <div ref={taglineRef} className="subheading" style={{ marginBottom: '1.5rem' }}>
          Welcome to
        </div>

        {/* Main heading */}
        <h1 ref={headingRef} className="heading-xl" style={{ marginBottom: '1.5rem', color: 'var(--white)' }}>
          <span className="type-line-1" style={{ display: 'block' }}>
            WE DON'T FOLLOW
          </span>
          <span className="type-line-2" style={{ display: 'block' }}>
            TRENDS.
          </span>
          <span style={{ display: 'block', color: 'var(--gold)', position: 'relative' }}>
            WE CREATE THEM.
            <span className="heading-underline" style={{
              position: 'absolute',
              bottom: '-8px',
              left: 0,
              width: '100%',
              height: '2px',
              background: 'linear-gradient(90deg, var(--gold), var(--gold-dim), transparent)',
              display: 'block',
              transformOrigin: 'left'
            }} />
          </span>
        </h1>

        {/* Sub copy */}
        <p ref={subRef} className="body-text" style={{
          maxWidth: '520px',
          marginBottom: '2.5rem',
          fontSize: '1rem'
        }}>
          Struders Marketing Co. is a full-scale digital marketing and media agency
          that builds brands, drives influence, and delivers impact that lasts.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <a
            href="#work"
            className="btn-gold"
            id="hero-explore-btn"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Explore Our Work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
          <a
            href="#services"
            className="btn-ghost"
            id="hero-showreel-btn"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1"/>
              <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor"/>
            </svg>
            Watch Showreel
          </a>
        </div>
      </div>

      {/* Right side floating logo mark */}
      <div style={{
        position: 'absolute',
        right: '8%',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        opacity: 0.15,
        pointerEvents: 'none'
      }}>
        <SMLogoMark size={280} />
      </div>

      {/* Social sidebar */}
      <div style={{
        position: 'absolute',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        zIndex: 3,
      }}>
        {[
          { label: 'IG', href: '#' },
          { label: 'LI', href: '#' },
          { label: 'YT', href: '#' },
        ].map(s => (
          <a key={s.label} href={s.href} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            color: 'var(--white-muted)',
            textDecoration: 'none',
            writingMode: 'vertical-lr',
            transition: 'color 0.3s'
          }}
          onMouseEnter={e => e.target.style.color = 'var(--gold)'}
          onMouseLeave={e => e.target.style.color = 'var(--white-muted)'}
          >
            {s.label}
          </a>
        ))}
        <div style={{
          width: '1px',
          height: '60px',
          background: 'linear-gradient(to bottom, var(--gold-dim), transparent)',
          margin: '0 auto'
        }} />
      </div>

      {/* Scroll hint */}
      <div ref={scrollHintRef} style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        zIndex: 3
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.25em',
          color: 'var(--white-muted)',
          textTransform: 'uppercase'
        }}>Scroll</span>
        <div style={{
          width: '1px',
          height: '50px',
          background: 'linear-gradient(to bottom, var(--gold), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite'
        }} />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); transform-origin: top; }
        }
      `}</style>
    </section>
  )
}
