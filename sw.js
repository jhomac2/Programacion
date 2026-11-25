/* CodeAndes · Service Worker (modo sin internet)
   Si actualizas el curso, cambia el número de VERSION para que todos reciban la versión nueva.
   El avance de los estudiantes NO se borra al actualizar (está guardado aparte). */
const VERSION = 'codeandes-v2';
const ARCHIVOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './js/base.js',
  './js/etapa1.js',
  './js/etapa2.js',
  './js/etapa3.js',
  './js/etapa4.js',
  './js/etapa5.js',
  './js/etapa6.js',
  './js/etapa7.js',
  './js/pruebas.js',
  './js/minic.js',
  './js/app.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Responde desde la copia guardada (funciona sin internet) y, si hay internet,
   actualiza la copia en segundo plano para la próxima vez. */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.open(VERSION).then(cache =>
      cache.match(req, { ignoreSearch: true }).then(guardado => {
        const deRed = fetch(req)
          .then(resp => { if (resp && resp.ok) cache.put(req, resp.clone()); return resp; })
          .catch(() => guardado || cache.match('./index.html'));
        return guardado || deRed;
      })
    )
  );
});
