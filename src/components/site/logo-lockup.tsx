import { cn } from "@/lib/utils";

/** Sister-site lockup: same shield as Theosis Medical, wordmark set in CSS. */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <span className={cn("flex h-12 items-center gap-2 sm:h-14", className)} aria-label="Theosis Health">
      <img src="/images/header-shield.png" alt="" className="no-outline h-full w-auto object-contain" />
      <span className="flex flex-col items-stretch leading-none">
        <span className="bg-gradient-to-b from-white via-slate-300 to-slate-500 bg-clip-text font-display text-2xl font-bold tracking-[0.08em] text-transparent sm:text-3xl">
          THEOSIS
        </span>
        <span className="mt-0.5 flex items-center gap-1.5">
          <span className="h-px flex-1 bg-health" />
          <span className="font-display text-[10px] font-semibold tracking-[0.45em] text-health sm:text-xs">HEALTH</span>
          <span className="h-px flex-1 bg-health" />
        </span>
      </span>
    </span>
  );
}
