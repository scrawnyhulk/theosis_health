// Copies the built React site header + stylesheet into the static calculator page.
// Run after a build, then rebuild: node scripts/sync-calc-header.mjs
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
const out = ".vercel/output/static";
const html = readFileSync(`${out}/contact/index.html`, "utf8");
let header = html.slice(html.indexOf("<header"), html.indexOf("</header>") + 9);
const css = readdirSync(`${out}/assets`).find((f) => /^styles-.*\.css$/.test(f));
writeFileSync("public/fat-burn-calculator/site-header.css", readFileSync(`${out}/assets/${css}`, "utf8")
  + "\n:host{display:block;color:var(--color-fg);font-family:var(--font-sans);line-height:1.5;-webkit-font-smoothing:antialiased}\n");
// :root-only custom properties don't reach a shadow root; mirror them onto :host.
{
  const p = "public/fat-burn-calculator/site-header.css";
  const c = readFileSync(p, "utf8");
  const vars = [...c.matchAll(/:root\s*\{([^{}]*)\}/g)].map((m) => m[1].split(";").filter((d) => d.trim().startsWith("--")).join(";")).join(";");
  // @property registrations are ignored inside shadow roots; seed their initial values instead.
  const props = [...c.matchAll(/@property\s+(--[\w-]+)\s*\{[^}]*?initial-value:([^;}]*)/g)].map((m) => `${m[1]}:${m[2].trim()}`).join(";");
  writeFileSync(p, c + `:host{${vars}}\n@layer properties{:host,*,::before,::after,::backdrop{${props}}}\n`);
}
const f = "public/fat-burn-calculator/index.html";
let page = readFileSync(f, "utf8");
const tpl = `<!--SITE-HEADER-->\n<template id="th-site-header"><link rel="stylesheet" href="/fat-burn-calculator/site-header.css">${header}</template>\n<!--/SITE-HEADER-->`;
page = page.replace(/<!--SITE-HEADER-->[\s\S]*?<!--\/SITE-HEADER-->/, tpl);
writeFileSync(f, page);
console.log("synced header from", css);
