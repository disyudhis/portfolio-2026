# My Porto — Yudhistira Haryatmaka Santoso

Static site (HTML + CSS + JS), tanpa build step. Siap di-deploy ke Vercel.

## Edit konten
Semua teks, video, harga, dan kontak ada di **`data/data.js`**.
1. **Video baru:** tambah satu objek di `projects` dengan `category` salah satu dari `sessions`
   (`challenge`, `review`, `cinematic`, `talking-heads`). Nomor klip (01, 02, ...) mengikuti urutan array.
2. **Link referensi:** isi `link` dengan URL Reels / TikTok video itu. Kalau kosong, tombol "Lihat di Instagram"
   di modal memakai link Instagram profil. Platform lain: isi juga `linkLabel`, misalnya "Lihat di TikTok".
3. **Sesi baru:** tambah di `sessions` (urutannya = urutan tampil di halaman).
4. Thumbnail taruh di `assets/thumbs/` (rasio vertikal 9:16 paling cocok).
5. `email` kosong = tidak ditampilkan. Harga di `services` masih contoh.

## Hero interaktif (hero.js)
- Parallax: nama, lingkaran, foto, dan chip bergerak beda kecepatan mengikuti kursor.
- Kotak fokus kamera mengikuti kursor dan mengunci ke wajah saat melewati foto.
- Klik atau tap area kosong = efek shutter. Timecode REC berjalan selama hero terlihat.
- Otomatis mati jika perangkat memilih "kurangi gerakan".
Foto: `assets/hero/pose.webp` (PNG tanpa background). Posisi wajah untuk kotak fokus ada di konstanta `FACE`
di `hero.js`; sesuaikan kalau foto diganti.

## Karya: Video Editing (timeline + sub-section)
Video disusun di satu timeline yang bisa digeser (swipe, drag mouse, tombol panah, atau keyboard kiri/kanan).
Setiap sub-section (Challenge Video, Review Video, Cinematic, Talking Heads) punya kartu judul dan penanda di penggaris,
plus tombol di atas timeline untuk melompat langsung ke sub-section itu. Interaksi: klip di bawah playhead mendapat
braket fokus kamera, timecode di playhead ikut posisi geser, dan klip miring 3D mengikuti kursor.
Tinggi dan posisi vertikal klip diatur lewat array `AR` dan `OFF` di `app.js`.

## Sesi Website
Selama belum ada project dengan `type: "web"`, bagian Website menampilkan "Sedang dikembangkan".
Begitu ada project web pertama, hapus blok `web` di data dan tambahkan project-nya.

## Warna
Palet di bagian atas `style.css`: #000000, #233D4D (navy), #FE7F2D (oranye), #EAECF0 (latar).
Mode gelap ikut pengaturan perangkat.

## Deploy ke Vercel
GitHub: push folder ini, lalu Vercel > Add New Project > Import > Deploy (Framework Preset: Other).
CLI: `npm i -g vercel` lalu `vercel` di dalam folder ini.

## Menjadikannya dinamis nanti
Semua render lewat `loadData()` di `app.js`. Ganti isinya, misalnya:

    return fetch("/api/projects").then(r => r.json());

Bentuk datanya sama dengan `window.PORTFOLIO`. Sumber yang bisa dipakai: Vercel Serverless Function,
Notion API, Google Sheets, atau Supabase.

## Pelacakan klik
Setiap tombol penting punya atribut `data-track`. Event terkirim otomatis kalau Vercel Analytics atau gtag dipasang.
