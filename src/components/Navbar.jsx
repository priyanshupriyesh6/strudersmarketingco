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
  const navRef       = useRef(null)
  const mobileMenuRef = useRef(null)
  const location     = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out' }
    )
  }, [])

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return
    if (menuOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [menuOpen])

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '0.75rem 2rem' : '1.25rem 2rem',
        background: scrolled
          ? 'rgba(5,5,5,0.95)'
          : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.1)' : 'none',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        transition: 'all 0.4s var(--ease-smooth)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textDecoration: 'none',
        }}>
          <SMLogoMark size={42} />
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: 'var(--white)',
              textTransform: 'uppercase',
              lineHeight: 1.1,
            }}>Struders</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
            }}>Marketing Co.</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
        }} className="desktop-nav">
          {navLinks.map(link => {
            const active = isActive(link.to)
            return (
              <Link
                key={link.label}
                to={link.to}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: active ? 'var(--gold)' : 'var(--white-dim)',
                  paddingBottom: '4px',
                  borderBottom: active ? '1px solid var(--gold)' : '1px solid transparent',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  if (!active) e.currentTarget.style.color = 'var(--white)'
                }}
                onMouseLeave={e => {
                  if (!active) e.currentTarget.style.color = 'var(--white-dim)'
                }}
              >
                {link.label}

                {/* Active dot indicator */}
                {active && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    boxShadow: '0 0 6px var(--gold)',
                    display: 'block',
                  }} />
                )}
              </Link>
            )
          })}
        </div>

        {/* CTA Button + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            to="/contact"
            className="btn-gold"
            style={{ fontSize: '0.75rem', padding: '0.6rem 1.4rem' }}
          >
            Let's Connect
          </Link>

          {/* Hamburger */}
          <button
            id="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
            }}
            className="hamburger-btn"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                background: menuOpen && i === 1 ? 'transparent' : 'var(--gold)',
                transform: menuOpen
                  ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                  : i === 2 ? 'translateY(-6.5px) rotate(-45deg)'
                  : 'none'
                  : 'none',
                transition: 'all 0.3s ease',
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      {menuOpen && (
        <div ref={mobileMenuRef} style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(5,5,5,0.98)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          backdropFilter: 'blur(20px)',
        }}>
          <SMLogoMark size={64} />
          {navLinks.map(link => {
            const active = isActive(link.to)
            return (
              <Link
                key={link.label}
                to={link.to}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: active ? 'var(--gold)' : 'var(--white-soft)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = active ? 'var(--gold)' : 'var(--white-soft)'}
              >
                {link.label}
              </Link>
            )
          })}
          {/* Gold divider line */}
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)', opacity: 0.4 }} />
          <Link
            to="/contact"
            className="btn-gold"
            style={{ marginTop: '0.5rem' }}
          >
            Let's Connect
          </Link>
        </div>
      )}
    </>
  )
}
