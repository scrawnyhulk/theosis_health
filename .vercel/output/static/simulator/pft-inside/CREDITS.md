# Asset credits and licences — Personal Fat Threshold (V31)

Everything shipped in this folder can be used commercially. No share-alike (CC BY-SA) or
non-commercial assets remain. Z-Anatomy / BodyParts3D geometry (CC BY-SA 4.0), used up to V30,
has been fully removed.

| Asset | Files | Source | Licence |
|---|---|---|---|
| Body surface (skin, fat shell) | 2D frames `assets/img/figure/*-720/1080.webp`, masks `mask-*.webp`, 3D `assets/models/pft-anatomy.glb(.js)` | MakeHuman hm08 base mesh + macro targets (male, weight 0.58, muscle 0.61), reposed (arms lowered, elbows straightened, legs adducted), fat-distribution morphs (subq / mass / belly / hyper) authored by Theosis Health | MakeHuman assets: CC0 1.0. Our changes: © Theosis Health LLC |
| Muscles (~45 groups with grooves, rectus intersections) | same | Procedural, Theosis Health (inset of the body surface, sculpted by our own muscle map) | © Theosis Health LLC |
| Muscle-view base mesh ("Human Muscles", light, 300k tris) | `assets/models/grab3d-human-muscles.glb` | Grab3D, https://grab3d.com/models/anatomy/human-muscles/ (per-muscle growth morphs applied on top by Theosis Health, `anatomy-v23.js`) | CC0 1.0 Universal (public domain); credited as courtesy. Our changes: © Theosis Health LLC |
| Skeleton | same | Procedural, Theosis Health (SDF capsules/ellipsoids fitted to MakeHuman joint positions) | © Theosis Health LLC |
| Organs: heart, liver, gallbladder, stomach, duodenum, pancreas, small bowel, colon, omentum, spleen, kidneys, bladder | same | Procedural, Theosis Health (signed-distance modelling + marching cubes, scikit-image) | © Theosis Health LLC |
| Arterial tree (2D overlay centrelines + 3D tubes) | same + `assets/js/pft.js` arterialNetwork | Procedural, Theosis Health | © Theosis Health LLC |
| Rendering | 2D frames | Rendered by Theosis Health with Blender 4.5 Cycles (GPL software; renders are ours) | © Theosis Health LLC |
| Stand-in heart / fat texture, grain, logo | `assets/img/standin-*.webp`, `grain.jpg`, `theosis-lockup.webp`, `favicon.svg` | Drawn for this project / Theosis Health brand | © Theosis Health LLC |
| three.js r186 (+ GLTFLoader) | `assets/vendor/three-anatomy.min.js` | three.js authors | MIT |
| meshoptimizer decoder (inside the 3D bundle); gltfpack (build tool only) | — | Arseny Kapoulkine | MIT |
| Fonts | loaded from Google Fonts (Barlow, Barlow Condensed) | Jeremy Tribby | SIL Open Font License 1.1 |

Public-domain or published medical knowledge (anatomical positions, study results) was used only as reference;
study citations are listed on the page.

Build sources (not part of the site): `/workspace/pft/v31/*.py` (geometry), `/workspace/pft/v22src/render.py`,
`batch31.py`, `mask.py`, `export_glb_v31.py`.

## V32c reference
Organ shapes were modelled by Theosis Health from the descriptions and proportions in Gray, H. *Anatomy of the Human Body* (20th ed., 1918), public domain. No images were copied; no Netter or other copyrighted atlas material was used.

## HuBMAP HRA organ meshes (CC BY 4.0)
assets/models/hra-organs.js: Browne K. et al. (2021) HuBMAP CCF 3D Reference Object Library v1.2, HuBMAP Consortium, https://github.com/hubmapconsortium/ccf-3d-reference-object-library, CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Modified: node selection, welding, meshopt decimation, baked AO, quantization; liver re-surfaced. See assets/models/SOURCE-hra.json.
