import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, FlaskConical, Footprints } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/site-shell";

export const Route = createFileRoute("/")({ component: Home });

// DRAFT COPY: Nick to edit. Hedged wording only, no outcome promises.
const why = [
  { icon: Clock, title: "Scroll forward through time", body: "Move ahead week by week and month by month to see how daily choices about food, movement and habits might add up over time." },
  { icon: Footprints, title: "Compare everyday decisions", body: "Try a different plan or keep current habits and see how the estimated paths may differ, with every estimate hedged and explained. An optional inside view adds an illustration." },
  { icon: FlaskConical, title: "Evidence-based, cited content", body: "Explanations drawn from published research, with numbered citations you can check." },
];

const tools = [
  { href: "/simulator/", title: "Metabolic Simulator", body: "Scroll forward through time to see how daily decisions about food, movement and habits might shape health. Estimates are hedged and for education only." },
  { href: "/simulator/pft-inside/", title: "Personal Fat Threshold model", body: "A 3D illustration of the idea that people may differ in how much fat they can store safely." },
  { href: "/hacks", title: "Holwey’s Handy Health Hacks", body: "Practical nutrition and exercise tips, plus nerd-out deep dives for the curious." },
];

const card = "health-card block border border-border bg-surface p-6";

function Home() {
  return (
    <SiteShell>
      <section className="health-mesh text-ink-fg">
        <div className="hero-phone">
          <img src="/images/health-logo-phone.png" alt="Theosis Health emblem: a silver shield bearing the Star of Life, a cross, and the serpent of healing, above the words Theosis Health." className="no-outline mx-auto block h-auto w-full max-w-full object-contain object-top" />
        </div>
        <div className="hero-desktop">
          <img src="/images/health-logo.jpg" alt="Theosis Health emblem: a silver shield bearing the Star of Life, a cross, and the serpent of healing, above the words Theosis Health." className="no-outline block max-h-[80svh] w-full object-cover object-center" />
        </div>
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 md:py-16">
          <div className="stagger-in">
            <p className="text-xs font-medium tracking-widest text-health uppercase">Draft copy · Nick to edit</p>
            <h1 className="sr-only">Theosis Health</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-fg/90 sm:text-xl">
              Plain-language metabolic health education, created by a licensed physician associate. For education only, not medical advice. Scroll forward through time to see how everyday decisions about food, movement and habits might affect health in the months and years ahead.
            </p>
            <p className="mt-3 text-sm text-ink-muted">Education only, not medical advice. Talk with your healthcare provider.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="onInk" size="lg"><a href="#tools">What you’ll find <ArrowRight /></a></Button>
              <Button asChild variant="onInkOutline" size="lg"><a href="#founder">About the founder</a></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
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

      <section id="tools" className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <h2 className="font-display text-3xl font-semibold uppercase sm:text-4xl">What you’ll find</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {tools.map((t) => {
            const inner = (
              <>
                <h3 className="font-display text-2xl font-semibold uppercase">{t.title}</h3>
                <p className="mt-2 text-muted">{t.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-medium text-health">Open <ArrowRight className="size-4" /></span>
              </>
            );
            return t.href === "/hacks" ? (
              <Link key={t.href} to="/hacks" className={card}>{inner}</Link>
            ) : (
              <a key={t.href} href={t.href} className={card}>{inner}</a>
            );
          })}
        </div>
      </section>

      <section id="founder" className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className={`${card} flex flex-col items-start gap-5 sm:flex-row sm:items-center`}>
          <img src="/images/nick.jpg" alt="Nick Holwey, founder of Theosis Health" className="size-24 rounded-full object-cover" />
          <div>
            <h2 className="font-display text-2xl font-semibold uppercase">About the founder</h2>
            <p className="mt-2 max-w-2xl text-muted">
              Theosis Health was founded by Nick Holwey, PA-C, a licensed physician associate, to make metabolic health easier to see and understand. Theosis Health is an education company. His clinical work is done separately through Theosis Medical LLC.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
