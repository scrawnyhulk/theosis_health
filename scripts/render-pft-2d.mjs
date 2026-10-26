// Renders custom 2D PFT figures from the shared Grab3D anatomy (anatomy-v23.js) - front orthographic-style views
// at several PFT slider levels. Usage: serve ./public on :8765, then `node scripts/render-pft-2d.mjs` (needs playwright + Chrome).
// Output: public/simulator/pft-inside/assets/img/figure-g3d/{mode}-{level}.png  (beta; not yet wired into the 2D toggle)
import { chromium } from 'playwright';
import fs from 'fs';
const out = new URL('../public/simulator/pft-inside/assets/img/figure-g3d/', import.meta.url).pathname; fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 900, height: 1200 } });
await p.goto('http://localhost:8765/simulator/pft-inside/index.html', { waitUntil: 'load' });
await p.waitForTimeout(1500); await p.click('[data-renderer-mode="3d"]');
await p.waitForFunction(() => (window.__pftG3DO || 0) >= 5, null, { timeout: 180000 });
for (const mode of ['cut', 'fat']) {
  await p.click(`[data-pft3d-mode="${mode}"]`); await p.getByRole('button', { name: 'Front', exact: true }).click().catch(() => {});
  for (const lv of [0, 25, 50, 75, 100]) {
    await p.evaluate(v => { const r = document.getElementById('fat-range'); r.value = v; r.dispatchEvent(new Event('input', { bubbles: true })); r.dispatchEvent(new Event('change', { bubbles: true })); }, lv);
    await p.waitForTimeout(3500);
    await p.locator('#pft3d-canvas').screenshot({ path: `${out}${mode}-${lv}.png` });
  }
}
await b.close();
