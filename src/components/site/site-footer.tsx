import { Link } from "@tanstack/react-router";
import { LogoLockup } from "@/components/site/logo-lockup";

import { site } from "@/lib/content";

const l = "text-sm text-ink-muted hover:text-ink-fg";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-fg">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 border-t border-border px-5 py-10 sm:px-8 md:flex-row md:justify-between">
        <div className="flex flex-col gap-3">
          <Link to="/"><LogoLockup /></Link>
          
          <a href="/simulator/" className={l}>Metabolic Simulator</a>
          <a href="/simulator/pft-inside/" className={l}>Personal Fat Threshold model</a>
          <Link to="/hacks" className={l}>Holwey’s Handy Health Hacks</Link>
          <a href="/fat-burn-calculator/" className={l}>Fat-burn calculator</a>
        </div>
        <div className="flex flex-col gap-2 text-sm text-ink-muted md:items-end">
          <Link to="/contact" className={l}>Contact</Link>
          <Link to="/terms" className={l}>Terms</Link>
          <Link to="/privacy" className={l}>Privacy</Link>
          <Link to="/disclaimer" className={l}>Disclaimer</Link>
          <p className="text-xs">Founded by Nick Holwey, PA-C, a licensed physician associate. Education only, no medical care. <Link to="/disclaimer" className="underline">Medical Disclaimer</Link></p>
        </div>
      </div>
      <p className="mx-auto max-w-6xl px-5 pb-8 text-xs text-ink-muted sm:px-8">
        © {site.year} Theosis Health LLC · Educational content only, not medical advice. Theosis Health does not provide medical care.
      </p>
    </footer>
  );
}
