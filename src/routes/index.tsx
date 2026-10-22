import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Clock, FlaskConical, Footprints } from "lucide-react";
import { SiteShell } from "@/components/site/site-shell";
import { EXAMPLE, extraLbByDay } from "@/lib/swap-model";

const SODA_LB = extraLbByDay(140);
const PROT_LB = extraLbByDay(150);
const BAR_MAX = Math.max(SODA_LB[365], PROT_LB[365]) * 1.05;
const barH = (lb: number) => `${Math.max(4, (lb / BAR_MAX) * 100)}%`;
const EXAMPLE_NOTE = `Example: a ${EXAMPLE.age}-year-old, 5'9", ${EXAMPLE.weightLb}-lb, lightly active adult; individual numbers will differ. Try the simulator to see your own.`;

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
            <p className="mt-2 max-w-xl text-lg leading-relaxed text-ink-fg/90 sm:text-xl">
              Simple tools and realistic Health Hacks to help re-inspire a healthy lifestyle while navigating a hectic life.
            </p>
            <div className="mk-welcome">
              <h2 className="font-display text-2xl font-semibold uppercase sm:text-3xl">Welcome to Theosis Health</h2>
              <p className="mt-2 max-w-2xl text-ink-fg/85">Growing up as a scrawny yet nerdy kid who wanted to put on muscle, I was told five hundred different recommendations about five hundred different ways to lift and eat, except it just never seemed to work right for me.</p>
              <p className="mt-3 max-w-2xl text-ink-fg/85">Nowadays there are plenty of health influencers and diet programs, each with their own take on health and fitness. And although there’s a lot of overlap, I haven’t really seen much that addresses the pathology of poor health. In our current food landscape it’s incredibly easy to overconsume calories every day, and that’s what leads to metabolic strain and insulin resistance.</p>
              <p className="mt-3 max-w-2xl text-ink-fg/85">So it’s become incredibly important to me to find a way to reach everybody and help them understand how food-related diseases occur, so we can work together to get back to better health — one person at a time.</p>
              <ul className="mk-chips" aria-label="Quick facts">
                <li><b>40.1 million</b> people in the US have diabetes (2023)<sup><a href="#wf1" aria-label="Footnote 1">1</a></sup></li>
                <li><b>115.2 million</b> US adults have prediabetes<sup><a href="#wf1" aria-label="Footnote 1">1</a></sup></li>
                <li><b>About 1 in 3</b> US adults (34.7%) have metabolic syndrome (2011–2016)<sup><a href="#wf2" aria-label="Footnote 2">2</a></sup></li>
              </ul>
              <ol className="mk-fn">
                <li id="wf1">CDC. National Diabetes Statistics Report (updated Sept 16, 2026).</li>
                <li id="wf2">Hirode G, Wong RJ. Trends in the prevalence of metabolic syndrome in the United States, 2011–2016. <i>JAMA.</i> 2020;323(24):2526–2528.</li>
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
              Theosis Health was founded by Nick Holwey, PA-C, a licensed physician assistant, to make metabolic health easier to see and understand. Theosis Health is an education company. His clinical work is done separately through Theosis Medical LLC.
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

