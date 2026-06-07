import { Link } from 'react-router-dom'
import { SMLogoMark } from './Loader'

const footerLinks = [
  { label: 'Home',     to: '/' },
  { label: 'About',    to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Work',     to: '/work' },
  { label: 'Process',  to: '/process' },
  { label: 'Contact',  to: '/contact' },
]

const serviceLinks = [
  'Digital Marketing',
  'Performance Marketing',
  'Influencer Management',
  'Public Relations',
  'Content & Production',
  'Podcast & Media',
]

const socials = [
  {
    id: 'footer-instagram', label: 'Instagram', href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: 'footer-linkedin', label: 'LinkedIn', href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11 17v-4c0-1.5 1-2 2-2s2 .5 2 2v4M11 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'footer-youtube', label: 'YouTube', href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M22 7s-.3-1.9-1.1-2.7c-1-1.1-2.2-1.1-2.7-1.2C15.6 3 12 3 12 3s-3.6 0-6.2.1c-.5.1-1.7.1-2.7 1.2C2.3 5.1 2 7 2 7S1.7 9.1 1.7 11.2v2c0 2.1.3 4.2.3 4.2s.3 1.9 1.1 2.7c1 1.1 2.4 1 3 1.1C8.1 21.4 12 21.4 12 21.4s3.6 0 6.2-.2c.5-.1 1.7-.1 2.7-1.2.8-.8 1.1-2.7 1.1-2.7s.3-2.1.3-4.2v-2C22.3 9.1 22 7 22 7z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 9.5l5 2.5-5 2.5v-5z" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: 'footer-email', label: 'Email', href: 'mailto:hello@struders.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: 'var(--black)',
      borderTop: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '500px', height: '200px',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* CTA Block */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        padding: '5rem 0',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="pill pill-gold" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
            <span className="pill-dot" />
            Let's Work Together
          </span>
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginBottom: '1.25rem',
            lineHeight: 1.05,
          }}>
            Ready to Build Something{' '}
            <span className="text-gradient">Extraordinary?</span>
          </h2>
          <p className="text-body" style={{ maxWidth: '480px', margin: '0 auto 2.5rem', fontSize: '1.05rem' }}>
            Tell us about your vision and we'll craft a strategy that elevates your brand to the next level.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.85rem 2rem', borderRadius: '9999px',
                background: 'var(--gold)', color: '#000',
                fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 700,
                textDecoration: 'none', transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-light)'; e.currentTarget.style.transform = 'scale(1.03)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.transform = 'scale(1)' }}
            >
              Start a Project
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </Link>
            <Link
              to="/work"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.85rem 2rem', borderRadius: '9999px',
                background: 'var(--glass)', color: 'var(--text-primary)',
                border: '1px solid var(--border)', backdropFilter: 'blur(12px)',
                fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--glass-hover)'; e.currentTarget.style.borderColor = 'var(--border-hover)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--glass)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              View Our Work
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="container" style={{ padding: '4rem var(--container-px) 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1.5fr 1fr',
          gap: '4rem',
          marginBottom: '3rem',
        }}>
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <SMLogoMark size={36} />
              <div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-primary)', lineHeight: 1.1 }}>Struders</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.55rem', fontWeight: 500, letterSpacing: '0.12em', color: 'var(--gold)', textTransform: 'uppercase' }}>Marketing Co.</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '240px' }}>
              Building influence. Creating impact. Elevating brands beyond the ordinary.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {socials.map(s => (
                <a
                  key={s.id}
                  id={s.id}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: '34px', height: '34px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid var(--border)',
                    borderRadius: '9999px',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    background: 'var(--glass)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'
                    e.currentTarget.style.color = 'var(--gold)'
                    e.currentTarget.style.background = 'rgba(201,168,76,0.06)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.background = 'var(--glass)'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-label" style={{ color: 'var(--text-tertiary)', marginBottom: '1.25rem' }}>Navigation</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {footerLinks.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 400, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                >{link.label}</Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-label" style={{ color: 'var(--text-tertiary)', marginBottom: '1.25rem' }}>Services</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {serviceLinks.map(s => (
                <Link
                  key={s}
                  to="/services"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 400, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                >{s}</Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-label" style={{ color: 'var(--text-tertiary)', marginBottom: '1.25rem' }}>Connect</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {socials.map(s => (
                <a
                  key={s.id + '-text'}
                  href={s.href}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          height: '1px',
          background: 'var(--border)',
          marginBottom: '1.5rem',
        }} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: 'var(--text-tertiary)', fontWeight: 400 }}>
            © {year} Struders Marketing Co. All rights reserved.
          </p>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--gold)', opacity: 0.6 }}>
            "Powered by Vision."
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: 'var(--text-tertiary)', fontWeight: 400 }}>
            Designed with passion · Driven by vision
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .container > div[style*="repeat(4"] {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 580px) {
          footer .container > div[style*="repeat(4"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
