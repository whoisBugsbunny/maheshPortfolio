// service-worker.js

const cacheName = 'maheshPortfolioCache';


// uncomment this to enable caching
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                // '/',
                // '/index.html',
                // '/style.css',
                // '/main.js',
                '/images/',
                '/images/android/',
                '/images/ios/'
            ]);
        })
    );
});


self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            const fetchPromise = fetch(event.request).then(fetchResponse => {
                if (
                    !fetchResponse ||
                    fetchResponse.status !== 200 ||
                    fetchResponse.type !== 'basic' ||
                    event.request.method !== 'GET'
                ) {
                    return fetchResponse;
                }

                caches.open(cacheName).then(cache => {
                    cache.put(event.request, fetchResponse.clone());
                });

                return fetchResponse;
            });

            return response || fetchPromise;
        })
    );
});

self.addEventListener('push', event => {
    const options = {
        body: "event.data.text()",
        icon: 'images/android/android-launchericon-512-512.png', // Replace with your icon path
    };

    event.waitUntil(
        self.registration.showNotification('Your Notification Title', options)
    );
});
