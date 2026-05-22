// shared.jsx — CGS content + a generic contact-modal that adapts to each direction's theme.

const CGS = {
  brand: 'Channel Growth Strategies',
  brandShort: 'CGS',
  tagline: 'Channel coaching and go-to-market strategy for companies ready to scale.',
  navItems: [
    { id: 'about', label: 'About' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'beliefs', label: 'Beliefs' },
    { id: 'contact', label: 'Get in touch' },
  ],
  whoWeAre: [
    "CGS is a consulting practice with two decades of experience in channel development and go-to-market strategy.",
    "We work with leadership teams to design, launch, and tune the channel programs that drive durable revenue — combining direct operating experience with a coach's perspective on the work.",
  ],
  whatWeDo: [
    { t: 'Channel development', d: 'Design and optimization of channel structures across distribution, VAR, retail, and enterprise.' },
    { t: 'Partner programs', d: 'Tiering, enablement, incentives, and partner-success frameworks that scale without burning margin.' },
    { t: 'Market analysis', d: 'Segmentation, sizing, and growth-strategy work that names the next 12 months, not just the next quarter.' },
    { t: 'Performance & metrics', d: 'KPI architecture, partner-health scoring, and the cadence to actually run the program week over week.' },
  ],
  bryan: {
    name: 'Bryan Keepers',
    role: 'Founder',
    bio: "Bryan is a sales and marketing leader with a track record building and managing channel sales teams and marketing programs at Wasp Barcode Technologies and Opengear. He has designed and run go-to-market motions across direct, corporate, retail, VAR, distribution, e-commerce, and enterprise — driving revenue growth, building durable partnerships, and navigating complex sales landscapes to deliver measurable results.",
    expertise: [
      'Business development',
      'Business process management',
      'Cloud solutions',
      'Contract negotiations',
      'Global sales & product line expansion',
      'Marketing strategy',
      'Partner development',
      'SaaS enterprise software',
      'Strategic partnerships',
      'Team building',
      'Team management',
    ],
  },
  mission: 'To become the most trusted channel coaching and training business in the Americas.',
  values: 'We treat our clients and community with honor, respect, and authenticity. We work hard for our clients and aim to serve teammates and clients beyond what is typically expected in a business relationship. Growth and improvement are what make life and business exciting.',
  contact: {
    email: 'hello@cgs-llc.com',
    linkedin: 'in/bryan-keepers',
    location: 'Dallas, TX · Available across the Americas',
  },
  stats: [
    { n: '20+', l: 'Years in channel' },
    { n: '7', l: 'Channel segments served' },
    { n: '11', l: 'Areas of expertise' },
    { n: '1:1', l: 'Founder-led engagements' },
  ],
};

// ---------------- Smooth-scroll inside a scroll container ----------------
function lpScrollTo(scrollEl, targetEl) {
  if (!scrollEl || !targetEl) return;
  const top = targetEl.offsetTop - 80;
  scrollEl.scrollTo({ top, behavior: 'smooth' });
}

