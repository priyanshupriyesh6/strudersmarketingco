export default function BrandStrip() {
  const text = 'Creativity  •  Influence  •  Strategy  •  Culture  •  Vision  •  Impact  •  Growth  •  '
  const repeated = text.repeat(4)

  return (
    <section style={{
      position: 'relative',
      padding: '0',
      overflow: 'hidden',
      background: 'var(--black)',
    }}>
      {/* Top gold border */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
      }} />

      <div style={{
        padding: '1.5rem 0',
        position: 'relative',
        background: 'linear-gradient(90deg, var(--black) 0%, var(--navy-mid) 50%, var(--black) 100%)',
      }}>
        {/* Left fade */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px',
          background: 'linear-gradient(90deg, var(--black), transparent)',
          zIndex: 2, pointerEvents: 'none'
        }} />
        {/* Right fade */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px',
          background: 'linear-gradient(270deg, var(--black), transparent)',
          zIndex: 2, pointerEvents: 'none'
        }} />

        {/* Moving text */}
        <div style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'marquee 30s linear infinite',
          willChange: 'transform',
        }}>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            paddingRight: '0',
          }}>
            {repeated}
          </span>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
          }}>
            {repeated}
          </span>
        </div>
      </div>

      {/* Bottom gold border */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold-dim), transparent)',
      }} />
    </section>
  )
}
