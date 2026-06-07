import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { SMLogoMark } from './Loader'

const navLinks = [
  { label: 'Home',     to: '/' },
  { label: 'About',    to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Work',     to: '/work' },
  { label: 'Process',  to: '/process' },
  { label: 'Contact',  to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const navRef        = useRef(null)
  const mobileMenuRef = useRef(null)
  const location      = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
    )
  }, [])

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return
    if (menuOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0, y: -12, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' }
      )
    }
  }, [menuOpen])

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <>
      {/* ── Floating Pill Navbar ── */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: scrolled ? '0.75rem 1rem' : '1.25rem 1rem',
        transition: 'padding 0.4s ease',
        pointerEvents: 'none',
      }}>
        <nav
          ref={navRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            padding: '0.5rem 0.5rem 0.5rem 1rem',
            borderRadius: '9999px',
            background: scrolled
              ? 'rgba(10,10,10,0.9)'
              : 'rgba(10,10,10,0.7)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: scrolled
              ? '0 8px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset'
              : '0 4px 20px rgba(0,0,0,0.3)',
            transition: 'all 0.4s ease',
            maxWidth: '1100px',
            width: '100%',
            pointerEvents: 'all',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none',
            flexShrink: 0,
          }}>
            <SMLogoMark size={32} />
            <div>
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
                lineHeight: 1.1,
              }}>Struders</div>
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.55rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                color: 'var(--gold)',
                textTransform: 'uppercase',
              }}>Marketing Co.</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }} className="desktop-nav">
            {navLinks.map(link => {
              const active = isActive(link.to)
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  style={{
                    padding: '0.45rem 0.9rem',
                    borderRadius: '9999px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.82rem',
                    fontWeight: active ? 600 : 400,
                    letterSpacing: '-0.005em',
                    textDecoration: 'none',
                    color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                    background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                    border: active ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.color = 'var(--text-primary)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.color = 'var(--text-secondary)'
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  {active && (
                    <span style={{
                      width: '4px', height: '4px',
                      borderRadius: '50%',
                      background: 'var(--gold)',
                      flexShrink: 0,
                      boxShadow: '0 0 6px var(--gold)',
                    }} />
                  )}
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* CTA + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            <Link
              to="/contact"
              style={{
                padding: '0.55rem 1.1rem',
                borderRadius: '9999px',
                background: 'var(--gold)',
                color: '#000',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--gold-light)'
                e.currentTarget.style.transform = 'scale(1.03)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--gold)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Let's Connect
            </Link>

            {/* Hamburger */}
            <button
              id="hamburger-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              className="hamburger-btn"
              aria-label="Toggle menu"
              style={{
                display: 'none',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border)',
                borderRadius: '9999px',
                padding: '0.55rem',
                cursor: 'pointer',
                flexDirection: 'column',
                gap: '4px',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
              }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block',
                  width: '16px',
                  height: '1.5px',
                  background: menuOpen && i === 1 ? 'transparent' : 'var(--text-primary)',
                  transform: menuOpen
                    ? i === 0 ? 'translateY(5.5px) rotate(45deg)'
                    : i === 2 ? 'translateY(-5.5px) rotate(-45deg)'
                    : 'none'
                    : 'none',
                  transition: 'all 0.25s ease',
                  borderRadius: '2px',
                }} />
              ))}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drop-Down Menu */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          style={{
            position: 'fixed',
            top: '4.5rem',
            left: '1rem',
            right: '1rem',
            zIndex: 999,
            background: 'rgba(10,10,10,0.96)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            padding: '1rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem' }}>
            {navLinks.map(link => {
              const active = isActive(link.to)
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1rem',
                    fontWeight: active ? 600 : 400,
                    textDecoration: 'none',
                    color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                    background: active ? 'rgba(255,255,255,0.06)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s',
                  }}
                >
                  {active && (
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                  )}
                  {link.label}
                </Link>
              )
            })}
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <Link
              to="/contact"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '0.75rem',
                borderRadius: '9999px',
                background: 'var(--gold)',
                color: '#000',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Let's Connect
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