function SodaCard() {
  const [i, setI] = useState(0);
  const c = i * 140, lb = useTween(SODA_LB[i]);
  return (
    <>
      <h2 className="mk-h2">One small swap: soda or Starbucks vs diet or zero-calorie drinks</h2>
      <p className="mk-sub">Slide forward in time to see roughly how one sweet drink a day (a 12&nbsp;oz soda is about 140 calories) could add up, compared with a diet or zero-calorie drink instead.</p>
      <div className="mk-card">
        <TimeSlider id="mkr" value={i} onChange={setI} describedBy="mknote" />
        <div className="mk-paths" aria-live="polite">
          <div className="mk-path"><h3>🥤 Soda or sweet coffee drink</h3><div className="mk-barbox"><div className="mk-bar" style={{ background: "#d4a056", height: barH(lb) }} /></div><div className="mk-num">+{fmtLb(lb)} lb</div><div className="mk-small">{c.toLocaleString()} extra calories so far</div></div>
          <div className="mk-path"><h3>🥤 Diet or zero-calorie drink</h3><div className="mk-barbox"><div className="mk-bar" style={{ background: "#4587c6", height: "4px" }} /></div><div className="mk-num">+0 lb</div><div className="mk-small">0 extra calories</div></div>
        </div>
        <p id="mknote" className="mk-small" style={{ marginTop: "1rem" }}>Rough educational estimate only: about 140 calories a day (a 12&nbsp;oz soda) vs 0 for diet or zero-calorie drinks. Many sweet coffee drinks run 200–400+ calories, so the real gap could be bigger. The pounds come from the simulator's energy-balance model, which lets burn rise a little as weight goes up, so the curve slows over time. Real-life results are usually smaller and vary from person to person. Not medical advice.</p>
        <p className="mk-small" style={{ fontSize: ".78rem", opacity: 0.85 }}>{EXAMPLE_NOTE}</p>
      </div>
      <div className="mk-btns"><Link className="mk-btn p" to="/hacks/$slug" params={{ slug: "dont-drink-calories" } as never}>Read the Health Hack →</Link></div>
      <a className="mk-simlink" href="/simulator/">See your own numbers in the simulator (Beta) →</a>
    </>
  );
}

function ProteinCard() {
  const [i, setI] = useState(0);
  const c = i * 150, lb = useTween(PROT_LB[i]);
  return (
    <>
      <h2 className="mk-h2">One small swap: higher-protein day vs lower-protein day</h2>
      <p className="mk-sub">Protein tends to help people feel full longer, so many end up eating a bit less without trying. Slide forward to see how that could add up.</p>
      <div className="mk-card">
        <TimeSlider id="mkp" value={i} onChange={setI} describedBy="mkpnote" />
        <div className="mk-paths" aria-live="polite">
          <div className="mk-path"><h3>🍳 Higher-protein day</h3><div className="mk-small" style={{ marginTop: ".6rem" }}>Fullness</div><div className="mk-meter" role="img" aria-label="Fullness: higher"><i style={{ width: "80%", background: "#3d9a6a" }} /></div><div className="mk-small">Tends to feel full longer</div><div className="mk-barbox"><div className="mk-bar" style={{ background: "#4587c6", height: "4px" }} /></div><div className="mk-num">0 extra</div><div className="mk-small">baseline for comparison</div></div>
          <div className="mk-path"><h3>🥯 Lower-protein day</h3><div className="mk-small" style={{ marginTop: ".6rem" }}>Fullness</div><div className="mk-meter" role="img" aria-label="Fullness: lower"><i style={{ width: "40%", background: "#d4a056" }} /></div><div className="mk-small">Tends to get hungry sooner</div><div className="mk-barbox"><div className="mk-bar" style={{ background: "#d4a056", height: barH(lb) }} /></div><div className="mk-num">+{c.toLocaleString()} cal</div><div className="mk-small">more calories eaten so far (about +{fmtLb(lb)} lb)</div></div>
        </div>
        <p id="mkpnote" className="mk-small" style={{ marginTop: "1rem" }}>Rough illustration only, not a prediction. In one study, people who raised protein from about 15% to 30% of their calories ate about 441 fewer calories a day on their own.<sup><a href="#fn1" aria-label="Footnote 3">3</a></sup> To be careful, this uses a much smaller 150 calories a day, run through the simulator's energy-balance model. Results vary from person to person and are often smaller. Not medical advice.</p>
        <p className="mk-small" style={{ fontSize: ".78rem", opacity: 0.85 }}>{EXAMPLE_NOTE}</p>
        <p id="fn1" className="mk-small" style={{ fontSize: ".75rem", opacity: 0.8 }}>3. Weigelt DS, et al. A high-protein diet induces sustained reductions in appetite, ad libitum caloric intake, and body weight. <i>Am J Clin Nutr.</i> 2005;82(1):41–48.</p>
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
  { icon: Clock, title: "Scroll forward through time", body: "Move ahead week by week and month by month to see how daily choices about food, movement, and habits might affect your body over time." },
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
