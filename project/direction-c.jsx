// direction-c.jsx — "Forward Motion"
// Bold, asymmetric, geometric. Big display type, terracotta color block,
// playful but still grown-up for a consulting practice.

// Palette presets. Each palette has SHARED tokens (accents, "card paper"
// surface, "deep island" surface — all locked across light/dark) plus
// per-mode page bg/fg/muted/border. Dark mode is "lights off" only — page
// flips, but accent colors and card/deep surfaces stay put.
const C_PALETTES = {
  terracotta: {
    shared: {
      accent: '#d05a3a', accent2: '#3f5a4c',
      cardBg: '#fbf6ec', cardFg: '#1a1814', cardMuted: 'rgba(26,24,20,.62)', cardBorder: 'rgba(26,24,20,.14)',
      deepBg: '#191613', deepFg: '#fbf6ec', deepFgRgb: '251,246,236',
    },
    light: { bg: '#fbf6ec', fg: '#1a1814', muted: 'rgba(26,24,20,.62)', border: 'rgba(26,24,20,.14)', subtle: 'rgba(26,24,20,.04)', ink: '#1a1814' },
    dark:  { bg: '#191613', fg: '#fbf6ec', muted: 'rgba(251,246,236,.62)', border: 'rgba(255,255,255,.12)', subtle: 'rgba(255,255,255,.04)', ink: '#fbf6ec' },
  },
  inkwell: {
    shared: {
      accent: '#e89a2c', accent2: '#2c3a6b',
      cardBg: '#f4f1e8', cardFg: '#0e1429', cardMuted: 'rgba(14,20,41,.62)', cardBorder: 'rgba(14,20,41,.14)',
      deepBg: '#0e1224', deepFg: '#f4f1e8', deepFgRgb: '244,241,232',
    },
    light: { bg: '#f4f1e8', fg: '#0e1429', muted: 'rgba(14,20,41,.62)', border: 'rgba(14,20,41,.14)', subtle: 'rgba(14,20,41,.04)', ink: '#0e1429' },
    dark:  { bg: '#0e1224', fg: '#f4f1e8', muted: 'rgba(244,241,232,.62)', border: 'rgba(244,241,232,.12)', subtle: 'rgba(244,241,232,.04)', ink: '#f4f1e8' },
  },
  garden: {
    shared: {
      accent: '#2f5d3a', accent2: '#c8983b',
      cardBg: '#f6f3ea', cardFg: '#1c2118', cardMuted: 'rgba(28,33,24,.62)', cardBorder: 'rgba(28,33,24,.14)',
      deepBg: '#13180f', deepFg: '#f6f3ea', deepFgRgb: '246,243,234',
    },
    light: { bg: '#f6f3ea', fg: '#1c2118', muted: 'rgba(28,33,24,.62)', border: 'rgba(28,33,24,.14)', subtle: 'rgba(28,33,24,.04)', ink: '#1c2118' },
    dark:  { bg: '#13180f', fg: '#f6f3ea', muted: 'rgba(246,243,234,.62)', border: 'rgba(246,243,234,.12)', subtle: 'rgba(246,243,234,.04)', ink: '#f6f3ea' },
  },
};

