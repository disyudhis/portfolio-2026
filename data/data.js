/* ============================================================
   SEMUA ISI PORTO ADA DI SINI. Edit file ini saja.
   Mau data dinamis nanti? Lihat loadData() di app.js dan README.md.
   ============================================================ */
window.PORTFOLIO = {
  profile: {
    name: "Yudhistira Haryatmaka Santoso",
    shortName: "Yudhistira",
    brand: "My Porto",                           // teks di navbar
    role: "Web Developer & Video Editor",
    whatsapp: "6282229134746",
    email: "yudhistiraharyatmakas@gmail.com",                                   // isi kalau mau ditampilkan
    instagram: "https://instagram.com/disyudhis",
    instagramHandle: "@disyudhis",
    tiktok: "https://www.tiktok.com/@disyudhis",
    tiktokHandle: "@disyudhis",
    intro:
      "Aku bikin website dan edit video untuk brand, sekolah, event, dan komunitas. Dari landing page sampai Reels yang ditonton ribuan orang."
  },

  marquee: ["Video Editing", "Landing Page", "Company Profile", "Custom Web"],

  // Urutan sesi di halaman Karya
  sessions: [
    { id: "challenge", title: "Challenge Video" },
    { id: "review", title: "Review Video" },
    { id: "cinematic", title: "Cinematic" },
    { id: "talking-heads", title: "Talking Heads" }
  ],

  // Nomor klip (01, 02, ...) mengikuti urutan array ini.
  // `link` = URL Reels / TikTok video tersebut. Kalau kosong, tombol memakai link Instagram profil.
  projects: [
    { id: "v01", type: "video", category: "challenge", title: "Challenge Video", client: "Voxnative", thumb: "assets/thumbs/voxtrivia.jpg", views: "", link: "https://www.instagram.com/reel/Dd_wDuYPIb3/?utm_source=ig_web_copy_link&cplk=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==" },
    { id: "v02", type: "video", category: "review", title: "Review Video", client: "Voxnative", thumb: "assets/thumbs/voxtizen.jpg", views: "", link: "https://www.instagram.com/reel/DeJoIsovlrF/?utm_source=ig_web_copy_link&vrfl=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==" },
    { id: "v03", type: "video", category: "cinematic", title: "Cinematic", client: "The Papandayan", thumb: "assets/thumbs/papandayan-jazzfest.jpg", views: "", link: "https://www.instagram.com/reel/DeOygEfvaO8/?utm_source=ig_web_copy_link&obrf=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==" },
    { id: "v04", type: "video", category: "challenge", title: "Challenge", client: "One Education Center", thumb: "assets/thumbs/oec-ellena-alena.jpg", views: "", link: "https://www.instagram.com/reel/Dd0gztDT5Xm/?utm_source=ig_web_copy_link&obrf=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==" },
    { id: "v05", type: "video", category: "talking-heads", title: "Talking Heads", client: "One Education Center", thumb: "assets/thumbs/oec-trevor.jpg", views: "", link: "https://www.instagram.com/reel/Dds4n6Nz3de/?utm_source=ig_web_copy_link&cplk=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==" },
    { id: "v06", type: "video", category: "talking-heads", title: "Talking Heads", client: "One Education Center", thumb: "assets/thumbs/oec-leander.jpg", views: "", link: "https://www.instagram.com/reel/Dc2mHC7Tt8s/?utm_source=ig_web_copy_link&psln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==" },
    { id: "v07", type: "video", category: "cinematic", title: "Cinematic", client: "One Education Center", thumb: "assets/thumbs/oec-belajar.jpg", views: "", link: "https://www.instagram.com/reel/DcuiaZdzzbL/?utm_source=ig_web_copy_link&srtk=MzRlODBiNWFlZA==" }
  ],

  // Sesi Website: tampil "sedang dikembangkan" selama belum ada project web.
  web: {
    status: "Sedang dikembangkan",
    title: "Website",
    desc: "Project website sedang aku kerjakan dan akan tampil di sini. Layanan pembuatan website tetap terbuka: landing page, company profile, dan custom web."
  },

  // Harga hanya contoh: ganti sesuai harga kamu.
    // Harga hanya contoh: ganti sesuai harga kamu.
  // base = harga 1 unit. variants = pilihan jenis (price: null = "Sesuai brief").
  // addons: perUnit:true berarti dikali jumlah video.
  services: [
    {
      id: "video",
      title: "Edit Video Pendek",
      tagline: "Reels, TikTok, dan Shorts",
      desc: "Ritme rapi, caption mudah dibaca, dan siap upload.",
      items: ["Potong dan susun ritme", "Caption dan efek suara", "2x revisi", "Format vertikal siap upload"],
      base: 150000,
      qty: { label: "Jumlah video", unit: "video", min: 1, max: 10, default: 1 },
      addons: [
        { id: "express", label: "Express 24 jam", price: 75000 },
        { id: "revisi", label: "Revisi tambahan 1x", price: 25000 },
        { id: "cover", label: "Cover / thumbnail", price: 20000, perUnit: true }
      ]
    },
    {
      id: "web",
      title: "Website",
      tagline: "Landing page sampai custom web",
      desc: "Cepat, responsif, dan online lewat Vercel.",
      items: ["Desain responsif", "Tombol WhatsApp dan form", "SEO dasar", "Domain dan deploy dibantu"],
      variants: [
        { label: "Landing page", price: 1000000 },
        { label: "Company profile", price: 2500000 },
        { label: "Custom web", price: null }
      ],
      addons: [
        { id: "page", label: "Halaman tambahan", price: 300000 },
        { id: "copy", label: "Bantu tulis konten", price: 400000 },
        { id: "cms", label: "Data dinamis (Sheets / CMS)", price: 750000 }
      ]
    }
  ],

  // Kosong = section testimoni tersembunyi. Format: { name, role, text }
  testimonials: []
};
