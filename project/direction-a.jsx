// direction-a.jsx — "Channel Compass"
// Editorial, warm-cream, serif display. Trusted-advisor aesthetic.

function DirectionA({ density = 'regular', dark = false }) {
  const scrollRef = React.useRef(null);
  const [contactOpen, setContactOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('top');

  // Palette
  const p = dark
    ? { bg: '#15140f', fg: '#f3efe6', muted: 'rgba(243,239,230,.6)', accent: '#c79d57', border: 'rgba(255,255,255,.12)', subtle: 'rgba(255,255,255,.04)' }
    : { bg: '#f8f4eb', fg: '#1c1a14', muted: 'rgba(28,26,20,.62)', accent: '#3a4a3e', border: 'rgba(28,26,20,.14)', subtle: 'rgba(28,26,20,.04)' };

  const pad = density === 'compact' ? 64 : density === 'comfy' ? 108 : 84;
  const sectionGap = density === 'compact' ? 80 : density === 'comfy' ? 140 : 110;

  const theme = {
    bg: p.bg, fg: p.fg, accent: p.accent, muted: p.muted, border: p.border,
    font: '"Geist", system-ui, sans-serif',
    displayFont: '"Newsreader", Georgia, serif',
    kind: 'editorial',
  };

  // Track which section is in view for nav highlight
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

  const display = { fontFamily: '"Newsreader", Georgia, serif', fontWeight: 400, letterSpacing: '-0.018em' };
  const sans = { fontFamily: '"Geist", system-ui, sans-serif' };
  const mono = { fontFamily: '"Geist Mono", ui-monospace, monospace' };

  // ---------- Sub-components, scoped to A ----------
  const Eyebrow = ({ children }) => (
    <div style={{ ...mono, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: p.accent, marginBottom: 18 }}>
      {children}
    </div>
  );

  const Btn = ({ children, primary, onClick }) => (
    <button
      onClick={onClick}
      style={{
        ...sans,
        cursor: 'pointer',
        background: primary ? p.fg : 'transparent',
        color: primary ? p.bg : p.fg,
        border: primary ? `1px solid ${p.fg}` : `1px solid ${p.border}`,
        padding: '13px 22px',
        borderRadius: 999,
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: '0.005em',
        display: 'inline-flex', alignItems: 'center', gap: 8,
        transition: 'transform .12s ease, background .15s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {children}
    </button>
  );

  return (
    <div
      ref={scrollRef}
      className="lp-scroll"
      style={{
        height: '100%', overflowY: 'auto', overflowX: 'hidden',
        background: p.bg, color: p.fg,
        ...sans,
        fontSize: 16, lineHeight: 1.55,
        position: 'relative',
      }}
    >
      {/* ============ NAV ============ */}
      <header
        style={{
          position: 'sticky', top: 0, zIndex: 30,
          background: dark ? 'rgba(21,20,15,0.78)' : 'rgba(248,244,235,0.82)',
          backdropFilter: 'blur(16px) saturate(140%)',
          borderBottom: `1px solid ${p.border}`,
          padding: `14px ${pad}px`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <button
          onClick={() => scrollTo('top')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, color: p.fg }}
        >
          {/* Compass mark — original geometric monogram */}
          <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
            <circle cx="14" cy="14" r="12.5" fill="none" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M14 4 L17 14 L14 24 L11 14 Z" fill="currentColor" />
            <circle cx="14" cy="14" r="1.6" fill={p.bg} />
          </svg>
          <span style={{ ...display, fontSize: 19, fontWeight: 500, letterSpacing: '-0.01em' }}>
            Channel Growth Strategies
          </span>
        </button>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {CGS.navItems.slice(0, 3).map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
                color: activeSection === n.id ? p.fg : p.muted,
                fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
                borderBottom: activeSection === n.id ? `1px solid ${p.fg}` : '1px solid transparent',
                transition: 'color .15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = p.fg)}
              onMouseLeave={(e) => (e.currentTarget.style.color = activeSection === n.id ? p.fg : p.muted)}
            >
              {n.label}
            </button>
          ))}
          <Btn primary onClick={() => setContactOpen(true)}>Get in touch</Btn>
        </nav>
      </header>

      {/* ============ HERO ============ */}
      <section data-sec="top" style={{ padding: `${pad}px ${pad}px ${pad - 20}px`, position: 'relative' }}>
        <Eyebrow>Channel coaching · Go-to-market strategy</Eyebrow>
        <h1 style={{ ...display, fontSize: 92, lineHeight: 1.02, margin: '0 0 28px', maxWidth: 1000, letterSpacing: '-0.025em' }}>
          The channel is the<br />
          <em style={{ fontStyle: 'italic', color: p.accent }}>growth strategy</em>.
        </h1>
        <p style={{ ...sans, fontSize: 22, lineHeight: 1.45, maxWidth: 720, margin: '0 0 40px', color: p.muted, fontWeight: 400 }}>
          Two decades of channel-development experience, applied as a coach. We help leadership
          teams design, launch, and tune the partner programs that produce durable revenue.
        </p>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 80 }}>
          <Btn primary onClick={() => setContactOpen(true)}>Book a working session →</Btn>
          <Btn onClick={() => scrollTo('capabilities')}>See capabilities</Btn>
        </div>

        {/* Stat ledger */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
          borderTop: `1px solid ${p.border}`, borderBottom: `1px solid ${p.border}`,
        }}>
          {CGS.stats.map((s, i) => (
            <div key={s.l} style={{
              padding: '28px 24px 28px 0',
              borderLeft: i === 0 ? 'none' : `1px solid ${p.border}`,
              paddingLeft: i === 0 ? 0 : 28,
            }}>
              <div style={{ ...display, fontSize: 56, lineHeight: 1, marginBottom: 10, letterSpacing: '-0.02em' }}>{s.n}</div>
              <div style={{ ...mono, fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: p.muted }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ABOUT / WHO WE ARE ============ */}
      <section data-sec="about" style={{ padding: `${sectionGap - 20}px ${pad}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.4fr', gap: 80, alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 96 }}>
            <Eyebrow>01 — Who we are</Eyebrow>
            <h2 style={{ ...display, fontSize: 52, lineHeight: 1.05, margin: '0 0 0', letterSpacing: '-0.02em' }}>
              A practice, not a pitch deck.
            </h2>
          </div>
          <div>
            {CGS.whoWeAre.map((para, i) => (
              <p key={i} style={{ ...sans, fontSize: 20, lineHeight: 1.55, margin: '0 0 24px', color: i === 0 ? p.fg : p.muted, fontWeight: i === 0 ? 400 : 400, textWrap: 'pretty' }}>
                {para}
              </p>
            ))}
            <div style={{ height: 1, background: p.border, margin: '40px 0' }} />
            {/* Bryan card */}
            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 32, alignItems: 'start' }}>
              <div style={{ aspectRatio: '3/4' }}>
                <BryanPortrait width="100%" height="100%" dark={dark} label="Bryan Keepers" />
              </div>
              <div>
                <div style={{ ...mono, fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: p.accent, marginBottom: 10 }}>
                  Founder
                </div>
                <h3 style={{ ...display, fontSize: 32, margin: '0 0 14px', letterSpacing: '-0.015em' }}>
                  {CGS.bryan.name}
                </h3>
                <p style={{ ...sans, fontSize: 15.5, lineHeight: 1.6, color: p.muted, margin: '0 0 22px', textWrap: 'pretty' }}>
                  {CGS.bryan.bio}
                </p>
                <div style={{ ...mono, fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: p.muted, marginBottom: 12 }}>
                  Areas of expertise
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {CGS.bryan.expertise.map((e) => (
                    <span key={e} style={{
                      ...sans, fontSize: 13,
                      padding: '6px 12px',
                      border: `1px solid ${p.border}`,
                      borderRadius: 999,
                      color: p.fg,
                      background: p.subtle,
                    }}>{e}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CAPABILITIES ============ */}
      <section data-sec="capabilities" style={{ padding: `${sectionGap}px ${pad}px`, background: dark ? 'rgba(255,255,255,.025)' : 'rgba(28,26,20,.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, gap: 40 }}>
          <div>
            <Eyebrow>02 — What we do</Eyebrow>
            <h2 style={{ ...display, fontSize: 56, lineHeight: 1.04, margin: 0, letterSpacing: '-0.02em', maxWidth: 720 }}>
              Comprehensive channel strategy,<br />executed week over week.
            </h2>
          </div>
          <div style={{ ...sans, color: p.muted, maxWidth: 360, fontSize: 15, lineHeight: 1.55 }}>
            We don't hand off slideware and leave. Every engagement is built around a working cadence
            that the leadership team can keep running after we're gone.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, borderTop: `1px solid ${p.border}` }}>
          {CGS.whatWeDo.map((c, i) => (
            <div key={c.t} style={{
              padding: '40px 36px 44px 0',
              borderBottom: `1px solid ${p.border}`,
              borderRight: i % 2 === 0 ? `1px solid ${p.border}` : 'none',
              paddingLeft: i % 2 === 0 ? 0 : 40,
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 16 }}>
                <span style={{ ...mono, fontSize: 12, color: p.muted, fontVariantNumeric: 'tabular-nums' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 style={{ ...display, fontSize: 28, margin: 0, letterSpacing: '-0.015em' }}>{c.t}</h3>
              </div>
              <p style={{ ...sans, color: p.muted, fontSize: 16, lineHeight: 1.6, margin: 0, maxWidth: 460, textWrap: 'pretty' }}>
                {c.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ BELIEFS / MISSION + VALUES ============ */}
      <section data-sec="beliefs" style={{ padding: `${sectionGap}px ${pad}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
          <div style={{ borderTop: `2px solid ${p.fg}`, paddingTop: 28 }}>
            <Eyebrow>Mission</Eyebrow>
            <p style={{ ...display, fontSize: 34, lineHeight: 1.22, margin: 0, letterSpacing: '-0.012em', textWrap: 'pretty' }}>
              {CGS.mission}
            </p>
          </div>
          <div style={{ borderTop: `2px solid ${p.accent}`, paddingTop: 28 }}>
            <Eyebrow>Values</Eyebrow>
            <p style={{ ...sans, fontSize: 17, lineHeight: 1.65, margin: 0, color: p.fg, textWrap: 'pretty' }}>
              {CGS.values}
            </p>
          </div>
        </div>
      </section>

      {/* ============ CONTACT CTA ============ */}
      <section data-sec="contact" style={{ padding: `${sectionGap}px ${pad}px ${pad}px`, borderTop: `1px solid ${p.border}` }}>
        <div style={{ maxWidth: 880 }}>
          <Eyebrow>Get in touch</Eyebrow>
          <h2 style={{ ...display, fontSize: 72, lineHeight: 1.04, margin: '0 0 24px', letterSpacing: '-0.024em' }}>
            Let's look at your channel together.
          </h2>
          <p style={{ ...sans, fontSize: 19, lineHeight: 1.55, color: p.muted, margin: '0 0 36px', maxWidth: 640 }}>
            A 30-minute working session, no slides. Bring the parts of the program you're not sure about
            and we'll spend the time on the actual problem.
          </p>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <Btn primary onClick={() => setContactOpen(true)}>Start a conversation →</Btn>
            <a
              href={`mailto:${CGS.contact.email}`}
              style={{ ...sans, fontSize: 14, color: p.fg, textDecoration: 'underline', textUnderlineOffset: 4, textDecorationColor: p.border }}
            >
              {CGS.contact.email}
            </a>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={{
        padding: `40px ${pad}px 36px`,
        borderTop: `1px solid ${p.border}`,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        gap: 40,
      }}>
        <div>
          <div style={{ ...display, fontSize: 18, fontWeight: 500, marginBottom: 6 }}>Channel Growth Strategies, LLC</div>
          <div style={{ ...sans, fontSize: 13, color: p.muted }}>{CGS.contact.location} · {CGS.contact.email}</div>
        </div>
        <div style={{ ...mono, fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: p.muted, textAlign: 'right' }}>
          © {new Date().getFullYear()} CGS — All rights reserved
        </div>
      </footer>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} theme={theme} />
    </div>
  );
}

window.DirectionA = DirectionA;
