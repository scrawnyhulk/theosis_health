/** Small inline line icons for the top nav (aria-hidden, brand blue via text-health). */
export function NavIcon({ name, className = "" }: { name: "pulse" | "gauge" | "flame"; className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false" className={`shrink-0 ${className}`} {...p}>
      {name === "pulse" && <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />}
      {name === "gauge" && (<><path d="M4 18a8 8 0 1 1 16 0" /><path d="M12 18l4-5" /><circle cx="12" cy="18" r="1" /></>)}
      {name === "flame" && <path d="M12 21c-3.9 0-6.5-2.6-6.5-6 0-3.5 3-5.5 3.5-9 2 1.3 3 3 3 5 1-.8 1.6-2 1.7-3.3C16.4 9.6 18.5 12 18.5 15c0 3.4-2.6 6-6.5 6z" />}
    </svg>
  );
}
