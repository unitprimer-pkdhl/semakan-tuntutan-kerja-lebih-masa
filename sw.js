/* Service worker aplikasi Semakan Tuntutan.
   Halaman: rangkaian dahulu (versi terkini bila ada internet), salinan simpanan bila luar talian.
   Skrip PDF dan fon dari CDN: salinan simpanan dahulu, dikemas kini di latar belakang.
   Tiada data tuntutan disimpan di sini; isian kekal dalam localStorage pelayar. */
const VERSI = "semakan-v3";
const HALAMAN = ["./", "./perjalanan/", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png", "./icons/favicon-48.png"];
const LUAR = ["https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSI).then(async c => {
    await c.addAll(HALAMAN);
    // CDN: jangan gagalkan pemasangan jika satu fail tak dapat dimuat turun
    await Promise.all(LUAR.map(u => fetch(u, { mode: "no-cors" }).then(r => c.put(u, r)).catch(() => {})));
  }).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSI).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => { const k = r.clone(); caches.open(VERSI).then(c => c.put(req, k)); return r; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match(url.pathname.includes("/perjalanan") ? "./perjalanan/" : "./"))));
    return;
  }
  const cdn = url.hostname === "cdnjs.cloudflare.com" || url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (url.origin === self.location.origin || cdn) {
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(r => { if (r && (r.ok || r.type === "opaque")) { const k = r.clone(); caches.open(VERSI).then(c => c.put(req, k)); } return r; }).catch(() => hit);
      return hit || net;
    }));
  }
});
