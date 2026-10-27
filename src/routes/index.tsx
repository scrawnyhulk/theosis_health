import type React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Clock, FlaskConical, Footprints } from "lucide-react";
import { SiteShell } from "@/components/site/site-shell";
import { HomeFeatures } from "@/components/site/hack-of-week";
import { SODA_PERSON, extraLbByDay, lostLbByDay, maintenance } from "@/lib/swap-model";

const SODA_MAINT = Math.round(maintenance(SODA_PERSON) / 10) * 10;
// Rounded for display only (about 2,000); the model math still uses the exact maintenance.
const SODA_MAINT_SHOWN = Math.round(SODA_MAINT / 100) * 100;

export const Route = createFileRoute("/")({ component: Home });

const tools = [
  { href: "/simulator/", title: "Metabolic Simulator", body: "Scroll forward through time to see how daily decisions about food, movement and habits might shape health. Estimates are hedged and for education only." },
  { href: "/simulator/pft-inside/", title: "Personal Fat Threshold model", body: "A 3D illustration of the idea that people may differ in how much fat they can store safely." },
  { href: "/hacks", title: "Health Hacks", body: "Practical nutrition and exercise tips, plus nerd-out deep dives for the curious." },
];

const card = "health-card block border border-border bg-surface p-6";

function Home() {
  return (
    <SiteShell>
      <section className="health-mesh text-ink-fg">
        <div className="hero-logo mx-auto flex max-w-7xl items-center justify-center px-4 pt-6 sm:px-8 md:pt-10">
          <picture>
            <source media="(min-width: 640px)" srcSet="/images/theosis-health-hero-h.webp" type="image/webp" />
            <source media="(min-width: 640px)" srcSet="/images/theosis-health-hero-h.png" />
            <source srcSet="/images/theosis-health-hero-v.webp" type="image/webp" />
            <img src="/images/theosis-health-hero-v.png" alt="Theosis Health logo: a chrome three-bar Orthodox cross wrapped by a blue DNA double helix inside a chrome and blue laurel wreath, beside the words Theosis Health." fetchPriority="high" className="no-outline block h-auto w-auto object-contain" />
          </picture>
        </div>
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 md:py-16">
          <div className="stagger-in">
            <h1 className="sr-only">Theosis Health</h1>
            <p className="hero-tagline">
              “Simple tools. Smarter choices. Meaningful change.”
            </p>
            <hr className="mk-hero-rule" aria-hidden="true" />
            <HomeFeatures />
            <div className="mk-welcome">
              <h2 className="font-display text-2xl font-semibold uppercase sm:text-3xl">Welcome to Theosis Health</h2>
              <p className="mt-2 max-w-2xl text-ink-fg/85">We’ve all heard the advice: eat less, move more. Daily life makes it more complicated than that. Most of us have a general sense of what a “healthy diet” looks like, but putting it into practice day to day can be hard. Small food choices that don’t seem significant can add up more than we realize, and research shows metabolism can start drifting off track years before a diagnosis of type 2 diabetes.<sup><a href="#wf1" aria-label="Footnote 1">1</a></sup></p>
              <p className="mt-3 max-w-2xl text-ink-fg/85">If the human body were a machine, protein would be the parts, and carbohydrates and fats would be the fuel. Genetics help set how much fuel each person can safely store. Once that capacity is exceeded, fat tends to build up in organs like the liver and pancreas, which can contribute to insulin resistance and type 2 diabetes.<sup><a href="#wf2" aria-label="Footnote 2">2</a></sup> These changes often develop quietly, before obvious symptoms appear. <a href="/simulator/pft-inside/" className="font-medium text-health underline underline-offset-2 hover:no-underline">See what happens inside as fat builds up →</a></p>
              <p className="mt-3 max-w-2xl text-ink-fg/85">Theosis Health helps you look under the hood: how the human body works, what can knock it off track, and where simple changes can help. We pair clear explanations with practical tools, so you can focus on manageable choices that make a meaningful difference. It starts with knowing what matters and making it work in real life.</p>
              <p className="mt-3 max-w-2xl text-ink-fg/85">Below are a couple of simple choices that can quietly derail our health, or be low-hanging fruit that moves things in the right direction, even if everything else stays the same.</p>
              <ul className="mk-chips" aria-label="Quick facts">
                <li><b>40.1 million</b> people in the US have diabetes (2023)<sup><a href="#wf3" aria-label="Footnote 3">3</a></sup></li>
                <li><b>115.2 million</b> US adults have prediabetes<sup><a href="#wf3" aria-label="Footnote 3">3</a></sup></li>
                <li><b>About 1 in 3</b> US adults (34.7%) have metabolic syndrome (2011–2016)<sup><a href="#wf4" aria-label="Footnote 4">4</a></sup></li>
              </ul>
              <ol className="mk-fn">
                <li id="wf1">Tabák AG, et al. Trajectories of glycaemia, insulin sensitivity, and insulin secretion before diagnosis of type 2 diabetes: an analysis from the Whitehall II study. <i>Lancet.</i> 2009;373(9682):2215–2221.</li>
                <li id="wf2">Taylor R, Holman RR. Normal weight individuals who develop type 2 diabetes: the personal fat threshold. <i>Clin Sci (Lond).</i> 2015;128(7):405–410.</li>
                <li id="wf3">CDC. National Diabetes Statistics Report (updated Sept 16, 2026).</li>
                <li id="wf4">Hirode G, Wong RJ. Trends in the prevalence of metabolic syndrome in the United States, 2011–2016. <i>JAMA.</i> 2020;323(24):2526–2528.</li>
              </ol>
            </div>
            <p className="mt-3 text-sm text-ink-muted">Education only, not medical advice. Talk with your healthcare provider.</p>
          </div>
        </div>
      </section>

      <SwapCarousel />
      <Steps />
      <Why />
      <Toolbox />

      <section id="founder" className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className={`${card} flex flex-col items-start gap-5 sm:flex-row sm:items-center`}>
          <img src="/images/nick.jpg" alt="Nick Holwey, founder of Theosis Health" className="size-24 rounded-full object-cover" />
          <div>
            <h2 className="font-display text-2xl font-semibold uppercase">About the founder</h2>
            <p className="mt-2 max-w-2xl text-muted">
              Theosis Health was founded by Nick Holwey, PA-C, a licensed physician assistant, to make metabolic health easier to see and understand. Theosis Health is an education company. Any clinical work he does is separate from Theosis Health.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

const TICKS: [number, string][] = [[0, "Today"], [30, "1 mo"], [91, "3 mo"], [182, "6 mo"], [365, "1 yr"]];
const fmtLb = (lb: number) => lb.toFixed(1);
function timeLabel(d: number) {
  if (d === 0) return "Today";
  if (d >= 365) return "1 year";
  if (d < 14) return d === 1 ? "1 day" : `${d} days`;
  if (d < 60) return `${Math.round(d / 7)} weeks`;
  const m = Math.round(d / 30.4);
  return m >= 12 ? "1 year" : `${m} months`;
}

function useTween(target: number, ms = 220) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  const cur = useRef(target);
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { cur.current = target; setV(target); return; }
    from.current = cur.current;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      const e = 1 - Math.pow(1 - k, 3);
      cur.current = from.current + (target - from.current) * e;
      setV(cur.current);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

function TimeSlider({ id, value, onChange, describedBy }: { id: string; value: number; onChange: (n: number) => void; describedBy?: string }) {
  const near = TICKS.reduce((a, t) => (Math.abs(t[0] - value) < Math.abs(a[0] - value) ? t : a))[0];
  return (
    <>
      <label htmlFor={id} className="mk-small">Move the slider: <b style={{ color: "#fff" }}>{timeLabel(value)}</b></label>
      <input id={id} className="mk-range" type="range" min={0} max={365} step={1} value={value} list={`${id}-ticks`} aria-valuetext={timeLabel(value)} aria-describedby={describedBy} onChange={(e) => onChange(+e.target.value)} />
      <datalist id={`${id}-ticks`}>{TICKS.map(([d]) => <option key={d} value={d} />)}</datalist>
      <div className="mk-ticks mk-ticks-abs" aria-hidden="true">{TICKS.map(([d, t]) => <span key={t} className={d === near ? "on" : ""} style={{ left: `${(d / 365) * 100}%` }}>{t}</span>)}</div>
    </>
  );
}

const LOSS = "#3d9a6a";

const GAIN = "#e07a4f";
const G_PC = { w: 760, h: 200, l: 46, r: 18, t: 18, b: 32 };
const G_PH = { w: 360, h: 220, l: 36, r: 10, t: 16, b: 30 };
function useNarrow() {
  const [n, setN] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(max-width: 640px)");
    const f = () => setN(m.matches);
    f(); m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  return n;
}

type Drink = { id: string; name: string; short: string; kcal: number; src: string };
// Calories per serving, checked Oct 22, 2026 against brand labels or USDA FoodData Central.
const SUGARY: Drink[] = [
  { id: "can", name: "Can of pop", short: "the can of pop", kcal: 140, src: "Coca-Cola, 12 fl oz can (coca-cola.com)" },
  { id: "20oz", name: "20 oz pop", short: "the 20 oz pop", kcal: 240, src: "Coca-Cola, 20 fl oz bottle (coca-cola.com)" },
  { id: "sbux", name: "Starbucks drink", short: "the Starbucks drink", kcal: 380, src: "Grande Caramel Frappuccino, 16 fl oz, whole milk and whipped cream (starbucks.com)" },
  { id: "gulp", name: "Big Gulp", short: "the Big Gulp", kcal: 420, src: "Coca-Cola fountain, 30 fl oz, no ice (Coca-Cola fountain nutrition chart)" },
  { id: "energy", name: "Full-sugar energy drink", short: "the energy drink", kcal: 230, src: "Monster Energy Original, 16 fl oz (monsterenergy.com)" },
  { id: "sweettea", name: "Sweet tea", short: "the sweet tea", kcal: 190, src: "Gold Peak Sweet Tea, 18.5 fl oz (coca-cola.com)" },
];
const ZERO: Drink[] = [
  { id: "unsweet", name: "Unsweet tea", short: "unsweet tea", kcal: 5, src: "Brewed black tea, 16 fl oz (USDA FDC 173227)" },
  { id: "water", name: "Water", short: "water", kcal: 0, src: "Water" },
  { id: "dpzcan", name: "Dr Pepper Zero can", short: "a Dr Pepper Zero can", kcal: 0, src: "Dr Pepper Zero Sugar, 12 fl oz label" },
  { id: "dpz20", name: "Dr Pepper Zero 20 oz", short: "a Dr Pepper Zero 20 oz", kcal: 0, src: "Dr Pepper Zero Sugar, 20 fl oz label" },
  { id: "zeroenergy", name: "Zero-cal energy drink", short: "a zero-cal energy drink", kcal: 10, src: "Monster Zero Ultra, 16 fl oz (monsterenergy.com)" },
  { id: "coffee", name: "Black coffee", short: "black coffee", kcal: 4, src: "Brewed coffee, 12 fl oz (USDA FDC 171890)" },
];
const SODA_SR = `Example: a ${SODA_PERSON.age}-year-old, 5'5", ${SODA_PERSON.weightLb}-lb person with about ${SODA_PERSON.bodyFatPct}% body fat who is lightly active, so they need about ${SODA_MAINT_SHOWN.toLocaleString()} calories a day.`;
const curveCache = new Map<string, number[]>();
const curve = (diff: number, gain: boolean) => {
  const key = `${gain ? "g" : "l"}${diff}`;
  let c = curveCache.get(key);
  if (!c) { c = gain ? extraLbByDay(diff, 365, SODA_PERSON) : lostLbByDay(diff, 365, SODA_PERSON); curveCache.set(key, c); }
  return c;
};
const at = (c: number[], d: number) => { const a = Math.floor(d), b = Math.min(365, a + 1); return c[a] + (c[b] - c[a]) * (d - a); };

// Default zero-calorie swap for each drink (the user can still change it).
const PAIR: Record<string, string> = { can: "dpzcan", "20oz": "dpz20", sbux: "coffee", gulp: "water", energy: "zeroenergy", sweettea: "unsweet" };

function DrinkSide({ id, kind, label, items, sel, onSel }: { id: string; kind: "now" | "swap"; label: string; items: Drink[]; sel: Drink; onSel: (id: string) => void }) {
  return (
    <div className={`sd-side ${kind}`}>
      <label htmlFor={id} className="sd-step">{label}</label>
      <div className="sd-selwrap">
        <select id={id} className="sd-select" value={sel.id} onChange={(e) => onSel(e.target.value)}>
          {items.map((x) => <option key={x.id} value={x.id}>{x.name} ({x.kcal} cal)</option>)}
        </select>
      </div>
      <div className="sd-kcal"><b>{sel.kcal}</b> cal a day</div>
      <div className="sd-src">{sel.src}</div>
    </div>
  );
}

function SodaCard() {
  const [i, setI] = useState(365);
  const [sid, setSid] = useState("can");
  const [zid, setZid] = useState(PAIR.can);
  const narrow = useNarrow();
  const G = narrow ? G_PH : G_PC;
  const S = SUGARY.find((x) => x.id === sid)!, Z = ZERO.find((x) => x.id === zid)!;
  const pick = (id: string) => { setSid(id); setZid(PAIR[id] ?? "water"); };
  const diff = Math.max(0, S.kcal - Z.kcal);
  const d = useTween(i);
  // Story A adds the whole drink on top of maintenance; Story B removes (drink − swap) from a steady weight.
  const g = curve(S.kcal, true), l = curve(diff, false);
  const yMax = useTween(Math.max(4, Math.ceil((Math.max(g[365], l[365]) * 1.15) / 4) * 4), 450);
  const tg = useTween(at(g, i), 450), tl = useTween(at(l, i), 450);
  const gx = (x: number) => G.l + (x / 365) * (G.w - G.l - G.r);
  const gy = (lb: number) => G.t + ((yMax - lb) / (2 * yMax)) * (G.h - G.t - G.b);
  const line = (c: number[], s: number, end: number) => {
    const p: string[] = [];
    const k = (x: number) => s * at(c, x) * (end / (at(c, d) || 1) || 1);
    for (let x = 0; x < d; x += 3) p.push(`${gx(x).toFixed(1)},${gy(k(x)).toFixed(1)}`);
    p.push(`${gx(d).toFixed(1)},${gy(s * end).toFixed(1)}`);
    return p.join(" ");
  };
  const lbTxt = (v: number, s: string) => (Math.abs(v) < 0.05 ? "0" : `${s}${fmtLb(Math.abs(v))}`);
  const keepTxt = lbTxt(tg, "+"), swapTxt = lbTxt(tl, "−");
  const lx = gx(d), anchor = lx > G.w - 90 ? "end" : "start";
  const yt = [1, 0.5, 0, -0.5, -1].map((f) => Math.round(f * yMax));
  const when = timeLabel(i).toLowerCase();
  return (
    <>
      <h2 className="mk-h2">One daily drink, two stories</h2>
      <p className="mk-sub">Same example person, same drink. What tends to happen depends on what changes.</p>
      <div className="mk-card sd-card">
        <label htmlFor="sd-now" className="sd-step" style={{ display: "block" }}>The drink</label>
        <div className="sd-selwrap" style={{ maxWidth: "26rem", margin: ".4rem 0 1rem" }}>
          <select id="sd-now" className="sd-select" value={S.id} onChange={(e) => pick(e.target.value)}>
            {SUGARY.map((x) => <option key={x.id} value={x.id}>{x.name} ({x.kcal} cal)</option>)}
          </select>
        </div>
        <div className="st-grid" aria-live="polite">
          <section className="st-card keep" aria-labelledby="st-a">
            <div id="st-a" className="st-tag">Story A · Adding a drink</div>
            <ol className="st-steps">
              <li>A person’s weight is steady. They eat about {SODA_MAINT_SHOWN.toLocaleString()} calories a day, enough to maintain.</li>
              <li>They add one {S.name.toLowerCase()} a day and eat the same otherwise: <b>+{S.kcal} cal a day</b>.</li>
            </ol>
            <div className="st-out"><span>After {when}</span><b>{keepTxt} lb</b><em>The extra calories tend to add up to weight gain.</em></div>
          </section>
          <section className="st-card swap" aria-labelledby="st-b">
            <div id="st-b" className="st-tag">Story B · Switching a drink</div>
            <ol className="st-steps">
              <li>Their weight is stuck, steady while they drink one {S.name.toLowerCase()} a day.</li>
              <li>
                <label htmlFor="sd-swap">They switch to</label>{" "}
                <span className="sd-selwrap st-inline"><select id="sd-swap" className="sd-select" value={Z.id} onChange={(e) => setZid(e.target.value)}>
                  {ZERO.map((x) => <option key={x.id} value={x.id}>{x.name} ({x.kcal} cal)</option>)}
                </select></span>{" "}
                and don’t replace those calories: <b>−{diff} cal a day</b>.
              </li>
            </ol>
            <div className="st-out"><span>After {when}</span><b>{swapTxt} lb</b><em>The swap doesn’t burn fat. Removing those calories creates a deficit, which tends to lead to weight loss.</em></div>
          </section>
        </div>
        <div className="st-legend mk-small"><span className="k">●</span> Story A: add it <span className="s">●</span> Story B: switch it</div>
        <svg className="sd-graph" viewBox={`0 0 ${G.w} ${G.h}`} role="img" aria-label={`Line graph after ${when}: Story A, adding ${S.short}, about ${keepTxt} pounds; Story B, switching to ${Z.short}, about ${swapTxt} pounds`}>
          {yt.map((v) => <g key={v}><line x1={G.l} x2={G.w - G.r} y1={gy(v)} y2={gy(v)} stroke="#ffffff14" /><text x={G.l - 8} y={gy(v) + 4} textAnchor="end" className="sd-ax">{v > 0 ? `+${v}` : v}</text></g>)}
          {TICKS.filter(([t]) => !narrow || t !== 30).map(([t, lab]) => <text key={t} x={gx(t)} y={G.h - 10} textAnchor={t === 0 ? "start" : t === 365 ? "end" : "middle"} className="sd-ax">{lab}</text>)}
          <text x={12} y={G.t + (G.h - G.t - G.b) / 2} className="sd-ax" transform={`rotate(-90 12 ${G.t + (G.h - G.t - G.b) / 2})`} textAnchor="middle">lb</text>
          <line x1={G.l} x2={G.w - G.r} y1={gy(0)} y2={gy(0)} stroke="#9fb0c4" strokeDasharray="6 6" strokeWidth={1.5} />
          <polyline points={line(g, 1, tg)} fill="none" stroke={GAIN} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
          <polyline points={line(l, -1, tl)} fill="none" stroke={LOSS} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={lx} cy={gy(tg)} r={7} fill={GAIN} stroke="#0b1320" strokeWidth={3} />
          <circle cx={lx} cy={gy(-tl)} r={7} fill={LOSS} stroke="#0b1320" strokeWidth={3} />
          <text x={anchor === "end" ? lx - 12 : lx + 12} y={gy(tg) - 10} textAnchor={anchor} className="sd-pt" fill={GAIN}>A {keepTxt} lb</text>
          <text x={anchor === "end" ? lx - 12 : lx + 12} y={gy(-tl) + 22} textAnchor={anchor} className="sd-pt" fill={LOSS}>B {swapTxt} lb</text>
        </svg>
        <TimeSlider id="mkr" value={i} onChange={setI} describedBy="mknote" />
        <p id="mknote" className="mk-small" style={{ marginTop: "1rem" }}>Rough educational estimate for an example person, not a prediction. Story A uses the drink’s calories on top of maintenance; Story B uses the calories removed by the swap, every day, with everything else the same. The pounds come from the simulator's energy-balance model, which includes metabolic adaptation, so both lines slow over time instead of adding up in a straight line. Real-life results vary from person to person. Not medical advice. Method based on Hall KD et al., Lancet 2011;378:826–837, which found the old 3,500-calories-per-pound rule overestimates long-term change.</p>
        <p className="mk-small" style={{ fontSize: ".78rem", opacity: 0.85 }}>{SODA_SR} Individual numbers will differ. Try the simulator to see your own.</p>
        <p className="mk-small" style={{ fontSize: ".72rem", opacity: 0.75 }}>Calories used: {S.name}, {S.kcal} ({S.src}); {Z.name}, {Z.kcal} ({Z.src}). Fountain drinks with ice usually have a bit less.</p>
      </div>
      <div className="mk-btns"><Link className="mk-btn p" to="/hacks/$slug" params={{ slug: "dont-drink-calories" } as never}>Read the Health Hack →</Link></div>
      <a className="mk-simlink" href="/simulator/">See your own numbers in the simulator (Beta) →</a>
    </>
  );
}

// Per 100 g, from USDA FoodData Central (fdc.nal.usda.gov), checked Oct 25, 2026.
// kcal, protein, fat, carbohydrate, fiber (g).
type Food = { name: string; g: number; fdc: number; per: [number, number, number, number, number] };
type Plate = { title: string; items: Food[] };
type Pair = { id: string; label: string; lo: Plate; hi: Plate };
type Meal = { id: string; label: string; pairs: Pair[] };
const F = {
  flakes: { name: "Frosted flakes cereal, 1½ cups", g: 62, fdc: 172990, per: [389, 4.25, 0.87, 90.2, 1.2] },
  milk: { name: "2% milk, 1 cup", g: 244, fdc: 171267, per: [50, 3.3, 1.98, 4.8, 0] },
  eggs: { name: "3 large eggs, scrambled", g: 183, fdc: 172187, per: [149, 9.99, 10.98, 1.61, 0] },
  bagel: { name: "Plain bagel, medium", g: 105, fdc: 174899, per: [264, 10.56, 1.32, 52.38, 1.6] },
  cream: { name: "Cream cheese, 2 tbsp", g: 29, fdc: 173418, per: [350, 6.15, 34.44, 5.52, 0] },
  greek: { name: "Plain nonfat Greek yogurt, 6 oz", g: 170, fdc: 2705424, per: [59, 10.3, 0.37, 3.64, 0] },
  blue: { name: "Blueberries, ½ cup", g: 74, fdc: 171711, per: [57, 0.74, 0.33, 14.49, 2.4] },
  muffin: { name: "Blueberry muffin, large", g: 139, fdc: 172765, per: [375, 4.49, 16.07, 53.0, 1.1] },
  cottage1: { name: "2% cottage cheese, 1 cup", g: 226, fdc: 172182, per: [81, 10.45, 2.27, 4.76, 0] },
  mac: { name: "Macaroni and cheese, 1 cup", g: 230, fdc: 2708811, per: [223, 8.68, 10.5, 23.1, 1.2] },
  chicken: { name: "Roasted chicken breast, 1 cup diced", g: 140, fdc: 171477, per: [165, 31.02, 3.57, 0, 0] },
  romaine: { name: "Romaine, 2 cups (no dressing)", g: 94, fdc: 169247, per: [17, 1.23, 0.3, 3.29, 2.1] },
  burger: { name: "Fast-food cheeseburger", g: 127, fdc: 170691, per: [270, 13.49, 12.9, 25.46, 1.9] },
  fries: { name: "French fries, 1 regular order", g: 110, fdc: 2709461, per: [312, 3.43, 14.7, 41.4, 3.8] },
  tuna: { name: "Tuna in water, 1 can drained", g: 113, fdc: 171986, per: [116, 25.51, 0.82, 0, 0] },
  cottageH: { name: "2% cottage cheese, ½ cup", g: 113, fdc: 172182, per: [81, 10.45, 2.27, 4.76, 0] },
  grilled: { name: "Grilled cheese sandwich", g: 116, fdc: 2705804, per: [368, 13.4, 23.3, 26.4, 1.2] },
  turkey: { name: "Sliced turkey breast, 4 oz", g: 113, fdc: 172941, per: [106, 14.81, 3.77, 2.2, 0] },
  pizza: { name: "3 slices, medium restaurant pizza", g: 264, fdc: 2708640, per: [282, 11.7, 11.9, 32.0, 2.3] },
  sirloin: { name: "Lean top sirloin, 6 oz cooked", g: 170, fdc: 168635, per: [188, 30.29, 6.55, 0, 0] },
  broccoli: { name: "Broccoli, 1 cup, boiled", g: 156, fdc: 169967, per: [35, 2.38, 0.41, 7.18, 3.3] },
  rice: { name: "Fried rice, 2 cups", g: 332, fdc: 2708951, per: [174, 3.84, 3.19, 32.5, 1.1] },
  shrimp: { name: "Cooked shrimp, 6 oz", g: 170, fdc: 175180, per: [99, 23.98, 0.28, 0.2, 0] },
  veg: { name: "Mixed vegetables, 1 cup", g: 182, fdc: 170472, per: [65, 2.86, 0.15, 13.09, 4.4] },
  burrito: { name: "2 bean-and-cheese burritos (frozen)", g: 258, fdc: 173336, per: [221, 7.07, 6.3, 34.01, 3.4] },
  salmon: { name: "Salmon, 6 oz cooked", g: 170, fdc: 175168, per: [206, 22.1, 12.35, 0, 0] },
  beans: { name: "Green beans, 1 cup", g: 125, fdc: 169141, per: [35, 1.89, 0.28, 7.88, 3.2] },
} satisfies Record<string, Food>;
const MEALS: Meal[] = [
  { id: "breakfast", label: "Breakfast", pairs: [
    { id: "cereal", label: "Cereal → eggs", lo: { title: "Frosted flakes and milk", items: [F.flakes, F.milk] }, hi: { title: "Scrambled eggs", items: [F.eggs] } },
    { id: "bagel", label: "Bagel → Greek yogurt", lo: { title: "Bagel and cream cheese", items: [F.bagel, F.cream] }, hi: { title: "Greek yogurt and berries", items: [F.greek, F.blue] } },
    { id: "muffin", label: "Muffin → cottage cheese", lo: { title: "Blueberry muffin", items: [F.muffin] }, hi: { title: "Cottage cheese and berries", items: [F.cottage1, F.blue] } }] },
  { id: "lunch", label: "Lunch", pairs: [
    { id: "mac", label: "Mac and cheese → chicken salad", lo: { title: "Mac and cheese", items: [F.mac] }, hi: { title: "Chicken and greens", items: [F.chicken, F.romaine] } },
    { id: "burger", label: "Burger and fries → tuna plate", lo: { title: "Cheeseburger and fries", items: [F.burger, F.fries] }, hi: { title: "Tuna, greens and cottage cheese", items: [F.tuna, F.romaine, F.cottageH] } },
    { id: "grilled", label: "Grilled cheese → turkey plate", lo: { title: "Grilled cheese", items: [F.grilled] }, hi: { title: "Turkey and cottage cheese", items: [F.turkey, F.cottageH] } }] },
  { id: "dinner", label: "Dinner", pairs: [
    { id: "pizza", label: "Pizza → steak", lo: { title: "Pepperoni pizza", items: [F.pizza] }, hi: { title: "Steak and broccoli", items: [F.sirloin, F.broccoli] } },
    { id: "rice", label: "Fried rice → shrimp", lo: { title: "Fried rice", items: [F.rice] }, hi: { title: "Shrimp and vegetables", items: [F.shrimp, F.veg] } },
    { id: "burrito", label: "Burritos → salmon", lo: { title: "Bean-and-cheese burritos", items: [F.burrito] }, hi: { title: "Salmon and green beans", items: [F.salmon, F.beans] } }] },
];
const tot = (items: Food[]) => {
  const s = [0, 0, 0, 0, 0];
  for (const f of items) f.per.forEach((v, j) => (s[j] += (v * f.g) / 100));
  const [kcal, p, fat, carb, fib] = s;
  void fat; void carb; void fib;
  return { kcal: Math.round(kcal), p: Math.round(p) };
};

function MealSide({ kind, step, title, items, note, children }: { kind: "now" | "swap"; step: string; title: string; items: Food[]; note: string; children?: React.ReactNode }) {
  const t = tot(items);
  return (
    <div className={`sd-side ${kind}`}>
      <div className="sd-step">{step}</div>
      <div style={{ fontWeight: 600, fontSize: "1.05rem" }}>{title}</div>
      <ul className="pm-items">{items.map((f) => <li key={f.name}>{f.name}</li>)}</ul>
      <div className="pm-stats">
        <div><b>{t.kcal}</b><span>calories</span></div>
        <div><b>{t.p} g</b><span>protein</span></div>
      </div>
      <div className="mk-small">{note}</div>
      {children}
    </div>
  );
}

function ProteinCard() {
  const [mid, setMid] = useState("breakfast");
  const [pid, setPid] = useState("cereal");
  const M = MEALS.find((m) => m.id === mid)!;
  const P = M.pairs.find((x) => x.id === pid) ?? M.pairs[0];
  const a = tot(P.lo.items), b = tot(P.hi.items);
  const dk = b.kcal - a.kcal, dp = b.p - a.p;
  return (
    <>
      <h2 className="mk-h2">Choose protein at every meal</h2>
      <p className="mk-sub">Everyday plates that are high in calories and low in protein tend to leave people hungry sooner. A protein-first swap tends to keep people full on fewer calories. Pick a meal, then a swap.</p>
      <div className="mk-card sd-card">
        <div className="pm-tabs" role="group" aria-label="Pick a meal">
          {MEALS.map((m) => <button key={m.id} type="button" className="pm-tab" aria-pressed={m.id === mid} onClick={() => { setMid(m.id); setPid(m.pairs[0].id); }}>{m.label}</button>)}
        </div>
        <div className="pm-chips" role="group" aria-label={`${M.label} swaps`}>
          {M.pairs.map((x) => <button key={x.id} type="button" className="pm-chip" aria-pressed={x.id === P.id} onClick={() => setPid(x.id)}>{x.label}</button>)}
        </div>
        <div className="sd-vs" aria-live="polite">
          <MealSide kind="now" step="High-calorie, low-protein" title={P.lo.title} items={P.lo.items} note="Tends to leave people hungry sooner" />
          <div className="sd-arrow" aria-hidden="true">→</div>
          <MealSide kind="swap" step="Protein-first swap" title={P.hi.title} items={P.hi.items} note="Tends to keep people full longer">
            <div className="pm-diff">
              <div className="sd-step">What the swap changes</div>
              <div className="sd-out">
                <div className="sd-o swap"><span>Protein</span><b>{dp >= 0 ? "+" : "−"}{Math.abs(dp)} g</b></div>
                <div className={`sd-o ${dk <= 0 ? "swap" : "keep"}`}><span>Calories</span><b>{dk > 0 ? "+" : dk < 0 ? "−" : ""}{Math.abs(dk)}</b></div>
              </div>
            </div>
          </MealSide>
        </div>
        <p id="pmnote" className="mk-small" style={{ marginTop: "1rem" }}>Research shows people tend to eat less on their own when more of their calories come from protein: in one study, going from about 15% to 30% protein, people ate about 441 fewer calories a day.<sup><a href="#fn1" aria-label="Footnote 5">5</a></sup><sup><a href="#fn2" aria-label="Footnote 6">6</a></sup> Results vary. Education only, not medical advice.</p>
        <p className="mk-small" style={{ fontSize: ".72rem", opacity: 0.75 }}>Nutrients: USDA FoodData Central, per item: {[...P.lo.items, ...P.hi.items].map((f) => `${f.name} (${f.g} g, FDC ${f.fdc})`).join("; ")}. Brands, recipes and portions vary.</p>
        <p id="fn1" className="mk-small" style={{ fontSize: ".75rem", opacity: 0.8 }}>5. Weigle DS, et al. A high-protein diet induces sustained reductions in appetite, ad libitum caloric intake, and body weight despite compensatory changes in diurnal plasma leptin and ghrelin concentrations. <i>Am J Clin Nutr.</i> 2005;82(1):41–48.</p>
        <p id="fn2" className="mk-small" style={{ fontSize: ".75rem", opacity: 0.8 }}>6. Simpson SJ, Raubenheimer D. Obesity: the protein leverage hypothesis. <i>Obes Rev.</i> 2005;6(2):133–142.</p>
      </div>
      <div className="mk-btns"><Link className="mk-btn p" to="/hacks/$slug" params={{ slug: "protein-label" } as never}>Read the Health Hack: The Protein × 10 Trick →</Link></div>
      <a className="mk-simlink" href="/simulator/">See your own numbers in the simulator (Beta) →</a>
    </>
  );
}

const SLIDES = [SodaCard, ProteinCard];

function SwapCarousel() {
  const [cur, setCur] = useState(0);
  const N = SLIDES.length;
  const x0 = useRef<number | null>(null);
  const go = (n: number) => setCur(Math.max(0, Math.min(N - 1, n)));
  return (
    <section className="mk-wrap" id="swap" aria-roledescription="carousel" aria-label="Everyday swaps">
      <div className="mk-intro">
        <p>Below are a few examples of simple changes that can make a big impact. These are just a few examples — try the <a href="/simulator/">Theosis Metabolic Simulator</a> to see what changes unique to your own life could mean.</p>
        <a className="mk-btn s mk-introbtn" href="/simulator/">Try the simulator →</a>
      </div>
      <div className="mk-car">
        <button type="button" className="mk-arrow l" aria-label="Previous swap" disabled={cur === 0} onClick={() => go(cur - 1)}>‹</button>
        <div className="mk-vp"
          onTouchStart={(e) => { if ((e.target as HTMLInputElement).type !== "range") x0.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => { if (x0.current == null) return; const dx = e.changedTouches[0].clientX - x0.current; if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1)); x0.current = null; }}>
          <div className="mk-track" style={{ transform: `translateX(-${cur * 100}%)` }}>
            {SLIDES.map((S, j) => (
              <div key={j} className="mk-slide" role="group" aria-roledescription="slide" aria-label={`Swap ${j + 1} of ${N}`} aria-hidden={j !== cur} inert={j !== cur ? true : undefined}>
                <S />
              </div>
            ))}
          </div>
        </div>
        <button type="button" className="mk-arrow r" aria-label="Next swap" disabled={cur === N - 1} onClick={() => go(cur + 1)}>›</button>
      </div>
      <div className="mk-dots">{SLIDES.map((_, j) => <button type="button" key={j} className={`mk-dot${j === cur ? " on" : ""}`} aria-label={`Swap ${j + 1}`} aria-current={j === cur ? "true" : undefined} onClick={() => go(j)} />)}</div>
      <div className="mk-count" aria-live="polite">Swap {cur + 1} of {N} · tap the arrows or swipe</div>
    </section>
  );
}

const steps = [
  { slug: "where-to-start", title: "Where to Start", body: "Pick one small thing, not ten." },
  { slug: "dont-drink-calories", title: "Don't Drink Calories", body: "The soda swap above, plus easy zero-calorie drink ideas." },
  { slug: "protein-label", title: "The Protein × 10 Trick", body: "A quick way to read a food label in the grocery aisle." },
  { slug: "fast-food", title: "Fast Food Hacks", body: "Better picks for busy days on the road." },
  { slug: "exercise", title: "Exercise Hacks", body: "Simple ways to add movement into a hectic week." },
];

function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const [anim, setAnim] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnim(true);
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.2 });
    el.querySelectorAll(".mk-ms").forEach((m) => io.observe(m));
    return () => io.disconnect();
  }, []);
  return (
    <section className="mk-wrap" id="steps" style={{ paddingTop: "1rem" }}>
      <h2 className="mk-h2">Small steps that stack</h2>
      <p className="mk-sub">Pick any one and start today. Each step stacks on the last. No waiting, no all-or-nothing.</p>
      <div ref={ref} className={`mk-tl${anim ? " mk-anim" : ""}`}>
        {steps.map((s, j) => (
          <div key={s.slug} className="mk-ms">
            <Link to="/hacks/$slug" params={{ slug: s.slug } as never}><div className="mk-when">Step {j + 1}</div><h3>{s.title}</h3><p className="mk-small">{s.body}</p></Link>
          </div>
        ))}
      </div>
      <div className="mk-btns"><Link className="mk-btn s" to="/hacks">See all Health Hacks →</Link></div>
    </section>
  );
}

