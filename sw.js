const CACHE='chandrabala-desk-v5';
const ASSETS=['./','./index.html','./styles.css?v=5','./app.js?v=5','./manifest.webmanifest','./assets/logo.svg'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)))});
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const name of await caches.keys())if(name!==CACHE)await caches.delete(name);await self.clients.claim()})()));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith((async()=>{try{const response=await fetch(event.request);if(response.ok)(await caches.open(CACHE)).put(event.request,response.clone());return response}catch(error){const cached=await caches.match(event.request);if(cached)return cached;throw error}})())});
