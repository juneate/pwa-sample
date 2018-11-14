// The cache's name (should just be your app's name)
const cacheName = 'device-dev';

// Files that must load for the app to be operational
const staticAssets = [
  './',
  './js/router.js',
  './js/views.js',
  './js/app.js',
  './css/style.css'
];

// Cache the main files on install
self.addEventListener('install', async function () {
  const cache = await caches.open(cacheName);
  cache.addAll(staticAssets);
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  //event.respondWith(cacheFirst(request));
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  return cachedResponse || fetch(request);
}

async function networkFirst(request) {
  const dynamicCache = await caches.open('device-dev-dynamic');
  try {
    const networkResponse = await fetch(request);
    dynamicCache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    const cachedResponse = await dynamicCache.match(request);
    return cachedResponse || await caches.match('./fallback.json');
  }
}
