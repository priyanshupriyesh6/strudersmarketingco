import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VideoScrollScene from '../components/VideoScrollScene'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    label: 'Head Office',
    value: 'Mohan Garden, New Delhi, India',
    sub: 'Branch: Sector 63, Noida',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Email Us',
    value: 'hello@struders.com',
    sub: 'business@struders.com',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C9.39 21 3 14.61 3 7c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02l-2.21 2.2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Call Us',
    value: '+91 98XXX XXXXX',
    sub: 'Mon–Sat, 10am–7pm IST',
  },
]

export default function ContactPage() {
  const heroRef    = useRef(null)
  const formRef    = useRef(null)
  const infoRef    = useRef(null)
  const [form, setForm] = useState({ name: '', brand: '', email: '', requirement: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(heroRef.current.querySelectorAll('.contact-hero-el'),
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 1.1, ease: 'power4.out', delay: 0.3 }
      )

      // Info cards
      gsap.fromTo(infoRef.current.querySelectorAll('.info-card'),
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 80%', once: true }
        }
      )

      // Form reveal
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 85%', once: true }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // EmailJS integration (replace with your actual IDs)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      // Success animation
      if (formRef.current) {
        gsap.fromTo(formRef.current,
          { scale: 0.97, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.4)' }
        )
      }
    }, 1600)
  }

  const inputStyle = {
    width: '100%',
    padding: '1rem 1.25rem',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: '2px',
    color: 'var(--white-soft)',
    fontFamily: 'var(--font-heading)',
    fontSize: '0.95rem',
    fontWeight: 300,
    letterSpacing: '0.05em',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  }

  const labelStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    letterSpacing: '0.25em',
    color: 'var(--gold)',
    textTransform: 'uppercase',
    marginBottom: '0.5rem',
    display: 'block',
  }

  const focusStyle = (e) => {
    e.target.style.borderColor = 'var(--gold)'
    e.target.style.boxShadow = '0 0 20px rgba(201,168,76,0.1)'
  }
  const blurStyle = (e) => {
    e.target.style.borderColor = 'rgba(201,168,76,0.2)'
    e.target.style.boxShadow = 'none'
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        {/* ── Page Hero ───────────────────────────────────────────────── */}
        <section style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'flex-end',
          paddingTop: '10rem',
          paddingBottom: '5rem',
          background: 'linear-gradient(180deg, var(--navy) 0%, var(--black) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Radial glow bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '700px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div className="container" ref={heroRef}>
            <div className="subheading contact-hero-el" style={{ marginBottom: '1.5rem' }}>Get In Touch</div>
            <h1 className="heading-xl contact-hero-el" style={{ color: 'var(--white)', marginBottom: '0.5rem' }}>
              LET'S BUILD SOMETHING
            </h1>
            <h1 className="heading-xl contact-hero-el" style={{ color: 'var(--gold)', marginBottom: '2rem' }}>
              POWERFUL.
            </h1>
            <p className="body-text contact-hero-el" style={{ maxWidth: '560px' }}>
              Ready to elevate your brand? Tell us about your vision and let's create
              something extraordinary together.
            </p>
          </div>
        </section>

        {/* ── Brand Video Scroll ──────────────────────────────────────── */}
        <VideoScrollScene height="140vh" label="Contact — Start Your Journey" />

        {/* ── Contact Content ──────────────────────────────────────────── */}
        <section className="section" style={{ background: 'var(--black)' }}>
          {/* Gold glow */}
          <div style={{
            position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '600px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.8fr',
              gap: '5rem',
              alignItems: 'start',
            }} className="contact-layout">

              {/* ── Contact Info ──────────────────────────────────────── */}
              <div ref={infoRef}>
                <div className="subheading" style={{ marginBottom: '2rem' }}>Reach Us</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                  {contactInfo.map((info, i) => (
                    <div key={i} className="info-card glass-card" style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{
                          color: 'var(--gold)',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}>{info.icon}</div>
                        <div>
                          <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.6rem',
                            letterSpacing: '0.2em',
                            color: 'var(--gold)',
                            textTransform: 'uppercase',
                            marginBottom: '0.4rem',
                          }}>{info.label}</div>
                          <div style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            color: 'var(--white-soft)',
                            marginBottom: '0.25rem',
                          }}>{info.value}</div>
                          {info.sub && (
                            <div style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: '0.8rem',
                              fontWeight: 300,
                              color: 'var(--white-muted)',
                            }}>{info.sub}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social links */}
                <div className="subheading" style={{ marginBottom: '1rem' }}>Follow Us</div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {['Instagram', 'LinkedIn', 'YouTube', 'Twitter'].map(s => (
                    <a key={s} href="#" style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.15em',
                      color: 'var(--white-muted)',
                      textDecoration: 'none',
                      border: '1px solid rgba(201,168,76,0.15)',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '2px',
                      textTransform: 'uppercase',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--gold)'
                      e.currentTarget.style.borderColor = 'var(--gold)'
                      e.currentTarget.style.boxShadow = '0 0 12px rgba(201,168,76,0.15)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--white-muted)'
                      e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    >{s}</a>
                  ))}
                </div>
              </div>

              {/* ── Contact Form ──────────────────────────────────────── */}
              <div ref={formRef}>
                {submitted ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '5rem 2rem',
                    background: 'var(--glass)',
                    border: '1px solid var(--gold)',
                    borderRadius: '2px',
                    boxShadow: '0 0 60px rgba(201,168,76,0.1)',
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--gold)' }}>✦</div>
                    <h3 className="heading-md" style={{ color: 'var(--gold)', marginBottom: '1rem' }}>
                      Your Journey Begins.
                    </h3>
                    <p className="body-text">
                      We've received your message and will be in touch within 24 hours.
                    </p>
                    <div style={{
                      width: '60px', height: '1px',
                      background: 'var(--gold)', margin: '2rem auto',
                    }} />
                    <p style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      color: 'var(--gold)',
                      fontSize: '1rem',
                      opacity: 0.8,
                    }}>
                      "Powered by Vision."
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{
                    background: 'rgba(5,5,5,0.7)',
                    border: '1px solid rgba(201,168,76,0.15)',
                    borderRadius: '2px',
                    padding: '3.5rem',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
                  }}>
                    <div className="subheading" style={{ marginBottom: '2rem' }}>Your Details</div>

                    {/* Name + Brand */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="form-row">
                      <div>
                        <label style={labelStyle} htmlFor="contact-name">Full Name</label>
                        <input
                          id="contact-name" type="text" required
                          placeholder="Your full name"
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
                        />
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="contact-brand">Brand Name</label>
                        <input
                          id="contact-brand" type="text"
                          placeholder="Your brand or company"
                          value={form.brand}
                          onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                          style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={labelStyle} htmlFor="contact-email">Email Address</label>
                      <input
                        id="contact-email" type="email" required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
                      />
                    </div>

                    {/* Requirement */}
                    <div style={{ marginBottom: '2.5rem' }}>
                      <label style={labelStyle} htmlFor="contact-requirement">Project Requirement</label>
                      <textarea
                        id="contact-requirement" required rows={5}
                        placeholder="Tell us about your project, goals, and timeline..."
                        value={form.requirement}
                        onChange={e => setForm(f => ({ ...f, requirement: e.target.value }))}
                        style={{ ...inputStyle, resize: 'vertical', minHeight: '140px' }}
                        onFocus={focusStyle} onBlur={blurStyle}
                      />
                    </div>

                    {/* Submit */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                      <p style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        color: 'var(--white-muted)',
                        letterSpacing: '0.1em',
                      }}>
                        We respond within 24 hours.
                      </p>
                      <button
                        id="contact-submit-btn"
                        type="submit"
                        disabled={loading}
                        className="btn-gold animate-pulse-gold"
                        style={{
                          fontSize: '0.85rem',
                          padding: '1rem 3rem',
                          letterSpacing: '0.25em',
                          cursor: loading ? 'wait' : 'pointer',
                        }}
                      >
                        {loading ? 'Sending...' : 'Start Your Journey'}
                        {!loading && (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .contact-layout { grid-template-columns: 1fr !important; gap: 3rem !important; }
              .form-row { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>
      </main>
      <Footer />
    </div>
  )
}
