export const CONTACT = "/contact";
/** Nav label for the PFT slider (/simulator/pft-inside/). Name chosen by Nick 2026-10-22. */
export const PFT_NAV_LABEL = "Personal Fat Threshold Model";
export const FAT_LOSS_CALC_NAME = "Maximal Fat Loss Calculator";
/** Top nav tools, after Health Hacks. */
export const healthNav = [
  { href: "/simulator/", label: "Metabolic Simulator", icon: "pulse", badge: "Beta" },
  { href: "/simulator/pft-inside/", label: PFT_NAV_LABEL, icon: "gauge", badge: undefined },
  { href: "/fat-burn-calculator/", label: FAT_LOSS_CALC_NAME, icon: "flame", badge: undefined },
] as const;
