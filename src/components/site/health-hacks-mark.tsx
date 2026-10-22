import type React from "react";
import { cn } from "@/lib/utils";

const plaqueShell =
  "relative inline-flex items-center overflow-hidden rounded-[3px] border border-white/10 leading-none shadow-[2px_3px_0_0_rgb(0_0_0_/_0.55),inset_0_1px_0_rgb(255_255_255_/_0.16)]";

const plaqueBg = {
  backgroundColor: "rgb(8 13 20 / 0.72)",
  backgroundImage: "url(/images/navy-grain.jpg)",
  backgroundSize: "420px",
} as const;

export function HealthHacksMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        plaqueShell,
        "-rotate-2 items-center justify-center px-2.5 py-1.5 transition-[transform,box-shadow,background-color,border-color] duration-150",
        "group-hover:rotate-0 group-hover:border-accent group-hover:bg-accent group-hover:shadow-[2px_3px_0_0_rgb(0_0_0_/_0.3)]",
        className,
      )}
      style={plaqueBg}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        style={{ backgroundColor: "#2a7ae0" }}
        aria-hidden
      />
      <span className="relative font-display text-[16px] font-semibold tracking-[0.16em] uppercase sm:text-[18px]">
        <span className="hh-metal-blue">H</span>
        <span className="hh-metal">ealth Hacks</span>
      </span>
    </span>
  );
}

export function HacksPlaque({
  title,
  className,
  compact,
  inline,
}: {
  title: string;
  className?: string;
  compact?: boolean;
  inline?: boolean;
}) {
  const mark = (
    <span className={cn(plaqueShell, compact ? "gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2" : "gap-3 px-4 py-2.5 sm:px-5 sm:py-3", className)} style={plaqueBg}>
      <span className={cn("shrink-0 rounded-full bg-accent", compact ? "h-4 w-[2px] sm:h-5" : "h-6 w-[3px] sm:h-8")} aria-hidden />
      <span
        className={cn(
          "relative whitespace-nowrap font-display font-semibold tracking-[0.16em] uppercase",
          compact ? "text-[15px] sm:text-[18px]" : "text-[22px] sm:text-[32px] lg:text-[36px]",
        )}
      >
        <span className="hh-metal-blue">{title.slice(0, 1)}</span>
        <span className="hh-metal">{title.slice(1)}</span>
      </span>
    </span>
  );
  if (compact || inline) return mark;
  return (
    <span className="flex w-full items-center gap-4">
      {mark}
      <span className="hidden h-px min-w-8 flex-1 bg-border sm:block" aria-hidden />
    </span>
  );
}

/** Nav plaque matching HealthHacksMark (grain plaque, metal type, blue first letter), straight at rest. featured = solid Theosis blue. */
export function NavPlaque({ label, icon, size = "nav", featured, badge, className }: { label: string; icon?: React.ReactNode; size?: "nav" | "menu"; featured?: boolean; badge?: string; className?: string }) {
  return (
    <span
      className={cn(
        plaqueShell,
        "gap-1.5 px-2 py-1.5 transition-[box-shadow,background-color,border-color,filter] duration-150",
        featured
          ? "border-[#79b4f6]/50 bg-[#2a7ae0] shadow-[0_0_14px_rgb(42_122_224_/_0.45),2px_3px_0_0_rgb(0_0_0_/_0.55),inset_0_1px_0_rgb(255_255_255_/_0.25)] group-hover:brightness-110 group-hover:shadow-[0_0_20px_rgb(42_122_224_/_0.6),2px_3px_0_0_rgb(0_0_0_/_0.4)]"
          : "group-hover:border-accent group-hover:bg-accent group-hover:shadow-[2px_3px_0_0_rgb(0_0_0_/_0.3)]",
        className,
      )}
      style={featured ? { backgroundImage: "linear-gradient(180deg, #3a8af0 0%, #2a7ae0 50%, #1f63bd 100%)" } : plaqueBg}
    >
      {!featured ? <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100" style={{ backgroundColor: "#2a7ae0" }} aria-hidden /> : null}
      {icon ? <span className={cn("relative flex", featured ? "text-white" : "text-[#5b9cec] group-hover:text-white")}>{icon}</span> : null}
      <span className={cn("relative font-display font-semibold uppercase", size === "nav" ? "text-[13px] tracking-[0.1em] 2xl:text-[15px] 2xl:tracking-[0.14em]" : "text-[16px] tracking-[0.14em]")}>
        {featured ? (
          <span className="text-white [text-shadow:0_1px_0_rgb(0_0_0_/_0.35)]"><span className="text-[#0b2a55] [text-shadow:0_1px_0_rgb(255_255_255_/_0.35)]">{label.slice(0, 1)}</span>{label.slice(1)}</span>
        ) : (
          <><span className="hh-metal-blue">{label.slice(0, 1)}</span><span className="hh-metal">{label.slice(1)}</span></>
        )}
      </span>
      {badge ? <span className="relative ml-0.5 rounded-full bg-white px-1.5 py-px text-[10px] font-bold tracking-wide text-[#1f63bd] uppercase">{badge}</span> : null}
    </span>
  );
}
