const cacheName = 'cacheV1';

/** Install service worker **/
self.addEventListener('install', (event) => {
	console.log('sw installed');
});

/** Activate service worker **/
self.addEventListener('activate', (event) => {
	console.log('sw activated');
});

/** Fetch and cache **/
self.addEventListener('fetch', (event) => {
	console.log('fetch request & cache in storage');
	event.respondWith(
		fetch(event.request)
		.then(response => {
			// Make a copy of response
			const responseCopy = response.clone();
			caches.open(cacheName)
			// Put request and response pair into cache
			.then(cache => {
				cache.put(event.request, responseCopy);
			});
		return response;
		})
		.catch((error) => {
			console.log('fetch from cache');
			return caches.match(event.request)
		})
	)
});