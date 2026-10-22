import { Link } from "@tanstack/react-router";
import { hacks, hackCovers } from "@/lib/hacks";
import { NavPlaque } from "@/components/site/health-hacks-mark";
import { NavIcon } from "@/components/site/nav-icon";

/** Swap this slug to feature a different existing Health Hack. Text is pulled from src/lib/hacks.ts, not written here. */
export const HACK_OF_THE_WEEK = "dont-drink-calories" as const;

export function HackOfTheWeek() {
  const h = hacks.find((x) => x.slug === HACK_OF_THE_WEEK);
  if (!h) return null;
  const cover = hackCovers[h.slug];
  return (
    <aside aria-labelledby="hotw-title" className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface/80 sm:flex-row">
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

/** Home: featured Metabolic Simulator card paired with the Hack of the week (side by side on PC, stacked on phone). */
export function HomeFeatures() {
  return (
    <div className="my-6 grid max-w-5xl gap-4 md:grid-cols-2">
      <section aria-labelledby="simfeat-title" className="flex h-full flex-col overflow-hidden rounded-xl border border-[#79b4f6]/60 bg-surface/80 shadow-[0_0_0_1px_rgb(91_156_236_/_0.35),0_0_28px_rgb(42_122_224_/_0.45)] ring-2 ring-[#5b9cec]/50 transition-shadow duration-200 hover:shadow-[0_0_0_1px_rgb(121_180_246_/_0.5),0_0_40px_rgb(42_122_224_/_0.65)]">
        <img src="/images/simulator-card-cover.jpg" alt="Phone showing the Metabolic Simulator's see-through figure" loading="lazy" width={1200} height={675} className="block h-auto w-full" />
        <div className="flex flex-1 flex-col gap-2 p-5">
          <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-health uppercase">
            <NavIcon name="pulse" className="size-5" /> Free tool · Beta
          </span>
          <h2 id="simfeat-title" className="font-display text-xl font-semibold uppercase">Metabolic Simulator</h2>
          <p className="text-ink-fg/85">See where you may stand relative to your personal fat threshold, and how daily habits could change it over time.</p>
          <p className="text-xs text-ink-muted">Estimates are hedged and for education only, not medical advice.</p>
          <a href="/simulator/" className="mt-auto inline-flex min-h-11 items-center gap-2 self-start rounded-md bg-[#2a7ae0] px-4 font-semibold text-white transition-colors hover:bg-[#3a8af0]">Try the simulator <span aria-hidden>→</span></a>
        </div>
      </section>
      <HackOfTheWeek />
    </div>
  );
}
