const cacheName = 'cacheV1';

/** Install service worker **/
self.addEventListener('install', (event) => {
	console.log('sw installed');
});

/** Activate service worker **/
self.addEventListener('activate', (event) => {
	console.log('sw activated');
	// remove unwanted caches
	event.waitUntil(
		caches.keys()
		.then(cacheNames => {
			return Promise.all(
				cacheNames.map(cache => {
					if (cache !== cacheName) {
						return caches.delete(cache);
					}
				})
			)
		})
	)
});

/** Fetch and cache **/
self.addEventListener('fetch', (event) => {
	event.respondWith(
		fetch(event.request)
		.then(response => {
			console.log('fetch request & cache in storage');
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