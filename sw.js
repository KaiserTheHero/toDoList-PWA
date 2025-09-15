const CACHE = "pwa-tarefas";
const FILES = ["/pwa-listaDeTarefas", "/pwa-listaDeTarefas/index.html", "/pwa-listaDeTarefas/toDoList.js", "/pwa-listaDeTarefas/manifest.json"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});