function DirectionC({ density = 'regular', dark = false, palette = 'terracotta' }) {
  const scrollRef = React.useRef(null);
  const [contactOpen, setContactOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('top');
  const [bryanOpen, setBryanOpen] = React.useState(false);

  const palObj = C_PALETTES[palette] || C_PALETTES.terracotta;
  const variant = dark ? palObj.dark : palObj.light;
  const p = { ...palObj.shared, ...variant };
  // Back-compat aliases for code that previously read p.cream / p.creamRgb;
  // these are the DEEP island's foreground (the cream paper laid over dark).
  p.cream = p.deepFg;
  p.creamRgb = p.deepFgRgb;

  const pad = density === 'compact' ? 56 : density === 'comfy' ? 100 : 76;
  const sectionGap = density === 'compact' ? 88 : density === 'comfy' ? 160 : 124;

  const theme = { bg: p.bg, fg: p.fg, accent: p.accent, muted: p.muted, border: p.border, font: '"DM Sans", system-ui, sans-serif', displayFont: '"Bricolage Grotesque", "DM Sans", sans-serif', kind: 'bold' };

  React.useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const ids = ['top', 'about', 'capabilities', 'beliefs', 'contact'];
    const onScroll = () => {
      const y = scroller.scrollTop + 120;
      let cur = 'top';
      for (const id of ids) {
        const el = scroller.querySelector(`[data-sec="${id}"]`);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActiveSection(cur);
    };
    scroller.addEventListener('scroll', onScroll);
    return () => scroller.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const el = scroller.querySelector(`[data-sec="${id}"]`);
    if (el) lpScrollTo(scroller, el);
  };

  const display = { fontFamily: '"Bricolage Grotesque", "DM Sans", system-ui, sans-serif', letterSpacing: '-0.025em', fontWeight: 700 };
  const sans = { fontFamily: '"DM Sans", system-ui, sans-serif' };
  const mono = { fontFamily: '"JetBrains Mono", ui-monospace, monospace' };

  // Visual primitives ─ shapes that anchor each section
  const Marker = ({ n, color }) => (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      ...mono, fontSize: 11.5, letterSpacing: '.1em', textTransform: 'uppercase',
      color: color || p.accent, marginBottom: 22,
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
        <rect x="0.5" y="0.5" width="13" height="13" fill={color || p.accent} />
      </svg>
      <span>{n}</span>
    </div>
  );

  const Btn = ({ children, primary, accent2, onClick }) => (
    <button
      onClick={onClick}
      style={{
        ...sans,
        cursor: 'pointer',
        background: primary ? p.accent : (accent2 ? p.accent2 : 'transparent'),
        color: primary || accent2 ? p.cream : p.fg,
        border: primary || accent2 ? 'none' : `1.5px solid ${p.ink}`,
        padding: '15px 26px',
        borderRadius: 2,
        fontSize: 15, fontWeight: 600,
        letterSpacing: '-0.005em',
        display: 'inline-flex', alignItems: 'center', gap: 10,
        transition: 'transform .12s, box-shadow .15s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = `4px 4px 0 ${p.ink}`; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {children}
    </button>
  );

  return (
    <div
      ref={scrollRef}
      className={`lp-scroll ${dark ? 'lp-dark' : ''}`}
      style={{
        height: '100%', overflowY: 'auto', overflowX: 'hidden',
        background: p.bg, color: p.fg,
        ...sans, fontSize: 16, lineHeight: 1.5,
        position: 'relative',
      }}
    >
      {/* ============ NAV ============ */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: p.bg,
        borderBottom: `1.5px solid ${p.ink}`,
        padding: `14px ${pad}px`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={() => scrollTo('top')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, color: p.fg }}>
          {/* Stacked geometric mark */}
          <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden>
            <rect x="2" y="2" width="14" height="14" fill={p.accent} />
            <rect x="18" y="2" width="14" height="14" fill={p.ink} />
            <rect x="2" y="18" width="14" height="14" fill={p.ink} />
            <rect x="18" y="18" width="14" height="14" fill={p.accent2} />
          </svg>
          <span style={{ ...display, fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>
            CGS<span style={{ color: p.accent }}>.</span>
          </span>
        </button>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {CGS.navItems.slice(0, 3).map((n) => (
            <button key={n.id} onClick={() => scrollTo(n.id)} style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              padding: '8px 14px',
              ...sans, fontSize: 14.5, fontWeight: 600,
              color: activeSection === n.id ? p.accent : p.fg,
              transition: 'color .15s',
              position: 'relative',
            }}>
              {n.label}
              {activeSection === n.id && (
                <span style={{ position: 'absolute', bottom: 2, left: 14, right: 14, height: 2, background: p.accent }} />
              )}
            </button>
          ))}
          <div style={{ width: 16 }} />
          <Btn primary onClick={() => setContactOpen(true)}>Get in touch →</Btn>
        </nav>
      </header>

      {/* ============ HERO ============ */}
      <section data-sec="top" style={{ padding: `${pad - 10}px ${pad}px ${pad}px`, position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 60, alignItems: 'end' }}>
          <div>
            <Marker n="Channel · Strategy · Coaching" />
            <h1 style={{
              ...display,
              fontSize: 132, lineHeight: 0.9, fontWeight: 800,
              margin: '0 0 32px', letterSpacing: '-0.045em',
            }}>
              <span>Channel</span><br />
              <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 16 }}>
                <span style={{ color: p.accent }}>growth</span>
                <svg width="120" height="80" viewBox="0 0 120 80" aria-hidden style={{ flexShrink: 0 }}>
                  <path d="M5 70 Q 35 5, 60 40 T 115 10" fill="none" stroke={p.accent2} strokeWidth="6" strokeLinecap="square"/>
                  <circle cx="115" cy="10" r="6" fill={p.accent2} />
                </svg>
              </span><br />
              <span style={{ fontStyle: 'italic', fontWeight: 500 }}>that lasts.</span>
            </h1>
            <p style={{ ...sans, fontSize: 21, lineHeight: 1.45, color: p.muted, maxWidth: 600, margin: '0 0 40px', textWrap: 'pretty' }}>
              Two decades of channel and go-to-market experience, applied as a coach. Programs
              that drive measurable revenue, partnerships built to last, and a team that knows
              how to run it after we're gone.
            </p>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <Btn primary onClick={() => setContactOpen(true)}>Book a session →</Btn>
              <Btn onClick={() => scrollTo('capabilities')}>What we do</Btn>
            </div>
          </div>

          {/* Right column — visual stack */}
          <div style={{ position: 'relative', height: 460 }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 280, height: 280, background: p.accent, transform: 'rotate(-3deg)' }} />
            <div style={{ position: 'absolute', top: 40, right: 40, width: 280, height: 280, background: p.ink, transform: 'rotate(2deg)' }} />
            <div style={{ position: 'absolute', top: 80, right: 80, width: 280, height: 280, background: p.bg, border: `1.5px solid ${p.ink}`, transform: 'rotate(-1deg)', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ ...mono, fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: p.muted, marginBottom: 6 }}>Engagement model</div>
                <div style={{ ...display, fontSize: 36, fontWeight: 700, lineHeight: 1, color: p.ink, letterSpacing: '-0.025em' }}>1 : 1</div>
                <div style={{ ...sans, fontSize: 14, color: p.muted, marginTop: 4 }}>Founder-led, every engagement.</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, ...mono, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: p.accent }}>
                <span style={{ width: 8, height: 8, background: p.accent, borderRadius: 4, boxShadow: `0 0 0 4px ${p.accent}22` }} />
                Accepting Q3 engagements
              </div>
            </div>
          </div>
        </div>

        {/* Stat band */}
        <div style={{
          marginTop: 84,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          background: p.deepBg, color: p.deepFg,
        }}>
          {CGS.stats.map((s, i) => (
            <div key={s.l} style={{
              padding: '32px 28px',
              borderLeft: i === 0 ? 'none' : `1px solid rgba(${p.deepFgRgb},.18)`,
            }}>
              <div style={{ ...display, fontSize: 56, fontWeight: 800, lineHeight: 1, marginBottom: 8, letterSpacing: '-0.03em', color: i === 1 ? p.accent2 : p.deepFg }}>{s.n}</div>
              <div style={{ ...mono, fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: `rgba(${p.deepFgRgb},.62)` }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section data-sec="about" style={{ padding: `${sectionGap}px ${pad}px`, position: 'relative' }}>
        <Marker n="01 / Who we are" />
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 60, alignItems: 'start', marginBottom: 72 }}>
          <h2 style={{ ...display, fontSize: 72, lineHeight: 0.98, margin: 0, fontWeight: 700, letterSpacing: '-0.03em' }}>
            We don't do<br/>slide decks. We<br/>do the <span style={{ color: p.accent }}>work</span>.
          </h2>
          <div style={{ paddingTop: 14 }}>
            {CGS.whoWeAre.map((para, i) => (
              <p key={i} style={{ ...sans, fontSize: 18, lineHeight: 1.55, margin: '0 0 20px', color: i === 0 ? p.fg : p.muted, textWrap: 'pretty' }}>
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Bryan strip — click to expand bio */}
        <div style={{ border: `1.5px solid ${p.ink}`, background: p.bg }}>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr auto', alignItems: 'stretch' }}>
            <div style={{ aspectRatio: '1/1', position: 'relative', background: p.bg }}>
              <BryanPortrait width="100%" height="100%" label="Bryan Keepers" blend fit="contain" position="50% 30%" />
              <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 2, ...mono, fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', background: p.deepBg, color: p.deepFg, padding: '4px 8px' }}>
                Founder
              </div>
            </div>
            <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ ...mono, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: p.accent, marginBottom: 8 }}>Meet</div>
              <h3 style={{ ...display, fontSize: 44, fontWeight: 700, margin: '0 0 12px', letterSpacing: '-0.025em' }}>
                Bryan Keepers
              </h3>
              <p style={{ ...sans, fontSize: 15.5, lineHeight: 1.6, color: p.muted, margin: 0, maxWidth: 600, textWrap: 'pretty' }}>
                {bryanOpen ? CGS.bryan.bio : `${CGS.bryan.bio.slice(0, 200)}…`}
              </p>
              <button
                onClick={() => setBryanOpen((o) => !o)}
                style={{
                  background: 'transparent', border: 'none', padding: 0, marginTop: 14,
                  ...sans, fontSize: 14, fontWeight: 600, color: p.accent, cursor: 'pointer',
                  textDecoration: 'underline', textUnderlineOffset: 4, alignSelf: 'flex-start',
                }}
              >
                {bryanOpen ? '— Show less' : '+ Read full bio'}
              </button>
            </div>
            <div style={{ borderLeft: `1.5px solid ${p.ink}`, padding: '24px 28px', background: p.subtle, minWidth: 280 }}>
              <div style={{ ...mono, fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: p.muted, marginBottom: 16 }}>
                Track record
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Step label="Wasp Barcode Technologies" sub="Channel sales & marketing" muted={p.muted} ink={p.ink} />
                <Step label="Opengear" sub="Global channel programs" muted={p.muted} ink={p.ink} />
                <Step label="CGS, LLC" sub="Founder · 2024–" active accent={p.accent} ink={p.ink} bg={p.bg} muted={p.muted} />
              </div>
            </div>
          </div>

          <div style={{ borderTop: `1.5px solid ${p.ink}`, padding: '24px 36px', background: p.deepBg, color: p.deepFg }}>
            <div style={{ ...mono, fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: `rgba(${p.deepFgRgb},.55)`, marginBottom: 14 }}>
              Areas of expertise · 11
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {CGS.bryan.expertise.map((e, i) => (
                <span key={e} style={{
                  ...sans, fontSize: 13.5,
                  padding: '6px 14px',
                  background: i % 4 === 0 ? p.accent : i % 4 === 2 ? p.accent2 : 'transparent',
                  color: p.deepFg,
                  border: i % 4 === 0 || i % 4 === 2 ? 'none' : `1px solid rgba(${p.deepFgRgb},.3)`,
                  borderRadius: 2,
                  fontWeight: 500,
                }}>{e}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CAPABILITIES ============ */}
      <section data-sec="capabilities" style={{ padding: `${sectionGap}px ${pad}px`, background: p.accent, color: p.cream, position: 'relative', overflow: 'hidden' }}>
        {/* big shape */}
        <svg width="320" height="320" viewBox="0 0 100 100" style={{ position: 'absolute', top: -40, right: -40, opacity: .15 }} aria-hidden>
          <circle cx="50" cy="50" r="49" fill="none" stroke={p.cream} strokeWidth="0.4" />
          <circle cx="50" cy="50" r="38" fill="none" stroke={p.cream} strokeWidth="0.4" />
          <circle cx="50" cy="50" r="27" fill="none" stroke={p.cream} strokeWidth="0.4" />
          <circle cx="50" cy="50" r="16" fill="none" stroke={p.cream} strokeWidth="0.4" />
        </svg>

        <div style={{ position: 'relative' }}>
          <Marker n="02 / Capabilities" color={p.cream} />
          <h2 style={{ ...display, fontSize: 80, lineHeight: 0.98, fontWeight: 700, margin: '0 0 18px', maxWidth: 1000, letterSpacing: '-0.035em' }}>
            Four ways<br />we get to work.
          </h2>
          <p style={{ ...sans, fontSize: 18, lineHeight: 1.5, color: `rgba(${p.creamRgb},.85)`, maxWidth: 580, margin: '0 0 64px' }}>
            Every engagement is sized to the moment — these are the four practice areas, often
            blended two or three at a time depending on where the program is in its lifecycle.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {CGS.whatWeDo.map((c, i) => (
              <div key={c.t} style={{
                background: p.cardBg,
                color: p.cardFg,
                padding: '32px 32px 28px',
                position: 'relative',
                minHeight: 220,
                display: 'flex', flexDirection: 'column',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ ...display, fontSize: 56, fontWeight: 800, lineHeight: 1, color: p.accent, letterSpacing: '-0.02em' }}>
                    0{i + 1}
                  </span>
                  <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
                    {i === 0 && <path d="M4 28 L28 4 M18 4 L28 4 L28 14" fill="none" stroke={p.cardFg} strokeWidth="2" strokeLinecap="square"/>}
                    {i === 1 && <><circle cx="8" cy="8" r="3" fill={p.cardFg}/><circle cx="24" cy="8" r="3" fill={p.cardFg}/><circle cx="8" cy="24" r="3" fill={p.cardFg}/><circle cx="24" cy="24" r="3" fill={p.cardFg}/><path d="M8 8 L24 24 M24 8 L8 24" stroke={p.cardFg} strokeWidth="1.5"/></>}
                    {i === 2 && <><rect x="4" y="20" width="6" height="8" fill={p.cardFg}/><rect x="13" y="12" width="6" height="16" fill={p.cardFg}/><rect x="22" y="4" width="6" height="24" fill={p.cardFg}/></>}
                    {i === 3 && <><circle cx="16" cy="16" r="12" fill="none" stroke={p.cardFg} strokeWidth="2"/><path d="M16 16 L16 6 M16 16 L25 21" stroke={p.cardFg} strokeWidth="2" strokeLinecap="square"/></>}
                  </svg>
                </div>
                <h3 style={{ ...display, fontSize: 26, fontWeight: 700, margin: '0 0 12px', letterSpacing: '-0.018em' }}>
                  {c.t}
                </h3>
                <p style={{ ...sans, fontSize: 15, color: p.cardMuted, lineHeight: 1.6, margin: 0, textWrap: 'pretty' }}>
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BELIEFS ============ */}
      <section data-sec="beliefs" style={{ padding: `${sectionGap}px ${pad}px` }}>
        <Marker n="03 / Beliefs" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: `1.5px solid ${p.ink}` }}>
          <div style={{ padding: '40px 40px 48px', borderRight: `1.5px solid ${p.ink}`, background: p.accent2, color: p.cream }}>
            <div style={{ ...mono, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 22, opacity: .8 }}>
              Mission
            </div>
            <p style={{ ...display, fontSize: 38, lineHeight: 1.12, margin: 0, fontWeight: 700, letterSpacing: '-0.02em', textWrap: 'pretty' }}>
              {CGS.mission}
            </p>
          </div>
          <div style={{ padding: '40px 40px 48px' }}>
            <div style={{ ...mono, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: p.accent, marginBottom: 22 }}>
              Values
            </div>
            <p style={{ ...sans, fontSize: 17, lineHeight: 1.65, margin: 0, color: p.fg, textWrap: 'pretty' }}>
              {CGS.values}
            </p>
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section data-sec="contact" style={{ padding: `${sectionGap}px ${pad}px ${pad}px`, background: p.deepBg, color: p.deepFg, position: 'relative', overflow: 'hidden' }}>
        <svg width="220" height="220" viewBox="0 0 100 100" style={{ position: 'absolute', bottom: -40, left: pad - 40, opacity: .12 }} aria-hidden>
          <rect x="2" y="2" width="46" height="46" fill={p.cream} />
          <rect x="52" y="2" width="46" height="46" fill="none" stroke={p.cream} strokeWidth="1"/>
          <rect x="2" y="52" width="46" height="46" fill="none" stroke={p.cream} strokeWidth="1"/>
          <rect x="52" y="52" width="46" height="46" fill={p.cream} />
        </svg>

        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'end' }}>
          <div>
            <Marker n="04 / Get in touch" color={p.accent} />
            <h2 style={{ ...display, fontSize: 108, lineHeight: 0.94, fontWeight: 800, margin: '0 0 24px', letterSpacing: '-0.04em' }}>
              Let's<br/>
              <span style={{ color: p.accent }}>build</span> something.
            </h2>
            <p style={{ ...sans, fontSize: 19, lineHeight: 1.5, color: `rgba(${p.creamRgb},.7)`, margin: '0 0 36px', maxWidth: 500 }}>
              A 30-minute working session, no slides. Bring the parts of the program you're not sure about.
            </p>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <Btn primary onClick={() => setContactOpen(true)}>Start a conversation →</Btn>
              <Btn accent2 onClick={() => window.open(`mailto:${CGS.contact.email}`, '_blank')}>
                {CGS.contact.email}
              </Btn>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <ContactRow label="Email" value={CGS.contact.email} mono={mono} sans={sans} creamRgb={p.creamRgb} cream={p.cream} />
            <ContactRow label="LinkedIn" value={CGS.contact.linkedin} mono={mono} sans={sans} creamRgb={p.creamRgb} cream={p.cream} />
            <ContactRow label="Based in" value={CGS.contact.location} mono={mono} sans={sans} creamRgb={p.creamRgb} cream={p.cream} />
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={{
        padding: `30px ${pad}px 30px`,
        background: p.deepBg, color: `rgba(${p.deepFgRgb},.6)`,
        borderTop: `1px solid rgba(${p.deepFgRgb},.15)`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        ...mono, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase',
      }}>
        <span>Channel Growth Strategies, LLC</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} theme={theme} />
    </div>
  );
}

function Step({ label, sub, active, accent, ink, bg, muted }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
      <div style={{
        width: 12, height: 12, marginTop: 4,
        background: active ? accent : 'transparent',
        border: `1.5px solid ${active ? accent : ink || 'currentColor'}`,
        flexShrink: 0,
      }} />
      <div>
        <div style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>{label}</div>
        <div style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 12.5, color: muted || 'rgba(0,0,0,.55)', marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

function ContactRow({ label, value, mono, sans, creamRgb, cream }) {
  return (
    <div style={{ padding: '18px 22px', border: `1px solid rgba(${creamRgb},.2)`, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ ...mono, fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: `rgba(${creamRgb},.55)` }}>{label}</span>
      <span style={{ ...sans, fontSize: 16, fontWeight: 500, color: cream }}>{value}</span>
    </div>
  );
}

window.DirectionC = DirectionC;
