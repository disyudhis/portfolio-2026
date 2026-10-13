/* Render semua konten dari data/data.js.
   Mau data dinamis? Ubah loadData() di bawah (contoh ada di README). */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Sumber data: statis sekarang, bisa diganti fetch() nanti ---- */
  function loadData() {
    // Versi dinamis (contoh):
    // return fetch("/api/projects").then(function (r) { return r.json(); });
    return Promise.resolve(window.PORTFOLIO);
  }

  function waLink(d, text) {
    return "https://wa.me/" + d.profile.whatsapp + "?text=" + encodeURIComponent(text);
  }

  var DATA, list = [], groups = [], clips = [], chapters = [], active = -1;
  var tl, track, info, chNav;

  function init(d) {
    DATA = d;
    var p = d.profile;
    tl = $("#tl"); track = $("#track"); info = $("#tlInfo"); chNav = $("#chNav");

    document.querySelectorAll("[data-bind]").forEach(function (n) {
      var v = p[n.getAttribute("data-bind")];
      if (v) n.textContent = v;
    });
    var parts = p.name.split(" ");
    $("#nameFirst").textContent = parts[0];
    $("#nameRest").textContent = parts.slice(1).join(" ");
    document.title = p.name + " — " + p.role;
    $("#year").textContent = new Date().getFullYear();

    document.querySelectorAll("[data-wa]").forEach(function (a) {
      a.href = waLink(d, a.getAttribute("data-wa"));
      a.target = "_blank";
      a.rel = "noopener";
    });
    if (p.email) { $("#mailLink").href = "mailto:" + p.email; $("#mailItem").hidden = false; }
    if (p.instagram) { $("#igLink").href = p.instagram; $("#igLink").textContent = "Instagram " + (p.instagramHandle || ""); $("#igItem").hidden = false; }
    if (p.tiktok) { $("#ttLink").href = p.tiktok; $("#ttLink").textContent = "TikTok " + (p.tiktokHandle || ""); $("#ttItem").hidden = false; }
    var foot = [];
    if (p.instagram) foot.push('<a href="' + esc(p.instagram) + '" target="_blank" rel="noopener">Instagram</a>');
    if (p.tiktok) foot.push('<a href="' + esc(p.tiktok) + '" target="_blank" rel="noopener">TikTok</a>');
    $("#footLinks").innerHTML = foot.join("");

    renderMarquee(d);
    renderReel(d);
    bindTimeline();
    renderWeb(d);
    renderServices(d);
    renderTestimonials(d);
    bindForm(d);
    bindTracking();
    bindTheme();
  }

  function renderMarquee(d) {
    var items = d.marquee.concat(d.marquee, d.marquee, d.marquee);
    $("#marquee").innerHTML = items.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("");
  }

  function thumbHTML(p, badges) {
    var label = esc((p.title || "?").charAt(0));
    var inner;
    if (p.thumb) {
      inner = '<div class="thumb"><img src="' + esc(p.thumb) + '" alt="Thumbnail ' + esc(p.title) + ' ' + esc(p.client) + '" loading="lazy" draggable="false" ' +
        "onerror=\"this.parentNode.classList.add('fallback');this.remove()\">";
    } else {
      inner = '<div class="thumb fallback" data-label="' + label + '">';
    }
    if (badges) {
      inner += '<span class="play"></span>';
      if (p.views) inner += '<span class="views">' + esc(p.views) + "</span>";
    }
    return inner + "</div>";
  }

  /* ================= Video Editing: timeline dengan sub-section (chapter) ================= */
  var AR = ["9/15", "9/12", "9/13.5", "9/11"];   // tinggi klip bervariasi
  var OFF = [0, 64, 22, 92];                      // posisi vertikal bergantian, seperti track

  function renderReel(d) {
    // Nomor klip global mengikuti urutan data (01, 02, ...)
    d.projects.forEach(function (p, i) { p._no = i + 1; });

    // Kelompokkan per sub-section, urutan mengikuti d.sessions
    groups = []; list = [];
    d.sessions.forEach(function (s) {
      var items = d.projects.filter(function (p) { return p.type === "video" && p.category === s.id; });
      if (!items.length) return;
      groups.push({ id: s.id, title: s.title, start: list.length, count: items.length });
      list = list.concat(items);
    });

    $("#veCount").textContent = pad(list.length) + " video";

    chNav.innerHTML = groups.map(function (g) {
      return '<button class="ch-btn" role="tab" data-g="' + esc(g.id) + '" aria-selected="false">' + esc(g.title) + "<i>" + pad(g.count) + "</i></button>";
    }).join("");

    var html = "", k = 0;
    groups.forEach(function (g) {
      html += '<button class="chapter" data-g="' + esc(g.id) + '" data-label="' + esc(g.title) + '" aria-label="Sub-section ' + esc(g.title) + '">' +
        "<h4>" + esc(g.title) + "</h4><span>" + pad(g.count) + " video</span></button>";
      for (var j = 0; j < g.count; j++, k++) {
        var p = list[k];
        html += '<button class="clip" data-i="' + k + '" data-g="' + esc(g.id) + '" style="--ar:' + AR[k % AR.length] + ";--off:" + OFF[k % OFF.length] + 'px" ' +
          'aria-label="Video ' + pad(p._no) + ": " + esc(p.title) + ", " + esc(p.client) + '" data-track="open-' + esc(p.id) + '">' +
          '<span class="clip-no">' + pad(p._no) + '</span><span class="clip-frame">' + thumbHTML(p, true) + "</span>" +
          '<span class="clip-title">' + esc(p.client) + (p.views ? ", " + esc(p.views) : "") + "</span></button>";
      }
    });
    track.innerHTML = html;
    clips = Array.prototype.slice.call(track.querySelectorAll(".clip"));
    chapters = Array.prototype.slice.call(track.querySelectorAll(".chapter"));

    active = -1;
    centerOn(0, true);
    setActive(0);
    updateTimecode();
  }

  function renderWeb(d) {
    var hasWeb = d.projects.some(function (x) { return x.type === "web"; });
    $("#webWip").innerHTML = (d.web && !hasWeb)
      ? '<div class="wip"><span class="wip-tag">' + esc(d.web.status) + "</span><h3>" + esc(d.web.title) + "</h3><p>" + esc(d.web.desc) + '</p><div class="wip-bar" aria-hidden="true"></div>' +
      '<a class="btn btn-ghost" target="_blank" rel="noopener" href="' + waLink(d, "Halo, aku mau tanya soal pembuatan website.") + '" data-track="wip-wa">Tanya soal website</a></div>'
      : "";
  }

  function groupOf(i) { return list[i] ? list[i].category : ""; }

  function setActive(i) {
    if (!list.length || i === active) return;
    var prevG = active >= 0 ? groupOf(active) : "";
    active = i;
    clips.forEach(function (c, k) { c.classList.toggle("active", k === i); });
    var g = groupOf(i);
    if (g !== prevG) {
      chNav.querySelectorAll(".ch-btn").forEach(function (b) {
        var on = b.getAttribute("data-g") === g;
        b.setAttribute("aria-selected", on);
        if (on && b.scrollIntoView && !reduce) b.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
      });
      chapters.forEach(function (c) { c.classList.toggle("active", c.getAttribute("data-g") === g); });
    }
    var p = list[i];
    info.innerHTML =
      '<div class="ti-count"><b>' + pad(p._no) + "</b><span>/ " + pad(list.length) + "</span></div>" +
      '<div class="ti-main"><h3>' + esc(p.title) + '</h3><p class="client">' + esc(p.client) + (p.views ? ", " + esc(p.views) : "") + "</p></div>" +
      '<div class="ti-actions">' +
      '<button class="arrow" data-act="prev" aria-label="Klip sebelumnya">←</button>' +
      '<button class="arrow" data-act="next" aria-label="Klip berikutnya">→</button>' +
      '<button class="btn" data-act="open">Lihat detail</button></div>';
  }

  function centerOn(i, instant) {
    i = Math.max(0, Math.min(list.length - 1, i));
    var el = clips[i];
    if (!el) return;
    tl.scrollTo({ left: el.offsetLeft + el.offsetWidth / 2 - tl.clientWidth / 2, behavior: (instant || reduce) ? "auto" : "smooth" });
  }

  function nearest() {
    var center = tl.scrollLeft + tl.clientWidth / 2, best = 0, bd = Infinity;
    clips.forEach(function (el, k) {
      var dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
      if (dist < bd) { bd = dist; best = k; }
    });
    return best;
  }

  /* Timecode di playhead ikut posisi geser (12 px = 1 detik, 24 fps) */
  function updateTimecode() {
    var t = Math.max(0, tl.scrollLeft) / 12;
    var h = Math.floor(t / 3600), m = Math.floor(t / 60) % 60, s = Math.floor(t) % 60, f = Math.floor((t % 1) * 24);
    $("#phTc").textContent = pad(h) + ":" + pad(m) + ":" + pad(s) + ":" + pad(f);
  }

  function bindTimeline() {
    var raf = 0, dragging = false, moved = false, startX = 0, startLeft = 0;

    tl.addEventListener("scroll", function () {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = 0; if (list.length) { setActive(nearest()); updateTimecode(); } });
    }, { passive: true });

    tl.addEventListener("click", function (e) {
      if (moved) { moved = false; return; }
      var ch = e.target.closest(".chapter");
      if (ch) { jumpToGroup(ch.getAttribute("data-g")); return; }
      var c = e.target.closest(".clip");
      if (!c) return;
      var i = +c.getAttribute("data-i");
      if (i === active) openModal(DATA, list[i]); else centerOn(i);
    });

    tl.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); centerOn(active + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); centerOn(active - 1); }
    });

    chNav.addEventListener("click", function (e) {
      var b = e.target.closest(".ch-btn");
      if (b) jumpToGroup(b.getAttribute("data-g"));
    });

    /* geser pakai mouse (sentuh sudah native) */
    tl.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true; moved = false; startX = e.clientX; startLeft = tl.scrollLeft;
    });
    window.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 5) { moved = true; tl.classList.add("dragging"); }
      if (moved) tl.scrollLeft = startLeft - dx;
    });
    window.addEventListener("pointerup", function () {
      if (!dragging) return;
      dragging = false;
      tl.classList.remove("dragging");
      if (moved) { centerOn(nearest()); setTimeout(function () { moved = false; }, 0); }
    });

    /* efek miring 3D mengikuti kursor di atas klip */
    if (!reduce) {
      tl.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse" || dragging) return;
        var c = e.target.closest(".clip");
        if (!c) return;
        var f = c.querySelector(".clip-frame"), r = f.getBoundingClientRect();
        var nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
        f.style.setProperty("--ry", (nx * 12).toFixed(2) + "deg");
        f.style.setProperty("--rx", (-ny * 12).toFixed(2) + "deg");
      });
      tl.addEventListener("pointerout", function (e) {
        var c = e.target.closest && e.target.closest(".clip");
        if (!c || c.contains(e.relatedTarget)) return;
        var f = c.querySelector(".clip-frame");
        f.style.setProperty("--ry", "0deg"); f.style.setProperty("--rx", "0deg");
      });
    }

    info.addEventListener("click", function (e) {
      var b = e.target.closest("[data-act]");
      if (!b) return;
      var a = b.getAttribute("data-act");
      if (a === "prev") centerOn(active - 1);
      if (a === "next") centerOn(active + 1);
      if (a === "open") openModal(DATA, list[active]);
    });

    window.addEventListener("resize", function () { if (list.length) centerOn(active, true); });
  }

  function jumpToGroup(id) {
    for (var i = 0; i < groups.length; i++) if (groups[i].id === id) { centerOn(groups[i].start); return; }
  }

  /* ---- Modal: tanpa deskripsi, ganti dengan link referensi sosial media ---- */
  var modal = $("#modal");
  function openModal(d, p) {
    var msg = "Halo, aku tertarik dengan project seperti \"" + p.title + " (" + p.client + ")\". Bisa diskusi?";
    var link = p.link || d.profile.instagram;
    var label = p.linkLabel || "Lihat di Instagram";
    $("#mBody").innerHTML =
      '<div class="m-media">' + thumbHTML(p, false) + "</div>" +
      '<div class="m-info"><div class="m-no">' + pad(p._no || 0) + "</div>" +
      '<h3 id="mTitle">' + esc(p.title) + '</h3><p class="client">' + esc(p.client) + (p.views ? ", " + esc(p.views) : "") + "</p>" +
      '<div class="m-actions">' +
      (link ? '<a class="btn" target="_blank" rel="noopener" href="' + esc(link) + '" data-track="view-' + esc(p.id) + '">' + esc(label) + "</a>" : "") +
      '<a class="btn btn-ghost" target="_blank" rel="noopener" href="' + waLink(d, msg) + '" data-track="wa-from-' + esc(p.id) + '">Mau yang seperti ini</a>' +
      "</div></div>";
    if (typeof modal.showModal === "function") modal.showModal(); else modal.setAttribute("open", "");
  }
  $("#mClose").addEventListener("click", function () { modal.close(); });
  modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });

  /* ---- Layanan & testimoni ---- */
  function renderServices(d) {
    $("#services").innerHTML = d.services.map(function (s) {
      var msg = "Halo, aku tertarik dengan layanan \"" + s.title + "\".";
      return '<article class="svc' + (s.featured ? " feat" : "") + '">' +
        "<h3>" + esc(s.title) + '</h3><div class="price">' + esc(s.price) + "</div>" +
        "<p>" + esc(s.desc) + "</p><ul>" +
        s.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>" +
        '<a class="btn" target="_blank" rel="noopener" href="' + waLink(d, msg) + '" data-track="service-' + esc(s.title) + '">Tanya layanan ini</a>' +
        "</article>";
    }).join("");
  }

  function renderTestimonials(d) {
    if (!d.testimonials || !d.testimonials.length) return;
    $("#testimoni").hidden = false;
    $("#testi").innerHTML = d.testimonials.map(function (t) {
      return '<figure class="testi"><blockquote>“' + esc(t.text) + "”</blockquote><b>" + esc(t.name) + "</b><span>" + esc(t.role) + "</span></figure>";
    }).join("");
  }

  /* ---- Form brief → WhatsApp ---- */
  function bindForm(d) {
    $("#briefForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = new FormData(e.target);
      var text =
        "Halo " + d.profile.shortName + ", aku " + f.get("nama") + ".\n" +
        "Kebutuhan: " + f.get("jenis") + "\n" +
        "Deadline: " + (f.get("deadline") || "belum ditentukan") + "\n" +
        "Detail: " + f.get("detail");
      window.open(waLink(d, text), "_blank", "noopener");
    });
  }

  function bindTheme() {
    var btn = $("#themeBtn"), root = document.documentElement, meta = document.querySelector('meta[name="theme-color"]');
    function apply(t, save) {
      root.setAttribute("data-theme", t);
      btn.setAttribute("aria-label", t === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap");
      if (meta) meta.setAttribute("content", t === "dark" ? "#000000" : "#EAECF0");
      if (save) { try { localStorage.setItem("theme", t); } catch (e) { } }
    }
    apply(root.getAttribute("data-theme") || "light", false);
    btn.addEventListener("click", function () {
      apply(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
    });
  }

  /* ---- Pelacakan klik (opsional): aktif jika Vercel Analytics / gtag terpasang ---- */
  function bindTracking() {
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-track]");
      if (!t) return;
      var name = t.getAttribute("data-track");
      if (window.va) window.va("event", { name: name });
      if (window.gtag) window.gtag("event", "click", { event_label: name });
    });
  }

  loadData().then(init).catch(function (err) {
    console.error("Gagal memuat data porto:", err);
  });
})();
