importScripts("https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@2/dist/uv.bundle.js");
importScripts("https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@2/dist/uv.handler.js");

const { UVServiceWorker } = Ultraviolet;
const sw = new UVServiceWorker();

self.addEventListener("fetch", event => event.respondWith(sw.fetch(event)));
