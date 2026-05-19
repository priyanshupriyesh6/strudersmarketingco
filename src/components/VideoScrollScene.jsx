import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Brand-related canvas animation that scrubs with scroll ────────────────
// Creates a cinematic gold particle warp / flythrough that advances with scroll

export default function VideoScrollScene({ height = '300vh', label = '', accentColor = '#C9A84C' }) {
  const wrapperRef = useRef(null)
  const canvasRef  = useRef(null)
  const progressRef = useRef(0)
  const frameRef   = useRef(null)

  // ── Particle system ────────────────────────────────────────────────────────
  const particles = useRef([])
  const PARTICLE_COUNT = 220

  const initParticles = (w, h) => {
    particles.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random(),             // depth 0–1
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      hue: Math.random() * 30 - 10, // slight hue variation around gold
      trail: [],
    }))
  }

  const drawFrame = (ctx, w, h, progress) => {
    // clear
    ctx.clearRect(0, 0, w, h)

    // deep space background
    const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.8)
    bg.addColorStop(0, `rgba(10,15,30,${0.92 + progress * 0.08})`)
    bg.addColorStop(0.5, `rgba(5,5,10,0.97)`)
    bg.addColorStop(1, 'rgba(2,2,5,1)')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, w, h)

    // ── Warp speed star streaks (intensify with scroll) ──────────────────────
    const streakCount = Math.floor(40 + progress * 80)
    ctx.save()
    for (let i = 0; i < streakCount; i++) {
      const seed = (i * 137.5) % 1
      const angle = seed * Math.PI * 2
      const dist = (seed * 0.5 + 0.1) * Math.min(w, h) * 0.5
      const cx = w / 2 + Math.cos(angle) * dist * (1 - progress * 0.3)
      const cy = h / 2 + Math.sin(angle) * dist * (1 - progress * 0.3)
      const len = (progress * 80 + 10) * (0.5 + seed * 0.8)
      const alpha = (0.2 + progress * 0.6) * seed

      const goldAlpha = `rgba(201,168,76,${alpha})`
      const whiteAlpha = `rgba(240,220,160,${alpha * 0.5})`

      const grad = ctx.createLinearGradient(
        cx - Math.cos(angle) * len,
        cy - Math.sin(angle) * len,
        cx + Math.cos(angle) * len * 0.1,
        cy + Math.sin(angle) * len * 0.1,
      )
      grad.addColorStop(0, 'transparent')
      grad.addColorStop(0.6, goldAlpha)
      grad.addColorStop(1, whiteAlpha)

      ctx.beginPath()
      ctx.moveTo(cx - Math.cos(angle) * len, cy - Math.sin(angle) * len)
      ctx.lineTo(cx, cy)
      ctx.strokeStyle = grad
      ctx.lineWidth = 0.8 + seed * 1.2
      ctx.stroke()
    }
    ctx.restore()

    // ── Particles ─────────────────────────────────────────────────────────────
    const speed = 0.8 + progress * 3.5
    particles.current.forEach((p) => {
      // move toward center as progress grows (warp tunnel effect)
      const dx = p.x - w / 2
      const dy = p.y - h / 2
      const dirX = dx / (Math.abs(dx) + 1)
      const dirY = dy / (Math.abs(dy) + 1)

      p.x += p.vx * speed + dirX * progress * 1.2
      p.y += p.vy * speed + dirY * progress * 1.2

      // trail
      p.trail.push({ x: p.x, y: p.y })
      if (p.trail.length > 8 + Math.floor(progress * 16)) p.trail.shift()

      // wrap
      if (p.x < -50) p.x = w + 50
      if (p.x > w + 50) p.x = -50
      if (p.y < -50) p.y = h + 50
      if (p.y > h + 50) p.y = -50

      // draw trail
      if (p.trail.length > 1) {
        ctx.beginPath()
        ctx.moveTo(p.trail[0].x, p.trail[0].y)
        p.trail.forEach(pt => ctx.lineTo(pt.x, pt.y))
        ctx.strokeStyle = `rgba(201,${168 + p.hue},${76 + p.hue},${p.alpha * 0.3 * (1 + progress)})`
        ctx.lineWidth = p.size * 0.5
        ctx.stroke()
      }

      // draw particle dot
      const size = p.size * (1 + progress * 2) * (1 + p.z * 0.5)
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2)
      grd.addColorStop(0, `rgba(240,210,120,${p.alpha * (0.6 + progress * 0.4)})`)
      grd.addColorStop(0.5, `rgba(201,168,76,${p.alpha * 0.4})`)
      grd.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2)
      ctx.fillStyle = grd
      ctx.fill()
    })

    // ── Central gold orb bloom (grows with scroll) ─────────────────────────
    if (progress > 0.1) {
      const orbSize = progress * Math.min(w, h) * 0.5
      const orb = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, orbSize)
      orb.addColorStop(0, `rgba(255,230,140,${progress * 0.15})`)
      orb.addColorStop(0.3, `rgba(201,168,76,${progress * 0.08})`)
      orb.addColorStop(0.7, `rgba(201,168,76,${progress * 0.03})`)
      orb.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(w / 2, h / 2, orbSize, 0, Math.PI * 2)
      ctx.fillStyle = orb
      ctx.fill()
    }

    // ── Gold concentric rings (rotate / expand with scroll) ──────────────────
    const ringCount = 3
    for (let r = 0; r < ringCount; r++) {
      const ringR = (60 + r * 80 + progress * 200) % (Math.min(w, h) * 0.6)
      const ringAlpha = (1 - ringR / (Math.min(w, h) * 0.6)) * 0.25 * progress
      if (ringAlpha <= 0) continue
      ctx.beginPath()
      ctx.arc(w / 2, h / 2, ringR, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(201,168,76,${ringAlpha})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // ── Page label ────────────────────────────────────────────────────────────
    if (label) {
      ctx.save()
      ctx.font = `300 ${Math.floor(w * 0.015 + 10)}px 'Share Tech Mono', monospace`
      ctx.letterSpacing = '0.3em'
      ctx.fillStyle = `rgba(201,168,76,${0.3 + progress * 0.4})`
      ctx.textAlign = 'center'
      ctx.fillText(label.toUpperCase(), w / 2, h * 0.12)
      ctx.restore()
    }

    // ── Progress bar at bottom ─────────────────────────────────────────────
    const barW = progress * w
    const barGrad = ctx.createLinearGradient(0, 0, barW, 0)
    barGrad.addColorStop(0, 'rgba(201,168,76,0)')
    barGrad.addColorStop(0.5, `rgba(201,168,76,${0.6 + progress * 0.4})`)
    barGrad.addColorStop(1, 'rgba(240,204,110,0.9)')
    ctx.fillStyle = barGrad
    ctx.fillRect(0, h - 2, barW, 2)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    const ctx = canvas.getContext('2d')
    let w = window.innerWidth
    let h = window.innerHeight

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width  = w
      canvas.height = h
      initParticles(w, h)
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Render loop ──────────────────────────────────────────────────────────
    const render = () => {
      drawFrame(ctx, w, h, progressRef.current)
      frameRef.current = requestAnimationFrame(render)
    }
    render()

    // ── ScrollTrigger to scrub progress 0→1 ─────────────────────────────────
    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate: (self) => {
        progressRef.current = self.progress
      },
    })

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frameRef.current)
      st.kill()
    }
  }, [label])

  return (
    <div
      ref={wrapperRef}
      className="video-scroll-scene"
      style={{ height }}
    >
      <canvas
        ref={canvasRef}
        className="video-scroll-canvas"
        aria-hidden="true"
      />

      {/* Overlay gradient fade at bottom to blend into next section */}
      <div style={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30vh',
        background: 'linear-gradient(to bottom, transparent, var(--black))',
        pointerEvents: 'none',
        marginTop: '-30vh',
      }} />
    </div>
  )
}
