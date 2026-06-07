const row1 = ['Creativity', 'Influence', 'Strategy', 'Culture', 'Vision', 'Impact', 'Growth', 'Innovation', 'Identity', 'Performance']
const row2 = ['Analytics', 'Storytelling', 'Community', 'Brand', 'Media', 'Audience', 'Content', 'Conversion', 'Engagement', 'Excellence']

function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items]

  return (
    <div style={{ overflow: 'hidden', width: '100%' }} className="marquee-fade">
      <div style={{
        display: 'flex',
        gap: '2.5rem',
        whiteSpace: 'nowrap',
        animation: `${reverse ? 'marqueeRight' : 'marqueeLeft'} ${reverse ? '28s' : '22s'} linear infinite`,
        willChange: 'transform',
      }}>
        {doubled.map((word, i) => (
          <span key={i} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2.5rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: reverse ? 'var(--text-tertiary)' : 'var(--text-secondary)',
            flexShrink: 0,
          }}>
            {word}
            <svg width="4" height="4" viewBox="0 0 4 4" fill="currentColor" style={{ opacity: 0.4 }}>
              <circle cx="2" cy="2" r="2"/>
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function BrandStrip() {
  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--surface-0)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ padding: '1.75rem 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <MarqueeRow items={row1} reverse={false} />
        <MarqueeRow items={row2} reverse={true} />
      </div>

      <style>{`
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}
