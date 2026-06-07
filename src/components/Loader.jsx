import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const sparkRef = useRef(null)
  const logoRef = useRef(null)
  const taglineRef = useRef(null)
  const subtitleRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
              if (loaderRef.current) loaderRef.current.style.display = 'none'
              onComplete?.()
            }
          })
        }
      })

      // Initial state
      gsap.set([logoRef.current, taglineRef.current, subtitleRef.current], {
        opacity: 0, y: 30
      })
      gsap.set(sparkRef.current, { scale: 0, opacity: 0 })
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left' })

      // Spark ignites
      tl.to(sparkRef.current, {
        scale: 1, opacity: 1,
        duration: 0.4,
        ease: 'back.out(2)'
      })
      // Spark explodes outward
      .to(sparkRef.current, {
        scale: 2.5, opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.1')
      // Logo forms
      .to(logoRef.current, {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: 'power3.out'
      }, '-=0.3')
      // Progress bar sweeps
      .to(progressRef.current, {
        scaleX: 1,
        duration: 1.0,
        ease: 'power1.inOut'
      }, '-=0.5')
      // Tagline fades in
      .to(taglineRef.current, {
        opacity: 1, y: 0,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.2')
      .to(subtitleRef.current, {
        opacity: 1, y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4')
      // Hold
      .to({}, { duration: 0.8 })
    }, loaderRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div id="loader" ref={loaderRef}>
      {/* Radial glow background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Gold spark burst */}
      <div ref={sparkRef} style={{
        position: 'absolute',
        width: 8, height: 8,
        borderRadius: '50%',
        background: 'var(--gold-light)',
        boxShadow: '0 0 40px 20px rgba(201,168,76,0.6)',
      }} />

      {/* SM Monogram */}
      <div ref={logoRef} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <SMLogoMark size={120} />
        <div style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          color: 'var(--text-secondary)',
          marginTop: '1rem',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}>
          STRUDERS MARKETING CO.
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        bottom: '4rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '200px',
        height: '1px',
        background: 'rgba(255,255,255,0.08)',
        overflow: 'hidden'
      }}>
        <div ref={progressRef} style={{
          width: '100%', height: '100%',
          background: 'linear-gradient(90deg, var(--gold-dim), var(--gold-light))',
        }} />
      </div>

      {/* Tagline */}
      <div style={{
        position: 'absolute',
        bottom: '6rem',
        textAlign: 'center',
        width: '100%'
      }}>
        <div ref={taglineRef} style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          color: 'var(--gold)',
          fontWeight: 600,
          marginBottom: '0.5rem'
        }}>
          Building Influence. Creating Impact.
        </div>
        <div ref={subtitleRef} style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          color: 'var(--text-tertiary)',
          fontWeight: 400,
        }}>
          Strategy · Creativity · Growth
        </div>
      </div>
    </div>
  )
}

// Inline SVG logo mark
export function SMLogoMark({ size = 80, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0CC6E" />
          <stop offset="50%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* S letter */}
      <text
        x="8"
        y="72"
        fontFamily="Rajdhani, sans-serif"
        fontWeight="700"
        fontSize="72"
        fill="url(#goldGrad)"
        filter="url(#glow)"
      >
        S
      </text>
      {/* M letter - offset and slightly smaller */}
      <text
        x="46"
        y="68"
        fontFamily="Rajdhani, sans-serif"
        fontWeight="700"
        fontSize="56"
        fill="url(#goldGrad)"
        filter="url(#glow)"
        opacity="0.85"
      >
        M
      </text>
      {/* Thin gold line underneath */}
      <line x1="8" y1="78" x2="92" y2="78" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}
