import { SMLogoMark } from './Loader'

const footerLinks = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#work' },
  { label: 'Process',  href: '#process' },
  { label: 'Contact',  href: '#contact' },
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
    id: 'footer-instagram',
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: 'footer-linkedin',
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11 17v-4c0-1.5 1-2 2-2s2 .5 2 2v4M11 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'footer-youtube',
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M22 7s-.3-1.9-1.1-2.7c-1-1.1-2.2-1.1-2.7-1.2C15.6 3 12 3 12 3s-3.6 0-6.2.1c-.5.1-1.7.1-2.7 1.2C2.3 5.1 2 7 2 7S1.7 9.1 1.7 11.2v2c0 2.1.3 4.2.3 4.2s.3 1.9 1.1 2.7c1 1.1 2.4 1 3 1.1C8.1 21.4 12 21.4 12 21.4s3.6 0 6.2-.2c.5-.1 1.7-.1 2.7-1.2.8-.8 1.1-2.7 1.1-2.7s.3-2.1.3-4.2v-2C22.3 9.1 22 7 22 7z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 9.5l5 2.5-5 2.5v-5z" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: 'footer-email',
    label: 'Email',
    href: 'mailto:hello@struders.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{
      background: 'linear-gradient(180deg, var(--navy) 0%, var(--black) 100%)',
      position: 'relative',
      paddingTop: '5rem',
      paddingBottom: '2rem',
      overflow: 'hidden',
    }}>
      {/* Top gold divider */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
      }} />

      {/* Subtle glow */}
      <div style={{
        position: 'absolute',
        top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '500px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1.5fr 1fr',
          gap: '4rem',
          marginBottom: '4rem',
        }}>
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <SMLogoMark size={48} />
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
            </div>
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.875rem',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'var(--white-dim)',
              marginBottom: '1.5rem',
              maxWidth: '260px',
            }}>
              Building Influence.<br />
              Creating Impact.<br />
              Elevating Brands.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {socials.map(s => (
                <a
                  key={s.id}
                  id={s.id}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: '38px', height: '38px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: '2px',
                    color: 'var(--white-dim)',
                    textDecoration: 'none',
                    transition: 'border-color 0.3s, color 0.3s, box-shadow 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--gold)'
                    e.currentTarget.style.color = 'var(--gold)'
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(201,168,76,0.2)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'
                    e.currentTarget.style.color = 'var(--white-dim)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>Quick Links</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {footerLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    color: 'var(--white-dim)',
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.target.style.color = 'var(--white-dim)'}
                >{link.label}</a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>Services</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {serviceLinks.map(s => (
                <a
                  key={s}
                  href="#services"
                  onClick={(e) => { e.preventDefault(); scrollTo('#services') }}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    color: 'var(--white-dim)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.target.style.color = 'var(--white-dim)'}
                >{s}</a>
              ))}
            </nav>
          </div>

          {/* Follow Us */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>Follow Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {socials.map(s => (
                <a
                  key={s.id + '-text'}
                  href={s.href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.875rem',
                    color: 'var(--white-dim)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--white-dim)'}
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Gold divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--gold-dim), transparent)',
          marginBottom: '2rem',
        }} />

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            color: 'var(--white-muted)',
          }}>
            © {year} Struders Marketing Co. All Rights Reserved.
          </p>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.85rem',
            fontStyle: 'italic',
            color: 'var(--gold)',
            opacity: 0.7,
          }}>
            "Powered by Vision."
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            color: 'var(--white-muted)',
          }}>
            Designed with Passion. Driven by Vision.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 580px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
