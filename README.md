# Theosis Health

Source for **[theosishealth.com](https://theosishealth.com)** — Theosis Health LLC.

Includes the body simulator (`public/simulator`), the Personal Fat Threshold (PFT) model (`public/simulator/pft-inside`), the fat-burn calculator, and the marketing site. Deployed on Netlify (`netlify.toml`, `netlify/functions`).

**Not clinical.** Everything here is general education and estimation, not medical advice, diagnosis, or treatment.

## Third-party assets
- Muscle view base mesh: **Grab3D "Human Muscles"**, CC0 1.0 (public domain) — `public/simulator/pft-inside/assets/models/grab3d-human-muscles.glb` (see `LICENSE-grab3d-human-muscles.txt`). Fitted to our figure; our own per-muscle growth morphs drive it.
