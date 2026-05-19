import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'

// Gold curtain wipe page transition
export default function PageTransition({ children }) {
  const curtainRef = useRef(null)
  const location   = useLocation()
  const isFirst    = useRef(true)

  useEffect(() => {
    const curtain = curtainRef.current
    if (!curtain) return

    if (isFirst.current) {
      // First load: just hide curtain instantly
      gsap.set(curtain, { scaleY: 0, transformOrigin: 'top' })
      isFirst.current = false
      return
    }

    // Page change: play curtain in → scroll to top → curtain out
    const tl = gsap.timeline()
    tl.set(curtain, { scaleY: 1, transformOrigin: 'bottom' })
      .to(curtain, { scaleY: 0, transformOrigin: 'top', duration: 0.65, ease: 'power3.inOut' })

    window.scrollTo(0, 0)

    return () => tl.kill()
  }, [location.pathname])

  // Entry animation for every route
  useEffect(() => {
    const curtain = curtainRef.current
    if (!curtain) return

    gsap.set(curtain, { scaleY: 1, transformOrigin: 'bottom' })
    gsap.to(curtain, {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 0.8,
      ease: 'power3.inOut',
      delay: 0.05,
    })
  }, [location.key])

  return (
    <>
      {/* Gold curtain layer */}
      <div
        ref={curtainRef}
        className="page-curtain"
        aria-hidden="true"
      />
      {children}
    </>
  )
}
