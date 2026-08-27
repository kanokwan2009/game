const CACHE_NAME = 'tech-game-v1';
// ระบุไฟล์ทั้งหมดที่เกมต้องใช้ (html, css, js, รูปภาพ, เสียง)
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
  // หากมีไฟล์ CSS/JS แยก เช่น './style.css', './script.js' ให้ใส่เพิ่มตรงนี้
];

// ติดตั้ง Service Worker และบันทึก Cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ดึงข้อมูลจาก Cache เมื่อ Offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// ลบ Cache เก่าเมื่อมีการอัปเดตเวอร์ชัน
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});
