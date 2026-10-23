// Theosis Health service worker (site scope "/"). No analytics.
// Pages: network-first with an offline fallback. Static assets: cache-first.
// /simulator/** is never handled here (the simulator will ship its own worker).
// Own caches all start with PREFIX; other caches (e.g. "theosis-sim-*") are never touched.
const PREFIX = "theosis-site-";
const VERSION = PREFIX + "v4";
// Exact names used by earlier versions of this worker (cleaned up by name only).
const LEGACY = ["theosis-v2", "theosis-v3-pages", "theosis-v3-assets"];
const PAGES = VERSION + "-pages";
const ASSETS = VERSION + "-assets";
const OFFLINE = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PAGES).then((c) => c.addAll([OFFLINE])).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => LEGACY.includes(k) || (k.startsWith(PREFIX) && !k.startsWith(VERSION + "-"))).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const STATIC = /\.(?:js|css|woff2?|png|jpe?g|webp|avif|svg|ico|gif)$/i;

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname === "/simulator" || url.pathname.startsWith("/simulator/")) return;
  if (url.pathname.startsWith("/.netlify/") || url.pathname === "/sw.js") return;

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) { const copy = res.clone(); caches.open(PAGES).then((c) => c.put(req, copy)); }
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match(OFFLINE))),
    );
    return;
  }

  if (STATIC.test(url.pathname) || url.pathname === "/manifest.webmanifest") {
    event.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok && res.type === "basic") { const copy = res.clone(); caches.open(ASSETS).then((c) => c.put(req, copy)); }
        return res;
      })),
    );
  }
});