// ---------------- Contact modal ----------------
// Accepts `theme` shape: { bg, fg, accent, muted, border, font, displayFont, kind: 'editorial' | 'dark' | 'bold' }
function ContactModal({ open, onClose, theme }) {
  const [state, setState] = React.useState({ name: '', email: '', company: '', message: '', sent: false, err: '' });
  const dialogRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const k = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, [open, onClose]);

  if (!open) return null;

  const t = theme || {};
  const accent = t.accent || '#1f3a32';
  const fg = t.fg || '#1a1a17';
  const bg = t.bg || '#fffbf3';
  const border = t.border || 'rgba(0,0,0,.12)';
  const muted = t.muted || 'rgba(0,0,0,.55)';
  const inputBg = t.kind === 'dark' ? 'rgba(255,255,255,.03)' : 'rgba(0,0,0,.02)';

  const submit = (e) => {
    e.preventDefault();
    if (!state.name.trim() || !state.email.trim() || !state.message.trim()) {
      setState((s) => ({ ...s, err: 'Please add your name, email, and a short message.' }));
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(state.email.trim())) {
      setState((s) => ({ ...s, err: 'Please use a valid email address.' }));
      return;
    }
    setState((s) => ({ ...s, sent: true, err: '' }));
  };

  // Sizing scales with the artboard's own width (the modal is rendered inside the artboard, not the viewport).
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'absolute', inset: 0, zIndex: 80,
        background: t.kind === 'dark' ? 'rgba(0,0,0,.65)' : 'rgba(20,18,14,.45)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 32,
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        style={{
          width: 'min(560px, 100%)',
          background: bg, color: fg,
          border: `1px solid ${border}`,
          borderRadius: t.kind === 'bold' ? 4 : 14,
          padding: '28px 32px 32px',
          fontFamily: t.font || 'inherit',
          boxShadow: '0 30px 80px rgba(0,0,0,.35)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 14, right: 14, width: 32, height: 32, borderRadius: 16,
            border: 'none', background: 'transparent', color: muted, fontSize: 18, cursor: 'pointer',
          }}
        >×</button>

        {!state.sent ? (
          <>
            <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: accent, marginBottom: 10 }}>
              Get in touch
            </div>
            <h3 style={{
              fontFamily: t.displayFont || 'inherit',
              fontWeight: t.kind === 'editorial' ? 500 : 600,
              fontSize: 26, lineHeight: 1.15, margin: '0 0 6px',
              letterSpacing: t.kind === 'bold' ? '-0.02em' : '-0.01em',
            }}>
              Tell us about your channel.
            </h3>
            <p style={{ margin: '0 0 20px', color: muted, fontSize: 14, lineHeight: 1.55 }}>
              Share a little about where you are today and what you're trying to unlock. Bryan replies personally, usually within a business day.
            </p>

            <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label="Name" value={state.name} onChange={(v) => setState((s) => ({ ...s, name: v }))} t={t} inputBg={inputBg} />
                <Field label="Email" value={state.email} onChange={(v) => setState((s) => ({ ...s, email: v }))} t={t} inputBg={inputBg} type="email" />
              </div>
              <Field label="Company" value={state.company} onChange={(v) => setState((s) => ({ ...s, company: v }))} t={t} inputBg={inputBg} />
              <Field label="What are you working on?" value={state.message} onChange={(v) => setState((s) => ({ ...s, message: v }))} t={t} inputBg={inputBg} multiline />

              {state.err && (
                <div style={{ fontSize: 13, color: '#b3261e' }}>{state.err}</div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: 12, color: muted }}>
                  Or email{' '}
                  <a href={`mailto:${CGS.contact.email}`} style={{ color: fg, textDecoration: 'underline', textUnderlineOffset: 3 }}>
                    {CGS.contact.email}
                  </a>
                </span>
                <button
                  type="submit"
                  style={{
                    background: accent,
                    color: t.kind === 'dark' ? '#0a0a0a' : '#fff',
                    border: 'none',
                    padding: '12px 22px',
                    borderRadius: t.kind === 'bold' ? 2 : 999,
                    fontFamily: 'inherit',
                    fontWeight: 600,
                    fontSize: 14,
                    letterSpacing: '0.01em',
                    cursor: 'pointer',
                  }}
                >
                  Send message →
                </button>
              </div>
            </form>
          </>
        ) : (
          <div style={{ padding: '20px 0 8px' }}>
            <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: accent, marginBottom: 10 }}>
              Message sent
            </div>
            <h3 style={{ fontFamily: t.displayFont || 'inherit', fontWeight: 500, fontSize: 28, lineHeight: 1.15, margin: '0 0 10px', letterSpacing: '-0.01em' }}>
              Thanks, {state.name.split(' ')[0]}.
            </h3>
            <p style={{ margin: '0 0 24px', color: muted, fontSize: 15, lineHeight: 1.55 }}>
              Bryan will read this himself and reply within a business day. If it's urgent, you can also reach him directly at <a href={`mailto:${CGS.contact.email}`} style={{ color: fg }}>{CGS.contact.email}</a>.
            </p>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                color: fg,
                border: `1px solid ${border}`,
                padding: '10px 18px',
                borderRadius: t.kind === 'bold' ? 2 : 999,
                fontFamily: 'inherit',
                fontWeight: 500,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, t, inputBg, multiline, type = 'text' }) {
  const muted = t.muted || 'rgba(0,0,0,.55)';
  const border = t.border || 'rgba(0,0,0,.12)';
  const fg = t.fg || '#1a1a17';
  const accent = t.accent || '#1f3a32';
  const radius = t.kind === 'bold' ? 2 : 8;

  const common = {
    width: '100%',
    background: inputBg,
    color: fg,
    border: `1px solid ${border}`,
    borderRadius: radius,
    padding: '11px 12px',
    fontFamily: 'inherit',
    fontSize: 14,
    lineHeight: 1.4,
    outline: 'none',
    transition: 'border-color .15s, background .15s',
  };

  const [focused, setFocused] = React.useState(false);

  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 12, color: muted, fontFamily: 'Geist Mono, ui-monospace, monospace', letterSpacing: '.06em', textTransform: 'uppercase' }}>{label}</span>
      {multiline ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...common, resize: 'vertical', borderColor: focused ? accent : border }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...common, borderColor: focused ? accent : border }}
        />
      )}
    </label>
  );
}

// Bryan portrait — image-slot the user can drop a real photo into.
// Persists across reload via the .image-slots.state.json sidecar.
// `blend` softly fades the photo's edges into the page so a tight headshot
// reads as integrated artwork rather than a stamped-in tile.
function BryanPortrait({
  width = '100%', height = 360,
  id = 'bryan-portrait',
  shape = 'rect', radius = 0,
  label = 'Drop a portrait of Bryan',
  blend = false,
  fit = 'cover',
  position = '50% 30%',
}) {
  const maskCss = blend
    ? 'radial-gradient(ellipse 78% 90% at 50% 38%, #000 45%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0) 100%)'
    : undefined;
  return (
    <div
      style={{
        width, height, position: 'relative', overflow: 'hidden',
        WebkitMaskImage: maskCss,
        maskImage: maskCss,
      }}
    >
      <image-slot
        id={id}
        shape={shape}
        radius={radius}
        fit={fit}
        position={position}
        placeholder={label}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
}

Object.assign(window, { CGS, ContactModal, BryanPortrait, lpScrollTo });
