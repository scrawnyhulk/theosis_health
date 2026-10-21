import { Link } from "@tanstack/react-router";
import { LogoLockup } from "@/components/site/logo-lockup";
import { ABOUT_CLINICIAN, CONTACT, MEDICAL } from "@/lib/links";
import { site } from "@/lib/content";

const l = "text-sm text-ink-muted hover:text-ink-fg";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-fg">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 border-t border-border px-5 py-10 sm:px-8 md:flex-row md:justify-between">
        <div className="flex flex-col gap-3">
          <Link to="/"><LogoLockup /></Link>
          <p className="max-w-sm text-sm text-ink-muted">Education only, not medical advice. Talk with your healthcare provider.</p>
          <a href="/simulator/" className={l}>Metabolic Simulator</a>
          <a href="/simulator/pft-inside/" className={l}>Personal Fat Threshold model</a>
          <Link to="/hacks" className={l}>Holwey’s Handy Health Hacks</Link>
          <a href="/fat-burn-calculator/" className={l}>Fat-burn calculator</a>
        </div>
        <div className="flex flex-col gap-2 text-sm text-ink-muted md:items-end">
          <a href={ABOUT_CLINICIAN} className={l}>About the clinician</a>
          <a href={CONTACT} className={l}>Contact</a>
          <a href={MEDICAL} className={l}>Theosis Medical (clinical / locums)</a>
          <Link to="/terms" className={l}>Terms</Link>
          <Link to="/privacy" className={l}>Privacy</Link>
          <Link to="/disclaimer" className={l}>Disclaimer</Link>
          <p>© {site.year} Theosis Health LLC · Illinois</p>
        </div>
      </div>
    </footer>
  );
}
