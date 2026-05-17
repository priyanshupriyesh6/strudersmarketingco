import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Stats from './components/Stats'
import FeaturedWork from './components/FeaturedWork'
import BrandStrip from './components/BrandStrip'
import DigitalMarketing from './components/DigitalMarketing'
import BrandStrategy from './components/BrandStrategy'
import VideoProduction from './components/VideoProduction'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const cursorRef = useRef(null)
  const mainRef = useRef(null)

  // Mouse follow cursor glow
  useEffect(() => {
    const onMove = (e) => {
      if (!cursorRef.current) return
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Reveal site after loader
  const handleLoaded = () => {
    setLoaded(true)
    gsap.fromTo(mainRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    )
    // Refresh all scroll triggers after reveal
    setTimeout(() => ScrollTrigger.refresh(), 300)
  }

  return (
    <>
      {/* Film grain noise overlay */}
      <div className="noise-overlay" />

      {/* Mouse cursor glow */}
      <div ref={cursorRef} className="cursor-glow" style={{ opacity: loaded ? 1 : 0 }} />

      {/* Loading screen */}
      <Loader onComplete={handleLoaded} />

      {/* Main site */}
      <div ref={mainRef} style={{ opacity: 0 }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Stats />
          <BrandStrip />
          <FeaturedWork />
          <DigitalMarketing />
          <VideoProduction />
          <BrandStrategy />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
