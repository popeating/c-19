/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();
let cacheData = 'c-vid-19V1';
this.addEventListener('install', (event) => {
  precacheAndRoute(self.__WB_MANIFEST);
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        '/c-vid-app/static/js/main.chunk.js',
        '/c-vid-app/static/js/0.chunk.js',
        '/c-vid-app/static/js/bundle.js',
        '/c-vid-app/index.html',
        '/c-vid-app/',
      ]);
    })
  );
});
this.addEventListener('fetch', (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
      })
    );
  }
});
