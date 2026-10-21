import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Eye, FlaskConical, Footprints } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/site-shell";
import { ABOUT_CLINICIAN } from "@/lib/links";

export const Route = createFileRoute("/")({ component: Home });

// DRAFT COPY: Nick to edit. Hedged wording only, no outcome promises.
const why = [
  { icon: Eye, title: "See what may be happening inside", body: "Illustrations, like a CT scan view, of how fat stored around organs might change over time. Illustration, not your scan." },
  { icon: Footprints, title: "Understand where habits may lead", body: "Explore how everyday eating and movement could add up, with every estimate hedged and explained." },
  { icon: FlaskConical, title: "Evidence-based, cited content", body: "Explanations drawn from published research, with numbered citations you can check." },
];

const tools = [
  { href: "/simulator/", title: "Metabolic Simulator", body: "Try a plan, or your current habits, and see a hedged estimate of where they might lead." },
  { href: "/simulator/pft-inside/", title: "Personal Fat Threshold model", body: "A 3D illustration of the idea that people may differ in how much fat they can store safely." },
  { href: "/hacks", title: "Holwey’s Handy Health Hacks", body: "Practical nutrition and exercise tips, plus nerd-out deep dives for the curious." },
];

const card = "health-card block border border-border bg-surface p-6";

function Home() {
  return (
    <SiteShell>
      <section className="health-mesh text-ink-fg">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-5 py-16 sm:px-8 md:flex-row md:py-28">
          <img src="/images/shield.jpg" alt="Theosis shield emblem" className="no-outline w-44 rounded-[28px] shadow-2xl md:w-72" />
          <div className="stagger-in">
            <p className="text-xs font-medium tracking-widest text-health uppercase">Draft copy · Nick to edit</p>
            <h1 className="mt-3 font-display text-5xl leading-none font-bold tracking-wide uppercase sm:text-7xl lg:text-8xl">
              Theosis <span className="text-health">Health</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-fg/90 sm:text-xl">
              Plain-language metabolic health education, created by a PA-C. We hope these tools make it a little easier to picture how habits may shape health over time.
            </p>
            <p className="mt-3 text-sm text-ink-muted">Education only, not medical advice. Talk with your healthcare provider.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="onInk" size="lg"><a href="#tools">What you’ll find <ArrowRight /></a></Button>
              <Button asChild variant="onInkOutline" size="lg"><a href={ABOUT_CLINICIAN}>About the clinician</a></Button>
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

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className={`${card} flex flex-col items-start gap-5 sm:flex-row sm:items-center`}>
          <img src="/images/nick.jpg" alt="Nick Holwey, PA-C" className="size-24 rounded-full object-cover" />
          <div>
            <h2 className="font-display text-2xl font-semibold uppercase">About the clinician</h2>
            <p className="mt-2 max-w-2xl text-muted">
              Theosis Health was created by Nick Holwey, PA-C, an emergency medicine physician associate with a degree in food science and human nutrition. His clinical work is through Theosis Medical.
            </p>
            <a href={ABOUT_CLINICIAN} className="mt-3 inline-flex items-center gap-1 font-medium text-health">Read more on theosismedical.com <ArrowRight className="size-4" /></a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
