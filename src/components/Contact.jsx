import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: '', brand: '', email: '', requirement: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.contact-heading'),
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 85%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
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

  return (
    <section id="contact" ref={sectionRef} className="section" style={{
      background: 'linear-gradient(180deg, var(--black) 0%, var(--navy) 100%)',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Heading */}
        <div className="contact-heading" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="subheading" style={{ marginBottom: '1rem' }}>Get In Touch</div>
          <h2 className="heading-lg" style={{ color: 'var(--white)' }}>
            LET'S BUILD SOMETHING{' '}
            <span style={{ color: 'var(--gold)' }}>POWERFUL.</span>
          </h2>
          <span className="gold-line-center" style={{ marginTop: '1.5rem' }} />
          <p className="body-text" style={{ marginTop: '1.5rem', maxWidth: '520px', margin: '1.5rem auto 0' }}>
            Ready to elevate your brand? Tell us about your vision and let's create something extraordinary together.
          </p>
        </div>

        {/* Form */}
        {submitted ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'var(--glass)',
            border: '1px solid var(--gold)',
            borderRadius: '2px',
            boxShadow: '0 0 60px rgba(201,168,76,0.1)',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✦</div>
            <h3 className="heading-md" style={{ color: 'var(--gold)', marginBottom: '1rem' }}>
              Your Journey Begins.
            </h3>
            <p className="body-text">
              We've received your message and will be in touch shortly.
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} style={{
            background: 'rgba(5,5,5,0.7)',
            border: '1px solid rgba(201,168,76,0.15)',
            borderRadius: '2px',
            padding: '3.5rem',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.75rem',
              marginBottom: '1.75rem',
            }}>
              <div>
                <label style={labelStyle} htmlFor="contact-name">Full Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => {
                    e.target.style.borderColor = 'var(--gold)'
                    e.target.style.boxShadow = '0 0 20px rgba(201,168,76,0.1)'
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(201,168,76,0.2)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="contact-brand">Brand Name</label>
                <input
                  id="contact-brand"
                  type="text"
                  placeholder="Your brand or company"
                  value={form.brand}
                  onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => {
                    e.target.style.borderColor = 'var(--gold)'
                    e.target.style.boxShadow = '0 0 20px rgba(201,168,76,0.1)'
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(201,168,76,0.2)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={labelStyle} htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                type="email"
                required
                placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={inputStyle}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--gold)'
                  e.target.style.boxShadow = '0 0 20px rgba(201,168,76,0.1)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(201,168,76,0.2)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <label style={labelStyle} htmlFor="contact-requirement">Project Requirement</label>
              <textarea
                id="contact-requirement"
                required
                rows={5}
                placeholder="Tell us about your project, goals, and timeline..."
                value={form.requirement}
                onChange={e => setForm(f => ({ ...f, requirement: e.target.value }))}
                style={{ ...inputStyle, resize: 'vertical', minHeight: '140px' }}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--gold)'
                  e.target.style.boxShadow = '0 0 20px rgba(201,168,76,0.1)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(201,168,76,0.2)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            <div style={{ textAlign: 'center' }}>
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
    </section>
  )
}
