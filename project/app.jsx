// app.jsx — Committed direction: Forward Motion · Garden palette.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "regular",
  "palette": "garden",
  "dark": false
}/*EDITMODE-END*/;

const AB = { w: 1440, h: 900 };

const PALETTE_OPTIONS = ['terracotta', 'inkwell', 'garden'];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const label = `Forward Motion · ${cap(t.palette)}${t.dark ? ' · dark' : ''}`;

  return (
    <>
      <DesignCanvas minScale={0.08} maxScale={2.5}>
        <DCSection
          id="cgs-landing"
          title="CGS — Channel Growth Strategies"
          subtitle="Forward Motion · Garden — drop a photo into the bio block to fill it"
        >
          <DCArtboard
            id="cgs-main"
            label={label}
            width={AB.w}
            height={AB.h}
          >
            <DirectionC density={t.density} palette={t.palette} dark={t.dark} />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Direction" />
        <TweakSelect
          label="Palette"
          value={t.palette}
          options={PALETTE_OPTIONS}
          onChange={(v) => setTweak('palette', v)}
        />
        <TweakToggle
          label="Dark mode"
          value={t.dark}
          onChange={(v) => setTweak('dark', v)}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={['compact', 'regular', 'comfy']}
          onChange={(v) => setTweak('density', v)}
        />
      </TweaksPanel>
    </>
  );
}

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
