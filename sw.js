// Nome do cache - mude se atualizar o site
const CACHE_NAME = 'meu-pwa-v1';

// Arquivos que serão salvos para usar offline
// OBS: usamos caminhos relativos (./) em vez de (/) para o PWA
// funcionar corretamente no GitHub Pages (ex.: /usuario/ProjetoPWA/)
const ARQUIVOS_CACHE = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    // Imagens do site também ficam no cache para funcionar offline
    './img/hero.jpg',
    './img/sobre.jpg',
    './img/galeria1.jpg',
    './img/galeria2.jpg',
    './img/galeria3.jpg',
    './img/galeria4.jpg'
];

// Instala o Service Worker e salva os arquivos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Arquivos em cache');
                return cache.addAll(ARQUIVOS_CACHE);
            })
    );
});

// Busca os arquivos do cache (funciona offline)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Se achou no cache, usa ele
                if (response) {
                    return response;
                }
                // Se não achou, busca da internet
                return fetch(event.request);
            })
    );
});

// Atualiza o cache quando o Service Worker é atualizado
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Limpando cache antigo:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
