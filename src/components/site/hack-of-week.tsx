import { Link } from "@tanstack/react-router";
import { hacks, hackCovers } from "@/lib/hacks";
import { NavPlaque } from "@/components/site/health-hacks-mark";

/** Swap this slug to feature a different existing Health Hack. Text is pulled from src/lib/hacks.ts, not written here. */
export const HACK_OF_THE_WEEK = "dont-drink-calories" as const;

export function HackOfTheWeek() {
  const h = hacks.find((x) => x.slug === HACK_OF_THE_WEEK);
  if (!h) return null;
  const cover = hackCovers[h.slug];
  return (
    <aside aria-labelledby="hotw-title" className="my-6 flex max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-surface/80 sm:flex-row">
      {cover ? <img src={cover.src} alt={cover.alt} loading="lazy" className="h-40 w-full object-cover sm:h-auto sm:w-44" /> : null}
      <div className="flex flex-col gap-2 p-5">
        <span className="text-xs font-semibold tracking-[0.16em] text-health uppercase">Hack of the week</span>
        <h2 id="hotw-title" className="font-display text-xl font-semibold uppercase">
          <Link to="/hacks/$slug" params={{ slug: h.slug }} className="hover:underline">{h.title}</Link>
        </h2>
        <p className="text-ink-fg/85">{h.lede}</p>
        <p className="text-xs text-ink-muted">General education, not medical advice. What works can vary from person to person.</p>
        <Link to="/hacks" className="group mt-1 self-start" aria-label="See all Health Hacks"><NavPlaque size="menu" label="See all Health Hacks" /></Link>
      </div>
    </aside>
  );
}
