import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoLockup } from "@/components/site/logo-lockup";
import { QuickFind } from "@/components/site/quick-find";
import { NavPlaque } from "@/components/site/health-hacks-mark";
import { healthNav, simulatorNav } from "@/lib/links";
import { NavIcon } from "@/components/site/nav-icon";
import { cn } from "@/lib/utils";


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
          <nav className="hidden items-center gap-3 whitespace-nowrap xl:flex 2xl:gap-4" aria-label="Primary">
            <Link to="/hacks" className="group shrink-0" aria-label="Health Hacks">
              <NavPlaque label="Health Hacks" />
            </Link>
            <a href={simulatorNav.href} className="group shrink-0" aria-label={`${simulatorNav.label} (beta)`}>
              <NavPlaque featured badge={simulatorNav.badge} label={simulatorNav.label} icon={<NavIcon name={simulatorNav.icon} />} />
            </a>
            <FreeTools />
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
          <Link to="/hacks" className="group flex min-h-12 items-center border-b border-border py-2" onClick={close} aria-label="Health Hacks">
            <NavPlaque size="menu" label="Health Hacks" />
          </Link>
          <a href={simulatorNav.href} className="group flex min-h-12 items-center border-b border-border py-2" aria-label={`${simulatorNav.label} (beta)`}>
            <NavPlaque size="menu" featured badge={simulatorNav.badge} label={simulatorNav.label} icon={<NavIcon name={simulatorNav.icon} className="size-5" />} />
          </a>
          <div role="group" aria-labelledby="m-free-tools" className="border-b border-border py-2">
            <p id="m-free-tools" className="pt-1 pb-1 text-xs font-semibold tracking-[0.16em] text-health uppercase">Free Tools</p>
            {healthNav.map((n) => (
              <a key={n.href} href={n.href} className="group flex min-h-12 items-center py-1.5 pl-2" aria-label={n.label}><NavPlaque size="menu" label={n.label} icon={<NavIcon name={n.icon} className="size-5" />} /></a>
            ))}
          </div>
          <Link to="/contact" className="flex min-h-12 items-center text-base font-medium text-accent" onClick={close}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}

function FreeTools() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);
  return (
    <div ref={ref} className="relative shrink-0" onBlur={(e) => { if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false); }}>
      <button ref={btn} type="button" className="group" aria-expanded={open} aria-controls="free-tools-menu" onClick={() => setOpen((v) => !v)}>
        <NavPlaque label="Free Tools" icon={<ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />} />
      </button>
      <div id="free-tools-menu" hidden={!open} className="absolute right-0 top-full z-50 mt-2 min-w-max rounded-lg border border-border bg-bg/95 p-2 shadow-xl backdrop-blur-md">
        <ul className="flex flex-col gap-1">
          {healthNav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="group flex rounded-md p-1.5 focus-visible:outline-2 focus-visible:outline-accent" aria-label={n.label}>
                <NavPlaque label={n.label} icon={<NavIcon name={n.icon} />} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
