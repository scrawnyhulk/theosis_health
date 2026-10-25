import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LogoLockup } from "@/components/site/logo-lockup";
import { QuickFind } from "@/components/site/quick-find";
import { NavPlaque } from "@/components/site/health-hacks-mark";
import { healthNav } from "@/lib/links";

import { Activity, Calculator, Flame, Gauge, Lightbulb, Mail, MessageCircle, PersonStanding, Fuel, Zap } from "lucide-react";
import { PHONE_ICON_STYLE, TabFace, tabClass, type TabIcons } from "@/components/site/phone-tabs";

/** Option A hand-drawn icons (same 24px line style as NavIcon). */
const lineProps = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
const A = {
  hacks: ({ className }: { className?: string }) => <svg {...lineProps} className={className}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" /></svg>,
  pulse: ({ className }: { className?: string }) => <NavIcon name="pulse" className={className} />,
  gauge: ({ className }: { className?: string }) => <NavIcon name="gauge" className={className} />,
  flame: ({ className }: { className?: string }) => <NavIcon name="flame" className={className} />,
  mail: ({ className }: { className?: string }) => <svg {...lineProps} className={className}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>,
};

const phoneNav: { href: string; short: string; icons: TabIcons }[] = [
  { href: "/hacks", short: "Hacks", icons: { A: A.hacks, B: Zap, C: Lightbulb } },
  { href: "/simulator/", short: "Simulator", icons: { A: A.pulse, B: Activity, C: PersonStanding } },
  { href: "/simulator/pft-inside/", short: "PFT", icons: { A: A.gauge, B: Gauge, C: Fuel } },
  { href: "/fat-burn-calculator/", short: "Calculator", icons: { A: A.flame, B: Flame, C: Calculator } },
  { href: "/contact", short: "Contact", icons: { A: A.mail, B: Mail, C: MessageCircle } },
];
import { NavIcon } from "@/components/site/nav-icon";
import { cn } from "@/lib/utils";


export function SiteHeader() {
  const close = () => {};
  // Home page shows the big hero logo instead, so the header drops its logo there (different feel from theosismedical.com).
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isHome = path === "/";
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-5">
          <QuickFind />
          {/* Phones/tablets (<xl): ☰ Quick find + one-tap page icons; logo + plaques are desktop-only. */}
          <div className="hidden xl:contents">
          {isHome ? (
            <Link to="/" className="sr-only focus:not-sr-only focus:flex focus:min-h-11 focus:items-center" onClick={close}>Theosis Health home</Link>
          ) : (
            <Link to="/" className="flex min-h-11 shrink-0 items-center" onClick={close}>
              <LogoLockup />
            </Link>
          )}
          </div>
          <nav className="hidden items-center gap-3 whitespace-nowrap xl:flex" aria-label="Primary">
            <Link to="/hacks" className="group shrink-0" aria-label="Health Hacks">
              <NavPlaque label="Health Hacks" />
            </Link>
            {healthNav.map((n) => (
              <a key={n.href} href={n.href} className="group shrink-0" aria-label={n.badge ? `${n.label} (${n.badge})` : n.label}>
                <NavPlaque label={n.label} badge={n.badge} icon={<NavIcon name={n.icon} />} />
              </a>
            ))}
          </nav>
        </div>
        <nav className="flex flex-1 items-stretch justify-around gap-0.5 xl:hidden" aria-label="Pages">
          {phoneNav.map((n) => {
            const active = path === n.href || (n.href !== "/" && path.startsWith(n.href.replace(/\/$/, "")));
            return (
              <a key={n.href} href={n.href} aria-current={active ? "page" : undefined}
                aria-label={PHONE_ICON_STYLE === "D" ? n.short : undefined} className={tabClass(active)}>
                <TabFace icons={n.icons} label={n.short} active={active} />
              </a>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2 xl:flex">
          <Button asChild variant="invert" size="sm">
            <Link to="/contact">Contact</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

