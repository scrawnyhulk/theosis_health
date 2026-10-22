import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, FlaskConical, Footprints } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/site-shell";
import { hacks } from "@/lib/hacks";

export const Route = createFileRoute("/")({ component: Home });

// DRAFT COPY: Nick to edit. Hedged wording only, no outcome promises.
const why = [
  { icon: Clock, title: "Scroll forward through time", body: "Move ahead week by week and month by month to see how daily choices about food, movement and habits might add up over time." },
  { icon: Footprints, title: "Compare everyday decisions", body: "Try a different plan or keep current habits and see how the estimated paths may differ, with every estimate hedged and explained. An optional inside view adds an illustration." },
  { icon: FlaskConical, title: "Evidence-based, cited content", body: "Explanations drawn from published research, with numbered citations you can check." },
];

const tools = [
  { href: "/simulator/", img: "/images/cards/simulator.webp", title: "Metabolic Simulator", body: "Scroll forward through time to see how daily decisions about food, movement and habits might shape health. Estimates are hedged and for education only." },
  { href: "/simulator/pft-inside/", img: "/images/cards/pft.webp", title: "Personal Fat Threshold model", body: "A 3D illustration of the idea that people may differ in how much fat they can store safely." },
  { href: "/fat-burn-calculator/", img: "/images/cards/fat-burn-calculator.webp", title: "Max Fat Burn Calculator", body: "An estimate of how fast fat loss might go while limiting muscle loss, based on published research." },
];

// Card image slot: drop a file at `src` (see scripts/brand/CARD-IMAGES.md). Until then the navy placeholder shows.
function CardImage({ src, ratio }: { src: string; ratio: string }) {
  return (
    <span aria-hidden className="block w-full bg-cover bg-center" style={{ aspectRatio: ratio, backgroundImage: `url(${src}), radial-gradient(120% 90% at 85% 15%, rgba(69,135,198,.28), transparent 55%), linear-gradient(160deg, #0e1c30 0%, #08111d 100%)` }} />
  );
}

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
            <p className="text-xs font-medium tracking-widest text-health uppercase">Draft copy · Nick to edit</p>
            <h1 className="sr-only">Theosis Health</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-fg/90 sm:text-xl">
              Simple tools and plain-language Health Hacks to help you see how everyday choices add up over time.
            </p>
            <p className="mt-3 text-sm text-ink-muted">Education only, not medical advice. Talk with your healthcare provider.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="onInk" size="lg"><a href="/simulator/">Try the simulator <ArrowRight /></a></Button>
              <Button asChild variant="onInkOutline" size="lg"><a href="#hacks">Health Hacks</a></Button>
            </div>
          </div>
        </div>
      </section>



      <section id="tools" className="mx-auto max-w-6xl px-5 pt-16 sm:px-8">
        <a href="/simulator/" className="health-card group block overflow-hidden border border-border bg-surface">
          <CardImage src="/images/cards/simulator.webp" ratio="16 / 9" />
          <div className="p-6 sm:p-8">
            <h2 className="font-display text-3xl font-semibold uppercase sm:text-4xl">Metabolic Simulator<span className="ml-2 inline-block rounded-full border px-2 py-0.5 align-middle font-sans text-xs font-semibold normal-case tracking-wide" style={{ color: "#4587c6", borderColor: "rgba(69,135,198,.55)", background: "rgba(69,135,198,.1)" }}>Beta</span></h2>
            <p className="mt-3 max-w-3xl text-lg text-muted">{tools[0].body}</p>
            <span className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md px-5 font-semibold text-white" style={{ background: "#4587c6" }}>Try the simulator <ArrowRight className="size-4" /></span>
          </div>
        </a>
      </section>

      <section id="hacks" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-3xl font-semibold uppercase sm:text-4xl">Health Hacks</h2>
          <Link to="/hacks" className="inline-flex min-h-11 items-center gap-1 font-medium text-health">All Health Hacks <ArrowRight className="size-4" /></Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hacks.map((h) => (
            <Link key={h.slug} to="/hacks/$slug" params={{ slug: h.slug }} className="health-card block overflow-hidden border border-border bg-surface">
              <CardImage src={`/images/cards/hacks/${h.slug}.webp`} ratio="4 / 3" />
              <div className="p-5">
                <span className="font-display text-sm font-semibold text-health">{h.n}</span>
                <h3 className="mt-1 font-display text-xl font-semibold uppercase">{h.title}</h3>
                <p className="mt-2 text-muted">{h.lede}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <h2 className="font-display text-3xl font-semibold uppercase sm:text-4xl">More tools</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {tools.slice(1).map((t) => (
            <a key={t.href} href={t.href} className="health-card block overflow-hidden border border-border bg-surface">
              <CardImage src={t.img} ratio="4 / 3" />
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold uppercase">{t.title}</h3>
                <p className="mt-2 text-muted">{t.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-medium text-health">Open <ArrowRight className="size-4" /></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <h2 className="font-display text-3xl font-semibold uppercase sm:text-4xl">Why Theosis Health</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {why.map(({ icon: Icon, title, body }) => (
            <div key={title} className={card}>
              <Icon className="size-7 text-health" />
              <h3 className="mt-3 font-display text-xl font-semibold uppercase">{title}</h3>
              <p className="mt-2 text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>


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
