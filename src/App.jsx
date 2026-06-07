import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Pages
import HomePage    from './pages/HomePage'
import AboutPage   from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import WorkPage    from './pages/WorkPage'
import ProcessPage from './pages/ProcessPage'
import ContactPage from './pages/ContactPage'

// Shared components
import Loader from './components/Loader'
import PageTransition from './components/PageTransition'

gsap.registerPlugin(ScrollTrigger)

// ─── Lenis + GSAP ScrollTrigger sync (must live inside BrowserRouter) ──────
function SmoothScrollProvider() {
  useEffect(() => {
    // Initialise Lenis
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Sync Lenis with GSAP ticker for ScrollTrigger integration
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return null
}

// ─── Scroll-to-top on route change ──────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    // Refresh ScrollTrigger after route change
    setTimeout(() => ScrollTrigger.refresh(), 300)
  }, [pathname])
  return null
}

// ─── Main App shell ──────────────────────────────────────────────────────────
function AppShell() {
  const [loaded, setLoaded] = useState(false)
  const cursorRef = useRef(null)
  const mainRef   = useRef(null)

  // Mouse follow cursor glow (Framer-style white spotlight)
  useEffect(() => {
    const onMove = (e) => {
      if (!cursorRef.current) return
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.9,
        ease: 'power3.out',
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const handleLoaded = () => {
    setLoaded(true)
    gsap.fromTo(mainRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }
    )
    setTimeout(() => ScrollTrigger.refresh(), 400)
  }

  return (
    <>
      {/* Mouse cursor spotlight (Framer-style white glow) */}
      <div ref={cursorRef} className="cursor-glow" style={{ opacity: loaded ? 1 : 0 }} />

      {/* Loading screen */}
      <Loader onComplete={handleLoaded} />

      {/* Lenis smooth scroll (no DOM output) */}
      <SmoothScrollProvider />

      {/* Scroll-to-top on every page change */}
      <ScrollToTop />

      {/* Main site content */}
      <div ref={mainRef} style={{ opacity: 0 }}>
        <PageTransition>
          <Routes>
            <Route path="/"        element={<HomePage />} />
            <Route path="/about"   element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/work"    element={<WorkPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Fallback — redirect unknown paths to home */}
            <Route path="*"        element={<HomePage />} />
          </Routes>
        </PageTransition>
      </div>
    </>
  )
}

// ─── Root export with BrowserRouter ──────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
