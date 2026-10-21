import { cn } from "@/lib/utils";

/** Sister-brand lockup: Theosis Medical shield and wordmark, recolored teal, reading THEOSIS HEALTH. */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <img
      src="/images/health-header-lockup.png"
      alt="Theosis Health"
      className={cn("no-outline block h-12 w-auto object-contain object-left sm:h-14", className)}
    />
  );
}
