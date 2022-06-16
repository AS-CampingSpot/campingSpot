/**/ 
const cacheName = 'campingspot-cache'

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            cache.addAll([
                '/',
                './about.html',
                './account.html',
                './activity.html',
                './camping-gallery.html',
                './contact.html',
                './error.html',
                './login.html',
                './index.html',
                './payment.html',
                './registration.html',
                './search.html',
                './search-camping.html',
                './search-caravan.html',
                './search-tent.html',
                './css/',
                './css/bootstrap.min.css',
                './css/font-awesome.min.css',
                './css/bootstrap.css',
                './css/bootstrap.min.css.map',
                '.css/datepicker.css',
                './css/ionicons.min.css',
                './css/jquery.fancybox.min.css',
                './css/owl.carousel.min.css',
                './css/owl.transitions.min.css',
                './css/style.css',
                './css/style-user.css',
                './css/colors/color.css',
                './fonts/',
                './fonts/fontawesome-webfont.eot',
                './fonts/fontawesome-webfont.svg',
                './fonts/fontawesome-webfont.ttf',
                './fonts/fontawesome-webfont.woff',
                './fonts/fontawesome-webfont.woff2',
                './fonts/ionicons.eot',
                './fonts/ionicons.svg',
                './fonts/ionicons.woff',

            ])
        })
    )
    return self.skipWaiting()
})
self.addEventListener('activate', e =>{
    self.clients.claim()
})
self.addEventListener('fetch', async e =>{
    const req = e.request
    const url = new URL(req.url)

    if (url.login === location.origin){
        e.respondWith(cacheFirst(req))
    } else{
        e.respondWith(networkAndCache(req))
    }
})

async function cacheFirst(req){
    const cache = await caches.open(cacheName)
    const cached = await cache.match(req)

    return cached || fetch(req)
}

async function networkAndCache(req){
    const cache = await caches.open(cacheName)
    try{
        const refresh = await fetch(req)
        await cache.put(req, refresh.clone())
        return refresh
    }catch(e){
        const cached = await cache.match(req)
        return cached
    }
}