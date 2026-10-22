export const CONTACT = "/contact";
/** Nav label for the PFT slider (/simulator/pft-inside/). Name chosen by Nick 2026-10-22. */
export const PFT_NAV_LABEL = "Personal Fat Threshold Model";
export const FAT_LOSS_CALC_NAME = "Maximal Fat Loss Calculator";
export const simulatorNav = { href: "/simulator/", label: "Metabolic Simulator", icon: "pulse", badge: "Beta" } as const;
/** "Free Tools" dropdown items. */
export const healthNav = [
  { href: "/simulator/pft-inside/", label: PFT_NAV_LABEL, icon: "gauge" },
  { href: "/fat-burn-calculator/", label: FAT_LOSS_CALC_NAME, icon: "flame" },
] as const;
