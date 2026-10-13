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
    email: "",                                   // isi kalau mau ditampilkan
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
    { id: "v01", type: "video", category: "challenge",     title: "Challenge Video", client: "Voxnative",             thumb: "assets/thumbs/voxtrivia.jpg",          views: "7.2K views", link: "" },
    { id: "v02", type: "video", category: "review",        title: "Review Video",    client: "Voxnative",             thumb: "assets/thumbs/voxtizen.jpg",           views: "4.7K views", link: "" },
    { id: "v03", type: "video", category: "cinematic",     title: "Cinematic",       client: "The Papandayan",        thumb: "assets/thumbs/papandayan-jazzfest.jpg", views: "4K views",   link: "" },
    { id: "v04", type: "video", category: "challenge",     title: "Challenge",       client: "One Education Center",  thumb: "assets/thumbs/oec-ellena-alena.jpg",   views: "",           link: "" },
    { id: "v05", type: "video", category: "talking-heads", title: "Talking Heads",   client: "One Education Center",  thumb: "assets/thumbs/oec-trevor.jpg",         views: "",           link: "" },
    { id: "v06", type: "video", category: "talking-heads", title: "Talking Heads",   client: "One Education Center",  thumb: "assets/thumbs/oec-leander.jpg",        views: "",           link: "" },
    { id: "v07", type: "video", category: "cinematic",     title: "Cinematic",       client: "One Education Center",  thumb: "assets/thumbs/oec-belajar.jpg",        views: "",           link: "" }
  ],

  // Sesi Website: tampil "sedang dikembangkan" selama belum ada project web.
  web: {
    status: "Sedang dikembangkan",
    title: "Website",
    desc: "Project website sedang aku kerjakan dan akan tampil di sini. Layanan pembuatan website tetap terbuka: landing page, company profile, dan custom web."
  },

  // Harga hanya contoh: ganti sesuai harga kamu.
  services: [
    {
      title: "Edit Video Pendek",
      price: "Mulai Rp 150 rb",
      desc: "Reels, TikTok, dan Shorts dengan ritme rapi dan caption yang mudah dibaca.",
      items: ["Potong dan susun ritme", "Caption dan efek suara", "2x revisi", "Format vertikal siap upload"],
      featured: true
    },
    {
      title: "Website",
      price: "Mulai Rp 1 jt",
      desc: "Landing page, company profile, atau custom web yang cepat, responsif, dan online lewat Vercel.",
      items: ["Desain responsif", "Tombol WhatsApp dan form", "SEO dasar", "Domain dan deploy dibantu"]
    }
  ],

  // Kosong = section testimoni tersembunyi. Format: { name, role, text }
  testimonials: []
};
