import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoLockup } from "@/components/site/logo-lockup";
import { QuickFind } from "@/components/site/quick-find";
import { HealthHacksMark } from "@/components/site/health-hacks-mark";
import { healthNav } from "@/lib/links";
import { cn } from "@/lib/utils";

const item = "shrink-0 text-sm font-medium tracking-wide text-muted uppercase transition-colors duration-150 hover:text-fg";
const mItem = "flex min-h-12 items-center border-b border-border text-base font-medium text-fg";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  // Home page shows the big hero logo instead, so the header drops its logo there (different feel from theosismedical.com).
  const isHome = useRouterState({ select: (s) => s.location.pathname }) === "/";
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-5">
          <QuickFind />
          {isHome ? (
            <Link to="/" className="sr-only focus:not-sr-only focus:flex focus:min-h-11 focus:items-center" onClick={close}>Theosis Health home</Link>
          ) : (
            <Link to="/" className="flex min-h-11 shrink-0 items-center" onClick={close}>
              <LogoLockup />
            </Link>
          )}
          <nav className="hidden items-center gap-4 whitespace-nowrap xl:flex" aria-label="Primary">
            {healthNav.map((n) => (
              <a key={n.href} href={n.href} className={item}>{n.label}</a>
            ))}
            <Link to="/hacks" className="group shrink-0" aria-label="Health Hacks">
              <HealthHacksMark />
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="invert" size="sm" className="hidden md:inline-flex">
            <Link to="/contact">Contact</Link>
          </Button>
          <Button variant="ghost" size="icon" className="xl:hidden" aria-expanded={open} aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>
      <div id="mobile-nav" hidden={!open} className={cn("border-t border-border bg-bg/90 backdrop-blur-md xl:hidden", open ? "block" : "hidden")}>
        <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3" aria-label="Mobile">
          {healthNav.map((n) => (
            <a key={n.href} href={n.href} className={mItem}>{n.label}</a>
          ))}
          <Link to="/hacks" className="group flex min-h-12 items-center border-b border-border py-2" onClick={close} aria-label="Health Hacks">
            <HealthHacksMark />
          </Link>
          <Link to="/contact" className="flex min-h-12 items-center text-base font-medium text-accent" onClick={close}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}
