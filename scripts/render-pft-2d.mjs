// Renders custom 2D PFT figures from the shared Grab3D anatomy (anatomy-v23.js): front view, PFT slider 0/25/50/75/100,
// "fat" (Fat + muscle) and "cut" (Inside abdomen) modes. UI chrome (HUD, mode bar, view buttons, labels, loaders) is hidden
// and the WebGL canvas is captured with a transparent background.
// Usage: serve ./public on :8765 (python3 -m http.server 8765 -d public), then
//   NODE_PATH=<dir with playwright> node scripts/render-pft-2d.mjs   (needs Chrome at $CHROME or /usr/bin/google-chrome)
// LEVELS env (default 0,10,...,100) sets which slider stops are rendered.
// Output: public/simulator/pft-inside/assets/img/figure-g3d/{mode}-{level}.png (convert to .webp with cwebp for the site).
import { createRequire } from 'module';
import fs from 'fs';
const { chromium } = createRequire(import.meta.url)(process.env.PW || 'playwright');
const out = new URL('../public/simulator/pft-inside/assets/img/figure-g3d/', import.meta.url).pathname; fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 900, height: 1200 }, deviceScaleFactor: 1.5 });
await p.goto('http://localhost:8765/simulator/pft-inside/index.html?legacy2d=1', { waitUntil: 'load' });
await p.waitForTimeout(1500); await p.click('[data-renderer-mode="3d"]');
await p.waitForFunction(() => (window.__pftG3DO || 0) >= 5, null, { timeout: 240000 });
const HIDE = `html,body,*{background:transparent!important;background-image:none!important;box-shadow:none!important}
body *{visibility:hidden!important} #pft3d-canvas{visibility:visible!important}`;
for (const mode of ['cut', 'fat']) {
  await p.evaluate(m => { document.querySelector(`[data-pft3d-mode="${m}"]`).click(); const f = [...document.querySelectorAll('#pft3d-stage button')].find(x => x.textContent.trim() === 'Front'); f && f.click(); }, mode);
  await p.waitForTimeout(800);
  if (mode === 'cut') await p.addStyleTag({ content: HIDE });
  for (const lv of (process.env.LEVELS || '0,10,20,30,40,50,60,70,80,90,100').split(',').map(Number)) {
    await p.evaluate(v => { const r = document.getElementById('fat-range'); r.value = v; r.dispatchEvent(new Event('input', { bubbles: true })); r.dispatchEvent(new Event('change', { bubbles: true })); }, lv);
    await p.waitForTimeout(4000);
    await p.locator('#pft3d-canvas').screenshot({ path: `${out}${mode}-${lv}.png`, omitBackground: true });
  }
}
await b.close();
