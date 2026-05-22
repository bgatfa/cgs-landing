// direction-b.jsx — "Channel Engine"
// Dark, technical, mono-accented. Looks like an ops console for partner programs.

function DirectionB({ density = 'regular', dark = true }) {
  const scrollRef = React.useRef(null);
  const [contactOpen, setContactOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('top');

  // Inverted "light" variant for this direction is high-contrast paper
  const p = dark
    ? { bg: '#0b0c0a', panel: '#111312', fg: '#ededeb', muted: 'rgba(237,237,235,.55)', accent: '#f5a524', accentSoft: 'rgba(245,165,36,.12)', border: 'rgba(255,255,255,.08)', borderStrong: 'rgba(255,255,255,.18)', grid: 'rgba(255,255,255,.04)' }
    : { bg: '#f3f3ee', panel: '#fafaf6', fg: '#0b0c0a', muted: 'rgba(11,12,10,.62)', accent: '#a55a06', accentSoft: 'rgba(165,90,6,.12)', border: 'rgba(11,12,10,.12)', borderStrong: 'rgba(11,12,10,.25)', grid: 'rgba(11,12,10,.05)' };

  const pad = density === 'compact' ? 56 : density === 'comfy' ? 100 : 76;
  const sectionGap = density === 'compact' ? 80 : density === 'comfy' ? 140 : 112;

  const theme = { bg: p.panel, fg: p.fg, accent: p.accent, muted: p.muted, border: p.border, font: '"Geist", system-ui, sans-serif', displayFont: '"Space Grotesk", "Geist", system-ui, sans-serif', kind: 'dark' };

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

  const display = { fontFamily: '"Space Grotesk", "Geist", system-ui, sans-serif', letterSpacing: '-0.015em' };
  const sans = { fontFamily: '"Geist", system-ui, sans-serif' };
  const mono = { fontFamily: '"Geist Mono", ui-monospace, monospace' };

  const Tag = ({ children, color }) => (
    <span style={{
      ...mono,
      fontSize: 10.5,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      padding: '4px 8px',
      borderRadius: 3,
      background: color || p.accentSoft,
      color: color ? p.fg : p.accent,
      border: `1px solid ${color ? p.border : 'transparent'}`,
    }}>{children}</span>
  );

  const Btn = ({ children, primary, onClick }) => (
    <button
      onClick={onClick}
      style={{
        ...sans,
        cursor: 'pointer',
        background: primary ? p.accent : 'transparent',
        color: primary ? '#0b0c0a' : p.fg,
        border: primary ? `1px solid ${p.accent}` : `1px solid ${p.borderStrong}`,
        padding: '12px 18px',
        borderRadius: 4,
        fontSize: 13.5, fontWeight: 600,
        letterSpacing: '-0.005em',
        display: 'inline-flex', alignItems: 'center', gap: 8,
        transition: 'background .15s, transform .12s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {children}
    </button>
  );

  const gridBg = `repeating-linear-gradient(to right, ${p.grid} 0 1px, transparent 1px 96px), repeating-linear-gradient(to bottom, ${p.grid} 0 1px, transparent 1px 96px)`;

  return (
    <div
      ref={scrollRef}
      className={`lp-scroll ${dark ? 'lp-dark' : ''}`}
      style={{
        height: '100%', overflowY: 'auto', overflowX: 'hidden',
        background: p.bg, color: p.fg,
        ...sans, fontSize: 15, lineHeight: 1.55,
        position: 'relative',
      }}
    >
      {/* ============ NAV ============ */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: dark ? 'rgba(11,12,10,0.82)' : 'rgba(243,243,238,0.86)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${p.border}`,
        padding: `12px ${pad}px`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={() => scrollTo('top')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, color: p.fg }}>
          <svg width="26" height="26" viewBox="0 0 26 26">
            <rect x="1" y="1" width="24" height="24" rx="3" fill="none" stroke={p.accent} strokeWidth="1.4" />
            <path d="M5 18 L10 9 L14 14 L21 7" fill="none" stroke={p.accent} strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
            <circle cx="21" cy="7" r="1.7" fill={p.accent}/>
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1 }}>
            <span style={{ ...display, fontSize: 16, fontWeight: 600 }}>CGS</span>
            <span style={{ ...mono, fontSize: 10, color: p.muted, marginTop: 3, letterSpacing: '.1em' }}>CHANNEL GROWTH STRATEGIES</span>
          </div>
        </button>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {CGS.navItems.slice(0, 3).map((n, i) => (
            <button key={n.id} onClick={() => scrollTo(n.id)} style={{
              background: activeSection === n.id ? p.accentSoft : 'transparent',
              border: 'none', cursor: 'pointer', padding: '8px 14px', borderRadius: 4,
              ...mono, fontSize: 12, letterSpacing: '.06em',
              color: activeSection === n.id ? p.accent : p.muted,
              transition: 'background .15s, color .15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = p.fg)}
            onMouseLeave={(e) => (e.currentTarget.style.color = activeSection === n.id ? p.accent : p.muted)}
            >
              <span style={{ opacity: .6, marginRight: 6 }}>0{i + 1}</span>{n.label}
            </button>
          ))}
          <div style={{ width: 18 }} />
          <Btn primary onClick={() => setContactOpen(true)}>Get in touch →</Btn>
        </nav>
      </header>

      {/* ============ HERO ============ */}
      <section data-sec="top" style={{
        padding: `${pad}px ${pad}px ${pad - 10}px`,
        position: 'relative',
        backgroundImage: gridBg,
        backgroundPosition: `${pad}px 0`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: p.accent, boxShadow: `0 0 14px ${p.accent}` }} />
          <span style={{ ...mono, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: p.muted }}>
            Channel coaching · Available {new Date().getFullYear()}
          </span>
        </div>
        <h1 style={{
          ...display,
          fontSize: 102, lineHeight: 0.96, fontWeight: 600,
          margin: '0 0 28px', maxWidth: 1080, letterSpacing: '-0.035em',
        }}>
          Build a channel<br />
          that <span style={{ color: p.accent }}>compounds.</span>
        </h1>
        <p style={{ ...sans, fontSize: 19, lineHeight: 1.5, color: p.muted, maxWidth: 640, margin: '0 0 36px' }}>
          CGS is a channel-development practice. We design and operate the partner programs that
          turn one revenue source into a system — across distribution, VAR, retail, e-commerce, and enterprise.
        </p>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 72 }}>
          <Btn primary onClick={() => setContactOpen(true)}>Book a working session</Btn>
          <Btn onClick={() => scrollTo('capabilities')}>Capabilities →</Btn>
        </div>

        {/* Telemetry strip */}
        <div style={{
          border: `1px solid ${p.border}`,
          borderRadius: 6,
          background: p.panel,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {CGS.stats.map((s, i) => (
            <div key={s.l} style={{
              padding: '24px 24px 22px',
              borderLeft: i === 0 ? 'none' : `1px solid ${p.border}`,
              position: 'relative',
            }}>
              <div style={{ ...mono, fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: p.muted, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 5, height: 5, borderRadius: 2, background: p.accent }} />
                {s.l}
              </div>
              <div style={{ ...display, fontSize: 44, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{s.n}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section data-sec="about" style={{ padding: `${sectionGap}px ${pad}px` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 48 }}>
          <Tag>01 / Who we are</Tag>
          <div style={{ flex: 1, height: 1, background: p.border }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'start', marginBottom: 80 }}>
          <h2 style={{ ...display, fontSize: 48, lineHeight: 1.05, margin: 0, fontWeight: 600, letterSpacing: '-0.025em' }}>
            A practice, not a pitch deck.
          </h2>
          <div>
            {CGS.whoWeAre.map((para, i) => (
              <p key={i} style={{ ...sans, fontSize: 17, lineHeight: 1.6, color: i === 0 ? p.fg : p.muted, margin: '0 0 18px', textWrap: 'pretty' }}>
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Bryan card — terminal style */}
        <div style={{
          border: `1px solid ${p.border}`,
          borderRadius: 8,
          background: p.panel,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '10px 16px',
            borderBottom: `1px solid ${p.border}`,
            display: 'flex', alignItems: 'center', gap: 12,
            ...mono, fontSize: 11, letterSpacing: '.08em', color: p.muted,
          }}>
            <span style={{ display: 'flex', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: '#ef4444' }} />
              <span style={{ width: 8, height: 8, borderRadius: 4, background: '#f5a524' }} />
              <span style={{ width: 8, height: 8, borderRadius: 4, background: '#22c55e' }} />
            </span>
            <span>~/cgs/team/founder.md</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr' }}>
            <div style={{ borderRight: `1px solid ${p.border}`, padding: 24 }}>
              <div style={{ aspectRatio: '4/5', marginBottom: 16 }}>
                <BryanPortrait width="100%" height="100%" dark={dark} label="Bryan Keepers" />
              </div>
              <div style={{ ...display, fontSize: 22, fontWeight: 600, lineHeight: 1.1, marginBottom: 4 }}>
                {CGS.bryan.name}
              </div>
              <div style={{ ...mono, fontSize: 11.5, color: p.accent, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 14 }}>
                {CGS.bryan.role}
              </div>
              <div style={{ ...mono, fontSize: 11.5, color: p.muted, lineHeight: 1.7 }}>
                <div>prev/ Opengear</div>
                <div>prev/ Wasp Barcode Tech.</div>
                <div>now/ CGS, LLC</div>
              </div>
            </div>
            <div style={{ padding: 28 }}>
              <p style={{ ...sans, fontSize: 15.5, lineHeight: 1.65, color: p.fg, margin: '0 0 24px', textWrap: 'pretty' }}>
                {CGS.bryan.bio}
              </p>
              <div style={{ ...mono, fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: p.muted, marginBottom: 14 }}>
                # areas_of_expertise
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px 24px' }}>
                {CGS.bryan.expertise.map((e, i) => (
                  <div key={e} style={{ ...mono, fontSize: 12.5, color: p.fg, padding: '6px 0', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px dashed ${p.border}` }}>
                    <span style={{ color: p.accent }}>›</span>
                    <span>{e}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CAPABILITIES ============ */}
      <section data-sec="capabilities" style={{ padding: `${sectionGap}px ${pad}px`, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 48 }}>
          <Tag>02 / Capabilities</Tag>
          <div style={{ flex: 1, height: 1, background: p.border }} />
        </div>

        <h2 style={{ ...display, fontSize: 56, lineHeight: 1.04, margin: '0 0 16px', fontWeight: 600, maxWidth: 880, letterSpacing: '-0.028em' }}>
          The full channel stack. Designed, instrumented, run.
        </h2>
        <p style={{ ...sans, fontSize: 17, color: p.muted, maxWidth: 600, margin: '0 0 56px', lineHeight: 1.55 }}>
          Four practice areas that travel together. Engagements typically blend two or three depending on
          where the program is in its lifecycle.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
          {CGS.whatWeDo.map((c, i) => (
            <div key={c.t} style={{
              border: `1px solid ${p.border}`,
              borderRadius: 6,
              background: p.panel,
              padding: 28,
              position: 'relative',
              display: 'flex', flexDirection: 'column', minHeight: 220,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
                <span style={{ ...mono, fontSize: 11, color: p.muted, letterSpacing: '.08em' }}>
                  {String(i + 1).padStart(2, '0')} / 04
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, ...mono, fontSize: 10.5, color: p.accent, letterSpacing: '.1em', textTransform: 'uppercase' }}>
                  <span style={{ width: 6, height: 6, borderRadius: 3, background: p.accent }} />
                  Live
                </span>
              </div>
              <h3 style={{ ...display, fontSize: 26, fontWeight: 600, margin: '0 0 14px', letterSpacing: '-0.015em' }}>
                {c.t}
              </h3>
              <p style={{ ...sans, fontSize: 14.5, color: p.muted, lineHeight: 1.6, margin: 0, textWrap: 'pretty' }}>
                {c.d}
              </p>
              <div style={{ flex: 1 }} />
              <div style={{
                marginTop: 24, paddingTop: 16, borderTop: `1px dashed ${p.border}`,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                ...mono, fontSize: 11, color: p.muted, letterSpacing: '.08em', textTransform: 'uppercase',
              }}>
                <span>{['Strategy', 'Operating', 'Research', 'Telemetry'][i]}</span>
                <span style={{ color: p.accent }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ BELIEFS ============ */}
      <section data-sec="beliefs" style={{ padding: `${sectionGap}px ${pad}px`, background: p.panel, borderTop: `1px solid ${p.border}`, borderBottom: `1px solid ${p.border}` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 48 }}>
          <Tag>03 / Beliefs</Tag>
          <div style={{ flex: 1, height: 1, background: p.border }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <div style={{ ...mono, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: p.accent, marginBottom: 16 }}>
              # mission
            </div>
            <p style={{ ...display, fontSize: 32, lineHeight: 1.22, margin: 0, fontWeight: 500, letterSpacing: '-0.015em', textWrap: 'pretty' }}>
              {CGS.mission}
            </p>
          </div>
          <div>
            <div style={{ ...mono, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: p.accent, marginBottom: 16 }}>
              # values
            </div>
            <p style={{ ...sans, fontSize: 16, lineHeight: 1.65, margin: 0, color: p.fg, textWrap: 'pretty' }}>
              {CGS.values}
            </p>
          </div>
        </div>
      </section>

      {/* ============ CONTACT CTA ============ */}
      <section data-sec="contact" style={{ padding: `${sectionGap}px ${pad}px ${pad}px`, position: 'relative', backgroundImage: gridBg, backgroundPosition: `${pad}px 0` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 48 }}>
          <Tag>04 / Contact</Tag>
          <div style={{ flex: 1, height: 1, background: p.border }} />
        </div>
        <h2 style={{ ...display, fontSize: 84, lineHeight: 0.98, fontWeight: 600, margin: '0 0 28px', maxWidth: 1000, letterSpacing: '-0.035em' }}>
          Ready when you are.
        </h2>
        <p style={{ ...sans, fontSize: 18, lineHeight: 1.55, color: p.muted, margin: '0 0 36px', maxWidth: 600 }}>
          A 30-minute working session, no slides — just the parts of the program you're not sure about.
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 64, flexWrap: 'wrap' }}>
          <Btn primary onClick={() => setContactOpen(true)}>Start a conversation →</Btn>
          <a href={`mailto:${CGS.contact.email}`} style={{ ...mono, fontSize: 13, color: p.fg, textDecoration: 'none', padding: '12px 16px', border: `1px solid ${p.border}`, borderRadius: 4 }}>
            {CGS.contact.email}
          </a>
        </div>

        {/* Three-column "channels" */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {[
            { label: 'Email', value: CGS.contact.email },
            { label: 'LinkedIn', value: CGS.contact.linkedin },
            { label: 'Based in', value: CGS.contact.location },
          ].map((c) => (
            <div key={c.label} style={{ border: `1px solid ${p.border}`, borderRadius: 6, padding: '20px 22px', background: p.panel }}>
              <div style={{ ...mono, fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: p.muted, marginBottom: 10 }}>{c.label}</div>
              <div style={{ ...sans, fontSize: 14.5, color: p.fg, fontWeight: 500 }}>{c.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={{
        padding: `30px ${pad}px 30px`,
        borderTop: `1px solid ${p.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        ...mono, fontSize: 11, letterSpacing: '.1em', color: p.muted,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: p.accent, boxShadow: `0 0 10px ${p.accent}` }} />
          <span>CGS // CHANNEL GROWTH STRATEGIES, LLC</span>
        </div>
        <div>© {new Date().getFullYear()} — ALL RIGHTS RESERVED</div>
      </footer>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} theme={theme} />
    </div>
  );
}

window.DirectionB = DirectionB;
