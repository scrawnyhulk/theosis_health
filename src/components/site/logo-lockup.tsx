import { cn } from "@/lib/utils";

/** Theosis Health lockup: chrome cross-and-laurel mark with the THEOSIS / HEALTH wordmark (cut out from Nick's final logo). */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <img
      src="/images/theosis-health-header-lockup.png"
      width={658}
      height={168}
      alt="Theosis Health"
      className={cn("no-outline block h-12 w-auto object-contain object-left sm:h-14", className)}
    />
  );
}
