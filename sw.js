const CACHE = "jar-shell-v4";
const SHELL = ["/Jar/", "/Jar/index.html", "/Jar/manifest.json"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => null)))).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((keys) => Promise.all(keys.map((k) => k === CACHE ? null : caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => { if (e.request.method !== "GET") return; e.respondWith(fetch(e.request).catch(() => caches.match(e.request, {ignoreSearch: true})).then((res) => res || caches.match("/Jar/index.html"))); });
