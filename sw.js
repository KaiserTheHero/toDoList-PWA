const CACHE = "pwa-tarefas";
const FILES = ["/toDoList-PWA/index.html", "/toDoList-PWA/style.css", "/toDoList-PWA/toDoList.js", "/toDoList-PWA/manifest.json"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request)).catch(() => caches.match("/toDoList-PWA/index.html"))
  );
});