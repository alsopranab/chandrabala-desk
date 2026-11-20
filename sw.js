const CACHE='chandrabala-desk-v3';
const ASSETS=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)))});
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith((async()=>{try{const fresh=await fetch(event.request);if(event.request.url.startsWith(self.location.origin)){const c=await caches.open(CACHE);c.put(event.request,fresh.clone())}return fresh}catch(e){const cached=await caches.match(event.request);if(cached)return cached;throw e}})())});