function Toolbox() {
  return (
    <section id="tools" className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
      <p className="mk-eyebrow">Tools</p>
      <h2 className="font-display text-3xl font-semibold uppercase sm:text-4xl">The Health Toolbox</h2>
      <p className="mt-2 text-muted">A few tools to see the numbers behind everyday choices.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="mk-feat md:col-span-2">
          <span className="mk-ribbon">Pro version coming soon</span>
          <a className="mk-art" href="/simulator/" aria-label="Open the simulator"><img src="/images/sim-card.svg" alt="Illustration: a figure beside two projection lines over time" width={480} height={300} style={{ display: "block", width: "100%", height: "auto" }} /></a>
          <div>
            <h3 className="font-display text-2xl font-semibold uppercase">Metabolic Simulator<span className="mk-hp">Beta</span></h3>
            <p className="mt-2 text-muted" style={{ maxWidth: "44rem" }}>{tools[0].body}</p>
            <p className="mk-pro">Coming in Pro: AI-powered projections, a personalized learning plan, in-app progress tracking, and a phone app.</p>
            <div className="mk-btns" style={{ marginTop: "1rem" }}><a className="mk-btn p" href="/simulator/">Try it free →</a></div>
            <p className="mk-small" style={{ marginTop: ".75rem", fontSize: ".78rem" }}>Educational tools, not medical advice.</p>
          </div>
        </div>
        {tools.slice(1).map((t) => {
          const inner = (<><h3 className="font-display text-2xl font-semibold uppercase">{t.title}</h3><p className="mt-2 text-muted">{t.body}</p><span className="mt-4 inline-flex items-center gap-1 font-medium text-health">Open <ArrowRight className="size-4" /></span></>);
          return t.href === "/hacks" ? <Link key={t.href} to="/hacks" className={card}>{inner}</Link> : <a key={t.href} href={t.href} className={card}>{inner}</a>;
        })}
      </div>
    </section>
  );
}

const why = [
  { icon: Clock, title: "Scroll forward through time", body: "Move ahead week by week and month by month to see how daily choices about food, movement, and habits might affect the human body over time." },
  { icon: Footprints, title: "Compare everyday decisions", body: "Try a different plan or keep current habits and see how the estimated paths may differ, with every estimate hedged and explained. An optional inside view adds an illustration." },
  { icon: FlaskConical, title: "Evidence-based, cited content", body: "Explanations drawn from published research, with numbered citations you can check." },
];

function Why() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
      <p className="mk-eyebrow">Why</p>
      <h2 className="font-display text-3xl font-semibold uppercase sm:text-4xl">Why Theosis Health</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {why.map(({ icon: Icon, title, body }) => (
          <div key={title} className={card}>
            <Icon className="size-7 text-health" aria-hidden="true" />
            <h3 className="mt-3 font-display text-xl font-semibold uppercase">{title}</h3>
            <p className="mt-2 text-muted">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
