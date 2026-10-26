# Theosis Health (theosishealth.com)

Owner: Theosis Health LLC (Illinois), non-clinical health education and apps.

- TanStack Start + Vite + Tailwind; prerendered static output in `.vercel/output/static` (committed; Netlify publishes it as-is).
- Build: `node scripts/with-app-env.mjs npx vite build`
- Static apps: `public/simulator/` (+ `pft-inside/`), `public/fat-burn-calculator/`. Simulator is a copy of theosis_medical `add-simulator-preview`; refresh from there.
- Functions: `netlify/functions` (ai, preview, labs, food). Env names in `netlify.toml`.
- Legal pages `/terms`, `/privacy`, `/disclaimer` are DRAFT placeholders.
